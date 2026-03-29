import { useInView } from 'react-intersection-observer';

type AnimationType = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'reveal';

export const ANIMATION_VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
  },
  reveal: {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.6, ease: 'easeOut' } },
  },
};

export function useScrollAnimation(type: AnimationType = 'fade', threshold = 0.1) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  return { ref, inView, variants: ANIMATION_VARIANTS[type] };
}
