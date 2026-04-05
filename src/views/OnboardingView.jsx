import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  Sword, 
  Crown, 
  Flame, 
  Zap, 
  Shield, 
  Target, 
  User, 
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const ICONS = [
  { id: 'Sword', icon: Sword, label: 'Guerrier' },
  { id: 'Crown', icon: Crown, label: 'Monarque' },
  { id: 'Flame', icon: Flame, label: 'Brasier' },
  { id: 'Zap', icon: Zap, label: 'Éclair' },
  { id: 'Shield', icon: Shield, label: 'Gardien' },
  { id: 'Target', icon: Target, label: 'Précision' },
  { id: 'User', icon: User, label: 'Chasseur' },
  { id: 'Sparkles', icon: Sparkles, label: 'Éveillé' },
  { id: 'Skull', icon: LucideIcons.Skull, label: 'Nécromancien' },
  { id: 'Ghost', icon: LucideIcons.Ghost, label: 'Spectre' },
  { id: 'Moon', icon: LucideIcons.Moon, label: 'Ombre' },
  { id: 'Dripping', icon: LucideIcons.Droplets, label: 'Sang-Pur' },
  { id: 'Gem', icon: LucideIcons.Gem, label: 'Diamant' },
  { id: 'Wind', icon: LucideIcons.Wind, label: 'Rafale' },
  { id: 'Compass', icon: LucideIcons.Compass, label: 'Pionnier' },
  { id: 'Activity', icon: LucideIcons.Activity, label: 'Vitalité' },
];

const CATEGORIES = [
  { id: 'Physique', label: 'Physique', icon: '💪', desc: 'Force et endurance' },
  { id: 'Intellect', label: 'Intellect', icon: '🧠', desc: 'Savoir et logique' },
  { id: 'Discipline', label: 'Discipline', icon: '📜', desc: 'Régularité et focus' },
  { id: 'Social', label: 'Social', icon: '✨', desc: 'Réseau et charisme' },
  { id: 'Richesse', label: 'Richesse', icon: '💰', desc: 'Finances et carrière' },
  { id: 'Santé', label: 'Santé', icon: '🍎', desc: 'Vitalité et nutrition' },
  { id: 'Style', label: 'Style', icon: '👔', desc: 'Mode et élégance' },
  { id: 'Mental', label: 'Mental', icon: '🧘', desc: 'Paix et volonté' },
];

const OnboardingView = () => {
  const { completeOnboarding } = useGame();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    pseudo: '',
    sexe: 'homme',
    icon: 'Sword'
  });
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedAddictions, setSelectedAddictions] = useState([]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(0, prev - 1));

  const toggleCategory = (id) => {
    setSelectedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAddiction = (id) => {
    setSelectedAddictions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    const addictionsBase = [
      { id: 'tabac', name: 'Tabac', icon: '🚬' },
      { id: 'sucre', name: 'Malbouffe', icon: '🍔' },
      { id: 'porn', name: 'Pornographie', icon: '🚫' },
      { id: 'social', name: 'Réseaux Sociaux', icon: '📱' },
      { id: 'gaming', name: 'Jeux Vidéo', icon: '🎮' },
    ];
    
    const finalAddictions = addictionsBase
      .filter(a => selectedAddictions.includes(a.id))
      .map(a => ({ ...a, lastRelapse: new Date().toISOString(), bestStreak: 0 }));

    completeOnboarding({ ...formData, addictions: finalAddictions }, selectedCats);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,194,255,0.05),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full max-w-lg z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 shadow-neon-blue"
                >
                  <Sparkles className="text-primary" size={48} />
                </motion.div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-neon-blue">
                   Activation du Système
                </h1>
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px] leading-loose">
                  Bienvenue, Chasseur. <br/> Ton processus d'éveil commence maintenant.
                </p>
              </div>
              <button 
                onClick={nextStep}
                className="w-full py-4 bg-hunter-gradient rounded-xl font-black uppercase tracking-[0.3em] shadow-neon-blue hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Commencer <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <h2 className="text-2xl font-black uppercase italic tracking-widest text-primary">01. Identification</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Nom de famille</label>
                  <input 
                    type="text" 
                    placeholder="SUNG"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-primary/50 outline-none transition-all uppercase font-medium"
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Prénom</label>
                  <input 
                    type="text" 
                    placeholder="Jin-Woo"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-primary/50 outline-none transition-all font-medium"
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Pseudo de Chasseur (1 mot)</label>
                  <input 
                    type="text" 
                    placeholder="ShadowKing"
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-primary/50 outline-none transition-all font-black text-primary"
                    value={formData.pseudo}
                    onChange={(e) => setFormData({...formData, pseudo: e.target.value.trim()})}
                  />
                </div>
              </div>
              <button 
                disabled={!formData.nom || !formData.prenom || !formData.pseudo}
                onClick={nextStep}
                className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.3em] rounded-xl disabled:opacity-30 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Suivant <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <h2 className="text-2xl font-black uppercase italic tracking-widest text-primary text-center">02. Nature de l'Éveil</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setFormData({...formData, sexe: 'homme'})}
                  className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${formData.sexe === 'homme' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 opacity-40'}`}
                >
                  <div className="text-6xl">👤</div>
                  <span className="font-black uppercase tracking-[0.2em] text-xs">Homme</span>
                </button>
                <button 
                  onClick={() => setFormData({...formData, sexe: 'femme'})}
                  className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${formData.sexe === 'femme' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 opacity-40'}`}
                >
                  <div className="text-6xl">👩🏼‍🎤</div>
                  <span className="font-black uppercase tracking-[0.2em] text-xs">Femme</span>
                </button>
              </div>
              <button 
                onClick={nextStep}
                className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.3em] rounded-xl flex items-center justify-center gap-2"
              >
                Suivant <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <h2 className="text-2xl font-black uppercase italic tracking-widest text-primary">03. Emblème</h2>
              <div className="grid grid-cols-4 gap-4">
                {ICONS.map(({ id, icon: Icon, label }) => (
                  <button 
                    key={id}
                    onClick={() => setFormData({...formData, icon: id})}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${formData.icon === id ? 'border-primary bg-primary/20 scale-110 shadow-neon-blue' : 'border-white/10 bg-white/5'}`}
                  >
                    <Icon size={24} className={formData.icon === id ? 'text-primary' : 'text-white/40'} />
                  </button>
                ))}
              </div>
              <button 
                onClick={nextStep}
                className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.3em] rounded-xl flex items-center justify-center gap-2"
              >
                Suivant <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase italic tracking-widest text-primary">04. Piliers de Transformation</h2>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Choisir les domaines prioritaires</p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {CATEGORIES.map(({ id, label, icon, desc }) => (
                  <button 
                    key={id}
                    onClick={() => toggleCategory(id)}
                    className={`p-4 rounded-xl border text-left transition-all relative ${selectedCats.includes(id) ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 opacity-50'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xl">{icon}</span>
                      {selectedCats.includes(id) && <CheckCircle2 size={16} className="text-primary" />}
                    </div>
                    <div className="font-black text-xs uppercase tracking-tighter mb-0.5">{label}</div>
                    <div className="text-[9px] text-white/40 leading-tight uppercase font-medium">{desc}</div>
                  </button>
                ))}
              </div>
              <button 
                disabled={selectedCats.length === 0}
                onClick={nextStep}
                className="w-full py-4 bg-hunter-gradient text-white font-black uppercase tracking-[0.3em] rounded-xl shadow-neon-blue transition-all disabled:opacity-30 flex items-center justify-center gap-2"
              >
                Suivant <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase italic tracking-widest text-primary">05. Démons à Vaincre</h2>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Sélectionner tes addictions actuelles</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'tabac', name: 'Tabac', icon: '🚬' },
                  { id: 'sucre', name: 'Malbouffe', icon: '🍔' },
                  { id: 'porn', name: 'Pornographie', icon: '🚫' },
                  { id: 'social', name: 'Réseaux Sociaux', icon: '📱' },
                  { id: 'gaming', name: 'Jeux Vidéo', icon: '🎮' },
                ].map(({ id, name, icon }) => (
                  <button 
                    key={id}
                    onClick={() => toggleAddiction(id)}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${selectedAddictions.includes(id) ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 opacity-50'}`}
                  >
                   <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <span className="font-black uppercase tracking-widest text-xs">{name}</span>
                   </div>
                   {selectedAddictions.includes(id) && <Skull size={16} className="text-red-500" />}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleFinish}
                className="w-full py-4 bg-hunter-gradient text-white font-black uppercase tracking-[0.3em] rounded-xl shadow-neon-blue transition-all"
              >
                Finaliser l'Éveil
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps dots */}
        {step > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all ${step === i ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingView;
