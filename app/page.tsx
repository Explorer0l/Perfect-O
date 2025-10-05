'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarryBackground from '@/components/StarryBackground';
import Book3D from '@/components/Book3D';
import { storyData } from '@/data/story';
import { BookOpen, ArrowDown } from 'lucide-react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [visibleLinesInScene, setVisibleLinesInScene] = useState<number[]>([]);
  const [bookOpenProgress, setBookOpenProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const totalScenes = storyData.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / scrollHeight, 1);
      
      setScrollProgress(progress);
      
      // Hide scroll hint after first scroll
      if (scrolled > 50 && showScrollHint) {
        setShowScrollHint(false);
      }

      // Book opening animation (first 10% of scroll)
      if (progress < 0.1) {
        setBookOpenProgress(progress * 10);
      } else if (progress > 0.9) {
        // Book closing animation (last 10% of scroll)
        setBookOpenProgress(1 - ((progress - 0.9) * 10));
      } else {
        setBookOpenProgress(1);
      }

      // Calculate which scene we're on (skip first 10% and last 10%)
      const storyProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.8));
      const sceneIndex = Math.floor(storyProgress * totalScenes);
      const finalSceneIndex = Math.min(sceneIndex, totalScenes - 1);

      // Calculate progress within current scene
      const sceneProgressStart = finalSceneIndex / totalScenes;
      const sceneProgressEnd = (finalSceneIndex + 1) / totalScenes;
      const progressInScene = (storyProgress - sceneProgressStart) / (sceneProgressEnd - sceneProgressStart);

      // Update current scene
      if (finalSceneIndex !== currentSceneIndex) {
        setCurrentSceneIndex(finalSceneIndex);
        setVisibleLinesInScene([]);
      }

      // Calculate visible lines based on progress in scene
      const currentScene = storyData[finalSceneIndex];
      const totalLines = currentScene.lines.length;
      const maxVisibleLines = 6; // Maximum lines visible at once
      
      // Calculate how many lines should be visible
      const linesToShow = Math.ceil(progressInScene * totalLines);
      
      // If we have more lines than max visible, slide them up
      if (linesToShow > maxVisibleLines) {
        const startIndex = linesToShow - maxVisibleLines;
        const endIndex = linesToShow;
        const newVisibleLines = Array.from(
          { length: endIndex - startIndex },
          (_, i) => startIndex + i
        );
        setVisibleLinesInScene(newVisibleLines);
      } else {
        const newVisibleLines = Array.from({ length: linesToShow }, (_, i) => i);
        setVisibleLinesInScene(newVisibleLines);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSceneIndex, totalScenes, showScrollHint]);

  // Calculate total scroll height needed
  const scrollMultiplier = 500; // pixels per scene
  const totalScrollHeight = totalScenes * scrollMultiplier + (typeof window !== 'undefined' ? window.innerHeight : 1000) * 2;

  return (
    <>
      <StarryBackground />
      
      <div ref={containerRef} style={{ height: `${totalScrollHeight}px` }}>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          {/* Title overlay - shows when book is closed */}
          <AnimatePresence>
            {bookOpenProgress < 0.3 && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="absolute top-20 z-20 text-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="w-12 h-12 text-cosmic-cyan animate-pulse" />
                  <h1 className="text-6xl font-bold text-glow bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-pink bg-clip-text text-transparent">
                    Stellar Stories
                  </h1>
                </div>
                <p className="text-xl text-gray-300 font-light">
                  Space Weather Through the Eyes of Earthlings
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Book component */}
          <Book3D
            scenes={storyData}
            currentSceneIndex={currentSceneIndex}
            visibleLinesInScene={visibleLinesInScene}
            bookOpenProgress={bookOpenProgress}
          />

          {/* Progress indicator */}
          {bookOpenProgress > 0.3 && bookOpenProgress < 0.95 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-gray-400">
                  Scene {currentSceneIndex + 1} of {totalScenes}
                </div>
                <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cosmic-cyan to-cosmic-purple"
                    style={{ width: `${(currentSceneIndex + 1) / totalScenes * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Scroll hint */}
          <AnimatePresence>
            {showScrollHint && bookOpenProgress < 0.1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-12 z-20 flex flex-col items-center gap-2 text-cosmic-cyan animate-float"
              >
                <span className="text-sm font-light">Scroll to begin your journey</span>
                <ArrowDown className="w-6 h-6 animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Atmospheric lighting effects */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
    </>
  );
}
