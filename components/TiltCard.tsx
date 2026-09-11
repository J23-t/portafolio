import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // max degrees (default 8)
  scale?: number;   // hover scale (default 1.02)
}

/**
 * 3D tilt card — follows cursor with spring physics.
 * Respects prefers-reduced-motion and only activates on fine pointers.
 */
const TiltCard: React.FC<TiltCardProps> = ({ children, maxTilt = 8, scale = 1.02, className = '', style, ...props }) => {
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 16 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16 });
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const noReduce = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(fine && noReduce);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * maxTilt);
    ry.set((px - 0.5) * maxTilt);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1200, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', scale: canTilt ? scale : 1 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TiltCard;