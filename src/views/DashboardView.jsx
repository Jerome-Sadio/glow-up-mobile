import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import StatWheel from '../components/StatWheel';
import avatarMale from '../assets/avatar_male.png';
import avatarFemale from '../assets/avatar_female.png';
import * as LucideIcons from 'lucide-react';

const DashboardView = () => {
  const { streak, getRandomQuote, user } = useGame();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const IconComponent = LucideIcons[user.icon] || LucideIcons.Sword;
  const avatarImg = user.sexe === 'femme' ? avatarFemale : avatarMale;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center justify-center pt-2"
    >
      {/* Background Energy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Streak Badge */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute top-0 right-0 glass px-4 py-2 flex items-center gap-2 border-orange-500/30 shadow-neon-orange z-30"
      >
        <span className="text-orange-500 animate-bounce">🔥</span>
        <span className="text-sm font-black tracking-tighter uppercase">{streak} Jours</span>
      </motion.div>

      {/* Main Title Section */}
      <div className="mb-2 text-center relative z-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <IconComponent size={14} className="text-primary animate-pulse" />
            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-primary/80">
              Système Éveillé
            </h2>
            <IconComponent size={14} className="text-primary animate-pulse" />
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-neon-blue leading-[0.8] mb-2">
            {user.pseudo || "Chasseur"}
          </h1>
          <div className="mt-4 flex items-center justify-center">
            <div className="px-4 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Statut : Actif</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* The Central Stage: Unified HUD */}
      <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full h-full"
        >
          <StatWheel avatarSrc={avatarImg} />
        </motion.div>
      </div>

      {/* Dynamic Quote Section */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-2 text-center p-8 glass w-full max-w-lg relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative"
          >
            <span className="absolute -top-4 -left-2 text-4xl text-primary/20 font-serif">"</span>
            <p className="text-[13px] font-medium text-white/70 leading-relaxed italic tracking-wide px-4">
              {quote}
            </p>
            <span className="absolute -bottom-6 -right-2 text-4xl text-primary/20 font-serif">"</span>
          </motion.div>
        </AnimatePresence>

        {/* Decorative HUD Elements */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary/30" />
        
        {/* Animated Scanning Line */}
        <div className="absolute left-0 w-full h-[1px] bg-primary/10 top-0 animate-scan pointer-events-none" />
      </motion.div>

    </motion.div>
  );
};

export default DashboardView;
