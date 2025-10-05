'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export default function AudioPlayer({ autoPlay = true }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Инициализация аудио
    const audio = new Audio('/sounds/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3; // 30% громкость по умолчанию
    audioRef.current = audio;

    // Обработчики событий
    const handleCanPlay = () => {
      setIsLoaded(true);
      if (autoPlay) {
        audio.play().catch(err => {
          console.log('Автовоспроизведение заблокировано браузером:', err);
          setIsPlaying(false);
        });
      }
    };

    const handleError = (e: ErrorEvent) => {
      console.log('Аудиофайл не найден. Поместите background-music.mp3 в папку public/sounds/');
      setIsLoaded(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError as any);

    return () => {
      audio.pause();
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError as any);
    };
  }, [autoPlay]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.log('Ошибка воспроизведения:', err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggleAudio}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-cosmic-purple/80 to-cosmic-blue/80 backdrop-blur-sm border-2 border-cosmic-cyan/30 shadow-lg hover:shadow-cosmic-cyan/50 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      title={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="volume-on"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <Volume2 className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </motion.div>
        ) : (
          <motion.div
            key="volume-off"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <VolumeX className="w-6 h-6 text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Пульсирующий эффект когда музыка играет */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full bg-cosmic-cyan/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
}

