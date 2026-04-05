import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Plus, CheckCircle2, Circle, Trash2, Award, X } from 'lucide-react';

const QuestView = () => {
  const { tasks, completeTask, addTask, deleteTask } = useGame();
  const [showAdd, setShowAdd] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('discipline');

  const categories = [
    { id: 'force', label: 'Force', icon: '💪', stat: 'force', color: '#FF0055' },
    { id: 'intelligence', label: 'Intel', icon: '🧠', stat: 'intelligence', color: '#00C2FF' },
    { id: 'discipline', label: 'Disc', icon: '📜', stat: 'discipline', color: '#9D00FF' },
    { id: 'charisma', label: 'Char', icon: '✨', stat: 'charisma', color: '#FFD700' },
    { id: 'wealth', label: 'Richesse', icon: '💰', stat: 'wealth', color: '#4CAF50' },
    { id: 'health', label: 'Santé', icon: '🍎', stat: 'health', color: '#FF4D4D' },
    { id: 'style', label: 'Style', icon: '👔', stat: 'style', color: '#FF9F43' },
    { id: 'mental', label: 'Mental', icon: '🧘', stat: 'mental', color: '#00D2D3' },
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const cat = categories.find(c => c.id === newTaskCategory);
    addTask(newTaskText, newTaskCategory, cat.stat, 30);
    setNewTaskText('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black italic uppercase tracking-wider text-primary">Quêtes Journalières</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
            showAdd ? 'bg-accent text-white rotate-45' : 'bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30'
          }`}
        >
          {showAdd ? <X size={28} /> : <Plus size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.form 
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            onSubmit={handleAddTask}
            className="glass overflow-hidden border-primary/30 mb-8 p-1"
          >
            <div className="p-4 space-y-4">
              <input 
                autoFocus
                type="text" 
                placeholder="Ex: 50 Pompes, Lire 30min..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 shadow-inner"
              />
              
              <div className="grid grid-cols-4 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setNewTaskCategory(cat.id)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all active:scale-95 ${
                      newTaskCategory === cat.id 
                      ? 'bg-primary/20 border-primary text-primary shadow-neon-blue' 
                      : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xl mb-1">{cat.icon}</div>
                    {cat.label}
                  </button>
                ))}
              </div>

              <button 
                type="submit" 
                disabled={!newTaskText.trim()}
                className="w-full py-4 bg-hunter-gradient rounded-xl font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale"
              >
                Accepter la Quête
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3 pb-8">
        {tasks.length === 0 && (
          <div className="text-center py-16 glass border-dashed border-white/5">
            <p className="text-white/20 italic font-medium">Le système attend vos ordres.<br/>Créez une nouvelle quête.</p>
          </div>
        )}
        
        {tasks.map((task) => {
          const cat = categories.find(c => c.id === task.category) || categories[0];
          
          return (
            <motion.div 
              layout
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`group relative flex items-center justify-between p-4 glass transition-all border-[#ffffff08] hover:border-primary/20 ${
                task.completed ? 'opacity-40 grayscale' : 'shadow-sm active:translate-y-[1px]'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <button 
                  onClick={() => completeTask(task.id)}
                  disabled={task.completed}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    task.completed 
                    ? 'bg-primary text-black' 
                    : 'border-2 border-white/10 text-white/30 hover:border-primary/50 hover:text-primary backdrop-blur-sm'
                  }`}
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-black text-[15px] tracking-tight transition-all ${task.completed ? 'line-through text-white/40' : 'text-white/90'}`}>
                    {task.text}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[9px] uppercase font-black text-primary flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded">
                      <Award size={10} /> +{task.xp} XP
                    </span>
                    <span className="text-[9px] uppercase font-black text-white/40 tracking-widest px-1.5 py-0.5 border border-white/10 rounded">
                      {cat.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {!task.completed && (
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-3 text-white/10 hover:text-accent hover:bg-accent/10 rounded-full transition-all active:scale-90"
                    title="Supprimer la quête"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestView;
