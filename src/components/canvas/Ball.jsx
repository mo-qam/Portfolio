import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl, isMobile }) => {
  
  const [decal] = useTexture([imgUrl]);

  if (isMobile) {
    return null; // Don't render anything on mobile
  }

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading={false}
        />
        <Decal
          position={[0, 0, -1]}
          rotation={[0, 0, 0]}
          scale={[-1, 1, -1]}
          map={decal}
          flatShading={false}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const isMobile = window.innerWidth <= 768;
  const [iconToUse, setIconToUse] = useState(icon);

  return (
    <Canvas
      frameloop={isMobile ? "ondemand" : "always"}
      dpr={[1, 1]}
      gl={{ preserveDrawingBuffer: false }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={iconToUse} isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;