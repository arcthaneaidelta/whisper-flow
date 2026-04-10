import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Terminal, 
  History, 
  Settings, 
  ChevronRight, 
  Search, 
  Bell, 
  User,
  Activity,
  Cpu,
  Zap,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-accent/10 text-accent border border-accent/20' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
    {active && <motion.div layoutId="active" className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
  </motion.button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-background text-foreground font-sans selection:bg-accent/30 selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-4 flex flex-col gap-8 bg-black/20 backdrop-blur-xl group">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">Whisperflow</span>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={Terminal} 
            label="Command Center" 
            active={activeTab === 'commands'} 
            onClick={() => setActiveTab('commands')} 
          />
          <SidebarItem 
            icon={History} 
            label="History" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="mt-auto p-4 bg-white/5 border border-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div>
              <p className="text-xs font-semibold">Premium Account</p>
              <p className="text-[10px] text-zinc-500">Upgrade Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-8 py-6 relative">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 drag-region">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
            <p className="text-zinc-500 text-sm">Welcome back, Commander.</p>
          </div>
          <div className="flex items-center gap-4 no-drag">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm focus:border-accent/40 outline-none transition-all w-64"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 relative">
              <Bell className="w-4 h-4 text-zinc-300" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'AI Operations', value: '1,284', icon: Cpu, trend: '+12.5%' },
                  { label: 'Uptime', value: '99.99%', icon: Activity, trend: 'Stable' },
                  { label: 'Latency', value: '42ms', icon: Clock, trend: '-4ms' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl border border-border bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.05] transition-all group cursor-default"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-accent/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                        <stat.icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-xs font-mono text-accent">{stat.trend}</span>
                    </div>
                    <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Chart Section */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 p-6 rounded-3xl border border-border bg-black/20 backdrop-blur-sm h-[400px]">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="font-bold text-lg">Performance Metrics</h4>
                    <select className="bg-white/5 border border-white/10 rounded-lg text-xs px-3 py-1.5 outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#71717a', fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#18181b', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#fff' 
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-span-4 p-6 rounded-3xl border border-border bg-black/20 backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-6">Recent Activity</h4>
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Auto-scaled cluster x2</p>
                          <p className="text-xs text-zinc-500">2 minutes ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'commands' && (
             <motion.div
               key="commands"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="flex items-center justify-center h-[500px]"
             >
               <div className="text-center">
                 <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                   <Terminal className="w-10 h-10 text-accent" />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">Command Center</h3>
                 <p className="text-zinc-500 mb-8 max-w-sm">
                   Open the global command palette anywhere with <code className="bg-white/10 px-2 py-1 rounded text-accent">Alt + Space</code>
                 </p>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
