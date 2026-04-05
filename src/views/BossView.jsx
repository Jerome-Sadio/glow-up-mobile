import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Sword, Zap, ShieldAlert, Trophy } from 'lucide-react';

const BossView = () => {
  const { boss, nextBoss } = useGame();
  const hpPercent = (boss.hp / boss.maxHp) * 100;

  return (
    <div className="flex flex-col items-center pt-4 space-y-10 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-[11px] font-black uppercase tracking-[0.3em] mb-2 shadow-neon-accent animate-pulse">
          <ShieldAlert size={14} /> Boss Élite Détecté
        </div>
        <h2 className="text-5xl font-black uppercase text-white tracking-widest drop-shadow-neon-accent leading-[0.8] italic">
          {boss.name}
        </h2>
        <div className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent mt-4" />
      </motion.div>

      {/* Boss Avatar Area */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Background Energy Vortex */}
        <div className="absolute inset-0 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0 border-2 border-accent/10 rounded-full animate-rotate-slow scale-110" style={{ borderStyle: 'dashed' }} />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={boss.id}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: boss.hp > 0 ? [-3, 3, -3] : 0,
              opacity: 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, repeat: boss.hp > 0 ? Infinity : 0, repeatDelay: 1 }}
            className="text-[140px] filter drop-shadow-[0_0_40px_rgba(255,0,85,0.6)] relative z-10"
          >
            {boss.hp > 0 ? boss.image : '💀'}
          </motion.div>
        </AnimatePresence>
        
        {/* Boss HP Bar */}
        <div className="absolute -bottom-14 w-full space-y-2 z-20">
          <div className="flex justify-between items-center px-1">
            <span className="text-[12px] font-black text-accent tracking-widest uppercase italic">Vitalité du Boss</span>
            <span className="text-[12px] font-mono font-black text-white">{Math.ceil(boss.hp)} / {boss.maxHp} HP</span>
          </div>
          <div className="h-6 w-full bg-black/60 rounded-full border border-white/10 overflow-hidden p-1.5 shadow-2xl">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent via-red-500 to-red-900 rounded-full relative overflow-hidden"
              initial={{ width: '100%' }}
              animate={{ width: `${hpPercent}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-8 w-full max-w-md text-center mt-16 space-y-6 border-accent/30 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        <div className="flex justify-center gap-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 border border-primary/20">
              <Zap className="text-primary" size={24} />
            </div>
            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Récompense</span>
            <span className="text-sm font-black text-primary">+{boss.rewardXp} XP</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2 border border-accent/20">
              <Sword className="text-accent" size={24} />
            </div>
            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Dégâts</span>
            <span className="text-sm font-black text-accent">Quêtes Finies</span>
          </div>
        </div>

        <div className="relative py-4 px-6 bg-black/20 rounded-xl border border-white/5">
           <span className="absolute top-2 left-2 text-2xl text-accent/20 font-serif">"</span>
           <p className="text-[12px] text-white/70 italic leading-relaxed font-medium">
             {boss.quote}
           </p>
           <span className="absolute bottom-1 right-2 text-2xl text-accent/20 font-serif">"</span>
        </div>
      </motion.div>

      {/* Victory Modal */}
      <AnimatePresence>
        {boss.hp <= 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 text-center backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md space-y-8"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
                />
                <Trophy size={100} className="text-primary relative z-10 drop-shadow-neon-blue mx-auto" />
              </div>

              <div className="space-y-2">
                <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
                  Victoire !
                </h1>
                <p className="text-xl text-primary font-black uppercase tracking-widest">
                  Cible Neutralisée
                </p>
              </div>

              <div className="glass p-6 text-white/60 text-sm italic border-primary/20">
                "{boss.name} n'est plus un obstacle. Ta force continue de croître."
              </div>

              <button 
                onClick={nextBoss}
                className="w-full py-5 bg-hunter-gradient text-white font-black uppercase tracking-[0.3em] rounded-2xl shadow-neon-blue hover:scale-[1.02] active:scale-95 transition-all"
              >
                Cible Suivante
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BossView;
