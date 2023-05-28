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

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        {isMobile ? (
          <>
            <icosahedronGeometry args={[1, 1, 1]} />
            <meshPhongMaterial
              color="#fff8eb"
              polygonOffset
              polygonOffsetFactor={-5}
              flatShading
            />
          </>
        ) : (
          <>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial
              color="#fff8eb"
              polygonOffset
              polygonOffsetFactor={-5}
            />
          </>
        )}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading={isMobile ? true : false}
        />
        {!isMobile ? (
        <Decal
          position={[0, 0, -1]}
          rotation={[0, 0, 0]}
          scale={[-1, 1, -1]}
          map={decal}
          flatShading={isMobile ? true : false}
        />
        ) : (
          <></>
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [iconToUse, setIconToUse] = useState(icon);

  const iconLowRes = icon.replace(".png", "_low_res.png");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = async (event) => {
      setIsMobile(event.matches);
      if (event.matches) {
        try {
          const response = await fetch(iconLowRes);
          if (response.ok) {
            setIconToUse(iconLowRes);
          } else {
            setIconToUse(icon);
          }
        } catch (error) {
          setIconToUse(icon);
        }
      } else {
        setIconToUse(icon);
      }
    };

    mediaQuery?.addEventListener("change", handleMediaQueryChange);

    handleMediaQueryChange({ matches: mediaQuery.matches });

    return () => {
      mediaQuery?.removeEventListener("change", handleMediaQueryChange);
    };
  }, [icon, iconLowRes]);

  return (
    <Canvas
      frameloop={isMobile ? "ondemand" : "always"}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
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