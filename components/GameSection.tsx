
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, ShieldAlert, Pause, FastForward, Zap } from 'lucide-react';
import NeonStrikeGame from './NeonStrikeGame';

const GameSection: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER' | 'STAGE_CLEAR'>('START');
  const [isPaused, setIsPaused] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('neon_strike_highscore');
    return saved ? parseInt(saved) : 0;
  });

  // Load progress if available
  useEffect(() => {
    const savedStage = localStorage.getItem('neon_strike_current_stage');
    if (savedStage && gameState === 'START') {
      setCurrentStage(parseInt(savedStage));
    }
  }, [gameState]);

  const handleGameOver = (score: number) => {
    setLastScore(score);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('neon_strike_highscore', score.toString());
    }
    // Reset progress on game over
    localStorage.removeItem('neon_strike_current_stage');
    setGameState('GAMEOVER');
  };

  const handleStageComplete = (stage: number) => {
    if (stage < 5) {
      setGameState('STAGE_CLEAR');
      setIsPaused(true);
    }
  };

  const nextStage = () => {
    const next = currentStage + 1;
    setCurrentStage(next);
    localStorage.setItem('neon_strike_current_stage', next.toString());
    setGameState('PLAYING');
    setIsPaused(false);
  };

  const startGame = () => {
    setGameState('PLAYING');
    setIsPaused(false);
  };

  const resetGame = () => {
    setCurrentStage(1);
    localStorage.removeItem('neon_strike_current_stage');
    setGameState('PLAYING');
    setIsPaused(false);
  };

  return (
    <section className="relative w-full h-[calc(100vh-80px)] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30 grayscale brightness-[0.3]"
          alt="Server Room"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ccff00_0%,transparent_70%)] opacity-10" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'START' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 text-center max-w-2xl px-6"
          >
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 border border-[#ccff00]/30 bg-[#ccff00]/5 rounded-full">
              <ShieldAlert className="w-4 h-4 text-[#ccff00]" />
              <span className="text-[#ccff00] text-[10px] font-black tracking-[0.3em] uppercase">Security Breach Detected</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none mb-8">
              NEON<br /><span className="text-[#ccff00]">STRIKE</span>
            </h1>

            {currentStage > 1 && (
              <div className="mb-8 text-[#ccff00] font-black tracking-widest uppercase text-sm">
                RESUMING FROM STAGE {currentStage}
              </div>
            )}

            <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto italic">
              "The core is under attack by data corruptors. Deploy the defense protocol and survive the onslaught."
            </p>

            <div className="flex flex-col items-center space-y-6">
              <button 
                onClick={startGame}
                className="group relative bg-[#ccff00] text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-white transition-all"
              >
                <div className="absolute -inset-1 bg-[#ccff00] blur opacity-30 group-hover:opacity-60 transition-opacity" />
                <span className="relative">{currentStage > 1 ? 'RESUME DEFENSE' : 'INITIALIZE DEFENSE'}</span>
                <Play className="w-5 h-5 fill-current relative" />
              </button>
              
              <div className="flex items-center space-x-8 text-white/40 text-xs font-bold tracking-widest">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white/20 rounded-full" />
                  <span>MOUSE TO AIM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white/20 rounded-full" />
                  <span>CLICK TO FIRE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {(gameState === 'PLAYING' || (gameState === 'STAGE_CLEAR' && isPaused)) && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative"
          >
            <NeonStrikeGame 
              onGameOver={handleGameOver} 
              onStageComplete={handleStageComplete}
              isPaused={isPaused} 
              currentStage={currentStage}
            />

            {/* Pause Button */}
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="absolute bottom-8 left-8 md:bottom-auto md:top-8 md:right-8 md:left-auto z-50 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-[#ccff00] hover:text-black flex items-center justify-center backdrop-blur-md border border-white/10 transition-all group"
            >
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              <span className="absolute left-full ml-4 md:left-auto md:top-full md:mt-4 md:right-0 text-[10px] font-black tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-right">
                {isPaused ? 'RESUME SYSTEM' : 'PAUSE SYSTEM'}
              </span>
            </button>

            {/* Pause Overlay */}
            <AnimatePresence>
              {isPaused && gameState !== 'STAGE_CLEAR' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center">
                    <h2 className="text-6xl font-black text-white tracking-tighter uppercase mb-8">SYSTEM PAUSED</h2>
                    <button 
                      onClick={() => setIsPaused(false)}
                      className="bg-[#ccff00] text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-white transition-all mx-auto"
                    >
                      <span>RESUME MISSION</span>
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage Clear Overlay */}
            <AnimatePresence>
              {gameState === 'STAGE_CLEAR' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
                >
                  <div className="text-center max-w-md px-6">
                    <div className="text-[#ccff00] text-xs font-black tracking-[0.5em] uppercase mb-4">Sector Secured</div>
                    <h2 className="text-7xl font-black text-white tracking-tighter uppercase leading-none mb-8">STAGE {currentStage}<br />COMPLETE</h2>
                    
                    <div className="bg-white/5 border border-white/10 p-8 mb-12 text-left space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Next Sector</span>
                        <span className="text-white font-black uppercase tracking-widest">Stage {currentStage + 1}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Threat Level</span>
                        <span className="text-[#ff0055] font-black uppercase tracking-widest">Increased</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Weapon Status</span>
                        <span className="text-[#ccff00] font-black uppercase tracking-widest flex items-center gap-2">
                          Upgraded <Zap className="w-3 h-3 fill-current" />
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={nextStage}
                      className="w-full bg-[#ccff00] text-black px-12 py-5 font-black tracking-widest uppercase flex items-center justify-center space-x-4 hover:bg-white transition-all"
                    >
                      <span>ADVANCE TO NEXT SECTOR</span>
                      <FastForward className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'GAMEOVER' && (
          <motion.div 
            key="gameover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 text-center"
          >
            <div className="mb-8">
              <div className="text-[#ff0055] text-xs font-black tracking-[0.5em] uppercase mb-4">Core Integrity Compromised</div>
              <h2 className="text-8xl font-black text-white tracking-tighter uppercase leading-none">SYSTEM<br />FAILURE</h2>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto mb-12">
              <div className="bg-white/5 border border-white/10 p-6">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Final Score</div>
                <div className="text-4xl font-black text-[#ccff00]">{lastScore}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">High Score</div>
                <div className="text-4xl font-black text-white">{highScore}</div>
              </div>
            </div>

            <button 
              onClick={resetGame}
              className="bg-white text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-[#ccff00] transition-all mx-auto"
            >
              <span>REBOOT SYSTEM</span>
              <RotateCcw className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/10 pointer-events-none" />
    </section>
  );
};

export default GameSection;
