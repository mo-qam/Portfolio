import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const GifEmbed = ({ youtube_URL, opacity, shouldPlay, style }) => {
  const opts = {
    playerVars: {
      mute: 1,
      autoplay: 1,
      controls: 0,
      modestbranding: 0,
      rel: 0,
      showinfo: 0,
      fs: 0,
      loop: 1,
    },
  };

  const playerRef = useRef(null);

  const handleVideoOnReady = (event) => {
    playerRef.current = event.target;
    event.target.pauseVideo(); // Pause the video as soon as it's ready
  };

  useEffect(() => {
    if (playerRef.current) {
      if (shouldPlay) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
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
