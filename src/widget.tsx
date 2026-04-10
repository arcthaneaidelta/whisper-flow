import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Cpu, Zap, History, Settings as SettingsIcon, X } from 'lucide-react';
import '@/index.css';

const CommandWidget = () => {
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.electron.send('close-widget');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { icon: <Cpu className="w-4 h-4" />, label: 'Analyze System', shortcut: '⌘A' },
    { icon: <Zap className="w-4 h-4" />, label: 'Summarize Clipboard', shortcut: '⌘S' },
    { icon: <History className="w-4 h-4" />, label: 'View Recent Actions', shortcut: '⌘H' },
    { icon: <SettingsIcon className="w-4 h-4" />, label: 'Open Settings', shortcut: '⌘,' },
  ];

  const filteredCommands = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-screen w-screen flex items-start justify-center pt-2 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-graphite/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center px-4 py-3 gap-3 border-b border-border">
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-zinc-500"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md">
            <Command className="w-3 h-3 text-zinc-400" />
            <span className="text-[10px] font-medium text-zinc-400 uppercase">Space</span>
          </div>
          <button 
            onClick={() => window.electron.send('close-widget')}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          <AnimatePresence mode="popLayout">
            {filteredCommands.map((cmd, index) => (
              <motion.div
                key={cmd.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-accent/10 cursor-pointer transition-all border border-transparent hover:border-accent/20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                    {cmd.icon}
                  </div>
                  <span className="text-sm font-medium text-zinc-200">{cmd.label}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {cmd.shortcut}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredCommands.length === 0 && (
            <div className="py-8 text-center text-zinc-500 text-sm">
              No commands found for "{query}"
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Define global window type
declare global {
  interface Window {
    electron: {
      send: (channel: string, data?: any) => void;
      invoke: (channel: string, data?: any) => Promise<any>;
      on: (channel: string, func: (...args: any[]) => void) => void;
    };
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CommandWidget />
  </React.StrictMode>
);
