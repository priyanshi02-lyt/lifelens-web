import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LifeLens ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#faf8fc] text-[#2d1f3f]">
          <div className="max-w-md w-full p-8 rounded-[28px] bg-white ring-1 ring-[#ece9f3] shadow-xl text-center space-y-4">
            <div className="size-12 mx-auto grid place-items-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <h2 className="font-heading text-2xl font-bold">Something went unexpectedly quiet</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We encountered a minor hiccup rendering this moment. Your data is secure and persisted locally.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="primary-button mx-auto !py-2.5 !px-5 text-xs inline-flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Reload LifeLens</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
