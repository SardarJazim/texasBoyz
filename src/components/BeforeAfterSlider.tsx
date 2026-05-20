import { useState, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useEffect } from 'react';

interface BeforeAfterSliderProps {
  key?: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  desc?: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage, title, desc }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const onMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    setIsDragging(true);
  };

  return (
    <div className="flex flex-col gap-3 glass-card p-4 rounded-xl border border-white/5 relative group select-none overflow-hidden pulse-border-green">
      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-[10px] tracking-widest uppercase font-mono px-2 py-1 rounded text-[#39ff14] border border-[#39ff14]/30 z-20">
        Slide to compare
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-lg cursor-ew-resize"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* After Image (Full background) */}
        <img 
          src={afterImage} 
          alt={`${title} - After`} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-black/75 px-3 py-1 text-xs text-[#39ff14] font-mono border border-[#39ff14]/30 font-bold uppercase rounded z-10">
          AFTER (detailed)
        </div>

        {/* Before Image (Resized width based on slider position) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt={`${title} - Before`} 
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current?.offsetWidth || '100vw' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 bg-black/75 px-3 py-1 text-xs text-[#ff5f1f] font-mono border border-[#ff5f1f]/30 font-bold uppercase rounded z-10 whitespace-nowrap">
            BEFORE (dirty)
          </div>
        </div>

        {/* Divider line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)] z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider trigger node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full border-2 border-[#39ff14] text-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.5)] flex items-center justify-center font-bold font-mono text-sm z-20 select-none hover:bg-[#39ff14]/20">
            ↔
          </div>
        </div>
      </div>

      <div className="mt-2 text-left">
        <h4 className="font-sans font-bold text-lg text-white tracking-wide group-hover:text-[#39ff14] transition-colors">
          {title}
        </h4>
        {desc && <p className="text-sm text-gray-400 font-sans mt-1">{desc}</p>}
      </div>
    </div>
  );
}
