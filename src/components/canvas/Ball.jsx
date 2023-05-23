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
        {!isMobile && (
          <Decal
            position={[0, 0, -1]}
            rotation={[0, 0, 0]}
            scale={[-1, 1, -1]}
            map={decal}
          />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [iconToUse, setIconToUse] = useState(icon);
  const iconLowRes = icon.replace(".png", "_low_res.png");

  const checkLowResExists = async () => {
    try {
      const response = await fetch(iconLowRes);
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error("Error fetching low-res texture:", error);
    }
    return false;
  };

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = async (event) => {
      setIsMobile(event.matches);
      if (event.matches) {
        const lowResExists = await checkLowResExists();
        if (lowResExists) {
          setIconToUse(iconLowRes);
        } else {
          setIconToUse(icon);
        }
      } else {
        setIconToUse(icon);
      }
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Call the handleMediaQueryChange function to set the initial iconToUse state
    handleMediaQueryChange({ matches: mediaQuery.matches });

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
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