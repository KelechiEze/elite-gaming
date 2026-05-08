import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
  videoSrc?: string; // Allow custom video path
}

const Loader: React.FC<LoaderProps> = ({ onComplete, videoSrc = "/animation.mp4" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Track video loading progress
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const progress = (bufferedEnd / duration) * 100;
          setLoadingProgress(Math.min(progress, 100));
        }
      }
    };

    const handleCanPlay = () => {
      console.log("Video can play now");
      setIsVideoReady(true);
      
      // Attempt to play the video with user interaction fallback
      const playVideo = async () => {
        try {
          await video.play();
          console.log("Video playing automatically");
          setShowPlayButton(false);
        } catch (error) {
          console.log("Autoplay was prevented:", error);
          setShowPlayButton(true);
        }
      };
      
      playVideo();
    };

    const handleVideoEnd = () => {
      console.log("Video ended, redirecting...");
      setHasEnded(true);
      // Small delay for smooth transition
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    const handleError = () => {
      console.error("Video failed to load");
      // Fallback: redirect after 2 seconds if video fails
      setTimeout(onComplete, 2000);
    };

    // Force play when metadata loads
    const handleLoadedMetadata = async () => {
      try {
        await video.play();
        console.log("Video playing from metadata load");
        setShowPlayButton(false);
      } catch (error) {
        console.log("Still can't autoplay:", error);
        setShowPlayButton(true);
      }
    };

    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Safety timeout - redirect after max 15 seconds if video doesn't end
    const timeoutId = setTimeout(() => {
      if (!hasEnded) {
        console.log("Safety timeout triggered");
        onComplete();
      }
    }, 15000);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      clearTimeout(timeoutId);
    };
  }, [onComplete, hasEnded]);

  // Handle manual play button click
  const handleManualPlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setShowPlayButton(false);
        setIsVideoReady(true);
      } catch (error) {
        console.error("Manual play failed:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Video Background - Always visible */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted={false}
        autoPlay
        preload="auto"
        style={{ objectFit: 'cover' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Lighter Dark Overlay for better video visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/5 z-10" />

      {/* Loading Progress Overlay - Shows while video is buffering OR before video starts playing */}
      {(!isVideoReady || loadingProgress < 100) && !hasEnded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-80 h-1 bg-white/20 relative overflow-hidden mb-4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#ccff00] shadow-[0_0_10px_#ccff00]"
            />
          </div>
          <p className="text-[#ccff00] text-sm font-black tracking-widest">
            LOADING {Math.floor(loadingProgress)}%
          </p>
          <p className="text-white/60 text-[10px] font-bold tracking-wider mt-2 uppercase">
            Preparing Experience
          </p>
        </div>
      )}

      {/* Brand/Logo Overlay - Always visible but fades slightly when video plays */}
      <motion.div 
        className="absolute top-8 left-8 z-20 flex items-center space-x-2"
        animate={{ opacity: isVideoReady ? 0.7 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center">
          <span className="text-black font-black text-xs">EG</span>
        </div>
        <span className="text-white font-black tracking-tighter uppercase text-sm">
          ELITE<span className="text-[#ccff00]">GAMER</span>
        </span>
      </motion.div>

      {/* Bottom Text - Shows while video is playing and hasn't ended */}
      {isVideoReady && !hasEnded && (
        <motion.div 
          className="absolute bottom-8 left-0 right-0 z-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center space-x-2 mb-3">
            <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          <p className="text-[10px] text-white/60 font-bold tracking-[0.3em] uppercase">
            WATCHING INTRO
          </p>
        </motion.div>
      )}

      {/* Play Button Overlay - Only shown if autoplay is prevented by browser */}
      {showPlayButton && !hasEnded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
          <button 
            onClick={handleManualPlay}
            className="group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <div className="w-24 h-24 rounded-full border-2 border-[#ccff00] flex items-center justify-center hover:bg-[#ccff00] transition-all duration-300 group-hover:shadow-[0_0_30px_#ccff00]">
              <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-[#ccff00] border-b-[15px] border-b-transparent ml-2 group-hover:border-l-black transition-all" />
            </div>
            <p className="mt-6 text-[#ccff00] text-sm font-black tracking-widest uppercase animate-pulse">
              CLICK TO PLAY INTRO
            </p>
          </button>
          <p className="mt-4 text-white/40 text-[10px] font-bold tracking-wider">
            Browser autoplay prevented
          </p>
        </div>
      )}

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent bg-[length:100%_4px] animate-scanline pointer-events-none z-30" />

      {/* Corner Decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#ccff00]/40 z-20" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#ccff00]/40 z-20" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#ccff00]/20 z-20" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#ccff00]/20 z-20" />
    </motion.div>
  );
};

export default Loader;