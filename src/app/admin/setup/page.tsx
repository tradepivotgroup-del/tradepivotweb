"use client";

import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminSetup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
    setStatus('loading');
    try {
      const email = "nkezieprosper@gmail.com";
      const password = "Prosper@2000";

      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create User Profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "admin",
        createdAt: new Date().toISOString()
      });

      setStatus('success');
      setMessage(`Admin account created: ${email}. Please delete this route (/admin/setup) immediately!`);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setMessage(error.message || "An error occurred during setup.");
    }
  };

  const handleMigration = async () => {
    setStatus('loading');
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const projects = [
        {
          title: "The Ferryden Lodge",
          location: "Zimbabwe",
          size: "2,500 SQM",
          status: "100% Complete",
          description: "A Modern Lodge Built To Stand Out. High-precision structural engineering meets luxury design.",
          longDesc: "This project involved the complete structural design and project management of a luxury lodge. We focused on blending traditional structural integrity with modern architectural aesthetics, ensuring high durability in diverse environmental conditions.",
          image: "/images/2026_04_18_08_33_37_IMG_9021.JPG"
        },
        {
          title: "Residential Milestone",
          location: "Bulawayo",
          size: "900 SQM",
          status: "Now Occupied",
          description: "A Peaceful Suburban home for the ages. Engineered for comfort and longevity.",
          longDesc: "A bespoke residential project emphasizing spacious living and structural elegance. Our team handled everything from foundation assessment to final finishing inspection, ensuring a secure and aesthetic home.",
          image: "/images/2026_04_18_08_33_37_IMG_9025.JPG"
        },
        {
            title: "Industrial Shells",
            location: "Donnington, BYO",
            size: "1,500 SQM",
            status: "Now Operational",
            description: "Modern Steel Structure For Industrial Excellence.",
            longDesc: "A high-stakes industrial development requiring massive clear spans and heavy-duty floor slabs. We delivered a robust steel structure optimized for large-scale manufacturing workflows.",
            image: "/images/2026_04_18_08_33_38_IMG_9019.JPG"
        },
        {
            title: "Structural Assessment",
            location: "Harare",
            size: "4,000 SQM",
            status: "Assessment Complete",
            description: "Rigorous health check for a multi-story commercial complex.",
            longDesc: "Conducted a comprehensive structural audit and assessment for a large commercial entity. Our reports provided critical data for seismic retrofitting and life-extension of the facility.",
            image: "/images/2026_04_18_08_33_38_IMG_9023.JPG"
        },
        {
            title: "Proposed Abbatoir",
            location: "Bulawayo Surrounds",
            size: "3,000 SQM",
            status: "Under Construction",
            description: "Optimized workflow engineering for the meat processing industry.",
            longDesc: "Currently overseeing the civil and structural engineering for a state-of-the-art abattoir. The design prioritizes hygiene, structural durability against corrosive elements, and efficient transit lanes.",
            image: "/images/2026_04_18_08_33_38_IMG_9026.JPG"
        },
        {
            title: "Civil Infrastructure",
            location: "Matabeleland",
            size: "5 KM Roadway",
            status: "Phase 1 Complete",
            description: "Durable road networks connecting vision to reality.",
            longDesc: "Civil engineering project focused on bulk earthworks and road network development. We ensured high-standard drainage and surface durability to withstand heavy transit and seasonal weather.",
            image: "/images/2026_04_18_08_33_39_IMG_9020.JPG"
        },
        {
            title: "Luxury Apartments",
            location: "Victoria Falls",
            size: "1,800 SQM",
            status: "Finishing Level",
            description: "Breathtaking structural views and uncompromised quality.",
            longDesc: "A premier living development in Zimbabwe's tourism hub. Our structural team implemented innovative load-bearing solutions to maximize panoramic views without sacrificing safety.",
            image: "/images/2026_04_18_08_33_39_IMG_9022.JPG"
        },
        {
            title: "Commercial Pavilion",
            location: "Central BYO",
            size: "1,200 SQM",
            status: "Now Open",
            description: "A hub for trade and structural innovation.",
            longDesc: "An urban revitalization project. We designed a flexible commercial space using modular steel components, allowing for rapid construction and future adaptability.",
            image: "/images/2026_04_18_08_33_39_IMG_9024.JPG"
        },
        {
            title: "Bridge Reinforcement",
            location: "Gwayi River",
            size: "Bridge Deck",
            status: "100% Complete",
            description: "Strengthening the lifeline of transit infrastructure.",
            longDesc: "Structural reinforcement of a key bridge deck. Our team utilized advanced carbon-fiber wrapping and concrete injection technologies to restore weight-bearing capacity.",
            image: "/images/2026_04_18_08_33_40_IMG_9017.JPG"
        },
        {
            title: "Foundation Works",
            location: "Standard Projects",
            size: "Variable",
            status: "Ongoing",
            description: "The Bedrock of every successful structure.",
            longDesc: "Showcasing our precision in deep-pile foundations and geotechnical ground improvement. We ensure every project starts on solid, double-checked engineering ground.",
            image: "/images/2026_04_18_08_33_40_IMG_9018.JPG"
        }
      ];

      for (const project of projects) {
        await addDoc(collection(db, "projects"), {
          ...project,
          createdAt: new Date().toISOString()
        });
      }

      setStatus('success');
      setMessage("Migration successful! 10 projects added to Firestore.");
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setMessage(error.message || "An error occurred during migration.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-[var(--card-bg)] p-12 rounded-3xl border border-[var(--border-subtle)] space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Setup & Migration</h1>
        <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
          Initialize your administrator account and migrate the initial 10 portfolio projects to Firestore.
        </p>
        
        <div className="flex flex-col gap-4">
            <button 
                onClick={handleSetup}
                disabled={status === 'loading'}
                className="w-full py-4 bg-silver-primary text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:opacity-90 transition-all disabled:opacity-50"
            >
                1. Create Admin Account
            </button>
            <button 
                onClick={handleMigration}
                disabled={status === 'loading'}
                className="w-full py-4 border border-[var(--border-subtle)] text-[var(--foreground)] text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all disabled:opacity-50"
            >
                2. Migrate Initial Projects
            </button>
        </div>

        {status === 'loading' && (
          <div className="text-center py-4 animate-pulse uppercase tracking-widest font-black text-xs">
            Initializing...
          </div>
        )}

        {status === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-[13px] font-medium leading-relaxed">
            {message}
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[13px] font-medium leading-relaxed">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
