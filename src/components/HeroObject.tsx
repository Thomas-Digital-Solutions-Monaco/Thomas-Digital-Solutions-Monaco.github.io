import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

/**
 * A stylized Formula 1 car — a nod to the Monaco Grand Prix — built entirely
 * from primitives, so there are NO external model files to host and it loads
 * instantly. Swap for a real .glb later via <primitive> if you like.
 */

const wheelPositions: [number, number, number][] = [
  [1.15, -0.32, 0.95],
  [1.15, -0.32, -0.95],
  [-1.2, -0.32, 0.95],
  [-1.2, -0.32, -0.95],
];

const Wheel = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
    <cylinderGeometry args={[0.42, 0.42, 0.4, 32]} />
    <meshStandardMaterial color="#14131a" roughness={0.6} metalness={0.2} />
  </mesh>
);

const F1Car = () => {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  const red = "#d81e2c";
  const white = "#f4f4f4";

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group
        ref={group}
        rotation={[0, Math.PI / 5, 0]}
        position={[0, 0.15, 0]}
        scale={1.05}
      >
        {/* main body */}
        <RoundedBox
          args={[2.5, 0.34, 0.66]}
          radius={0.14}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial color={red} roughness={0.25} metalness={0.6} />
        </RoundedBox>

        {/* nose cone */}
        <mesh position={[1.65, -0.03, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[0.22, 0.95, 24]} />
          <meshStandardMaterial color={red} roughness={0.25} metalness={0.6} />
        </mesh>

        {/* cockpit */}
        <mesh position={[-0.1, 0.26, 0]} castShadow>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#14131a" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* roll hoop */}
        <mesh position={[-0.45, 0.36, 0]} castShadow>
          <boxGeometry args={[0.12, 0.42, 0.12]} />
          <meshStandardMaterial color={white} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* front wing */}
        <RoundedBox
          args={[0.36, 0.08, 1.75]}
          radius={0.03}
          position={[1.8, -0.28, 0]}
          castShadow
        >
          <meshStandardMaterial color={white} roughness={0.3} metalness={0.4} />
        </RoundedBox>

        {/* rear wing */}
        <RoundedBox
          args={[0.5, 0.08, 1.5]}
          radius={0.03}
          position={[-1.55, 0.38, 0]}
          castShadow
        >
          <meshStandardMaterial color={white} roughness={0.3} metalness={0.4} />
        </RoundedBox>
        <mesh position={[-1.55, 0.08, 0.42]}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
          <meshStandardMaterial color="#14131a" />
        </mesh>
        <mesh position={[-1.55, 0.08, -0.42]}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
          <meshStandardMaterial color="#14131a" />
        </mesh>

        {/* wheels */}
        {wheelPositions.map((p, i) => (
          <Wheel key={i} position={p} />
        ))}
      </group>
    </Float>
  );
};

export default F1Car;
