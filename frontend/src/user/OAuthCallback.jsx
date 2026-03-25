import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(location.search);
    const userId = params.get('id');
    const role = params.get('role');
    const name = params.get('name');
    const email = params.get('email');

    if (userId && role) {
      // Store user data in localStorage
      const userData = {
        id: parseInt(userId),
        name: name,
        email: email,
        role: role
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to appropriate dashboard
      if (role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/user/dashboard';
      }
    } else {
      // If no user data, redirect to login
      window.location.href = '/user/login';
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      <div className="text-center text-white">
        <div className="inline-block p-3 glass-card rounded-2xl mb-4">
          <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Completing Google Sign In...</h2>
        <p className="text-white/70">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}

export default OAuthCallback;