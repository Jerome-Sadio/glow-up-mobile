import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ShieldAlert, Zap, Skull, TrendingUp, X } from 'lucide-react';

const SystemAlertOverlay = () => {
  const { systemAlert, setSystemAlert } = useGame();

  if (!systemAlert) return null;

  const isPenalty = systemAlert.type === 'PENALTY';

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSystemAlert(null)} />
      
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className={`relative w-full max-w-md p-8 rounded-3xl border-2 shadow-2xl ${
          isPenalty 
            ? 'bg-red-950/20 border-red-500/50 shadow-red-500/20' 
            : 'bg-emerald-950/20 border-emerald-500/50 shadow-emerald-500/20'
        }`}
      >
        <button 
          onClick={() => setSystemAlert(null)}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
            isPenalty ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'
          }`}>
            {isPenalty ? <Skull size={40} /> : <TrendingUp size={40} />}
          </div>

          <div className="space-y-2">
            <h2 className={`text-2xl font-black uppercase italic tracking-tighter ${
              isPenalty ? 'text-red-500' : 'text-emerald-500'
            }`}>
              {isPenalty ? 'Sanction du Système' : 'Bonus de Réussite'}
            </h2>
            <p className="text-[12px] font-mono text-white/60 leading-relaxed uppercase tracking-wider">
              {systemAlert.msg}
            </p>
          </div>

          <div className="w-full pt-4">
            <button 
              onClick={() => setSystemAlert(null)}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                isPenalty 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              Compris
            </button>
          </div>
        </div>

        {/* HUD Decoration */}
        <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 opacity-20 border-white" />
        <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 opacity-20 border-white" />
      </motion.div>
    </div>
  );
};

export default SystemAlertOverlay;
