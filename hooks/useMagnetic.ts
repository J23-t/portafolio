import { useCallback, useRef, useState } from 'react';

interface MagneticOptions {
  strength?: number; // max px displacement (default 14)
  radius?: number;   // activation radius in px (default 200)
}

/**
 * Returns ref + style to attach a magnetic effect to any element.
 * The element subtly follows the cursor within a radius, then springs back.
 */
export function useMagnetic({ strength = 14, radius = 200 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) { setOffset({ x: 0, y: 0 }); return; }
      const factor = 1 - dist / radius;
      setOffset({ x: dx * factor * (strength / radius) * 2, y: dy * factor * (strength / radius) * 2 });
    },
    [strength, radius],
  );

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const style: React.CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0
      ? 'transform 0.4s cubic-bezier(0.23,1,0.32,1)'
      : 'transform 0.1s ease-out',
  };

  return { ref, style, onMove, onLeave };
}
