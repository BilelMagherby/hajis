import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CoffeeBag3DProps {
  className?: string;
}

export const CoffeeBag3D: React.FC<CoffeeBag3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.8);
    scene.add(ambientLight);

    const goldDirLight = new THREE.DirectionalLight(0xE3C994, 2.5);
    goldDirLight.position.set(3, 4, 3);
    scene.add(goldDirLight);

    const rimLight = new THREE.PointLight(0xC8A46A, 2, 8);
    rimLight.position.set(-2, 1, -2);
    scene.add(rimLight);

    // Root Group
    const bagGroup = new THREE.Group();
    scene.add(bagGroup);

    // Dynamic High-Resolution Bag Label Texture on Canvas
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 1024;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      // Matte dark espresso bag background
      ctx.fillStyle = '#160D08';
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle textured border
      ctx.strokeStyle = '#2A180E';
      ctx.lineWidth = 12;
      ctx.strokeRect(30, 30, 964, 964);

      // Gold foil brand typography
      ctx.fillStyle = '#E3C994';
      ctx.font = '800 84px "Tajawal", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HAJISS', 512, 340);

      ctx.fillStyle = '#C8A46A';
      ctx.font = '500 32px "Tajawal", sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('SPECIALTY COFFEE', 512, 410);

      // Gold divider line
      ctx.strokeStyle = '#C8A46A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(380, 450);
      ctx.lineTo(644, 450);
      ctx.stroke();

      // Coffee origin details
      ctx.fillStyle = '#F8F4EC';
      ctx.font = '400 24px "Tajawal", sans-serif';
      ctx.fillText('SINGLE ORIGIN • ETHIOPIA', 512, 510);
      ctx.fillText('محصول إثيوبيا يرغاتشيف الفاخر', 512, 555);

      ctx.fillStyle = '#C8BAA6';
      ctx.font = '300 20px "Tajawal", sans-serif';
      ctx.fillText('ROASTED IN HAIL, SAUDI ARABIA', 512, 630);
      ctx.fillText('250G • NET WT 8.8 OZ', 512, 680);

      // Saudi emblem / palm icon
      ctx.fillStyle = '#E3C994';
      ctx.font = '400 36px "Tajawal", sans-serif';
      ctx.fillText('✦ ✦ ✦', 512, 760);
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas);

    // Pouch Geometry (Tapered rectangular box with rounded bevels)
    const bagGeo = new THREE.BoxGeometry(1.6, 2.2, 0.85, 16, 16, 16);
    
    // Taper top slightly to simulate sealed pouch
    const pos = bagGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0.5) {
        const factor = 1 - (y - 0.5) * 0.45;
        pos.setZ(i, pos.getZ(i) * factor);
      }
    }
    bagGeo.computeVertexNormals();

    const bagMat = new THREE.MeshStandardMaterial({
      color: 0x1A100A,
      roughness: 0.45,
      metalness: 0.15,
      map: labelTexture,
    });

    const bagMesh = new THREE.Mesh(bagGeo, bagMat);
    bagGroup.add(bagMesh);

    // Top Pouch Seal Crimping
    const sealGeo = new THREE.BoxGeometry(1.65, 0.15, 0.12);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0x110B07,
      roughness: 0.3,
      metalness: 0.2
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.position.y = 1.15;
    bagGroup.add(sealMesh);

    // Ground shadow plane
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const g = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      g.addColorStop(0, 'rgba(0,0,0,0.7)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = g;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.2;
    bagGroup.add(shadowMesh);

    // Drag / Hover Interaction
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = -0.3;
    let currentRotationY = -0.3;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const delta = e.clientX - previousMouseX;
        targetRotationY += delta * 0.008;
        previousMouseX = e.clientX;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const delta = e.touches[0].clientX - touchStartX;
        targetRotationY += delta * 0.008;
        touchStartX = e.touches[0].clientX;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow auto rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.003;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      bagGroup.rotation.y = currentRotationY;
      bagGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;

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
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      labelTexture.dispose();
      shadowTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing w-full h-[400px] md:h-[480px] ${className}`}
      title="اسحب لتدوير عبوة قهوة هاجس 3D"
    />
  );
};
