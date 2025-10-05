'use client';

import { useRef, useCallback, useEffect } from 'react';

interface VoiceMapping {
  [key: string]: string;
}

// Маппинг персонажей на аудиофайлы
// Формат: "scene-{sceneId}-line-{lineIndex}.mp3"
const getVoiceFilePath = (character: string, sceneId: number, lineIndex: number): string => {
  return `/sounds/voices/scene-${sceneId}-line-${lineIndex}.mp3`;
};

export function useVoicePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentPlayingRef = useRef<{ sceneId: number; lineIndex: number } | null>(null);

  // Остановить текущую озвучку
  const stopVoice = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      currentPlayingRef.current = null;
    }
  }, []);

  // Воспроизвести озвучку для строки
  const playVoice = useCallback((character: string, sceneId: number, lineIndex: number) => {
    // Остановить предыдущую озвучку
    stopVoice();

    // Создать новый аудио элемент
    const audio = new Audio(getVoiceFilePath(character, sceneId, lineIndex));
    audio.volume = 0.8; // 80% громкость для голосов
    audioRef.current = audio;
    currentPlayingRef.current = { sceneId, lineIndex };

    // Воспроизвести
    audio.play().catch(err => {
      // Если файл не найден, не показываем ошибку - это нормально
      console.log(`Голосовой файл не найден: scene-${sceneId}-line-${lineIndex}.mp3`);
    });

    // Автоматически очистить после завершения
    audio.addEventListener('ended', () => {
      currentPlayingRef.current = null;
    });

    return audio;
  }, [stopVoice]);

  // Проверить, воспроизводится ли эта строка
  const isPlaying = useCallback((sceneId: number, lineIndex: number): boolean => {
    return (
      currentPlayingRef.current?.sceneId === sceneId &&
      currentPlayingRef.current?.lineIndex === lineIndex &&
      audioRef.current !== null &&
      !audioRef.current.paused
    );
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, [stopVoice]);

  return {
    playVoice,
    stopVoice,
    isPlaying,
  };
}

/*
ИНСТРУКЦИЯ ПО ИСПОЛЬЗОВАНИЮ:

1. Создайте папку public/sounds/voices/

2. Поместите туда озвученные файлы в формате:
   scene-{номер_сцены}-line-{номер_строки}.mp3

   Примеры:
   - scene-1-line-0.mp3  (первая строка первой сцены)
   - scene-1-line-1.mp3  (вторая строка первой сцены)
   - scene-2-line-0.mp3  (первая строка второй сцены)
   и т.д.

3. Компонент автоматически попробует загрузить нужный файл
   Если файл не найден - просто ничего не произойдет

4. Можно использовать любой аудиоформат: mp3, wav, ogg

ПРИМЕР СТРУКТУРЫ:
public/
  sounds/
    voices/
      scene-1-line-0.mp3
      scene-1-line-1.mp3
      scene-1-line-2.mp3
      scene-2-line-0.mp3
      ...
*/

