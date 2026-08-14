import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import HeroObject from "./HeroObject";

const HeroCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.3, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
        <pointLight position={[-5, 2, -3]} intensity={1.1} color="#ff9a9a" />

        <HeroObject />

        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.3}
          scale={12}
          blur={2.6}
          far={4}
        />
        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.9}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;
