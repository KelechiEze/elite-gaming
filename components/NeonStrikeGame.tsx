
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Point { x: number; y: number; }
interface Particle extends Point {
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  type?: 'GLITCH' | 'SPARK';
}

interface PowerUp extends Point {
  type: 'TRIPLE' | 'RAPID' | 'SHIELD';
  life: number;
}

interface Enemy extends Point {
  id: number;
  type: 'PHANTOM' | 'REAPER' | 'BOSS';
  speed: number;
  radius: number;
  angle: number;
  health: number;
  maxHealth: number;
  pulse: number;
}

interface Bullet extends Point {
  vx: number;
  vy: number;
  type: 'NORMAL' | 'POWER';
}

interface NeonStrikeGameProps {
  onGameOver: (score: number) => void;
  onStageComplete: (stage: number) => void;
  isPaused: boolean;
  currentStage: number;
}

const NeonStrikeGame: React.FC<NeonStrikeGameProps> = ({ onGameOver, onStageComplete, isPaused, currentStage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [activePower, setActivePower] = useState<string | null>(null);
  
  const gameState = useRef({
    playerAngle: 0,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    powerUps: [] as PowerUp[],
    lastEnemySpawn: 0,
    spawnRate: 2000,
    score: 0,
    lives: 3,
    gameOver: false,
    mousePos: { x: 0, y: 0 },
    shake: 0,
    chromatic: 0,
    powerTimer: 0,
    powerType: 'NORMAL' as 'NORMAL' | 'TRIPLE' | 'RAPID',
    frame: 0,
    stage: currentStage,
    stageThreshold: currentStage * 1000
  });

  // Sync stage from props
  useEffect(() => {
    gameState.current.stage = currentStage;
    gameState.current.stageThreshold = currentStage * 1000;
  }, [currentStage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const spawnEnemy = (time: number) => {
      const state = gameState.current;
      // Difficulty scales with stage
      const stageMultiplier = 1 + (state.stage - 1) * 0.5;
      const currentSpawnRate = Math.max(300, (2000 - (state.score / 5)) / stageMultiplier);

      if (time - state.lastEnemySpawn > currentSpawnRate) {
        const side = Math.floor(Math.random() * 4);
        let x = 0, y = 0;
        const margin = 100;

        if (side === 0) { x = Math.random() * canvas.width; y = -margin; }
        else if (side === 1) { x = canvas.width + margin; y = Math.random() * canvas.height; }
        else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + margin; }
        else { x = -margin; y = Math.random() * canvas.height; }

        const isBoss = state.score > 0 && state.score % 1000 === 0 && !state.enemies.some(e => e.type === 'BOSS');
        
        state.enemies.push({
          id: Date.now() + Math.random(),
          x, y,
          type: isBoss ? 'BOSS' : (Math.random() > 0.4 ? 'PHANTOM' : 'REAPER'),
          speed: (isBoss ? 0.5 : (1.2 + (state.score / 1000))) * (1 + (state.stage - 1) * 0.2),
          radius: isBoss ? 60 : (Math.random() * 10 + 15),
          angle: 0,
          health: (isBoss ? 20 : 1) * (1 + Math.floor(state.stage / 3)),
          maxHealth: (isBoss ? 20 : 1) * (1 + Math.floor(state.stage / 3)),
          pulse: 0
        });
        state.lastEnemySpawn = time;
      }
    };

    const createExplosion = (x: number, y: number, color: string, count = 15) => {
      for (let i = 0; i < count; i++) {
        gameState.current.particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 15,
          vy: (Math.random() - 0.5) * 15,
          life: 1,
          color,
          size: Math.random() * 4 + 1,
          type: Math.random() > 0.5 ? 'GLITCH' : 'SPARK'
        });
      }
    };

    const update = (time: number) => {
      if (isPaused || gameState.current.gameOver) {
        requestRef.current = requestAnimationFrame(update);
        return;
      }
      
      const state = gameState.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      state.frame++;
      state.playerAngle = Math.atan2(state.mousePos.y - centerY, state.mousePos.x - centerX);

      spawnEnemy(time);

      // Stage Completion Check
      if (state.score >= state.stageThreshold && state.stage < 5) {
        onStageComplete(state.stage);
        state.stageThreshold += 1000; // Increment for internal tracking
      }

      // Power-up Timer
      if (state.powerTimer > 0) {
        state.powerTimer--;
        if (state.powerTimer === 0) {
          state.powerType = 'NORMAL';
          setActivePower(null);
        }
      }

      // Update Power-ups
      state.powerUps = state.powerUps.filter(p => {
        p.life -= 0.005;
        const dist = Math.hypot(centerX - p.x, centerY - p.y);
        if (dist < 40) {
          if (p.type === 'TRIPLE') { state.powerType = 'TRIPLE'; state.powerTimer = 600; setActivePower('TRIPLE SHOT'); }
          if (p.type === 'RAPID') { state.powerType = 'RAPID'; state.powerTimer = 600; setActivePower('RAPID FIRE'); }
          if (p.type === 'SHIELD') { state.lives = Math.min(3, state.lives + 1); setLives(state.lives); }
          createExplosion(p.x, p.y, '#ccff00', 30);
          return false;
        }
        return p.life > 0;
      });

      // Update Bullets
      state.bullets = state.bullets.filter(b => {
        b.x += b.vx;
        b.y += b.vy;
        return b.x > 0 && b.x < canvas.width && b.y > 0 && b.y < canvas.height;
      });

      // Update Enemies
      state.enemies.forEach((e, eIdx) => {
        const angle = Math.atan2(centerY - e.y, centerX - e.x);
        e.x += Math.cos(angle) * e.speed;
        e.y += Math.sin(angle) * e.speed;
        e.angle += 0.02;
        e.pulse += 0.1;

        // Collision with Player/Core
        const distToPlayer = Math.hypot(centerX - e.x, centerY - e.y);
        if (distToPlayer < 40) {
          state.enemies.splice(eIdx, 1);
          state.lives--;
          setLives(state.lives);
          state.shake = 15;
          state.chromatic = 20;
          createExplosion(centerX, centerY, '#ff0055', 40);
          
          if (state.lives <= 0) {
            state.gameOver = true;
            setTimeout(() => onGameOver(state.score), 1000);
          }
        }

        // Collision with Bullets
        state.bullets.forEach((b, bIdx) => {
          const dist = Math.hypot(b.x - e.x, b.y - e.y);
          if (dist < e.radius + 10) {
            e.health--;
            state.bullets.splice(bIdx, 1);
            state.shake = 2;
            
            if (e.health <= 0) {
              createExplosion(e.x, e.y, e.type === 'BOSS' ? '#ff0055' : '#ccff00', e.type === 'BOSS' ? 100 : 20);
              state.enemies.splice(eIdx, 1);
              state.score += e.type === 'BOSS' ? 500 : 10;
              setScore(state.score);
              
              // Drop Power-up
              if (Math.random() > 0.85) {
                const types: ('TRIPLE' | 'RAPID' | 'SHIELD')[] = ['TRIPLE', 'RAPID', 'SHIELD'];
                state.powerUps.push({
                  x: e.x, y: e.y,
                  type: types[Math.floor(Math.random() * types.length)],
                  life: 1
                });
              }
            }
          }
        });
      });

      // Update Particles
      state.particles = state.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        return p.life > 0;
      });

      if (state.shake > 0) state.shake *= 0.9;
      if (state.chromatic > 0) state.chromatic *= 0.95;

      draw();
      requestRef.current = requestAnimationFrame(update);
    };

    const draw = () => {
      if (!ctx) return;
      const state = gameState.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Chromatic Aberration Effect
      if (state.chromatic > 1) {
        ctx.save();
        ctx.translate(state.chromatic, 0);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.restore();
      }

      ctx.save();
      if (state.shake > 1) {
        ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
      }

      // Draw Grid with Pulse
      const gridPulse = Math.sin(state.frame * 0.05) * 0.02 + 0.05;
      ctx.strokeStyle = `rgba(204, 255, 0, ${gridPulse})`;
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Draw Power-ups
      state.powerUps.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(state.frame * 0.05);
        ctx.strokeStyle = '#ccff00';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ccff00';
        ctx.beginPath();
        ctx.rect(-10, -10, 20, 20);
        ctx.stroke();
        ctx.restore();
      });

      // Draw Particles
      state.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        if (p.type === 'GLITCH') {
          ctx.fillRect(p.x, p.y, p.size * 2, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // Draw Bullets
      state.bullets.forEach(b => {
        ctx.fillStyle = '#ccff00';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ccff00';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Enemies (Scary Visuals)
      state.enemies.forEach(e => {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.angle);
        
        const pulseScale = 1 + Math.sin(e.pulse) * 0.1;
        ctx.scale(pulseScale, pulseScale);

        if (e.type === 'PHANTOM') {
          ctx.strokeStyle = '#fff';
          ctx.shadowColor = '#00f2ff';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.moveTo(0, -e.radius);
          ctx.lineTo(e.radius, e.radius);
          ctx.lineTo(-e.radius, e.radius);
          ctx.closePath();
          ctx.stroke();
          // Inner Eye
          ctx.fillStyle = '#ff0055';
          ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill();
        } else if (e.type === 'REAPER') {
          ctx.strokeStyle = '#ff0055';
          ctx.shadowColor = '#ff0055';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          for(let i=0; i<4; i++) {
            const a = (i/4) * Math.PI * 2;
            ctx.lineTo(Math.cos(a)*e.radius*1.5, Math.sin(a)*e.radius*0.5);
            ctx.lineTo(Math.cos(a+0.2)*e.radius*0.5, Math.sin(a+0.2)*e.radius*1.5);
          }
          ctx.closePath();
          ctx.stroke();
        } else if (e.type === 'BOSS') {
          ctx.strokeStyle = '#ff0055';
          ctx.lineWidth = 4;
          ctx.shadowBlur = 40;
          ctx.shadowColor = '#ff0055';
          // Outer Ring
          ctx.beginPath(); ctx.arc(0, 0, e.radius, 0, Math.PI * 2); ctx.stroke();
          // Inner Spikes
          ctx.beginPath();
          for(let i=0; i<12; i++) {
            const a = (i/12) * Math.PI * 2 + state.frame * 0.02;
            ctx.moveTo(Math.cos(a)*e.radius*0.8, Math.sin(a)*e.radius*0.8);
            ctx.lineTo(Math.cos(a)*e.radius*1.2, Math.sin(a)*e.radius*1.2);
          }
          ctx.stroke();
          // Health Bar
          ctx.fillStyle = 'rgba(255,0,0,0.3)';
          ctx.fillRect(-e.radius, -e.radius - 20, e.radius * 2, 5);
          ctx.fillStyle = '#ff0055';
          ctx.fillRect(-e.radius, -e.radius - 20, (e.radius * 2) * (e.health / e.maxHealth), 5);
        }
        ctx.restore();
      });

      // Draw Player/Core
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Core Shield Layers
      for (let i = 0; i < state.lives; i++) {
        ctx.strokeStyle = '#ccff00';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3 - (i * 0.1);
        ctx.beginPath();
        const r = 45 + (i * 15) + Math.sin(state.frame * 0.05) * 5;
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      ctx.rotate(state.playerAngle);
      ctx.strokeStyle = '#ccff00';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#ccff00';
      
      // Hexagon Core
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 30;
        const y = Math.sin(angle) * 30;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Pointer
      ctx.beginPath();
      ctx.moveTo(45, 0);
      ctx.lineTo(30, -15);
      ctx.lineTo(30, 15);
      ctx.closePath();
      ctx.fillStyle = '#ccff00';
      ctx.fill();

      ctx.restore();
      ctx.restore();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      gameState.current.mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = () => {
      if (isPaused || gameState.current.gameOver) return;
      const state = gameState.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const fire = (angle: number) => {
        const vx = Math.cos(angle) * 12;
        const vy = Math.sin(angle) * 12;
        state.bullets.push({
          x: centerX + Math.cos(angle) * 45,
          y: centerY + Math.sin(angle) * 45,
          vx, vy,
          type: state.powerType === 'NORMAL' ? 'NORMAL' : 'POWER'
        });
      };

      // Blaster upgrades by stage
      if (state.powerType === 'TRIPLE' || state.stage >= 4) {
        fire(state.playerAngle);
        fire(state.playerAngle - 0.2);
        fire(state.playerAngle + 0.2);
      } else if (state.stage >= 2) {
        fire(state.playerAngle - 0.1);
        fire(state.playerAngle + 0.1);
      } else {
        fire(state.playerAngle);
      }
      
      state.shake = 4;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused, onGameOver, onStageComplete]);

  return (
    <div className="relative w-full h-full cursor-crosshair overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* HUD */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <div className="text-[10px] font-black text-[#ccff00] tracking-[0.5em] uppercase mb-1">STAGE {currentStage} // Core Integrity: {lives * 33}%</div>
        <div className="text-5xl font-black text-white tracking-tighter">SCORE: {score.toString().padStart(6, '0')}</div>
        
        {activePower && (
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mt-4 inline-block bg-[#ccff00] text-black px-4 py-1 text-[10px] font-black tracking-widest uppercase"
          >
            {activePower} ACTIVE
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-8 right-8 pointer-events-none text-right">
        <div className="text-[10px] font-black text-white/40 tracking-widest uppercase mb-2 italic">Defensive Protocol v2.0</div>
        <div className="flex space-x-2 justify-end">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-10 h-1 transition-colors duration-500 ${i < lives ? 'bg-[#ccff00]' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeonStrikeGame;
