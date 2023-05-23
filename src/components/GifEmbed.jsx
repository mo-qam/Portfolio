import React from 'react';

const GifEmbed = ({ gifUrl, opacity, shouldPlay, style }) => {
  return (
    <img
      src={gifUrl}
      alt=""
      style={{
        ...style,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: opacity,
      }}
      className={`w-full h-full object-cover transition-opacity duration-300 ${shouldPlay ? 'visible' : 'hidden'}`}
    />
  );
};

export default GifEmbed;