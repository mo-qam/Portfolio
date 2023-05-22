import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Blade = () => {
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
      <primitive object={blade.scene} scale={1.2} position-y={0} rotation-y={0} />
    </mesh>
  );
};

const BladeCanvas = () => {
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
        <Blade />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default BladeCanvas;
