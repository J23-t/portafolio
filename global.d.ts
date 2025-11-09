// Global TypeScript declarations for custom elements and React
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': {
        name?: string;
        class?: string;
        className?: string;
        style?: React.CSSProperties;
        [key: string]: any;
      };
    }
  }
}
