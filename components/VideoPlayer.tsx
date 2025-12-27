
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
  Zap
} from 'lucide-react';

interface VideoPlayerProps {
  type: 'local' | 'youtube';
  src: string;
  className?: string;
  showControls?: boolean;
  zoomOnHover?: boolean;
  autoplay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  type, 
  src, 
  className = "", 
  showControls = true, 
  zoomOnHover = false,
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
  
  const [playerId] = useState(`yt-${src}-${Math.random().toString(36).substring(7)}`);

  const initPlayer = useCallback(() => {
    if ((window as any).YT && (window as any).YT.Player) {
      playerRef.current = new (window as any).YT.Player(playerId, {
        height: '100%',
        width: '100%',
        videoId: src,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: 1,
          loop: 1,
          playlist: src,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setDuration(event.target.getDuration());
            if (autoplay) {
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) setIsPlaying(true);
            if (event.data === (window as any).YT.PlayerState.PAUSED) setIsPlaying(false);
            if (event.data === (window as any).YT.PlayerState.ENDED) {
               event.target.playVideo();
            }
          },
        },
      });
    }
  }, [playerId, src, autoplay]);

  useEffect(() => {
    if (type !== 'youtube') return;

    if (!(window as any).YT || !(window as any).YT.Player) {
      if (!document.getElementById('youtube-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
      
      const checkReady = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          initPlayer();
          clearInterval(checkReady);
        }
      }, 100);

      return () => clearInterval(checkReady);
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [type, initPlayer]);

  useEffect(() => {
    if (type !== 'youtube' || !isReady) return;

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        setCurrentTime(current);
        setProgress((current / total) * 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [type, isReady]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setShowCenterIcon('pause');
    } else {
      playerRef.current.playVideo();
      setShowCenterIcon('play');
    }
    setTimeout(() => setShowCenterIcon(null), 600);
  }, [isPlaying]);

  const toggleMute = () => {
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
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    if (playerRef.current) {
      playerRef.current.seekTo(seekTo, true);
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (playerRef.current) {
      playerRef.current.setVolume(newVol * 100);
      if (newVol > 0 && isMuted) toggleMute();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isHovering) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'KeyM') toggleMute();
      if (e.code === 'KeyF') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isHovering, togglePlay]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black group/player ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {type === 'youtube' ? (
        <div className="absolute inset-0 pointer-events-none scale-[1.01]">
          <div id={playerId} className="w-full h-full" />
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none opacity-60" />

      {showControls && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering || !isPlaying ? 1 : 0 }}
          className="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none"
        >
          <div className="p-6 md:p-8 flex justify-between items-start">
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Zap size={14} className="text-accent animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-70">Artifact_Stream_001</span>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence>
              {showCenterIcon && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="bg-white/10 backdrop-blur-xl p-8 rounded-full border border-white/20"
                >
                  {showCenterIcon === 'play' ? <Play fill="currentColor" /> : <Pause fill="currentColor" />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 pointer-events-auto cursor-pointer" onClick={togglePlay} />

          <div className="p-6 md:p-8 w-full pointer-events-auto">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
              <div className="relative group/progress h-6 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-1 bg-white/10 appearance-none cursor-pointer overflow-hidden rounded-full accent-accent hover:h-2 transition-all"
                  style={{
                    background: `linear-gradient(to right, #ffffff ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button onClick={togglePlay} className="text-accent hover:scale-110 transition-transform">
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>

                  <div className="flex items-center gap-3 group/volume">
                    <button onClick={toggleMute} className="text-accent/60 hover:text-accent transition-colors">
                      {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300 flex items-center">
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

                  <div className="text-[10px] font-mono tracking-tighter text-accent/50">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <button onClick={() => { if(playerRef.current) playerRef.current.seekTo(0); }} className="text-accent/40 hover:text-accent transition-colors">
                    <RotateCcw size={18} />
                  </button>
                  <button onClick={toggleFullscreen} className="text-accent/40 hover:text-accent transition-colors">
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {!isReady && type === 'youtube' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full"
          />
        </div>
      )}

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
        }
        .group\\/player:hover input[type='range']::-webkit-slider-thumb {
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
