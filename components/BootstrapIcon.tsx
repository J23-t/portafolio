import React from 'react';

/**
 * Bootstrap brand logo as inline SVG.
 * Ionicons (v7) does not include a `logo-bootstrap` icon, so we render the
 * official logo manually for brand fidelity.
 */
const BootstrapIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
    {...props}
  >
    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5z" />
    <path d="M7.5 6h4.25c1.658 0 3 .342 3 1.5 0 .98-.714 1.692-1.278 1.846.854.44 1.55 1.18 1.55 2.088C15 13.889 13.425 15 11.375 15H7.5Zm1.625 2.8h2.55c.95 0 1.625-.26 1.625-1.05 0-.736-.5-1.05-1.5-1.05H9.125Zm2.675 4.05c1.025 0 1.7-.32 1.7-1.2 0-.905-.55-1.15-1.65-1.15H9.125v2.35z" />
  </svg>
);

export default BootstrapIcon;