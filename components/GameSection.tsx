
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, ShieldAlert, Pause, FastForward, Zap, Target, Activity } from 'lucide-react';
import NeonStrikeGame from './NeonStrikeGame';
import VoidRunnerGame from './VoidRunnerGame';

type GameType = 'NEON_STRIKE' | 'VOID_RUNNER';

const GameSection: React.FC = () => {
  const [gameState, setGameState] = useState<'SELECT' | 'START' | 'PLAYING' | 'GAMEOVER' | 'STAGE_CLEAR'>('SELECT');
  const [selectedGame, setSelectedGame] = useState<GameType>('NEON_STRIKE');
  const [isPaused, setIsPaused] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('game_highscore');
    return saved ? JSON.parse(saved) : { NEON_STRIKE: 0, VOID_RUNNER: 0 };
  });

  const handleGameOver = (score: number) => {
    setLastScore(score);
    const currentHigh = highScore[selectedGame] || 0;
    if (score > currentHigh) {
      const newHighs = { ...highScore, [selectedGame]: score };
      setHighScore(newHighs);
      localStorage.setItem('game_highscore', JSON.stringify(newHighs));
    }
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
    setGameState('PLAYING');
    setIsPaused(false);
  };

  const startGame = () => {
    setGameState('PLAYING');
    setIsPaused(false);
  };

  const resetGame = () => {
    setCurrentStage(1);
    setGameState('PLAYING');
    setIsPaused(false);
  };

  const selectGame = (type: GameType) => {
    setSelectedGame(type);
    setGameState('START');
  };

  return (
    <section className="relative w-full h-[calc(100vh-80px)] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src={selectedGame === 'NEON_STRIKE' 
            ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2070&auto=format&fit=crop"
          } 
          className="w-full h-full object-cover opacity-30 grayscale brightness-[0.3]"
          alt="Game Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ccff00_0%,transparent_70%)] opacity-10" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'SELECT' && (
          <motion.div 
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-6xl px-6"
          >
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">SELECT MISSION</h2>
              <p className="text-gray-500 tracking-widest uppercase text-[10px] md:text-xs font-bold">Choose a protocol to initialize</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-h-[60vh] md:max-h-none overflow-y-auto md:overflow-visible px-2">
              {/* Neon Strike */}
              <div 
                onClick={() => selectGame('NEON_STRIKE')}
                className="group relative bg-[#0a0a0a] border border-white/10 p-8 cursor-pointer transition-all hover:border-[#ccff00] hover:bg-white/[0.02]"
              >
                <div className="absolute top-4 right-4 text-[10px] font-black text-gray-700 tracking-widest uppercase">Protocol 01</div>
                <div className="w-16 h-16 bg-[#ccff00]/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#ccff00] transition-colors">
                  <Target className="w-8 h-8 text-[#ccff00] group-hover:text-black" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">NEON STRIKE</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Defend the core against data corruptors. High-intensity target acquisition and elimination.</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#ccff00] tracking-widest uppercase">High Score: {highScore.NEON_STRIKE || 0}</span>
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#ccff00] transition-colors">
                    <Play className="w-4 h-4 text-white group-hover:text-[#ccff00]" />
                  </div>
                </div>
              </div>

              {/* Void Runner */}
              <div 
                onClick={() => selectGame('VOID_RUNNER')}
                className="group relative bg-[#0a0a0a] border border-white/10 p-8 cursor-pointer transition-all hover:border-[#00f2ff] hover:bg-white/[0.02]"
              >
                <div className="absolute top-4 right-4 text-[10px] font-black text-gray-700 tracking-widest uppercase">Protocol 03</div>
                <div className="w-16 h-16 bg-[#00f2ff]/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#00f2ff] transition-colors">
                  <Activity className="w-8 h-8 text-[#00f2ff] group-hover:text-black" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">VOID RUNNER</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Navigate a morphing geometric arena. Survive the collapsing paths and shifting walls.</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#00f2ff] tracking-widest uppercase">High Score: {highScore.VOID_RUNNER || 0}</span>
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#00f2ff] transition-colors">
                    <Play className="w-4 h-4 text-white group-hover:text-[#00f2ff]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

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
              <span className="text-[#ccff00] text-[10px] font-black tracking-[0.3em] uppercase">
                {selectedGame === 'NEON_STRIKE' ? 'Security Breach Detected' : 'Arena Instability Detected'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none mb-8">
              {selectedGame === 'NEON_STRIKE' ? (
                <>NEON<br /><span className="text-[#ccff00]">STRIKE</span></>
              ) : (
                <>VOID<br /><span className="text-[#00f2ff]">RUNNER</span></>
              )}
            </h1>

            <p className="text-gray-500 text-sm md:text-lg mb-8 md:text-12 max-w-md mx-auto italic">
              {selectedGame === 'NEON_STRIKE' 
                ? '"The core is under attack by data corruptors. Deploy the defense protocol and survive the onslaught."'
                : '"The arena is alive. Shifting geometry and collapsing paths await. Survive the void."'}
            </p>

            <div className="flex flex-col items-center space-y-6">
              <button 
                onClick={startGame}
                className={`group relative ${selectedGame === 'NEON_STRIKE' ? 'bg-[#ccff00]' : 'bg-[#00f2ff]'} text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-white transition-all`}
              >
                <div className={`absolute -inset-1 ${selectedGame === 'NEON_STRIKE' ? 'bg-[#ccff00]' : 'bg-[#00f2ff]'} blur opacity-30 group-hover:opacity-60 transition-opacity`} />
                <span className="relative">INITIALIZE MISSION</span>
                <Play className="w-5 h-5 fill-current relative" />
              </button>
              
              <div className="flex items-center space-x-4 md:space-x-8 text-white/40 text-[10px] md:text-xs font-bold tracking-widest">
                {selectedGame === 'NEON_STRIKE' ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-white/20 rounded-full" />
                      <span className="hidden md:inline">MOUSE TO AIM</span>
                      <span className="md:hidden">TOUCH TO AIM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-white/20 rounded-full" />
                      <span className="hidden md:inline">CLICK TO FIRE</span>
                      <span className="md:hidden">TAP TO FIRE</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-white/20 rounded-full" />
                      <span className="hidden md:inline">W A S D TO MOVE</span>
                      <span className="md:hidden">TOUCH TO MOVE</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-white/20 rounded-full" />
                      <span>AVOID WALLS</span>
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => setGameState('SELECT')}
                className="text-gray-500 hover:text-white text-[10px] font-black tracking-widest uppercase transition-colors"
              >
                Back to Selection
              </button>
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
            {selectedGame === 'NEON_STRIKE' ? (
              <NeonStrikeGame 
                onGameOver={handleGameOver} 
                onStageComplete={handleStageComplete}
                isPaused={isPaused} 
                currentStage={currentStage}
              />
            ) : (
              <VoidRunnerGame 
                onGameOver={handleGameOver}
                onStageComplete={handleStageComplete}
                isPaused={isPaused}
                currentStage={currentStage}
              />
            )}

            {/* Pause Button */}
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`absolute bottom-8 left-8 md:bottom-auto md:top-8 md:right-8 md:left-auto z-50 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:${selectedGame === 'NEON_STRIKE' ? 'bg-[#ccff00]' : 'bg-[#00f2ff]'} hover:text-black flex items-center justify-center backdrop-blur-md border border-white/10 transition-all group`}
            >
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
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
                      className={`${selectedGame === 'NEON_STRIKE' ? 'bg-[#ccff00]' : 'bg-[#00f2ff]'} text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-white transition-all mx-auto`}
                    >
                      <span>RESUME MISSION</span>
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage Clear Overlay (Neon Strike Only) */}
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
              <div className={`${selectedGame === 'NEON_STRIKE' ? 'text-[#ff0055]' : 'text-[#00f2ff]'} text-[10px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4`}>
                {selectedGame === 'NEON_STRIKE' ? 'Core Integrity Compromised' : 'Arena Collapse'}
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">MISSION<br />FAILED</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-sm mx-auto mb-12">
              <div className="bg-white/5 border border-white/10 p-4 md:p-6">
                <div className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Final Score</div>
                <div className={`text-2xl md:text-4xl font-black ${selectedGame === 'NEON_STRIKE' ? 'text-[#ccff00]' : 'text-[#00f2ff]'}`}>{lastScore}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 md:p-6">
                <div className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">High Score</div>
                <div className="text-2xl md:text-4xl font-black text-white">{highScore[selectedGame] || 0}</div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button 
                onClick={resetGame}
                className="bg-white text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-[#ccff00] transition-all mx-auto"
              >
                <span>RETRY MISSION</span>
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setGameState('SELECT')}
                className="text-gray-500 hover:text-white text-[10px] font-black tracking-widest uppercase transition-colors"
              >
                Change Mission
              </button>
            </div>
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
