import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

/**
 * Magnetic wrapper — any child element subtly follows the cursor on hover.
 * Use around buttons/links: <Magnetic><a className="cyber-btn">…</a></Magnetic>
 */
const Magnetic: React.FC<MagneticProps> = ({ children, strength = 12, radius = 220, className = '' }) => {
  const { ref, style, onMove, onLeave } = useMagnetic({ strength, radius });

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};

export default Magnetic;