
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
  
  const gameState = useRef({
    player: { x: 0, y: 0, vx: 0, vy: 0 },
    walls: [] as Wall[],
    speed: INITIAL_SPEED,
    frame: 0,
    keys: { w: false, a: false, s: false, d: false },
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
  }, []);

  const spawnWall = useCallback((width: number, height: number) => {
    const id = Math.random();
    const side = Math.floor(Math.random() * 4);
    let x = 0, y = 0;
    
    // Difficulty scaling based on stage
    const sizeMult = 0.8 + (currentStage * 0.2);
    const wallWidth = (80 + Math.random() * 150) * sizeMult;
    const wallHeight = (15 + Math.random() * 30) * sizeMult;
    const speedMult = 0.8 + (currentStage * 0.2);

    if (side === 0) { x = Math.random() * width; y = -150; }
    else if (side === 1) { x = width + 150; y = Math.random() * height; }
    else if (side === 2) { x = Math.random() * width; y = height + 150; }
    else { x = -150; y = Math.random() * height; }

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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const update = (time: number) => {
      if (isPaused || !gameState.current.gameActive) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const state = gameState.current;
      const { player, keys, walls } = state;

      // Smoother Player Movement (Higher acceleration and friction for snappier feel)
      const accel = 1.2;
      const friction = 0.94;
      if (keys.w) player.vy -= accel;
      if (keys.s) player.vy += accel;
      if (keys.a) player.vx -= accel;
      if (keys.d) player.vx += accel;

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
      // React will automatically bail out of renders if the values haven't changed.
      if (currentScore % 10 === 0) { 
        setScore(currentScore);
      }
      setSurvivalTime(currentSurvival);

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
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, onGameOver, onStageComplete, spawnWall, initPlayer, currentStage]);


  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* HUD */}
      <div className="absolute top-8 left-8 right-8 pointer-events-none flex justify-between items-start">
        <div className="space-y-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center space-x-4">
            <Trophy className="w-6 h-6 text-[#ccff00]" />
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Score</div>
              <div className="text-2xl font-black text-white">{score}</div>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center space-x-4">
            <Timer className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Survival</div>
              <div className="text-2xl font-black text-white">{survivalTime}s</div>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center space-x-4">
          <Activity className={`w-6 h-6 ${gameState.current.intensity > 0.7 ? 'text-red-500 animate-pulse' : 'text-[#ccff00]'}`} />
          <div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Arena Stability</div>
            <div className="text-2xl font-black text-white">{Math.round((1 - gameState.current.intensity) * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-[10px] font-black text-white/40 tracking-widest uppercase">
        W A S D to Navigate the Void
      </div>
    </div>
  );
};

export default VoidRunnerGame;
