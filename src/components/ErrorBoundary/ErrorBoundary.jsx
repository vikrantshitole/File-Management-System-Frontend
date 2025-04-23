// components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
            <div className="error-boundary">
                <h2>Something went wrong. Please try again later.</h2>
                <button onClick={() => window.location.reload()}>Reload</button>
            </div>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
