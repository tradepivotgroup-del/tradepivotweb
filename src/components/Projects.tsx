"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin, X, Ruler, CheckCircle2, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Project {
  id: string;
  title: string;
  location: string;
  size: string;
  status: string;
  description: string;
  longDesc: string;
  image: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects_portfolio"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(data);
      } catch (err) {
        console.error("Error fetching portfolio projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      // Add data-lenis-prevent attribute to body to stop Lenis if needed
      document.body.setAttribute('data-lenis-prevent', 'true');
    } else {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-lenis-prevent');
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-32 px-8 md:px-24 bg-[var(--background)] text-[var(--foreground)] transition-colors relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
            <div className="md:w-1/2">
                <div className="text-silver-primary text-[11px] font-black uppercase tracking-[0.5em] mb-8">Portfolio</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                    <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="block">Engineering</motion.span></span>
                    <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="block text-[var(--text-muted)]">The Undisputed.</motion.span></span>
                </h2>
            </div>
            <p className="md:w-1/3 text-[13px] text-[var(--text-muted)] font-medium leading-relaxed">
                We don’t just deliver drawings; we deliver certainty. Explore our latest milestones across Zimbabwe, managed in real-time.
            </p>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
             {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[4/3] rounded-3xl bg-[var(--card-bg)] animate-pulse border border-[var(--border-subtle)]" />
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              {projects.map((p, i) => (
                  <ProjectCard 
                      key={p.id} 
                      project={p} 
                      index={i} 
                      onClick={() => setSelectedProject(p)} 
                  />
              ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-0 md:p-12"
          >
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-[var(--background)] md:rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] flex flex-col md:flex-row shadow-2xl"
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-8 right-8 z-[110] w-12 h-12 rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] flex items-center justify-center transition-all backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                {/* Left: Image (Clickable for full screen) */}
                <div 
                    onClick={() => setIsFullscreenImage(true)}
                    className="md:w-1/2 h-[40vh] md:h-auto min-h-[300px] relative bg-[var(--card-bg)] shrink-0 group cursor-zoom-in overflow-hidden flex"
                >
                    <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[var(--background)]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-[var(--background)]/80 backdrop-blur-sm text-[var(--foreground)] flex items-center justify-center">
                          <Maximize2 className="w-6 h-6" />
                       </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent md:hidden" />
                </div>

                {/* Right: Details (Scrollable Container) */}
                <div 
                    className="md:w-1/2 flex-1 flex flex-col overflow-y-auto scroll-smooth custom-scrollbar"
                    data-lenis-prevent="true"
                >
                    <div className="p-8 md:p-12 pb-24 md:pb-24">
                        <div className="flex items-center gap-4 text-[11px] uppercase font-black tracking-[0.4em] text-silver-primary mb-6">
                            <MapPin size={14} /> {selectedProject.location}
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none text-[var(--foreground)] mb-8">
                            {selectedProject.title}
                        </h2>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="flex flex-col gap-2">
                                <div className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                                    <Ruler size={12} /> Project Size
                                </div>
                                <div className="text-xl font-bold text-[var(--foreground)]">{selectedProject.size}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                                    <CheckCircle2 size={12} /> Progress
                                </div>
                                <div className="text-xl font-bold text-[var(--foreground)]">{selectedProject.status}</div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="text-[10px] uppercase font-black tracking-[0.4em] text-neutral-600">Case Study</div>
                            <p className="text-[15px] font-medium leading-relaxed text-[var(--text-muted)] italic border-l-2 border-silver-primary/20 pl-6">
                                "{selectedProject.description}"
                            </p>
                            <p className="text-[14px] leading-relaxed text-[var(--foreground)]/80">
                                {selectedProject.longDesc}
                            </p>
                        </div>

                        <button className="mt-24 group flex items-center gap-4 text-[13px] font-black uppercase tracking-widest text-[var(--foreground)] hover:text-silver-primary transition-colors">
                            Inquire about similar Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image View Modal */}
      <AnimatePresence>
        {isFullscreenImage && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-auto p-4 md:p-12"
          >
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFullscreenImage(false)}
                className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-xl"
            />
            
            <button 
                onClick={() => setIsFullscreenImage(false)}
                className="absolute top-8 right-8 z-[130] w-12 h-12 rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] flex items-center justify-center transition-all backdrop-blur-md"
            >
                <X size={24} />
            </button>

            <motion.div
              layoutId={`project-img-full-${selectedProject.id}`}
              className="relative w-full max-w-6xl aspect-video md:aspect-[4/3] max-h-[90vh] bg-[var(--card-bg)] rounded-2xl md:rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] shadow-2xl z-[125]"
            >
               <Image
                 src={selectedProject.image}
                 alt={selectedProject.title}
                 fill
                 className="object-contain"
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project: p, index: i, onClick }: { project: Project, index: number, onClick: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="group cursor-pointer"
        onClick={onClick}
    >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl mb-12 bg-[var(--card-bg)]">
            <motion.div style={{ y, scale: 1.15 }} className="w-full h-full">
                <Image 
                    src={p.image} 
                    alt={p.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-all duration-1000" 
                />
            </motion.div>
            <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[var(--background)]/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-full border border-[var(--border-subtle)] relative z-10 text-[var(--foreground)]">
                    {p.status}
                </span>
            </div>
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                 <div className="w-16 h-16 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6" />
                 </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">
                 <MapPin className="w-3 h-3 text-silver-primary" /> {p.location}
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight group-hover:text-silver-primary transition-colors">
                {p.title}
            </h3>
            <p className="text-[14px] text-[var(--text-muted)] font-medium leading-relaxed max-w-lg">
                {p.description}
            </p>
        </div>
    </motion.div>
  );
}
