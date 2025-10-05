'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { StoryLine } from '@/data/story';
import { Sparkles } from 'lucide-react';

interface BookPageProps {
  content: 'image' | 'text';
  imageUrl?: string;
  lines?: StoryLine[];
  visibleLines?: number[];
  isLeft?: boolean;
}

export default function BookPage({ content, imageUrl, lines, visibleLines, isLeft }: BookPageProps) {
  // Get character-specific color based on their name meaning
  const getCharacterColor = (character?: string) => {
    if (!character) return 'text-cosmic-cyan';
    
    switch (character) {
      case 'Khurshed':
        // Khurshed means "Sun" - golden/amber color
        return 'text-amber-400';
      case 'Mehrob':
        // Mehrob means "place of light" - cyan/light blue
        return 'text-cosmic-cyan';
      case 'Rawshan':
        // Rawshan means "luminous/bright" - purple/violet
        return 'text-purple-400';
      default:
        return 'text-cosmic-cyan';
    }
  };

  const getLineStyle = (type: string, character?: string) => {
    switch (type) {
      case 'dialogue':
        return {
          className: 'text-base leading-relaxed mb-3',
          prefix: character ? (
            <span className={`font-bold ${getCharacterColor(character)} drop-shadow-[0_0_8px_currentColor]`}>
              {character}:{' '}
            </span>
          ) : null,
        };
      case 'narration':
        return {
          className: 'text-sm italic text-gray-300 leading-relaxed mb-2',
          prefix: null,
        };
      case 'didYouKnow':
        return {
          className: 'text-sm leading-relaxed mb-4 p-4 rounded-lg bg-gradient-to-r from-cosmic-purple/20 to-cosmic-blue/20 border border-cosmic-cyan/30',
          prefix: (
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cosmic-cyan animate-pulse" />
              <span className="font-bold text-cosmic-cyan">Did you know?</span>
            </div>
          ),
        };
      case 'stage':
        return {
          className: 'text-sm text-gray-400 italic leading-relaxed mb-2',
          prefix: null,
        };
      default:
        return {
          className: 'text-base leading-relaxed mb-3',
          prefix: null,
        };
    }
  };

  if (content === 'image' && imageUrl) {
    return (
      <div className="relative w-full h-full p-8 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-cosmic-cyan/30">
          <Image
            src={imageUrl}
            alt="Scene illustration"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          {/* Holographic effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-cyan/10 via-transparent to-cosmic-purple/10 animate-pulse-slow" />
        </div>
      </div>
    );
  }

  if (content === 'text' && lines) {
    return (
      <div className="relative w-full h-full p-10 flex flex-col overflow-hidden">
        {/* Page texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 opacity-30" />
        
        {/* Content container */}
        <div className="relative flex-1 flex flex-col justify-center space-y-4 text-white overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="sync">
            {lines.map((line, index) => {
              const isVisible = visibleLines?.includes(index);
              if (!isVisible) return null;

              const style = getLineStyle(line.type, line.character);

              return (
                <motion.div
                  key={`${index}-${line.text.substring(0, 20)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={style.className}
                >
                  {style.prefix}
                  {line.type === 'didYouKnow' ? (
                    <div className="text-gray-200">{line.text}</div>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Futuristic corner decorations */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cosmic-cyan/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cosmic-cyan/50" />
      </div>
    );
  }

  return null;
}
