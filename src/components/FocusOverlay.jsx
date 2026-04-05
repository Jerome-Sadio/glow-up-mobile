import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';

const FocusOverlay = () => {
  const { tasks, completeTask } = useGame();
  
  // Find the first non-completed task to focus on
  const pendingTask = tasks.find(t => !t.completed);

  if (!pendingTask) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      
      {/* Glitch Animated Background FX */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#FF0055,transparent)] animate-pulse" />
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-xl glass border-accent/40 overflow-hidden shadow-neon-accent p-8 text-center space-y-10"
      >
        {/* Animated Scan Line */}
        <div className="absolute left-0 top-0 w-full h-[2px] bg-accent/30 animate-scan" />

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
             <AlertTriangle className="text-accent animate-bounce" size={24} />
             <span className="text-[12px] font-black uppercase tracking-[0.4em] text-accent">Instruction Prioritaire</span>
             <AlertTriangle className="text-accent animate-bounce" size={24} />
          </div>
          <h2 className="text-xl font-black uppercase text-white/40 tracking-widest leading-none">
            Quête Actuelle
          </h2>
        </div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="py-12 px-4 bg-white/5 rounded-3xl border border-white/5 relative group"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent/20 border border-accent/40 rounded-full text-[10px] font-black text-accent uppercase tracking-widest">
            Impératif
          </div>
          <h1 className="text-5xl sm:text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-neon-accent leading-[0.9]">
            {pendingTask.text}
          </h1>
        </motion.div>

        <div className="space-y-6">
          <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-medium leading-relaxed italic">
            "Le système ne tolère pas l'hésitation. <br/> Complète cette tâche pour réactiver le HUD complet."
          </p>
          
          <button 
            onClick={() => completeTask(pendingTask.id)}
            className="w-full py-6 bg-accent text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-neon-accent hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            VALIDER LA QUÊTE <CheckCircle2 size={24} className="group-hover:rotate-12 transition-transform" />
          </button>
          
          <button 
            disabled
            className="w-full py-4 text-white/20 text-[10px] font-black uppercase tracking-widest cursor-not-allowed"
          >
            Impossible de quitter avant validation
          </button>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-accent/40" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-accent/40" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-accent/40" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-accent/40" />
      </motion.div>
    </div>
  );
};

export default FocusOverlay;
