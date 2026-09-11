import React, { useCallback } from 'react';

interface ShimmerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Wraps any element to add mouse-tracking glass reflection on itself.
 * Compose with glass-card className: <ShimmerCard className="glass-card ...">
 * Uses a ::before (via .glass-shimmer) so the gradient is local and accurate.
 */
const ShimmerCard: React.FC<ShimmerCardProps> = ({ children, className = '', onMouseMove, onMouseLeave, ...props }) => {
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--shimmer-x', `${x}%`);
    el.style.setProperty('--shimmer-y', `${y}%`);
    el.style.setProperty('--shimmer-opacity', '1');
    onMouseMove?.(e);
  }, [onMouseMove]);

  const handleLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.setProperty('--shimmer-opacity', '0');
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  return (
    <div className={`glass-shimmer ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave} {...props}>
      {children}
    </div>
  );
};

export default ShimmerCard;