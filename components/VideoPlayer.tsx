
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw,
  Zap,
  Loader2
} from 'lucide-react';

interface VideoPlayerProps {
  type: 'local' | 'youtube';
  src: string;
  className?: string;
  showControls?: boolean;
  autoplay?: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  type, 
  src, 
  className = "", 
  showControls = true, 
  autoplay = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState<'play' | 'pause' | null>(null);
  const [playerId] = useState(`player-${Math.random().toString(36).substr(2, 9)}`);

  // ============================================================================
  // YOUTUBE API INITIALIZATION
  // ============================================================================
  
  const onPlayerReady = (event: any) => {
    setIsReady(true);
    setDuration(event.target.getDuration());
    if (autoplay) {
      event.target.playVideo();
    }
  };

  const onPlayerStateChange = (event: any) => {
    // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
    if (event.data === 0) {
      event.target.playVideo(); // Loop
    }
  };

  const initYT = useCallback(() => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player(playerId, {
        videoId: src,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
          mute: isMuted ? 1 : 0,
          loop: 1,
          playlist: src,
          origin: window.location.origin
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        }
      });
    }
  }, [src, autoplay, playerId]);

  useEffect(() => {
    if (type !== 'youtube') return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initYT();
      };
    } else {
      initYT();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [type, initYT]);

  // Sync Progress
  useEffect(() => {
    if (type !== 'youtube' || !isReady) return;
    
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        setCurrentTime(current);
        if (total > 0) setProgress((current / total) * 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [type, isReady]);

  // ============================================================================
  // INTERACTION HANDLERS
  // ============================================================================

  const togglePlay = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setShowCenterIcon('pause');
    } else {
      playerRef.current.playVideo();
      setShowCenterIcon('play');
    }
    setTimeout(() => setShowCenterIcon(null), 600);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      playerRef.current.setVolume(volume * 100);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const seekTo = (val / 100) * duration;
    if (playerRef.current) {
      playerRef.current.seekTo(seekTo, true);
      setProgress(val);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val * 100);
      if (val > 0 && isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black group/player select-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Source */}
      {type === 'youtube' ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div id={playerId} className="w-full h-[150%] md:h-[110%] pointer-events-none" />
        </div>
      ) : (
        <video 
          className="w-full h-full object-cover" 
          src={src} 
          autoPlay={autoplay} 
          muted={isMuted} 
          loop 
          playsInline 
        />
      )}

      {/* Loading Overlay */}
      {!isReady && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-8 h-8 text-accent/20" />
          </motion.div>
        </div>
      )}

      {/* Custom Controls Layer */}
      {showControls && (
        <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0 md:group-hover/player:opacity-100'}`}>
          
          {/* Top Bar - Responsive Info */}
          <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-start pointer-events-none">
            <div className="flex items-center gap-2 md:gap-3 bg-black/40 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10">
              <Zap size={10} className="text-accent md:w-3.5 md:h-3.5 animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase opacity-70 truncate max-w-[100px] md:max-w-none">Artifact_Stream</span>
            </div>
          </div>

          {/* Center Interaction Area */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer" onClick={() => togglePlay()}>
            <AnimatePresence>
              {showCenterIcon && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="bg-white/10 backdrop-blur-2xl p-6 md:p-10 rounded-full border border-white/20 shadow-2xl"
                >
                  {showCenterIcon === 'play' ? <Play className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" /> : <Pause className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
            <div className="max-w-7xl mx-auto flex flex-col gap-3 md:gap-5 pointer-events-auto">
              
              {/* Seeker */}
              <div className="relative h-6 flex items-center group/seek">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 md:h-1.5 bg-white/10 appearance-none cursor-pointer rounded-full accent-accent transition-all group-hover/seek:h-2"
                  style={{
                    background: `linear-gradient(to right, #ffffff ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
                  }}
                />
              </div>

              {/* Control Buttons Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-8">
                  {/* Play/Pause */}
                  <button onClick={() => togglePlay()} className="text-accent hover:scale-110 transition-transform active:scale-95">
                    {isPlaying ? <Pause className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" /> : <Play className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />}
                  </button>

                  {/* Volume Group - Hidden Slider on Small Mobile */}
                  <div className="flex items-center gap-3 group/volume">
                    <button onClick={() => toggleMute()} className="text-accent/60 hover:text-accent transition-colors">
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                    </button>
                    <div className="hidden md:flex w-0 group-hover/volume:w-24 overflow-hidden transition-all duration-300 items-center">
                       <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-accent"
                      />
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-[9px] md:text-xs font-mono tracking-tighter text-accent/50 tabular-nums">
                    {formatTime(currentTime)} <span className="mx-1">/</span> {formatTime(duration)}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 md:gap-6">
                   <button onClick={() => playerRef.current?.seekTo(0)} className="text-accent/30 hover:text-accent transition-colors hidden md:block">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button onClick={() => toggleFullscreen()} className="text-accent/40 hover:text-accent transition-colors p-1">
                    {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Range Input resets */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0px;
          height: 0px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .group\\/player:hover input[type='range']::-webkit-slider-thumb {
          width: 12px;
          height: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        @media (max-width: 768px) {
          input[type='range']::-webkit-slider-thumb {
            width: 14px;
            height: 14px;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
