import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const GifEmbed = ({ youtube_URL, opacity = 1, shouldPlay = true, style = {} }) => {
  const playerRef = useRef(null);

  const handleVideoOnReady = (event) => {
    playerRef.current = event.target;
    shouldPlay || event.target.pauseVideo();
  };

  useEffect(() => {
    const player = playerRef.current;
    shouldPlay ? player?.playVideo() : player?.pauseVideo();
  }, [shouldPlay]);

  const combinedStyle = {
    ...style,
    ...playerStyle,
    opacity,
  };

  return <YouTube videoId={youtube_URL} opts={opts} onReady={handleVideoOnReady} style={combinedStyle} />;
};

const playerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'fill',
  transform: 'scale(1.3)',
};

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

export default GifEmbed;
