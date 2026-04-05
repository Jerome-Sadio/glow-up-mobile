import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BOSSES } from '../data/bosses';
import { QUOTES } from '../data/quotes';
import { scheduleReminders } from '../utils/notifications';

const GameContext = createContext();

const INITIAL_STATS = {
  force: 10,
  intelligence: 10,
  discipline: 10,
  charisma: 10,
  wealth: 10,
  health: 10,
  style: 10,
  mental: 10,
};

const DEFAULT_TASKS = [
  { id: 1, text: "Boire 2L d'eau", category: "health", completed: false, xp: 20, stat: "health" },
  { id: 2, text: "Séance de Sport", category: "force", completed: false, xp: 50, stat: "force" },
  { id: 3, text: "Lire 10 pages", category: "intelligence", completed: false, xp: 30, stat: "intelligence" },
  { id: 4, text: "Méditation 10min", category: "mental", completed: false, xp: 20, stat: "mental" },
];

const INITIAL_USER = {
  nom: '',
  prenom: '',
  pseudo: '',
  sexe: 'homme', // 'homme' | 'femme'
  icon: 'Sword',
  onboardingComplete: false,
  categories: [],
  addictions: [
    { id: 'tabac', name: 'Tabac', icon: '🚬', lastRelapse: new Date().toISOString(), bestStreak: 0 },
    { id: 'sucre', name: 'Malbouffe', icon: '🍔', lastRelapse: new Date().toISOString(), bestStreak: 0 },
    { id: 'porn', name: 'Pornographie', icon: '🚫', lastRelapse: new Date().toISOString(), bestStreak: 0 },
  ],
  lastDailyCheck: new Date().toISOString()
};

export function GameProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('glow_up_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('glow_up_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('glow_up_progress');
    return saved ? JSON.parse(saved) : { level: 1, xp: 0, xpToNextLevel: 100 };
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('glow_up_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [bossIndex, setBossIndex] = useState(() => {
    const saved = localStorage.getItem('glow_up_boss_index');
    return saved ? parseInt(saved) : 0;
  });

  const [bossHp, setBossHp] = useState(() => {
    const saved = localStorage.getItem('glow_up_boss_hp');
    const boss = BOSSES[0];
    return saved ? parseFloat(saved) : boss.hp;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('glow_up_streak');
    return saved ? parseInt(saved) : 0;
  });

  const [multiplier, setMultiplier] = useState(1);
  const [systemAlert, setSystemAlert] = useState(null);

  const currentBoss = useMemo(() => {
    const b = BOSSES[bossIndex % BOSSES.length];
    return { ...b, hp: bossHp };
  }, [bossIndex, bossHp]);

  // Handle Penalties on Launch & Daily Addiction Rewards
  useEffect(() => {
    if (!user.onboardingComplete) return;

    const lastCheck = new Date(user.lastDailyCheck);
    const now = new Date();
    const diffDays = Math.floor((now - lastCheck) / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      const pendingCount = tasks.filter(t => !t.completed).length;
      if (pendingCount > 0) {
        applyPenalty(pendingCount);
      } else {
        setStreak(prev => prev + 1);
        setSystemAlert({
          type: 'REWARD',
          msg: "EXCELLENT. Séquence de réussite maintenue. Multiplicateur UP."
        });
      }

      // Addiction clean days reward: Damage Depression Boss
      const cleanCount = user.addictions.filter(a => {
        const last = new Date(a.lastRelapse);
        return Math.floor((now - last) / (1000 * 60 * 60 * 24)) >= 1;
      }).length;

      if (cleanCount > 0) {
        damageDepressionBoss(cleanCount * 50);
      }

      setUser(prev => ({ ...prev, lastDailyCheck: now.toISOString() }));
      resetDailyTasks();
    }
  }, [user.onboardingComplete]);

  // Special logic for Depression Boss (shared across components)
  const depressionBoss = useMemo(() => BOSSES.find(b => b.id === 'depression'), []);
  
  const damageDepressionBoss = (damage) => {
    // We update the specific HP of the depression boss in local storage OR manage it as a separate state
    // For now, let's treat it as a special meta-boss
    let depressionHp = parseFloat(localStorage.getItem('glow_up_depression_hp') || 10000);
    depressionHp = Math.max(0, depressionHp - damage);
    localStorage.setItem('glow_up_depression_hp', depressionHp.toString());
  };

  const getDepressionHp = () => {
    return parseFloat(localStorage.getItem('glow_up_depression_hp') || 10000);
  };

  // Actions
  const relapse = (id) => {
    setUser(prev => ({
      ...prev,
      addictions: prev.addictions.map(a => 
        a.id === id ? { ...a, lastRelapse: new Date().toISOString() } : a
      )
    }));
    
    // Penalty
    setStats(prev => ({ ...prev, mental: Math.max(10, prev.mental - 5) }));
    setSystemAlert({
      type: 'PENALTY',
      msg: "RELAPS DÉTECTÉE. Volonté affaiblie. Pénalité Mentale appliquée."
    });
  };

  const addAddiction = (name, icon) => {
    const newIdx = user.addictions.length + 1;
    setUser(prev => ({
      ...prev,
      addictions: [...prev.addictions, { 
        id: `custom_${newIdx}`, 
        name, 
        icon: icon || '⚡', 
        lastRelapse: new Date().toISOString(), 
        bestStreak: 0 
      }]
    }));
  };

  // (rest remains same...)
  useEffect(() => {
    localStorage.setItem('glow_up_user', JSON.stringify(user));
    localStorage.setItem('glow_up_stats', JSON.stringify(stats));
    localStorage.setItem('glow_up_progress', JSON.stringify(progress));
    localStorage.setItem('glow_up_tasks', JSON.stringify(tasks));
    localStorage.setItem('glow_up_boss_index', bossIndex.toString());
    localStorage.setItem('glow_up_boss_hp', bossHp.toString());
    localStorage.setItem('glow_up_streak', streak.toString());

    const pending = tasks.filter(t => !t.completed);
    scheduleReminders(pending);
  }, [user, stats, progress, tasks, bossIndex, bossHp, streak]);

  // (actions...)
  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));

    if (task.stat) {
      setStats(prev => ({ ...prev, [task.stat]: Math.min(prev[task.stat] + 2, 100) }));
    }

    const totalXp = Math.floor(task.xp * multiplier);
    damageBoss(totalXp / 2);
    addExperience(totalXp);
  };

  const damageBoss = (damage) => {
    setBossHp(prev => {
      const newHp = Math.max(prev - damage, 0);
      return newHp;
    });
  };

  const nextBoss = () => {
    const nextIdx = bossIndex + 1;
    setBossIndex(nextIdx);
    setBossHp(BOSSES[nextIdx % BOSSES.length].hp);
  };

  const addExperience = (amount) => {
    setProgress(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;

      if (newXp >= newXpToNext) {
        newLevel += 1;
        newXp = newXp - newXpToNext;
        newXpToNext = Math.floor(newXpToNext * 1.5);
      }

      return { level: newLevel, xp: newXp, xpToNextLevel: newXpToNext };
    });
  };

  const applyPenalty = (pendingCount) => {
    const xpLoss = pendingCount * 15;
    const statLoss = 5;

    setProgress(prev => {
      let newXp = prev.xp - xpLoss;
      let newLevel = prev.level;
      if (newXp < 0) {
        newLevel = Math.max(1, newLevel - 1);
        newXp = 0;
      }
      return { ...prev, level: newLevel, xp: newXp };
    });

    setStats(prev => {
      const newStats = { ...prev };
      Object.keys(newStats).forEach(key => {
        newStats[key] = Math.max(10, newStats[key] - statLoss);
      });
      return newStats;
    });

    setStreak(0);
    setSystemAlert({
      type: 'PENALTY',
      msg: `PÉNALITÉ SYSTÈME : STAGNATION EXCESSIVE. XP PERDUE (-${xpLoss}) ET TOUTES LES STATISTIQUES RÉDUITES (-${statLoss}%).`
    });
  };

  const resetDailyTasks = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: false })));
  };

  const addTask = (text, category, stat, xp) => {
    const newTask = {
      id: Date.now(),
      text,
      category,
      stat,
      xp: xp || 25,
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const completeOnboarding = (userData, selectedCategories) => {
    setUser({ 
      ...userData, 
      categories: selectedCategories, 
      onboardingComplete: true,
      lastDailyCheck: new Date().toISOString()
    });
  };

  const getRandomQuote = () => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  };

  return (
    <GameContext.Provider value={{
      user,
      stats,
      progress,
      tasks,
      multiplier,
      systemAlert,
      setSystemAlert,
      boss: currentBoss,
      streak,
      completeTask,
      addTask,
      deleteTask,
      nextBoss,
      getRandomQuote,
      completeOnboarding,
      resetDailyTasks,
      relapse,
      addAddiction,
      getDepressionHp,
      bosses: BOSSES
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
