import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import avatarMale from '../assets/avatar_male.png';
import avatarFemale from '../assets/avatar_female.png';
import { 
  Sword, 
  Brain, 
  Scroll, 
  Sparkles, 
  Coins, 
  Heart, 
  Palette, 
  Zap 
} from 'lucide-react';

const STAT_CONFIG = [
  { key: 'force', label: 'Physique', color: '#FF0055', icon: Sword },
  { key: 'intelligence', label: 'Intellect', color: '#00C2FF', icon: Brain },
  { key: 'discipline', label: 'Discipline', color: '#9D00FF', icon: Scroll },
  { key: 'charisma', label: 'Social', color: '#FFD700', icon: Sparkles },
  { key: 'wealth', label: 'Richesse', color: '#4CAF50', icon: Coins },
  { key: 'health', label: 'Santé', color: '#FF4D4D', icon: Heart },
  { key: 'style', label: 'Style', color: '#FF9F43', icon: Palette },
  { key: 'mental', label: 'Mental', color: '#00D2D3', icon: Zap },
];

const StatWheel = () => {
  const { stats, user } = useGame();
  const avatarRadius = 90;
  const wheelRadius = 135;
  const strokeWidth = 12;

  const avatarImg = user.sexe === 'femme' ? avatarFemale : avatarMale;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Decorative HUD elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[360px] h-[360px] border border-primary/5 rounded-full animate-rotate-slow" 
             style={{ borderStyle: 'double', borderWidth: '4px' }} />
        <div className="absolute w-[290px] h-[290px] border border-primary/20 rounded-full animate-pulse-glow" />
      </div>

      <svg viewBox="0 0 400 400" className="w-[400px] h-[400px] overflow-visible z-10">
        <defs>
          <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <clipPath id="avatar-clip">
            <circle cx="200" cy="200" r={avatarRadius} />
          </clipPath>

          <linearGradient id="stat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>

        {/* Central Avatar Core - Breathing effect */}
        <AnimatePresence mode="wait">
          <motion.g 
            key={user.sexe}
            clipPath="url(#avatar-clip)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <image 
              href={avatarImg} 
              x={200 - avatarRadius} 
              y={200 - avatarRadius} 
              width={avatarRadius * 2} 
              height={avatarRadius * 2} 
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="200" cy="200" r={avatarRadius} fill="none" stroke="rgba(0,194,255,0.3)" strokeWidth="2" />
          </motion.g>
        </AnimatePresence>

        {/* Orbiting Statistics */}
        {STAT_CONFIG.map((stat, i) => {
          const value = stats[stat.key];
          const segmentAngle = 360 / STAT_CONFIG.length;
          const rotationAngle = i * segmentAngle - 90; // Start from the top
          const Icon = stat.icon;
          
          const angleRad = (rotationAngle + segmentAngle / 2) * (Math.PI / 180);
          const labelDist = wheelRadius + 38;
          const labelX = 200 + labelDist * Math.cos(angleRad);
          const labelY = 200 + labelDist * Math.sin(angleRad);

          return (
            <g key={stat.key}>
              <g style={{ transform: `rotate(${rotationAngle}deg)`, transformOrigin: '200px 200px' }}>
                <path
                  d={`M 200 ${200 - wheelRadius} A ${wheelRadius} ${wheelRadius} 0 0 1 ${200 + wheelRadius * Math.sin((segmentAngle - 4) * Math.PI / 180)} ${200 - wheelRadius * Math.cos((segmentAngle - 4) * Math.PI / 180)}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: value / 100 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  d={`M 200 ${200 - wheelRadius} A ${wheelRadius} ${wheelRadius} 0 0 1 ${200 + wheelRadius * Math.sin((segmentAngle - 4) * Math.PI / 180)} ${200 - wheelRadius * Math.cos((segmentAngle - 4) * Math.PI / 180)}`}
                  fill="none"
                  stroke={stat.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  style={{ filter: 'url(#hud-glow)' }}
                />
              </g>

              {/* High-Visibility Tech Labels - Horizontal text */}
              <foreignObject x={labelX - 45} y={labelY - 15} width="90" height="30">
                <div className="flex flex-col items-center justify-center h-full" style={{ color: stat.color }}>
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 shadow-lg">
                    <Icon size={12} className="opacity-80" />
                    <span className="text-[10px] font-black font-mono tracking-tighter whitespace-nowrap">
                      {stat.label} <span className="text-white ml-0.5">{value}%</span>
                    </span>
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default StatWheel;
