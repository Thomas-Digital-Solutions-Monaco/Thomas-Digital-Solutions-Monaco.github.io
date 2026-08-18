import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import HeroObject from "./HeroObject";

const HeroCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.1, 6.2], fov: 40 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.7} castShadow />
        <spotLight
          position={[-4, 5, 2]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.2}
          color="#ffd0d0"
        />

        <HeroObject />

        <ContactShadows
          position={[0, -0.95, 0]}
          opacity={0.28}
          scale={12}
          blur={2.8}
          far={4}
        />
        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.95}
          minPolarAngle={Math.PI / 3.2}
        />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;
