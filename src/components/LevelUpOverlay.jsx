import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const LevelUpOverlay = () => {
  const { progress } = useGame();
  const [show, setShow] = useState(false);
  const [prevLevel, setPrevLevel] = useState(progress.level);

  useEffect(() => {
    if (progress.level > prevLevel) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      setPrevLevel(progress.level);
      return () => clearTimeout(timer);
    }
  }, [progress.level, prevLevel]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-primary/20 backdrop-blur-xl pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-center"
          >
            <motion.h2 
              animate={{ letterSpacing: ['0.1em', '0.5em', '0.1em'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs uppercase font-black text-primary tracking-[0.5em] mb-4"
            >
              Évolution du Système
            </motion.h2>
            <h1 className="text-8xl font-black italic uppercase hunter-text animate-pulse">
              LEVEL UP
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="text-4xl text-white/40">{prevLevel - 1}</span>
              <span className="text-6xl text-primary">→</span>
              <span className="text-7xl font-black text-white">{progress.level}</span>
            </div>
            
            <motion.div 
               animate={{ width: ['0%', '100%', '0%'] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="h-1 bg-primary mx-auto mt-8 shadow-neon-blue"
            />
          </motion.div>

          {/* Sound effect could be triggered here if available */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpOverlay;
