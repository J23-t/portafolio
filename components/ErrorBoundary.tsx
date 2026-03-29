import React from 'react';

interface State { hasError: boolean; }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Portfolio error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--dark-bg)' }}>
          <div className="glass-card rounded-xl p-8 text-center max-w-md mx-4">
            <p className="font-orbitron text-2xl neon-text mb-3">ERROR</p>
            <p className="font-mono-jb text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Algo salió mal. Por favor recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="cyber-btn"
            >
              RECARGAR
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
