import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

const RED = "#d81e2c";
const DEEP = "#a5121e";
const WHITE = "#f2f2f2";
const DARK = "#141319";
const CARBON = "#25242b";
const RIM = "#c8a24a";

const wheelPositions: [number, number, number][] = [
  [1.05, -0.26, 1.02],
  [1.05, -0.26, -1.02],
  [-1.18, -0.26, 1.02],
  [-1.18, -0.26, -1.02],
];

const Wheel = ({ position }: { position: [number, number, number] }) => (
  <group position={position} rotation={[Math.PI / 2, 0, 0]}>
    <mesh castShadow>
      <cylinderGeometry args={[0.46, 0.46, 0.44, 44]} />
      <meshStandardMaterial color={DARK} roughness={0.85} metalness={0.05} />
    </mesh>
    <mesh position={[0, 0.225, 0]}>
      <torusGeometry args={[0.33, 0.02, 12, 40]} />
      <meshStandardMaterial color={RED} roughness={0.5} />
    </mesh>
    <mesh>
      <cylinderGeometry args={[0.21, 0.21, 0.46, 26]} />
      <meshStandardMaterial color={RIM} metalness={0.95} roughness={0.2} />
    </mesh>
  </group>
);

const Arm = ({ from, to }: { from: [number, number, number]; to: [number, number, number] }) => {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  const mz = (from[2] + to[2]) / 2;
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const len = Math.hypot(dx, dz);
  const angle = Math.atan2(dz, dx);
  return (
    <mesh position={[mx, my, mz]} rotation={[0, -angle, 0]}>
      <boxGeometry args={[len, 0.03, 0.03]} />
      <meshStandardMaterial color={CARBON} metalness={0.6} roughness={0.4} />
    </mesh>
  );
};

const F1Car = () => {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.55}>
      <group ref={group} rotation={[0, Math.PI / 5, 0]} position={[0, 0.1, 0]} scale={1.02}>
        <RoundedBox args={[2.0, 0.3, 0.56]} radius={0.14} smoothness={5} castShadow>
          <meshStandardMaterial color={RED} roughness={0.18} metalness={0.55} />
        </RoundedBox>
        <mesh position={[-0.8, 0.11, 0]} castShadow>
          <boxGeometry args={[1.0, 0.32, 0.32]} />
          <meshStandardMaterial color={DEEP} roughness={0.22} metalness={0.5} />
        </mesh>
        <mesh position={[-1.28, 0.16, 0]} castShadow>
          <boxGeometry args={[0.5, 0.26, 0.04]} />
          <meshStandardMaterial color={RED} roughness={0.25} metalness={0.5} />
        </mesh>
        <mesh position={[1.5, -0.04, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[0.15, 1.1, 30]} />
          <meshStandardMaterial color={RED} roughness={0.18} metalness={0.55} />
        </mesh>
        <mesh position={[2.02, -0.04, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.075, 0.22, 20]} />
          <meshStandardMaterial color={WHITE} roughness={0.3} metalness={0.4} />
        </mesh>
        {[0.4, -0.4].map((z) => (
          <group key={z}>
            <RoundedBox args={[0.95, 0.28, 0.3]} radius={0.12} smoothness={4} position={[-0.05, 0.0, z]} castShadow>
              <meshStandardMaterial color={DEEP} roughness={0.28} metalness={0.5} />
            </RoundedBox>
            <mesh position={[0.44, 0.02, z]}>
              <boxGeometry args={[0.06, 0.16, 0.18]} />
              <meshStandardMaterial color={DARK} roughness={0.5} />
            </mesh>
          </group>
        ))}
        {[0.34, -0.34].map((z) => (
          <mesh key={z} position={[0.7, -0.12, z]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.4, 0.2, 0.02]} />
            <meshStandardMaterial color={CARBON} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0.28, 0.19, 0]}>
          <cylinderGeometry args={[0.22, 0.24, 0.1, 28]} />
          <meshStandardMaterial color={CARBON} roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0.28, 0.32, 0]} castShadow>
          <sphereGeometry args={[0.16, 28, 28]} />
          <meshStandardMaterial color={WHITE} roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[0.4, 0.32, 0]}>
          <sphereGeometry args={[0.163, 28, 16, 0, Math.PI * 2, Math.PI * 0.32, Math.PI * 0.28]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.7} />
        </mesh>
        <mesh position={[0.52, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.028, 14, 32, Math.PI]} />
          <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.7, 0.27, 0]}>
          <boxGeometry args={[0.05, 0.16, 0.05]} />
          <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[-0.02, 0.4, 0]} rotation={[0, 0, 0.2]} castShadow>
          <coneGeometry args={[0.14, 0.34, 5]} />
          <meshStandardMaterial color={DARK} roughness={0.4} metalness={0.4} />
        </mesh>
        <RoundedBox args={[2.6, 0.05, 0.66]} radius={0.02} position={[0, -0.23, 0]}>
          <meshStandardMaterial color={DARK} roughness={0.6} metalness={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.34, 0.04, 2.0]} radius={0.02} position={[1.82, -0.26, 0]} castShadow>
          <meshStandardMaterial color={WHITE} roughness={0.3} metalness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.26, 0.04, 2.0]} radius={0.02} position={[1.98, -0.17, 0]} rotation={[0, 0, 0.32]}>
          <meshStandardMaterial color={RED} roughness={0.3} metalness={0.4} />
        </RoundedBox>
        {[0.98, -0.98].map((z) => (
          <mesh key={z} position={[1.9, -0.16, z]}>
            <boxGeometry args={[0.5, 0.24, 0.03]} />
            <meshStandardMaterial color={DEEP} roughness={0.3} metalness={0.4} />
          </mesh>
        ))}
        <RoundedBox args={[0.06, 0.46, 1.5]} radius={0.02} position={[-1.72, 0.36, 0]} castShadow>
          <meshStandardMaterial color={WHITE} roughness={0.3} metalness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.34, 0.05, 1.5]} radius={0.02} position={[-1.7, 0.57, 0]} rotation={[0, 0, -0.16]}>
          <meshStandardMaterial color={RED} roughness={0.3} metalness={0.4} />
        </RoundedBox>
        {[0.74, -0.74].map((z) => (
          <mesh key={z} position={[-1.7, 0.42, z]}>
            <boxGeometry args={[0.42, 0.44, 0.04]} />
            <meshStandardMaterial color={DEEP} roughness={0.3} metalness={0.4} />
          </mesh>
        ))}
        <mesh position={[-1.78, 0.5, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.1]} />
          <meshStandardMaterial color={CARBON} metalness={0.6} roughness={0.4} />
        </mesh>
        {wheelPositions.map((w, i) => (
          <group key={i}>
            <Arm from={[w[0] > 0 ? 0.9 : -0.9, -0.1, 0]} to={[w[0], -0.2, w[2]]} />
            <Arm from={[w[0] > 0 ? 0.9 : -0.9, 0.05, 0]} to={[w[0], -0.1, w[2]]} />
          </group>
        ))}
        {wheelPositions.map((p, i) => (
          <Wheel key={i} position={p} />
        ))}
      </group>
    </Float>
  );
};

export default F1Car;
