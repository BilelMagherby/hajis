import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Map3DProps {
  className?: string;
}

export const Map3D: React.FC<Map3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mapGroup = new THREE.Group();
    mapGroup.rotation.x = -Math.PI * 0.18;
    scene.add(mapGroup);

    // 1. Stylized Hail Mountain Terrain Wireframe & Contours
    const planeGeo = new THREE.PlaneGeometry(5, 3.8, 36, 28);
    const positions = planeGeo.attributes.position;
    
    // Create mountain ridges mimicking Hail's famous Shammar and Salma mountain ranges
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const dist1 = Math.hypot(x - 0.5, y - 0.3);
      const dist2 = Math.hypot(x + 1.2, y + 0.6);
      const elevation = Math.exp(-dist1 * 1.5) * 0.45 + Math.exp(-dist2 * 1.8) * 0.35 + Math.sin(x * 3) * Math.cos(y * 3) * 0.08;
      positions.setZ(i, elevation);
    }
    planeGeo.computeVertexNormals();

    // Dark espresso terrain mesh with gold contour lines
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x1A100A,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: false,
    });
    const terrainMesh = new THREE.Mesh(planeGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2;
    mapGroup.add(terrainMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xC8A46A,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(planeGeo, wireMat);
    wireMesh.rotation.x = -Math.PI / 2;
    wireMesh.position.y = 0.005;
    mapGroup.add(wireMesh);

    // 2. Gold Pin for "Dani Square - Hail"
    const pinGroup = new THREE.Group();
    pinGroup.position.set(0.4, 0.45, -0.2); // Elevation above Hail mountain spot
    mapGroup.add(pinGroup);

    // Glowing Pin Head
    const pinHeadGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xE3C994,
      emissive: 0xC8A46A,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const pinHead = new THREE.Mesh(pinHeadGeo, pinMat);
    pinGroup.add(pinHead);

    // Pin Point
    const pinStemGeo = new THREE.ConeGeometry(0.04, 0.25, 12);
    pinStemGeo.rotateX(Math.PI);
    const pinStem = new THREE.Mesh(pinStemGeo, pinMat);
    pinStem.position.y = -0.15;
    pinGroup.add(pinStem);

    // Pulsing Waves on Ground
    const pulseRingGeo = new THREE.RingGeometry(0.1, 0.22, 32);
    pulseRingGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xC8A46A,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, ringMat);
    pulseRing.position.y = -0.28;
    pinGroup.add(pulseRing);

    // Dynamic light
    const pointLight = new THREE.PointLight(0xE3C994, 2, 4);
    pointLight.position.set(0.4, 1.2, -0.2);
    scene.add(pointLight);

    const ambLight = new THREE.AmbientLight(0xfff3e0, 0.6);
    scene.add(ambLight);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow gentle map yaw
      mapGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.05;
      mapGroup.rotation.y = Math.cos(elapsedTime * 0.2) * 0.08;

      // Pulse ring expansion & fade
      const scale = 1 + (elapsedTime * 1.5 % 2);
      pulseRing.scale.set(scale, scale, 1);
      ringMat.opacity = Math.max(0, 0.8 - (scale - 1) * 0.7);

      // Pin floating bob
      pinGroup.position.y = 0.45 + Math.sin(elapsedTime * 2) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] md:h-[400px] overflow-hidden ${className}`}
    />
  );
};
