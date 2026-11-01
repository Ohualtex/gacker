"use client";

/**
 * GLB karakter katmanı — YALNIZCA public/models/gakkocan.glb varsa dinamik yüklenir
 * (three / r3f / drei bu dosyayla birlikte ayrı bir chunk'ta gelir).
 *
 * Animasyon: GLB içindeki klipler isme göre eşleştirilir (idle / offer / run / spill; bkz.
 * CLIP_ALIASES). Eşleşen klip yoksa o faz için kod animasyonu (nefes, öne eğilme, zıplama,
 * koşu sallanması) uygulanır. Koşup kaybolma/geri gelme hareketi CSS katmanında yapıldığı için
 * GLB'nin kendisinin "run" klibine ihtiyacı yoktur (varsa oynatılır).
 */
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { CLIP_ALIASES } from "./mascot-config";
import type { MascotPhase } from "./mascot-machine";

type ClipKey = keyof typeof CLIP_ALIASES;

const PHASE_CLIP: Record<MascotPhase, ClipKey> = {
  idle: "idle",
  offer: "offer",
  spill: "spill",
  runAway: "run",
  away: "idle",
  returning: "run",
};

function findClip(names: string[], key: ClipKey): string | undefined {
  const lower = names.map((n) => n.toLowerCase());
  for (const alias of CLIP_ALIASES[key]) {
    const i = lower.findIndex((n) => n.includes(alias));
    if (i >= 0) return names[i];
  }
  return undefined;
}

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Model({ url, phase, reduced }: { url: string; phase: MascotPhase; reduced: boolean }) {
  const gltf = useGLTF(url);
  const scene = useMemo(() => cloneSkinned(gltf.scene) as THREE.Group, [gltf.scene]);
  const holder = useRef<THREE.Group>(null);
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const actions = useRef<Record<string, THREE.AnimationAction>>({});
  const current = useRef<THREE.AnimationAction | null>(null);
  const hasClip = useRef(false);
  const invalidate = useThree((s) => s.invalidate);

  // Boyutu 1.6 birime normalize et, tabanı y=0'a, merkezi x/z=0'a al
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = size.y > 0 ? 1.6 / size.y : 1;
    return { s, x: -center.x * s, y: -box.min.y * s, z: -center.z * s };
  }, [scene]);

  useEffect(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = false;
        m.receiveShadow = false;
      }
    });
    for (const clip of gltf.animations) actions.current[clip.name] = mixer.clipAction(clip, scene);
    invalidate();
    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [scene, gltf.animations, mixer, invalidate]);

  // faz → klip
  useEffect(() => {
    const names = Object.keys(actions.current);
    const name = findClip(names, PHASE_CLIP[phase]) ?? (PHASE_CLIP[phase] !== "idle" ? undefined : findClip(names, "idle"));
    const next = name ? actions.current[name] : undefined;
    hasClip.current = !!next;
    if (next && next !== current.current) {
      next.reset().fadeIn(0.25).play();
      current.current?.fadeOut(0.25);
      current.current = next;
    } else if (!next && current.current) {
      current.current.fadeOut(0.25);
      current.current = null;
    }
    invalidate();
  }, [phase, invalidate]);

  useFrame((state, dt) => {
    const g = holder.current;
    if (!g) return;
    if (reduced) {
      mixer.update(0);
      g.rotation.set(0, 0, 0);
      g.position.y = 0;
      g.scale.setScalar(1);
      return;
    }
    mixer.update(dt);
    if (hasClip.current) return;
    // kod animasyonu (klip yoksa)
    const t = state.clock.elapsedTime;
    let bob = Math.sin(t * 1.9) * 0.012;
    let lean = 0;
    let sway = Math.sin(t * 0.8) * 0.02;
    if (phase === "offer") lean = 0.1 + Math.sin(t * 2.2) * 0.015;
    if (phase === "spill") {
      const k = Math.min((performance.now() % 100000) / 1000, 1);
      void k;
      bob = Math.abs(Math.sin(t * 9)) * 0.05;
      sway = Math.sin(t * 14) * 0.06;
    }
    if (phase === "runAway" || phase === "returning") {
      bob = Math.abs(Math.sin(t * 11)) * 0.09;
      sway = Math.sin(t * 11) * 0.08;
      lean = 0.18;
    }
    g.position.y = bob;
    g.rotation.set(lean, 0, sway);
    g.scale.set(1, 1 + Math.sin(t * 1.9) * 0.008, 1);
  });

  return (
    <group ref={holder}>
      <group position={[fit.x, fit.y, fit.z]} scale={fit.s}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

function Ticker({ active, fps }: { active: boolean; fps: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => invalidate(), 1000 / fps);
    return () => window.clearInterval(id);
  }, [active, fps, invalidate]);
  return null;
}

export default function GlbCharacter({
  url,
  phase,
  reduced,
  paused,
  onError,
}: {
  url: string;
  phase: MascotPhase;
  reduced: boolean;
  paused: boolean;
  onError: () => void;
}) {
  return (
    <Boundary onError={onError}>
      <Canvas
        className="gk-mascot__glb"
        dpr={[1, 1.5]}
        frameloop={paused ? "never" : "demand"}
        camera={{ fov: 28, near: 0.1, far: 30, position: [0, 0.95, 4.4] }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, 0.82, 0);
        }}
        aria-hidden="true"
      >
        <hemisphereLight args={["#fff4e4", "#c9a27a", 0.7]} />
        <directionalLight position={[2.5, 4, 4]} intensity={2.1} color="#fff1de" />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.7} color="#ffd6a8" />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={2} position={[0, 5, 3]} scale={[8, 4, 1]} color="#fff4e6" />
          <Lightformer form="rect" intensity={1} position={[-5, 2, 2]} scale={[3, 6, 1]} color="#ffe2c2" />
        </Environment>
        <Suspense fallback={null}>
          <Model url={url} phase={phase} reduced={reduced} />
        </Suspense>
        <Ticker active={!paused && !reduced} fps={30} />
      </Canvas>
    </Boundary>
  );
}
