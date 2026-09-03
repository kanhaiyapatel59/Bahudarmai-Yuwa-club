import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BYC Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-lg">
            BYC
          </div>
          <h2 className="text-xl font-bold">Bahudarmai Yuwa Club</h2>
          <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
            The application encountered a temporary network glitch. Please tap reload below.
          </p>
          <button
            onClick={() => {
              if (window.caches) {
                window.caches.keys().then((names) => {
                  names.forEach((name) => window.caches.delete(name));
                });
              }
              window.location.reload(true);
            }}
            className="px-6 py-3 bg-[#0055A5] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Reload Mobile Page 🔄
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
