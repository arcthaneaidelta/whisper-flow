import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import '@/index.css';

const Splash = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-graphite-dark border border-border rounded-xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative flex flex-col items-center"
      >
        <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full" />
        
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-white relative z-10">
          <motion.path
            d="M50 10 L10 90 L90 90 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50"
            cy="60"
            r="15"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1, duration: 1 }}
          />
        </svg>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 text-2xl font-semibold tracking-tighter text-white font-sans"
        >
          Whisperflow <span className="text-accent underline underline-offset-8">Elite</span>
        </motion.h1>

        <motion.div
          className="mt-8 w-48 h-[2px] bg-border overflow-hidden relative"
        >
          <motion.div
            className="absolute h-full w-full bg-accent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>
);
