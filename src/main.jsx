import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', background: 'white', color: 'black', height: '100vh', overflow: 'auto' }}>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Error Details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

// Global Error Handler for non-React errors
window.onerror = function (message, source, lineno, colno, error) {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML += `<div style="background:red;color:white;padding:10px;margin:10px;">
          <strong>Global Error:</strong> ${message} at ${source}:${lineno}
      </div>`;
    }
};

try {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </React.StrictMode>,
    )
} catch (e) {
    document.body.innerHTML = `<div style="color:red; font-size: 20px; padding: 20px;">
        CRITICAL INIT ERROR: ${e.message}
    </div>`
}
