import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Automatically clean stale service worker caches and unregister legacy service workers
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BYC Application Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
          <div className="w-16 h-16 rounded-full bg-[#02529C] text-white flex items-center justify-center font-black text-2xl shadow-lg">
            BYC
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Bahudarmai Yuwa Club</h2>
          <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
            {this.state.error?.message || 'Session refreshed. Tap below to continue.'}
          </p>
          <button
            onClick={() => {
              if (window.caches) {
                window.caches.keys().then((names) => {
                  names.forEach((name) => window.caches.delete(name));
                });
              }
              window.location.href = '/login';
            }}
            className="px-6 py-3 bg-[#02529C] hover:bg-[#013F7A] text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Return to Login Page 🔄
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
