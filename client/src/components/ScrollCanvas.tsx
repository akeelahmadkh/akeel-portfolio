import React, { useEffect, useRef, useState } from 'react';

interface ScrollCanvasProps {
  totalFrames?: number;
  folderPath?: string;
  onLoaded?: () => void;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  totalFrames = 192,
  folderPath = '/video_frames_30fps_png',
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // 1. Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const pad = (num: number, size: number) => {
      let s = num + '';
      while (s.length < size) s = '0' + s;
      return s;
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const filename = `frame_${pad(i, 6)}.png`;
      img.src = `${folderPath}/${filename}`;

      img.onload = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / totalFrames) * 100);
        setLoadProgress(percent);

        if (loadedCount === totalFrames) {
          setIsLoaded(true);
          if (onLoaded) onLoaded();
        }
      };

      img.onerror = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / totalFrames) * 100);
        setLoadProgress(percent);
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
          if (onLoaded) onLoaded();
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [totalFrames, folderPath]);

  // 2. Render frame to canvas with aspect-ratio cover
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate aspect ratio cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 3. Scroll tracking & Lerp rendering loop
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      targetFrameRef.current = Math.floor(scrollFraction * (totalFrames - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Lerp render loop for 60fps buttery smoothness
    const loop = () => {
      const ease = 0.15;
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * ease;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.min(
        Math.max(Math.round(currentFrameRef.current), 0),
        totalFrames - 1
      );

      renderFrame(frameToDraw);
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isLoaded, images, totalFrames]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <>
      {/* Luxury Loading Screen Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-[#F5F5F7] px-4">
          <div className="w-20 h-20 mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping"></div>
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin"></div>
            <span className="font-mono text-xs text-[#D4AF37]">AK</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2 font-mono">
            AKEEL • AI + MOBILE DEVELOPER
          </p>
          <h2 className="text-xl md:text-2xl font-serif text-[#F5F5F7] mb-4">
            Loading Cinematic Experience...
          </h2>
          <div className="w-64 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-amber-500/20">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-300 transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="font-mono text-xs text-neutral-400 mt-2">{loadProgress}% loaded</p>
        </div>
      )}

      {/* Canvas Element Pinned in Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-45"
      />
    </>
  );
};
