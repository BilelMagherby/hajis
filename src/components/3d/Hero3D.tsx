import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DProps {
  className?: string;
}

export const Hero3D: React.FC<Hero3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
    scene.add(ambientLight);

    const sandKeyLight = new THREE.DirectionalLight(0xD2BE9D, 2.5);
    sandKeyLight.position.set(3, 4, 3);
    scene.add(sandKeyLight);

    const warmRimLight = new THREE.PointLight(0xD2BE9D, 3, 10);
    warmRimLight.position.set(-3, 2, -2);
    scene.add(warmRimLight);

    const bottomGlow = new THREE.PointLight(0x82543A, 1.5, 6);
    bottomGlow.position.set(0, -2, 1);
    scene.add(bottomGlow);

    // ROOT GROUP FOR MOUSE PARALLAX
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 1. V60 DRIPPER & SERVER ENSEMBLE
    const v60Group = new THREE.Group();
    v60Group.position.set(-1.4, -0.2, 0); // Positioned elegantly on the side
    sceneGroup.add(v60Group);

    // Server Decanter (Glass Carafe)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 0.4,
      specularIntensity: 1,
      specularColor: new THREE.Color(0xD2BE9D),
      envMapIntensity: 1.5,
    });

    const serverGeo = new THREE.CylinderGeometry(0.45, 0.8, 1.1, 32, 1, true);
    const serverMesh = new THREE.Mesh(serverGeo, glassMaterial);
    serverMesh.position.y = -0.55;
    v60Group.add(serverMesh);

    // Amber Liquid inside Server
    const liquidGeo = new THREE.CylinderGeometry(0.48, 0.72, 0.5, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x3d1c06,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -0.8;
    v60Group.add(liquidMesh);

    // Dripper Cone (V60)
    const coneGeo = new THREE.ConeGeometry(0.75, 0.9, 32, 1, true);
    coneGeo.rotateX(Math.PI);
    const coneMesh = new THREE.Mesh(coneGeo, glassMaterial);
    coneMesh.position.y = 0.45;
    v60Group.add(coneMesh);

    // Dripper Gold Base Ring
    const sandRingGeo = new THREE.TorusGeometry(0.5, 0.04, 16, 32);
    sandRingGeo.rotateX(Math.PI / 2);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xD2BE9D,
      metalness: 0.85,
      roughness: 0.25,
    });
    const sandRing = new THREE.Mesh(sandRingGeo, sandMat);
    sandRing.position.y = 0.02;
    v60Group.add(sandRing);

    // Paper Filter Inside Cone
    const filterGeo = new THREE.ConeGeometry(0.7, 0.8, 24, 1, true);
    filterGeo.rotateX(Math.PI);
    const filterMat = new THREE.MeshStandardMaterial({
      color: 0xF3EBDD,
      roughness: 0.9,
      metalness: 0.0,
      side: THREE.DoubleSide
    });
    const filterMesh = new THREE.Mesh(filterGeo, filterMat);
    filterMesh.position.y = 0.43;
    v60Group.add(filterMesh);

    // Ground Coffee inside Filter
    const coffeeGroundsGeo = new THREE.CylinderGeometry(0.38, 0.1, 0.3, 16);
    const coffeeGroundsMat = new THREE.MeshStandardMaterial({
      color: 0x22130B,
      roughness: 0.95,
      metalness: 0.05
    });
    const groundsMesh = new THREE.Mesh(coffeeGroundsGeo, coffeeGroundsMat);
    groundsMesh.position.y = 0.35;
    v60Group.add(groundsMesh);

    // 2. FLOATING 3D COFFEE BEANS
    const beanCount = window.innerWidth < 768 ? 20 : 50;
    const beanGroup = new THREE.Group();
    sceneGroup.add(beanGroup);

    const beanGeo = new THREE.SphereGeometry(0.08, 12, 12);
    beanGeo.scale(1.2, 0.75, 1.8); // Characteristic elongated bean shape

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x3b2114,
      roughness: 0.4,
      metalness: 0.15,
    });

    const beansData: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      speed: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < beanCount; i++) {
      const mesh = new THREE.Mesh(beanGeo, beanMat);
      const baseX = (Math.random() - 0.5) * 8;
      const baseY = (Math.random() - 0.5) * 4;
      const baseZ = (Math.random() - 0.5) * 4;

      mesh.position.set(baseX, baseY, baseZ);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      const scale = 0.5 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      beanGroup.add(mesh);

      beansData.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        speed: 0.5 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 3. STEAM PARTICLES RISING FROM V60
    const steamParticleCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamOpacities = new Float32Array(steamParticleCount);
    const steamVelocities: { x: number; y: number; z: number; life: number; maxLife: number }[] = [];

    for (let i = 0; i < steamParticleCount; i++) {
      steamPositions[i * 3 + 0] = -1.4 + (Math.random() - 0.5) * 0.2;
      steamPositions[i * 3 + 1] = 0.7 + Math.random() * 0.6;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      steamOpacities[i] = Math.random();

      steamVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.005 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.003,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 80
      });
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Particle sprite texture created on canvas
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(243, 235, 221, 0.45)');
      grad.addColorStop(0.5, 'rgba(210, 190, 157, 0.2)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    sceneGroup.add(steamParticles);

    // MOUSE PARALLAX LISTENER
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (!prefersReducedMotion) {
        camera.position.x = targetX * 0.4;
        camera.position.y = 0.5 - targetY * 0.25;
        camera.lookAt(0, 0, 0);

        // V60 subtle breath/hover
        v60Group.position.y = -0.2 + Math.sin(elapsedTime * 0.8) * 0.03;
        v60Group.rotation.y = Math.sin(elapsedTime * 0.4) * 0.08;

        // Floating beans animation
        beansData.forEach((b) => {
          b.mesh.rotation.x += b.rotSpeedX;
          b.mesh.rotation.y += b.rotSpeedY;
          b.mesh.position.y = b.baseY + Math.sin(elapsedTime * b.speed + b.phase) * 0.25;
          b.mesh.position.x = b.baseX + Math.cos(elapsedTime * 0.4 + b.phase) * 0.15;
        });

        // Steam particles update
        const positions = steamGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < steamParticleCount; i++) {
          const v = steamVelocities[i];
          v.life += 0.8;

          positions[i * 3 + 0] += v.x + Math.sin(elapsedTime + i) * 0.001;
          positions[i * 3 + 1] += v.y;
          positions[i * 3 + 2] += v.z;

          if (v.life >= v.maxLife || positions[i * 3 + 1] > 2.2) {
            v.life = 0;
            positions[i * 3 + 0] = -1.4 + (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 1] = 0.7;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
          }
        }
        steamGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
