
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Loader2
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface VideoPlayerProps {
  type: 'local' | 'youtube' | 'video';
  src: string;
  className?: string;
  showControls?: boolean;
  autoplay?: boolean;
  startUnmuted?: boolean;
  isReelsMode?: boolean;
  reelId?: string; // Unique identifier for singleton control
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
    _ytInitializers?: Array<() => void>;
  }
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  type, 
  src, 
  className = "", 
  showControls = true, 
  autoplay = true,
  startUnmuted = false,
  isReelsMode = false,
  reelId
}) => {
  const { activeVideoId, setActiveVideoId } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!startUnmuted);
  const [isReady, setIsReady] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState<'play' | 'pause' | null>(null);
  
  // Use reelId if provided, otherwise fallback to random
  const [playerId] = useState(reelId || `player-${Math.random().toString(36).substr(2, 9)}`);

  // ============================================================================
  // SINGLETON PLAYBACK CONTROLLER
  // ============================================================================
  
  useEffect(() => {
    if (!isReady) return;

    if (activeVideoId === playerId) {
      // This is the active video, start playing
      if (!isPlaying) {
        if (type === 'youtube' && playerRef.current?.playVideo) {
          playerRef.current.playVideo();
        } else if ((type === 'local' || type === 'video') && playerRef.current) {
          playerRef.current.play().catch(() => {});
        }
        setIsPlaying(true);
      }
    } else {
      // Another video is active, pause this one
      if (isPlaying) {
        if (type === 'youtube' && playerRef.current?.pauseVideo) {
          playerRef.current.pauseVideo();
        } else if ((type === 'local' || type === 'video') && playerRef.current) {
          playerRef.current.pause();
        }
        setIsPlaying(false);
      }
    }
  }, [activeVideoId, playerId, isPlaying, isReady, type]);

  // ============================================================================
  // INITIALIZATION LOGIC
  // ============================================================================

  const onPlayerReady = (event: any) => {
    setIsReady(true);
    if (startUnmuted) {
      event.target.unMute();
      event.target.setVolume(100);
      setIsMuted(false);
    } else {
      event.target.mute();
    }
    
    // If it's already set as active, play immediately
    if (activeVideoId === playerId || autoplay) {
      if (activeVideoId === null && autoplay) setActiveVideoId(playerId);
      event.target.playVideo();
    }
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 1) { // Playing
      setIsPlaying(true);
      if (activeVideoId !== playerId) setActiveVideoId(playerId);
    } else if (event.data === 2) { // Paused
      setIsPlaying(false);
    } else if (event.data === 0) { // Ended
      event.target.seekTo(0);
      event.target.playVideo();
    }
  };

  const initYT = useCallback(() => {
    if (!window.YT || !window.YT.Player || playerRef.current) return;

    playerRef.current = new window.YT.Player(playerId, {
      videoId: src,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        playsinline: 1,
        mute: startUnmuted ? 0 : 1,
        loop: 1,
        playlist: src,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      }
    });
  }, [src, autoplay, playerId, startUnmuted, activeVideoId]);

  useEffect(() => {
    if (type !== 'youtube') {
      setIsReady(true);
      return;
    }

    if (!window.YT || !window.YT.Player) {
      if (!window._ytInitializers) {
        window._ytInitializers = [];
        window.onYouTubeIframeAPIReady = () => {
          window._ytInitializers?.forEach(cb => cb());
          delete window._ytInitializers;
        };
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
      window._ytInitializers.push(initYT);
    } else {
      initYT();
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [type, initYT]);

  const togglePlay = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!isReady) return;

    if (isPlaying) {
      if (type === 'youtube') playerRef.current.pauseVideo();
      else playerRef.current?.pause();
      setIsPlaying(false);
      setShowCenterIcon('pause');
    } else {
      setActiveVideoId(playerId);
      if (type === 'youtube') playerRef.current.playVideo();
      else playerRef.current?.play().catch(() => {});
      setIsPlaying(true);
      setShowCenterIcon('play');
    }
    setTimeout(() => setShowCenterIcon(null), 600);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isReady) return;

    if (isMuted) {
      if (type === 'youtube') {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else if (playerRef.current) {
        playerRef.current.muted = false;
      }
      setIsMuted(false);
    } else {
      if (type === 'youtube') playerRef.current.mute();
      else if (playerRef.current) playerRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black group/player select-none ${className}`}
      onClick={() => togglePlay()}
    >
      {type === 'youtube' ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div id={playerId} className="w-full h-full md:h-[110%] pointer-events-none" />
        </div>
      ) : (
        <video 
          ref={playerRef}
          className="w-full h-full object-cover" 
          src={src} 
          muted={isMuted} 
          loop 
          playsInline 
          onPlay={() => {
            setIsPlaying(true);
            if (activeVideoId !== playerId) setActiveVideoId(playerId);
          }}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {!isReady && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 text-accent/20 animate-spin" strokeWidth={1} />
        </div>
      )}

      {showControls && isReady && (
        <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${(isReelsMode || !isPlaying) ? 'opacity-100' : 'opacity-0 md:group-hover/player:opacity-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence>
              {showCenterIcon && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="bg-white/10 backdrop-blur-3xl p-6 rounded-full border border-white/20"
                >
                  {showCenterIcon === 'play' ? <Play fill="currentColor" /> : <Pause fill="currentColor" />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-6">
                <button onClick={togglePlay} className="text-accent hover:scale-110 transition-transform">
                  {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} />}
                </button>
                <button onClick={toggleMute} className="text-accent/60 hover:text-accent transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              
               <button onClick={(e) => { e.stopPropagation(); playerRef.current?.seekTo?.(0); if(type !== 'youtube') playerRef.current.currentTime = 0; }} className="text-accent/30 hover:text-accent transition-colors">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
