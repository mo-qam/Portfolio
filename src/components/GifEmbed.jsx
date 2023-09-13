import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const playerVars = {
  mute: 1,
  autoplay: 1,
  controls: 0,
  modestbranding: 0,
  rel: 0,
  showinfo: 0,
  fs: 0,
  loop: 1,
};

const opts = {
  playerVars,
};

const GifEmbed = ({ youtube_URL, opacity, shouldPlay, style }) => {
  const playerRef = useRef(null);

  const handleVideoOnReady = (event) => {
    const { target } = event;
    playerRef.current = target;
    
    if (!shouldPlay) {
      target.pauseVideo(); // Pause the video as soon as it's ready only if shouldPlay is false
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      shouldPlay ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
    }
  }, [shouldPlay]);
  

  return (
    <YouTube
      videoId={youtube_URL}
      opts={opts}
      onReady={handleVideoOnReady}
      style={{
        ...style,
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        opacity: opacity,
        transform: 'scale(1.3)',
      }}      
    />
  );
};

export default GifEmbed;
