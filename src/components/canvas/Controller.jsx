import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float, } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Controllers = ({ isMobile }) => {
  const computer = useGLTF("./controller/scene.gltf");

  return (
    <Float speed={.75} rotationIntensity={.5} floatIntensity={1}>
      <mesh>
        <hemisphereLight intensity={0.45} groundColor="black" />
        <spotLight
          position={[30, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={512}
        />
        <pointLight intensity={2} />
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.6 : 1}
          position={isMobile ? [0, -4.25, 0] : [0, -5.25, -1]}
          rotation={[0, 45, 0]}
        />
      </mesh>
    </Float>
  );
};

const ControllersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // New state to track visibility
  const canvasContainerRef = useRef(null); // Ref to the container or canvas itself


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

  useEffect(() => {

    // Visibility tracking logic
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    return () => {
      if (canvasContainerRef.current) {
        observer.unobserve(canvasContainerRef.current);
      }
    };
  }, []);

  return (
    <>
      {isMobile || !isVisible ? <></> :<Canvas
        frameloop="ondemand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Controllers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>}
    </>
  );
};

export default ControllersCanvas;
