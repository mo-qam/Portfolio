import React from 'react';
import ReactPlayer from 'react-player';

const VideoEmbed = ({ url, opacity, shouldPlay, style}) => {

    const videoStyle = {
        ...style,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        opacity: opacity,
    };
  
    return (
      <div style={videoStyle}>
        <ReactPlayer
            url={url}
            playing={shouldPlay}
            controls={false}
            loop={true}
            muted={true}
        />
      </div>
    );
  };

export default VideoEmbed;