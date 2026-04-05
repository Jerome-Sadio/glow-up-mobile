import { Home, ListTodo, Sword, BarChart3, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import * as LucideIcons from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab }) => {
  const { progress, user } = useGame();

  const navItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'quests', icon: ListTodo, label: 'Quêtes' },
    { id: 'combat', icon: Sword, label: 'Combat' },
    { id: 'boss', icon: Swords, label: 'Boss' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
  ];

  const xpPercent = (progress.xp / progress.xpToNextLevel) * 100;
  const IconComponent = LucideIcons[user.icon] || User;

  return (
    <div className="min-h-screen pb-24 text-white">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-primary/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Rang : EÉ</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black neon-text-blue leading-none">{progress.level}</span>
              <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{user.pseudo || "HUNTER"}</span>
            </div>
          </div>
          
          <div className="flex-1 mx-8 hidden sm:block">
            <div className="flex justify-between items-end mb-1 px-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">SYSTÈME XP</span>
              <span className="text-[10px] font-mono text-primary/80">{Math.floor(progress.xp)} / {progress.xpToNextLevel}</span>
            </div>
            <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <motion.div 
                className="h-full bg-hunter-gradient rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <button 
            onClick={() => alert(`Profil de ${user.nom} ${user.prenom} - Bientôt disponible`)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center border-primary/30 hover:bg-primary/20 transition-all active:scale-95 shadow-neon-blue/20"
          >
            <IconComponent size={20} className="text-primary hover:text-white transition-colors" />
          </button>
        </div>
        
        {/* Mobile XP Bar (Visible only on mobile since SM:BLOCK hides the main one) */}
        <div className="w-full mt-2 sm:hidden">
          <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary shadow-neon-blue"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-28 px-4">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full glass-dark p-2 border border-white/10 flex items-center gap-1 shadow-2xl backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={24} className={isActive ? 'drop-shadow-[0_0_8px_rgba(0,194,255,0.8)]' : ''} />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
