import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  Github, 
  Layers, 
  ExternalLink, 
  Terminal, 
  Database, 
  Network, 
  Layout, 
  ChevronRight, 
  Share2, 
  Check, 
  Code2, 
  Activity 
} from 'lucide-react';

// --- Types & Interfaces ---
interface System {
  id: string;
  title: string;
  category: 'Distributed' | 'Networking' | 'Storage' | 'Analytics';
  tags: string[];
  icon: React.ReactNode;
  description: string;
  stack: string[];
  metrics: string;
  complexity: 'High' | 'Medium' | 'Critical';
  status: 'Drafting' | 'Live' | 'Concept';
  adrLink: string;
  simLink: string;
}

// --- Data Registry ---
const SYSTEMS_DATA: System[] = [
  {
    id: "global-sequencer",
    title: "Global Sequencer",
    category: "Distributed",
    tags: ["High Scale", "Storage", "Consensus"],
    icon: <Cpu className="w-6 h-6" />,
    description: "High-throughput unique ID generation at 10M+ TPS. Leverages Snowflake algorithms and LSM-Tree storage for extreme write durability.",
    stack: ["Snowflake", "LSM-Tree", "Zookeeper", "gRPC"],
    metrics: "10M+ TPS | < 1ms Latency",
    complexity: "Critical",
    status: "Live",
    adrLink: "Systems/global-sequencer/README.md",
    simLink: "Systems/global-sequencer/global_sequencer_dashboard.html"
  },
  {
    id: "rate-limiter",
    title: "Distributed Rate Limiter",
    category: "Networking",
    tags: ["Networking", "Security"],
    icon: <ShieldCheck className="w-6 h-6" />,
    description: "Edge protection at scale. Implements Sliding Window Log algorithms with Redis synchronization to prevent API abuse globally.",
    stack: ["Redis", "Lua", "Token Bucket"],
    metrics: "Multi-Region Sync",
    complexity: "Medium",
    status: "Drafting",
    adrLink: "#",
    simLink: "#"
  },
  {
    id: "real-time-analytics",
    title: "Real-time Metrics Pipeline",
    category: "Storage",
    tags: ["Storage", "Big Data"],
    icon: <BarChart3 className="w-6 h-6" />,
    description: "Low-latency analytical processing using Columnar storage and materialized views for sub-second dashboard updates.",
    stack: ["Kafka", "ClickHouse", "Protobuf"],
    metrics: "Sub-second OLAP",
    complexity: "High",
    status: "Concept",
    adrLink: "#",
    simLink: "#"
  }
];

// --- Main Application Component ---
const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (id: string) => {
    try {
        const shareUrl = `${window.location.origin}${window.location.pathname}?system=${id}`;
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
        console.error('Copy failed', err);
    }
  };

  const filteredSystems = useMemo(() => {
    return SYSTEMS_DATA.filter(sys => {
      const matchesFilter = activeFilter === 'all' || sys.category === activeFilter || sys.tags.includes(activeFilter);
      const matchesSearch = 
        sys.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sys.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sys.stack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tight text-white uppercase">VK-Systems</span>
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold mt-1">Architecture Portal</span>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blueprints..." 
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-2 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/VK-Systems/system-design-playbook" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <button 
                className="md:hidden p-2 text-slate-400"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {mobileSearchOpen && (
            <div className="md:hidden pb-4">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search systems..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white border-b border-slate-200 py-16 lg:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold mb-8 uppercase tracking-widest">
              <Activity className="w-3 h-3 animate-pulse" /> Distributed Systems Deep-Dives
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Architect's <br/><span className="text-blue-600 italic">Decision Logs.</span>
            </h1>
            <p className="text-slate-600 leading-relaxed text-xl max-w-2xl mb-10 mx-auto lg:mx-0 font-medium">
              A high-signal portfolio documenting the internal mechanics of hyperscale systems and distributed primitives.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#catalog" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Explore Designs
              </a>
            </div>
          </div>

          <div className="hidden lg:block flex-1 relative">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-800 transform rotate-2">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className="text-blue-300"><span className="text-pink-400">const</span> strategy = <span className="text-emerald-400">'Performance'</span>;</p>
                <p className="text-slate-500 italic">// Building for 10M+ TPS</p>
                <div className="py-2">
                    <p className="text-emerald-400">{" >> Initializing LSM-Tree..."}</p>
                    <p className="text-emerald-400">{" >> WAL Flush: OK"}</p>
                    <p className="text-blue-400">{" >> Latency: 0.8ms"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div id="catalog" className="bg-slate-50 border-b border-slate-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {['all', 'Distributed', 'Storage', 'Networking'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all border-2 ${
                activeFilter === filter 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-300' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSystems.map((sys) => (
            <div key={sys.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col h-full hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl">
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {sys.icon}
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${
                    sys.status === 'Live' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {sys.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{sys.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">{sys.description}</p>
                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                    <Terminal className="w-4 h-4 opacity-50" /> <span className="font-mono">{sys.stack.join(' • ')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                    <BarChart3 className="w-4 h-4 opacity-50" /> <span className="uppercase">{sys.metrics}</span>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8 flex gap-3">
                <a href={sys.adrLink} className="flex-[3] bg-slate-900 text-white text-center py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                  Read Design <ExternalLink className="w-3 h-3 inline ml-1 opacity-50" />
                </a>
                <button 
                  onClick={() => handleShare(sys.id)} 
                  className={`flex-1 rounded-2xl border-2 flex items-center justify-center transition-all ${
                    copiedId === sys.id ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100'
                  }`}
                >
                  {copiedId === sys.id ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 text-center">
        <div className="flex justify-center gap-6 mb-8 text-slate-400">
          <Layers className="w-6 h-6" />
          <Github className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-500 font-black uppercase tracking-widest tracking-tighter">&copy; {new Date().getFullYear()} VK-Systems</p>
      </footer>
    </div>
  );
};

export default App;