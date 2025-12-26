
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
  const [playerId] = useState(`youtube-player-${src}-${Math.random().toString(36).substring(7)}`);


  useEffect(() => {
    if (type !== 'youtube' || !showControls) return;

    let player: any;

    const createPlayer = () => {
      // @ts-ignore
      if (window.YT && window.YT.Player) {
        // @ts-ignore
        player = new window.YT.Player(playerId, {
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
            autohide: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            disablekb: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
        playerRef.current = player;
      }
    };

    const onPlayerReady = (event: any) => {
      event.target.playVideo();
      event.target.mute();
      setIsMuted(true);
      event.target.setVolume(volume);
    };

    const onPlayerStateChange = (event: any) => {
      // @ts-ignore
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    // @ts-ignore
    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      // @ts-ignore
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
      playerRef.current = null;
    };
  }, [src, type, showControls, playerId, volume]);

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    const playerState = playerRef.current.getPlayerState();
    // @ts-ignore
    if (playerState === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      if (newVolume > 0 && playerRef.current.isMuted()) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
      if (newVolume === 0 && !playerRef.current.isMuted()) {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  let playerElement;

  if (type === 'youtube' && showControls) {
    playerElement = (
      <div className={`relative w-full h-full group ${className}`}>
        <div id={playerId} className="w-full h-full pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-transparent" /> {/* Overlay to block interaction with iframe */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="flex items-center gap-4 text-white">
            <button onClick={handleTogglePlay} className="opacity-70 hover:opacity-100 transition-opacity">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={handleToggleMute} className="opacity-70 hover:opacity-100 transition-opacity">
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>
    );
  } else if (type === 'youtube') {
    playerElement = (
      <div className={`w-full h-full relative overflow-hidden pointer-events-none ${className}`}>
        <iframe
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 scale-125 object-cover"
          src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&controls=0&showinfo=0&autohide=1&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="YouTube preview"
        ></iframe>
      </div>
    );
  } else {
    playerElement = (
      <video
        className={`w-full h-full object-cover ${className}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  if (zoomOnHover) {
    return (
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {playerElement}
      </motion.div>
    );
  }

  return playerElement;
};

export default VideoPlayer;
