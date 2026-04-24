"use client";

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Trash2, Upload, Edit3 } from 'lucide-react';
import Image from 'next/image';
import { Progress, ProgressLabel, ProgressTrack, ProgressValue, ProgressIndicator } from '@/components/animate-ui/primitives/base/progress';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

interface GalleryItem {
  id: string;
  image: string;
  projectId: string;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const projSnap = await getDocs(collection(db, "projects"));
      const projData = projSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projData);
      
      if (projData.length > 0) {
        setSelectedProjectId(projData[0].id);
      }

      // Fetch gallery items
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState<'add' | 'edit'>('add');
  const [projectForm, setProjectForm] = useState({ id: '', name: '', description: '' });

  const openAddProjectModal = () => {
    setProjectModalMode('add');
    setProjectForm({ id: '', name: '', description: '' });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setProjectModalMode('edit');
    setProjectForm({ id: project.id, name: project.name, description: project.description || '' });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async () => {
    if (!projectForm.name.trim()) return;

    if (projectModalMode === 'add') {
      try {
        const docRef = await addDoc(collection(db, "projects"), {
          name: projectForm.name,
          description: projectForm.description
        });
        const newProject = { id: docRef.id, name: projectForm.name, description: projectForm.description };
        setProjects([...projects, newProject]);
        setSelectedProjectId(newProject.id);
      } catch (e) {
        console.error("Error adding project: ", e);
      }
    } else {
      try {
        await setDoc(doc(db, "projects", projectForm.id), { 
          name: projectForm.name, 
          description: projectForm.description 
        }, { merge: true });
        
        setProjects(projects.map(p => 
          p.id === projectForm.id 
            ? { ...p, name: projectForm.name, description: projectForm.description } 
            : p
        ));
      } catch (e) {
        console.error("Error editing project: ", e);
      }
    }
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This won't delete the images, but they'll be orphaned until reassigned.")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      const newProjects = projects.filter(p => p.id !== id);
      setProjects(newProjects);
      if (selectedProjectId === id && newProjects.length > 0) {
        setSelectedProjectId(newProjects[0].id);
      } else if (newProjects.length === 0) {
        setSelectedProjectId('');
      }
    } catch (e) {
      console.error("Error deleting project: ", e);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        }
      );

      await uploadTask;
      const url = await getDownloadURL(uploadTask.snapshot.ref);

      const docRef = await addDoc(collection(db, "gallery"), {
        image: url,
        projectId: selectedProjectId,
        createdAt: new Date().toISOString()
      });

      setItems([{ id: docRef.id, image: url, projectId: selectedProjectId, createdAt: new Date().toISOString() }, ...items]);
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Remove this image from gallery?")) return;
    
    try {
      await deleteDoc(doc(db, "gallery", id));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch(e => console.log("Cleanup failed, image might not exist in storage or wrong path."));
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting image.");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
            <div className="text-silver-primary text-[10px] font-black uppercase tracking-[0.5em] mb-2">Content Manager</div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Gallery.</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button 
              onClick={openAddProjectModal}
              className="px-4 py-3 border border-[var(--border-subtle)] text-[var(--foreground)] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[var(--card-bg)] transition-all whitespace-nowrap"
            >
              + New Project
            </button>
            <select 
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--foreground)] text-[11px] font-bold uppercase tracking-widest px-4 py-3 rounded-lg focus:outline-none w-full sm:w-auto"
            >
              {projects.length === 0 && <option value="">No Projects</option>}
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            
            <div className="relative w-full sm:w-auto">
                <input 
                    type="file" accept="image/*" 
                    onChange={handleUpload}
                    disabled={uploading || projects.length === 0}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
                />
                <button 
                  disabled={uploading || projects.length === 0}
                  className="w-full sm:w-auto px-6 py-3 bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {uploading ? (
                        <span className="animate-pulse">Uploading...</span>
                    ) : (
                        <> <Upload size={14} /> Upload to Project </>
                    )}
                </button>
            </div>
        </div>
      </header>

      {uploading && (
        <div className="flex justify-end">
          <Progress value={uploadProgress} className="w-full md:w-[300px] space-y-2">
            <div className="flex items-center justify-between gap-1">
              <ProgressLabel className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">
                Uploading Image
              </ProgressLabel>
              <span className="text-[10px] font-black">
                <ProgressValue /> %
              </span>
            </div>
            <ProgressTrack className="w-full h-1.5 overflow-hidden bg-[var(--background)] rounded-full">
              <ProgressIndicator className="bg-silver-primary" />
            </ProgressTrack>
          </Progress>
        </div>
      )}

      {loading ? (
        <div className="text-center py-24 text-[11px] font-black uppercase tracking-widest animate-pulse">
            Syncing Assets...
        </div>
      ) : (
        <div className="space-y-12">
          {projects.map(project => {
            const projectItems = items.filter(item => item.projectId === project.id);
            
            return (
              <div key={project.id} className="bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter">
                      {project.name} <span className="text-[var(--text-muted)] text-sm ml-2">({projectItems.length})</span>
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-medium mt-1 max-w-xl">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => openEditProjectModal(project)}
                      className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                    >
                      <Edit3 size={12} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
                
                {projectItems.length === 0 ? (
                  <div className="text-center py-12 text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
                    No images in this project yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {projectItems.map((item) => (
                          <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden bg-[var(--background)] border border-[var(--border-subtle)]">
                              <Image unoptimized src={item.image} alt="Gallery item" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button 
                                      onClick={() => handleDelete(item.id, item.image)}
                                      className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Project Form Modal using AlertDialog */}
      <AlertDialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
              {projectModalMode === 'add' ? 'Create New Project' : 'Edit Project Details'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed">
              Update the title and description for this gallery project. This information is publicly visible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Project Title</label>
              <input 
                type="text" 
                value={projectForm.name}
                onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                placeholder="e.g. Harare Residential Complex"
                className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-xl p-4 text-[14px] font-medium text-[var(--foreground)] focus:outline-none focus:border-silver-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Project Description</label>
              <textarea 
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                placeholder="Write a brief overview of this project..."
                rows={5}
                className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-xl p-4 text-[14px] font-medium text-[var(--foreground)] focus:outline-none focus:border-silver-primary resize-none transition-colors"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] px-8 py-4 rounded-xl hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">
              Cancel
            </AlertDialogCancel>
            <button 
              onClick={handleSaveProject}
              disabled={!projectForm.name.trim()}
              className="bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {projectModalMode === 'add' ? 'Create Project' : 'Save Changes'}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
