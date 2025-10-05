'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookPage from './BookPage';
import { Scene, sceneImages } from '@/data/story';
import Image from 'next/image';

interface Book3DProps {
  scenes: Scene[];
  currentSceneIndex: number;
  visibleLinesInScene: number[];
  bookOpenProgress: number;
}

export default function Book3D({ scenes, currentSceneIndex, visibleLinesInScene, bookOpenProgress }: Book3DProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayedSceneIndex, setDisplayedSceneIndex] = useState(currentSceneIndex);
  const [nextSceneIndex, setNextSceneIndex] = useState(currentSceneIndex);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const previousSceneRef = useRef(currentSceneIndex);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  // Preload images for current, next, and previous scenes
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [
        currentSceneIndex - 1,
        currentSceneIndex,
        currentSceneIndex + 1,
        currentSceneIndex + 2,
      ].filter(idx => idx >= 0 && idx < scenes.length);

      imagesToPreload.forEach(idx => {
        const scene = scenes[idx];
        const imageUrl = sceneImages[scene.id];
        if (imageUrl && !imagesLoaded.has(scene.id)) {
          const img = new window.Image();
          img.src = imageUrl;
          img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, scene.id]));
          };
        }
      });
    };

    preloadImages();
  }, [currentSceneIndex, scenes, imagesLoaded]);

  useEffect(() => {
    // Only flip pages when book is fully open (not during opening/closing)
    if (previousSceneRef.current !== currentSceneIndex && bookOpenProgress >= 0.95) {
      // Determine flip direction
      const direction = currentSceneIndex > previousSceneRef.current ? 'forward' : 'backward';
      setFlipDirection(direction);
      setNextSceneIndex(currentSceneIndex);
      setIsFlipping(true);
      
      // Trigger star pulse effect on page flip
      window.dispatchEvent(new Event('pageFlip'));
      
      // Update displayed scene in the middle of flip animation
      const timer = setTimeout(() => {
        setDisplayedSceneIndex(currentSceneIndex);
      }, 600); // Half of animation time for smooth transition
      
      const endTimer = setTimeout(() => {
        setIsFlipping(false);
        previousSceneRef.current = currentSceneIndex;
      }, 1200); // Slower, more elegant animation
      
      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    } else if (bookOpenProgress < 0.95) {
      // Reset flipping state if book is closing
      setIsFlipping(false);
    }
    
    // Update displayed scene immediately if book is not open enough for animation
    if (bookOpenProgress < 0.95 && previousSceneRef.current !== currentSceneIndex) {
      setDisplayedSceneIndex(currentSceneIndex);
      setNextSceneIndex(currentSceneIndex);
      previousSceneRef.current = currentSceneIndex;
    }
  }, [currentSceneIndex, bookOpenProgress]);

  const currentScene = scenes[displayedSceneIndex];
  const nextScene = scenes[nextSceneIndex];
  const imageUrl = sceneImages[currentScene.id];
  const nextImageUrl = sceneImages[nextScene.id];

  // Calculate book dimensions
  const bookWidth = 1400; // Total width when open
  const bookHeight = 800;
  const pageWidth = bookWidth / 2;

  // Book is closed at the start (progress 0) and fully open at progress 1
  const leftRotation = bookOpenProgress < 0.5 ? -(1 - bookOpenProgress * 2) * 90 : 0;
  const rightRotation = bookOpenProgress < 0.5 ? (1 - bookOpenProgress * 2) * 90 : 0;

  const leftPageStyle = {
    transform: `perspective(2000px) rotateY(${leftRotation}deg)`,
    transformOrigin: 'right center',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const rightPageStyle = {
    transform: `perspective(2000px) rotateY(${rightRotation}deg)`,
    transformOrigin: 'left center',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className="flex items-center justify-center w-full h-screen p-8">
      <div
        className="relative flex"
        style={{
          width: `${bookWidth}px`,
          height: `${bookHeight}px`,
          maxWidth: '90vw',
          maxHeight: '85vh',
        }}
      >
        {/* Left Page */}
        <motion.div
          className="absolute left-0 bg-gradient-to-br from-slate-900 to-slate-800 rounded-l-xl shadow-2xl border-l-2 border-t-2 border-b-2 border-cosmic-purple/40 overflow-hidden"
          style={{
            ...leftPageStyle,
            width: `${pageWidth}px`,
            height: '100%',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {bookOpenProgress > 0.3 && (
            <BookPage
              content={currentScene.imagePosition === 'left' ? 'image' : 'text'}
              imageUrl={currentScene.imagePosition === 'left' ? imageUrl : undefined}
              lines={currentScene.imagePosition === 'left' ? undefined : currentScene.lines}
              visibleLines={currentScene.imagePosition === 'left' ? undefined : visibleLinesInScene}
              isLeft={true}
            />
          )}
          
          {/* Book spine glow effect */}
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-cosmic-cyan/50 via-cosmic-purple/50 to-cosmic-blue/50 blur-sm" />
        </motion.div>

        {/* Book Spine (center) */}
        <div
          className="absolute left-1/2 top-0 h-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 shadow-inner"
          style={{
            width: '20px',
            transform: 'translateX(-50%)',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
            zIndex: 10,
          }}
        >
          {/* Spine details */}
          <div className="w-full h-full flex flex-col justify-evenly items-center py-8">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-1/2 h-0.5 bg-cosmic-cyan/20 rounded" />
            ))}
          </div>
        </div>

        {/* Right Page */}
        <motion.div
          className="absolute right-0 bg-gradient-to-bl from-slate-900 to-slate-800 rounded-r-xl shadow-2xl border-r-2 border-t-2 border-b-2 border-cosmic-blue/40 overflow-hidden"
          style={{
            ...rightPageStyle,
            width: `${pageWidth}px`,
            height: '100%',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {bookOpenProgress > 0.3 && (
            <BookPage
              content={currentScene.imagePosition === 'right' ? 'image' : 'text'}
              imageUrl={currentScene.imagePosition === 'right' ? imageUrl : undefined}
              lines={currentScene.imagePosition === 'right' ? undefined : currentScene.lines}
              visibleLines={currentScene.imagePosition === 'right' ? undefined : visibleLinesInScene}
              isLeft={false}
            />
          )}
          
          {/* Book spine glow effect */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cosmic-cyan/50 via-cosmic-purple/50 to-cosmic-blue/50 blur-sm" />
        </motion.div>

        {/* Animated Flipping Page with content - only show when book is fully open */}
        <AnimatePresence mode="wait">
          {isFlipping && bookOpenProgress >= 0.95 && (
            <motion.div
              key={`flip-${nextSceneIndex}`}
              className="absolute top-0 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl border-2 border-cosmic-cyan/30 overflow-hidden pointer-events-none"
              style={{
                width: `${pageWidth}px`,
                height: '100%',
                left: flipDirection === 'forward' ? '50%' : 'auto',
                right: flipDirection === 'backward' ? '50%' : 'auto',
                transformOrigin: flipDirection === 'forward' ? 'left center' : 'right center',
                zIndex: 20,
                backfaceVisibility: 'hidden',
              }}
              initial={{
                rotateY: 0,
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
              }}
              animate={{
                rotateY: flipDirection === 'forward' ? -180 : 180,
                boxShadow: [
                  '0 0 40px rgba(6, 182, 212, 0.5)',
                  '0 0 80px rgba(139, 92, 246, 0.8)',
                  '0 0 60px rgba(6, 182, 212, 0.6)',
                  '0 0 40px rgba(139, 92, 246, 0.5)',
                ],
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94], // Более плавная кривая easeInOutQuad
              }}
            >
              {/* Page texture overlay with animated gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
                animate={{
                  background: [
                    'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.15), rgba(255,255,255,0.1))',
                    'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  ]
                }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page flip light effect - only show when book is fully open */}
        <AnimatePresence>
          {isFlipping && bookOpenProgress >= 0.95 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-15"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.7, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-cosmic-cyan/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden preload images */}
        <div className="hidden">
          {[currentSceneIndex - 1, currentSceneIndex + 1, currentSceneIndex + 2].map((idx) => {
            if (idx >= 0 && idx < scenes.length) {
              const scene = scenes[idx];
              const preloadUrl = sceneImages[scene.id];
              return preloadUrl ? (
                <Image
                  key={`preload-${scene.id}`}
                  src={preloadUrl}
                  alt="Preload"
                  width={1}
                  height={1}
                  priority
                />
              ) : null;
            }
            return null;
          })}
        </div>

        {/* Outer glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-cosmic-purple/20 via-cosmic-cyan/20 to-cosmic-blue/20 blur-3xl -z-10 animate-pulse-slow" />
      </div>
    </div>
  );
}
