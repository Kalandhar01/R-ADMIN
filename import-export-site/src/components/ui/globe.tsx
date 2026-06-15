"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Fog, Group, PerspectiveCamera, Scene, Vector3 } from "three";
import ThreeGlobe from "three-globe";

import countries from "@/data/globe.json";

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type WorldProps = {
  globeConfig: GlobeConfig;
  data: Position[];
  className?: string;
};

type GlobePoint = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

const defaultConfig = {
  pointSize: 1,
  atmosphereColor: "#ffffff",
  showAtmosphere: true,
  atmosphereAltitude: 0.1,
  polygonColor: "rgba(255,255,255,0.7)",
  globeColor: "#1d072e",
  emissive: "#000000",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
} satisfies Required<Omit<GlobeConfig, "initialPosition" | "ambientLight" | "directionalLeftLight" | "directionalTopLight" | "pointLight">>;

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const config = useMemo(() => ({ ...defaultConfig, ...globeConfig }), [globeConfig]);

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true });
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    globeMaterial.color = new Color(config.globeColor);
    globeMaterial.emissive = new Color(config.emissive);
    globeMaterial.emissiveIntensity = config.emissiveIntensity;
    globeMaterial.shininess = config.shininess;
  }, [config.emissive, config.emissiveIntensity, config.globeColor, config.shininess, isInitialized]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data.length) return;

    const points: GlobePoint[] = data.flatMap((arc) => [
      {
        size: config.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      },
      {
        size: config.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      },
    ]);

    const filteredPoints = points.filter(
      (point, index, array) =>
        array.findIndex((candidate) => candidate.lat === point.lat && candidate.lng === point.lng) === index,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      .hexPolygonColor(() => config.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((arc: object) => (arc as Position).startLat)
      .arcStartLng((arc: object) => (arc as Position).startLng)
      .arcEndLat((arc: object) => (arc as Position).endLat)
      .arcEndLng((arc: object) => (arc as Position).endLng)
      .arcColor((arc: object) => (arc as Position).color)
      .arcAltitude((arc: object) => (arc as Position).arcAlt)
      .arcStroke((arc: object) => [0.32, 0.28, 0.3][(arc as Position).order % 3])
      .arcDashLength(config.arcLength)
      .arcDashInitialGap((arc: object) => (arc as Position).order)
      .arcDashGap(15)
      .arcDashAnimateTime(config.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((point: object) => (point as GlobePoint).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor((ring: object) => (ring as { color: string }).color)
      .ringMaxRadius(config.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((config.arcTime * config.arcLength) / config.rings);
  }, [
    config.arcLength,
    config.arcTime,
    config.atmosphereAltitude,
    config.atmosphereColor,
    config.maxRings,
    config.pointSize,
    config.polygonColor,
    config.rings,
    config.showAtmosphere,
    data,
    isInitialized,
  ]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data.length) return;

    const interval = window.setInterval(() => {
      if (!globeRef.current) return;

      const activeIndexes = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));
      const ringsData = data
        .filter((_, index) => activeIndexes.includes(index))
        .map((arc) => ({
          lat: arc.startLat,
          lng: arc.startLng,
          color: arc.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [data, isInitialized]);

  return <group ref={groupRef} />;
}

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
  }, [gl, size.height, size.width]);

  return null;
}

export function World(props: WorldProps) {
  const { className, globeConfig } = props;
  const scene = useMemo(() => {
    const nextScene = new Scene();
    nextScene.fog = new Fog(0xffffff, 400, 2000);
    return nextScene;
  }, []);

  const camera = useMemo(() => {
    const nextCamera = new PerspectiveCamera(50, aspect, 180, 1800);
    nextCamera.position.z = cameraZ;
    return nextCamera;
  }, []);

  return (
    <div className={className}>
      <Canvas
        scene={scene}
        camera={camera}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <WebGLRendererConfig />
        <ambientLight color={globeConfig.ambientLight ?? "#38bdf8"} intensity={0.6} />
        <directionalLight color={globeConfig.directionalLeftLight ?? "#ffffff"} position={new Vector3(-400, 100, 400)} />
        <directionalLight color={globeConfig.directionalTopLight ?? "#ffffff"} position={new Vector3(-200, 500, 200)} />
        <pointLight color={globeConfig.pointLight ?? "#ffffff"} position={new Vector3(-200, 500, 200)} intensity={0.8} />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={cameraZ}
          maxDistance={cameraZ}
          autoRotate={globeConfig.autoRotate ?? true}
          autoRotateSpeed={globeConfig.autoRotateSpeed ?? 0.5}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const numbers: number[] = [];

  while (numbers.length < count) {
    const value = Math.floor(Math.random() * (max - min)) + min;
    if (!numbers.includes(value)) {
      numbers.push(value);
    }
  }

  return numbers;
}
