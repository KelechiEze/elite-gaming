
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Zap, ShieldAlert, Trophy, Timer, Activity } from 'lucide-react';

interface VoidRunnerGameProps {
  onGameOver: (score: number) => void;
  onStageComplete: (stage: number) => void;
  isPaused: boolean;
  currentStage: number;
}

interface Wall {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  speedMult: number;
}

const PLAYER_SIZE = 24;
const INITIAL_SPEED = 3;
const STAGE_DURATION = 30; // seconds per stage

const VoidRunnerGame: React.FC<VoidRunnerGameProps> = ({ onGameOver, onStageComplete, isPaused, currentStage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(0);
  
  // Refs to track last rendered values to prevent redundant state updates
  const lastRenderedScore = useRef(0);
  const lastRenderedSurvival = useRef(0);
  
  const gameState = useRef({
    player: { x: 0, y: 0, vx: 0, vy: 0 },
    walls: [] as Wall[],
    speed: INITIAL_SPEED,
    frame: 0,
    keys: { w: false, a: false, s: false, d: false },
    touch: { active: false, x: 0, y: 0 },
    lastSpawn: 0,
    gameActive: true,
    intensity: 0,
    gridRotation: 0,
    stageStartTime: 0
  });

  const initPlayer = useCallback((width: number, height: number) => {
    gameState.current.player = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0
    };
    // Reset game active state and clear walls for the new stage
    gameState.current.gameActive = true;
    gameState.current.walls = [];
    gameState.current.lastSpawn = 0;
    gameState.current.touch.active = false;
    lastRenderedScore.current = 0;
    lastRenderedSurvival.current = 0;
  }, []);

  const spawnWall = useCallback((width: number, height: number) => {
    const state = gameState.current;
    const { player } = state;
    const id = Math.random();
    
    // Targeted spawn logic: 80% chance to spawn from the side the player is closest to
    let side: number;
    const dists = [
      player.y, // Top (0)
      width - player.x, // Right (1)
      height - player.y, // Bottom (2)
      player.x // Left (3)
    ];
    
    if (Math.random() < 0.8) {
      side = dists.indexOf(Math.min(...dists));
    } else {
      side = Math.floor(Math.random() * 4);
    }

    let x = 0, y = 0;
    
    // Difficulty scaling based on stage
    const sizeMult = 0.8 + (currentStage * 0.2);
    const wallWidth = (80 + Math.random() * 150) * sizeMult;
    const wallHeight = (15 + Math.random() * 30) * sizeMult;
    const speedMult = 0.8 + (currentStage * 0.2);

    // Spawn at the edge, but biased towards player coordinate to flush them out
    if (side === 0) { x = player.x + (Math.random() - 0.5) * 400; y = -150; }
    else if (side === 1) { x = width + 150; y = player.y + (Math.random() - 0.5) * 400; }
    else if (side === 2) { x = player.x + (Math.random() - 0.5) * 400; y = height + 150; }
    else { x = -150; y = player.y + (Math.random() - 0.5) * 400; }

    const newWall: Wall = {
      id,
      x,
      y,
      width: wallWidth,
      height: wallHeight,
      color: Math.random() > 0.5 ? '#ccff00' : '#00f2ff',
      rotation: Math.random() * Math.PI * 2,
      speedMult
    };

    gameState.current.walls.push(newWall);

    // GSAP Morphing effect
    gsap.to(newWall, {
      duration: 2 + Math.random() * 2,
      width: newWall.width * (0.7 + Math.random() * 0.6),
      height: newWall.height * (0.7 + Math.random() * 0.6),
      rotation: newWall.rotation + (Math.random() > 0.5 ? 1 : -1) * Math.PI,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [currentStage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initPlayer(canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        gameState.current.keys[key as keyof typeof gameState.current.keys] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        gameState.current.keys[key as keyof typeof gameState.current.keys] = false;
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        gameState.current.touch = {
          active: true,
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
    };

    const handleTouchEnd = () => {
      gameState.current.touch.active = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('touchmove', handleTouch, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    let animationFrameId: number;

    const update = (time: number) => {
      if (isPaused || !gameState.current.gameActive) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const state = gameState.current;
      const { player, keys, touch, walls } = state;

      // Smoother Player Movement (Higher acceleration and friction for snappier feel)
      const accel = 1.2;
      const friction = 0.94;
      
      // Keyboard Movement
      if (keys.w) player.vy -= accel;
      if (keys.s) player.vy += accel;
      if (keys.a) player.vx -= accel;
      if (keys.d) player.vx += accel;

      // Touch Movement (Follow touch)
      if (touch.active) {
        const dx = touch.x - player.x;
        const dy = touch.y - player.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 5) {
          player.vx += (dx / dist) * accel;
          player.vy += (dy / dist) * accel;
        }
      }

      player.vx *= friction;
      player.vy *= friction;
      player.x += player.vx;
      player.y += player.vy;

      // Boundary check
      if (player.x < 0) player.x = 0;
      if (player.x > canvas.width) player.x = canvas.width;
      if (player.y < 0) player.y = 0;
      if (player.y > canvas.height) player.y = canvas.height;

      // Intensity & Speed
      state.speed = INITIAL_SPEED + (currentStage * 0.5);
      state.intensity = Math.min(1, (state.frame % (STAGE_DURATION * 60)) / (STAGE_DURATION * 60));
      state.gridRotation += 0.001 * (1 + currentStage * 0.2);

      // Spawn Walls - Slower initial spawn rate
      const spawnInterval = Math.max(400, 2500 - (currentStage * 300) - (state.intensity * 500));
      if (time - state.lastSpawn > spawnInterval) {
        spawnWall(canvas.width, canvas.height);
        state.lastSpawn = time;
      }

      // Update Walls & Collision
      state.walls = state.walls.filter(wall => {
        // Move walls towards center with stage-based speed
        const angle = Math.atan2(canvas.height / 2 - wall.y, canvas.width / 2 - wall.x);
        wall.x += Math.cos(angle) * state.speed * wall.speedMult;
        wall.y += Math.sin(angle) * state.speed * wall.speedMult;

        // Collision check - using a slightly smaller hit box for better player experience
        const relX = (player.x - wall.x) * Math.cos(-wall.rotation) - (player.y - wall.y) * Math.sin(-wall.rotation);
        const relY = (player.x - wall.x) * Math.sin(-wall.rotation) + (player.y - wall.y) * Math.cos(-wall.rotation);

        if (Math.abs(relX) < wall.width / 2 + PLAYER_SIZE / 4 && 
            Math.abs(relY) < wall.height / 2 + PLAYER_SIZE / 4) {
          state.gameActive = false;
          onGameOver(Math.floor(state.frame / 10));
        }

        return wall.x > -500 && wall.x < canvas.width + 500 && wall.y > -500 && wall.y < canvas.height + 500;
      });

      state.frame++;
      const currentSurvival = Math.floor(state.frame / 60);
      const currentScore = Math.floor(state.frame / 10);
      
      // Update score and survival time state. 
      // We update score every 10 points to reduce render frequency.
      // We also check against refs to avoid redundant setState calls in the loop.
      if (currentScore >= lastRenderedScore.current + 10) { 
        setScore(currentScore);
        lastRenderedScore.current = currentScore;
      }
      if (currentSurvival !== lastRenderedSurvival.current) {
        setSurvivalTime(currentSurvival);
        lastRenderedSurvival.current = currentSurvival;
      }

      // Stage Completion - Only trigger once per stage
      if (currentSurvival >= STAGE_DURATION * currentStage && state.gameActive) {
        onStageComplete(currentStage);
        state.gameActive = false; // Stop the game loop while stage clear overlay is shown
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    const draw = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const state = gameState.current;

      // Draw Pulsing Grid
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(state.gridRotation);
      ctx.strokeStyle = `rgba(0, 242, 255, ${0.03 + currentStage * 0.02})`;
      ctx.lineWidth = 1;
      const gridSize = 120;
      const extent = Math.max(canvas.width, canvas.height) * 2;
      for (let x = -extent; x < extent; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, -extent); ctx.lineTo(x, extent); ctx.stroke();
      }
      for (let y = -extent; y < extent; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(-extent, y); ctx.lineTo(extent, y); ctx.stroke();
      }
      ctx.restore();

      // Draw Walls
      state.walls.forEach(wall => {
        ctx.save();
        ctx.translate(wall.x, wall.y);
        ctx.rotate(wall.rotation);
        
        ctx.shadowBlur = 10 + currentStage * 2;
        ctx.shadowColor = wall.color;
        ctx.fillStyle = wall.color;
        ctx.globalAlpha = 0.7 + (currentStage * 0.05);
        ctx.fillRect(-wall.width / 2, -wall.height / 2, wall.width, wall.height);
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.strokeRect(-wall.width / 2 + 1, -wall.height / 2 + 1, wall.width - 2, wall.height - 2);
        
        ctx.restore();
      });

      // Draw Player
      ctx.save();
      ctx.translate(state.player.x, state.player.y);
      
      const playerPulse = Math.sin(state.frame * 0.15) * 4;
      ctx.shadowBlur = 15 + playerPulse;
      ctx.shadowColor = '#ccff00';
      ctx.fillStyle = '#ccff00';
      ctx.beginPath();
      ctx.arc(0, 0, PLAYER_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();

      // Light streaks (motion blur effect)
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.4)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-state.player.vx * 1.5, -state.player.vy * 1.5);
      ctx.lineTo(0, 0);
      ctx.stroke();

      ctx.restore();

      // Chromatic aberration on higher stages
      if (currentStage > 2) {
        ctx.globalCompositeOperation = 'screen';
        const shift = currentStage * 0.5;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.05)';
        ctx.fillRect(shift, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 255, 0.05)';
        ctx.fillRect(-shift, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouch);
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, onGameOver, onStageComplete, spawnWall, initPlayer, currentStage]);


  return (
    <div className="relative w-full h-full overflow-hidden bg-black touch-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 pointer-events-none flex justify-between items-start">
        <div className="space-y-2 md:space-y-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 md:p-4 rounded-lg md:rounded-xl flex items-center space-x-2 md:space-x-4">
            <Trophy className="w-4 h-4 md:w-6 md:h-6 text-[#ccff00]" />
            <div>
              <div className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Score</div>
              <div className="text-xl md:text-2xl font-black text-white">{score}</div>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 md:p-4 rounded-lg md:rounded-xl flex items-center space-x-2 md:space-x-4">
            <Timer className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
            <div>
              <div className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Survival</div>
              <div className="text-lg md:text-2xl font-black text-white">{survivalTime}s</div>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 md:p-4 rounded-lg md:rounded-xl flex items-center space-x-2 md:space-x-4">
          <Activity className={`w-4 h-4 md:w-6 md:h-6 ${gameState.current.intensity > 0.7 ? 'text-red-500 animate-pulse' : 'text-[#ccff00]'}`} />
          <div>
            <div className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Stability</div>
            <div className="text-lg md:text-2xl font-black text-white">{Math.round((1 - gameState.current.intensity) * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-4 md:px-6 py-1 md:py-2 rounded-full text-[8px] md:text-[10px] font-black text-white/40 tracking-widest uppercase whitespace-nowrap">
        <span className="hidden md:inline">W A S D to Navigate</span>
        <span className="md:hidden">Touch to Navigate</span>
      </div>
    </div>
  );
};

export default VoidRunnerGame;
