"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { X } from 'lucide-react';
import { MotionCarousel } from '@/components/animate-ui/components/community/motion-carousel';

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-lenis-prevent', 'true');
    } else {
      document.body.style.overflow = 'unset';
      document.body.removeAttribute('data-lenis-prevent');
    }
  }, [selectedImage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projSnap = await getDocs(collection(db, "projects"));
        const projData = projSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

        const galSnap = await getDocs(query(collection(db, "gallery"), orderBy("createdAt", "desc")));
        const galData = galSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

        // Map items to projects
        const compiledProjects = projData.map((p: any) => ({
          ...p,
          images: galData.filter((i: any) => i.projectId === p.id).map((i: any) => i.image)
        })).filter((p: any) => p.images.length > 0);

        setProjects(compiledProjects);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section id="gallery" className="py-32 px-8 md:px-24 bg-[var(--alt-bg)] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
            <div className="text-silver-primary text-[11px] font-black uppercase tracking-[0.5em] mb-8">Visual Archives</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="block">Project</motion.span></span>
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="block text-[var(--text-muted)]">Showcase.</motion.span></span>
            </h2>
        </div>

        <div className="space-y-40">
          {projects.map((project, projectIdx) => (
            <div key={project.id} className="relative">
              {/* Project Header */}
              <div className="grid md:grid-cols-2 gap-8 mb-12 items-end border-b border-[var(--border-subtle)] pb-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-silver-primary mb-4">Project {String.fromCharCode(65 + projectIdx)}</div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{project.name}</h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </motion.div>
              </div>

              {/* Project Images Carousel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <MotionCarousel 
                  slides={project.images} 
                  options={{ loop: true, align: 'center' }}
                  onItemClick={(img) => setSelectedImage(img)}
                  className="w-full"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4 md:p-12"
          >
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-xl"
            />
            
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 z-[110] w-12 h-12 rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] flex items-center justify-center transition-all backdrop-blur-md"
            >
                <X size={24} />
            </button>

            <motion.div
              layoutId={selectedImage}
              className="relative w-full max-w-5xl aspect-video md:aspect-[4/3] max-h-[85vh] bg-[var(--card-bg)] rounded-2xl md:rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] shadow-2xl z-[105]"
            >
               <Image
                 src={selectedImage}
                 alt="Enlarged view"
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

function GalleryCard({ image, index, onClick }: { image: string, index: number, onClick: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax subtle offset
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden group cursor-zoom-in break-inside-avoid shadow-lg"
    >
      <motion.div style={{ y, scale: 1.15 }} className="w-full h-full">
        <Image
          src={image}
          alt="Construction progress"
          width={800}
          height={800}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
