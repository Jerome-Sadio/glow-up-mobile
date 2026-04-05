import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  Skull, 
  Flame, 
  AlertTriangle, 
  Plus, 
  ChevronRight, 
  Calendar,
  Activity,
  History
} from 'lucide-react';

const InnerCombatView = () => {
  const { user, relapse, addAddiction, getDepressionHp, bosses } = useGame();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddiction, setNewAddiction] = useState({ name: '', icon: '🔥' });

  const depressionBoss = bosses.find(b => b.id === 'depression');
  const depressionHp = getDepressionHp();
  const depressionPercent = (depressionHp / (depressionBoss?.maxHp || 10000)) * 100;

  const calculateStreak = (lastRelapse) => {
    const last = new Date(lastRelapse);
    const now = new Date();
    const diffTime = Math.abs(now - last);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAdd = () => {
    if (newAddiction.name.trim()) {
      addAddiction(newAddiction.name, newAddiction.icon);
      setNewAddiction({ name: '', icon: '🔥' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Super Boss Section: Depression */}
      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
        
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-black mb-1">Cible Légendaire</p>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white uppercase italic tracking-tighter text-white drop-shadow-neon-blue">
                {depressionBoss?.name}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Niveau. ???</span>
            </div>
          </div>

          {/* Super Boss HP Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-end px-1">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest tracking-[0.2em]">Intégrité du Vide</span>
              <span className="text-sm font-mono text-indigo-400">{Math.floor(depressionHp)} / {depressionBoss?.maxHp}</span>
            </div>
            <div className="h-4 w-full bg-black/50 rounded-full border border-white/5 p-[2px] overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${depressionPercent}%` }}
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full relative shadow-[0_0_15px_rgba(79,70,229,0.5)]"
              >
                <div className="absolute inset-0 bg-white/20 animate-scan" />
              </motion.div>
            </div>
          </div>

          <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
            <p className="text-[11px] text-white/60 italic leading-relaxed text-center quote">
              "Chaque jour de pureté et de discipline inflige des dégâts à ton propre vide intérieur."
            </p>
          </div>
        </div>
      </section>

      {/* Addictions Management */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl font-black uppercase italic tracking-widest text-primary">Démons Intérieurs</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/20 transition-all active:scale-90"
          >
            <Plus size={20} />
          </button>
        </div>

        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 border-primary/20 space-y-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <input 
                type="text" 
                placeholder="Nom de l'Addiction..."
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-primary/50 outline-none"
                value={newAddiction.name}
                onChange={(e) => setNewAddiction({...newAddiction, name: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Icône (Emoji)..."
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-primary/50 outline-none"
                value={newAddiction.icon}
                onChange={(e) => setNewAddiction({...newAddiction, icon: e.target.value})}
              />
              <button 
                onClick={handleAdd}
                className="w-full py-4 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all"
              >
                Invoquer le Démon
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {user.addictions.map((addiction) => {
            const streak = calculateStreak(addiction.lastRelapse);
            return (
              <motion.div 
                key={addiction.id}
                layout
                className="glass group p-5 border-white/5 hover:border-primary/30 transition-all relative overflow-hidden"
              >
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/10 group-hover:border-primary/20 transition-all shadow-inner">
                      {addiction.icon}
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-widest text-white mb-0.5">{addiction.name}</h3>
                      <div className="flex items-center gap-2">
                        <Activity size={12} className="text-primary/60" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                          Séquence de Pureté
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-primary leading-none mb-1">{streak}</div>
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">JOURS</div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2 relative z-10">
                  <button 
                    onClick={() => relapse(addiction.id)}
                    className="flex-1 py-3 bg-red-600/10 border border-red-600/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <AlertTriangle size={14} /> RELAPS
                  </button>
                  <button className="w-12 py-3 bg-white/5 border border-white/10 text-white/40 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                    <History size={16} />
                  </button>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-all" />
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default InnerCombatView;
