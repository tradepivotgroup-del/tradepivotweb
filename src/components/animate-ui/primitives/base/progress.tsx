"use client";

import * as React from "react";
import { motion } from "framer-motion";

const ProgressContext = React.createContext({ value: 0 });

export function Progress({ value = 0, className = "", children }: { value?: number, className?: string, children: React.ReactNode }) {
  return (
    <ProgressContext.Provider value={{ value }}>
      <div className={className}>{children}</div>
    </ProgressContext.Provider>
  );
}

export function ProgressLabel({ className = "", children }: { className?: string, children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function ProgressValue() {
  const { value } = React.useContext(ProgressContext);
  return <>{Math.round(value)}</>;
}

export function ProgressTrack({ className = "", children }: { className?: string, children: React.ReactNode }) {
  return <div className={`relative bg-[var(--border-subtle)] rounded-full overflow-hidden ${className}`}>{children}</div>;
}

export function ProgressIndicator({ className = "" }: { className?: string }) {
  const { value } = React.useContext(ProgressContext);
  return (
    <motion.div 
      className={`h-full ${className}`} 
      initial={{ width: 0 }} 
      animate={{ width: `${value}%` }} 
      transition={{ duration: 0.1, ease: "linear" }} 
    />
  );
}
