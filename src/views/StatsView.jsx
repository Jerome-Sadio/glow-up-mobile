import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { BarChart, TrendingUp, Target, Zap } from 'lucide-react';

const StatsView = () => {
  const { stats, streak, progress } = useGame();

  const STAT_DETAILS = [
    { key: 'force', label: 'Physique', icon: '💪', color: 'from-red-500 to-red-700' },
    { key: 'intelligence', label: 'Intellect', icon: '🧠', color: 'from-blue-500 to-blue-700' },
    { key: 'discipline', label: 'Discipline', icon: '📜', color: 'from-purple-500 to-purple-700' },
    { key: 'charisma', label: 'Social', icon: '✨', color: 'from-yellow-400 to-yellow-600' },
    { key: 'wealth', label: 'Richesse', icon: '💰', color: 'from-green-500 to-green-700' },
    { key: 'health', label: 'Santé', icon: '🍎', color: 'from-emerald-400 to-emerald-600' },
    { key: 'style', label: 'Style', icon: '👔', color: 'from-orange-400 to-orange-600' },
    { key: 'mental', label: 'Mental', icon: '🧘', color: 'from-indigo-400 to-indigo-600' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center">
        <h2 className="text-2xl font-black italic uppercase tracking-widest text-secondary">Profil du Chasseur</h2>
        <div className="flex justify-center gap-4 mt-4">
          <div className="glass p-3 flex flex-col items-center min-w-[100px]">
             <Zap className="text-yellow-500 mb-1" size={20} />
             <span className="text-[10px] text-white/40 uppercase">Série</span>
             <span className="text-sm font-bold">{streak} Jours</span>
          </div>
          <div className="glass p-3 flex flex-col items-center min-w-[100px]">
             <Target className="text-primary mb-1" size={20} />
             <span className="text-[10px] text-white/40 uppercase">Niveau</span>
             <span className="text-sm font-bold">Rang {progress.level < 10 ? 'E' : progress.level < 20 ? 'D' : 'S'}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {STAT_DETAILS.map((stat, i) => (
          <motion.div 
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-4 border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-sm font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <span className="text-sm font-mono font-bold text-white/60">{stats[stat.key]}%</span>
            </div>
            
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${stat.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${stats[stat.key]}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-6 border-primary/20 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
          <TrendingUp size={16} /> Progression Globale
        </h3>
        <p className="text-xs text-white/50 leading-relaxed italic">
          Vos statistiques augmentent à chaque quête accomplie. Atteignez 100% dans chaque catégorie pour débloquer l'Eveil Suprême.
        </p>
      </div>
    </div>
  );
};

export default StatsView;
