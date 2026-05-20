import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // Inner dot lags slightly less than outer circle
      setInnerPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer');
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div 
        className="glow-cursor"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
          borderColor: isPointer ? '#ff5f1f' : '#39ff14',
          boxShadow: isPointer 
            ? '0 0 15px #ff5f1f, inset 0 0 10px #ff5f1f' 
            : '0 0 10px #39ff14, inset 0 0 5px #39ff14'
        }}
      />
      <div 
        className="glow-cursor-inner"
        style={{ 
          left: `${innerPosition.x}px`, 
          top: `${innerPosition.y}px`,
          backgroundColor: isPointer ? '#39ff14' : '#ff5f1f',
          boxShadow: isPointer ? '0 0 8px #39ff14' : '0 0 5px #ff5f1f'
        }}
      />
    </>
  );
}
