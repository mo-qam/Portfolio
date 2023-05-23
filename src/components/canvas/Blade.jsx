import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Blade = ({ isMobile }) => {
  const blade = useGLTF("./blade/blade.gltf");

  return (
    <mesh>
      <spotLight
        position={[10, 50, 80]}
        intensity={.3}
        castShadow
        shadow-mapSize={512}
      />
      <pointLight intensity={.5} 
        position={[20, 60, -23]}
      />
      <primitive object={blade.scene} scale={isMobile ? 1.4 : 1.2} position-y={0} rotation-y={0} />
    </mesh>
  );
};

const BladeCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Blade isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default BladeCanvas;
