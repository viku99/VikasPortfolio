import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  type: 'local' | 'youtube';
  src: string;
  className?: string;
  showControls?: boolean;
  zoomOnHover?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ type, src, className, showControls = false, zoomOnHover = false }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(30);
  const [playerId] = useState(`yt-${src}-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    if (type !== 'youtube' || !showControls) return;

    const initPlayer = () => {
      // @ts-ignore
      if (window.YT && window.YT.Player) {
        // @ts-ignore
        playerRef.current = new window.YT.Player(playerId, {
          height: '100%',
          width: '100%',
          videoId: src,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: src,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
              setIsMuted(event.target.isMuted());
            },
            onStateChange: (event: any) => {
              // @ts-ignore
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
          },
        });
      }
    };

    // @ts-ignore
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      // Handle the global callback carefully
      // @ts-ignore
      const previousCallback = window.onYouTubeIframeAPIReady;
      // @ts-ignore
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [src, type, showControls, playerId]);

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const playerElement = type === 'youtube' && showControls ? (
    <div className={`relative w-full h-full group ${className}`}>
      <div id={playerId} className="w-full h-full pointer-events-none" />
      <div className="absolute inset-0 z-10" /> 
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="flex items-center gap-4 text-white">
          <button onClick={handleTogglePlay} className="hover:text-accent transition-colors" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={handleToggleMute} className="hover:text-accent transition-colors" aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="text-[10px] font-mono tracking-widest opacity-40 uppercase">Live_Feed_01</div>
        </div>
      </div>
    </div>
  ) : type === 'youtube' ? (
    <div className={`w-full h-full relative overflow-hidden pointer-events-none ${className}`}>
      <iframe
        className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 scale-125 object-cover"
        src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title="Video background"
      />
    </div>
  ) : (
    <video className={`w-full h-full object-cover ${className}`} src={src} autoPlay muted loop playsInline />
  );

  return zoomOnHover ? (
    <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
      {playerElement}
    </motion.div>
  ) : playerElement;
};

export default VideoPlayer;