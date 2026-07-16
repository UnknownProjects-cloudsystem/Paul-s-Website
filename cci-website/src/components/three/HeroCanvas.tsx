"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Subtle 3D depth field behind the hero. Gold particles drifting in space.
// Built as a plain THREE.Points and rendered via <primitive> to keep typing
// simple and robust.
function ParticleField({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const points = useMemo(() => {
    const count = reduced ? 350 : 1300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color("#C9A24A"),
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    return new THREE.Points(geometry, material);
  }, [reduced]);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.03;
    const { x, y } = state.pointer;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y * 0.15, 0.05);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.4, 0.05);
  });

  return <primitive ref={ref} object={points} />;
}

export default function HeroCanvas() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ParticleField reduced={reduced} />
    </Canvas>
  );
}
