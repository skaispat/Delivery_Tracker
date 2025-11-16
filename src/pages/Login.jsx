import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(async () => {
      const success = await login(username, password);
      
      if (success) {
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Try: admin / admin123');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-0 overflow-hidden pb-12">
      {/* Main Container */}
      <div className="w-full h-full bg-white">
        
        {/* Mobile View - Perfect Center */}
        <div className="lg:hidden h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full px-4 flex flex-col items-center">
            
            {/* Logo Section */}
            <div className="text-center mb-6">
              <div className="flex flex-col items-center gap-2 mb-3">
                <img 
                  src="/Image/logo.jpg" 
                  alt="Sarthak TMT Logo"
                  className="h-16 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img 
                  src="/Image/JSW.png" 
                  alt="JSW One TMT Logo"
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: '#991b1b' }}>
                Delivery Tracker
              </h1>
            </div>

            {/* Form and Hero Container */}
            <div className="relative w-full max-w-sm flex justify-center">
              <div className="relative" style={{ width: '280px' }}>
                
                {/* Error Message */}
                {error && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-700 p-2.5">
                    <div className="flex items-center">
                      <AlertCircle size={14} className="text-red-700 mr-2 flex-shrink-0" />
                      <span className="text-red-800 text-xs">{error}</span>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  {/* User ID Input */}
                  <div>
                    <label htmlFor="username-mobile" className="block text-base font-bold mb-1.5" style={{ color: '#991b1b' }}>
                      User ID
                    </label>
                    <input
                      id="username-mobile"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-black focus:outline-none focus:border-black rounded"
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password-mobile" className="block text-base font-bold mb-1.5" style={{ color: '#991b1b' }}>
                      Password
                    </label>
                    <input
                      id="password-mobile"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-black focus:outline-none focus:border-black rounded"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-6 text-white text-base font-bold hover:opacity-90 transition-opacity disabled:opacity-70"
                    style={{ backgroundColor: '#991b1b' }}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>

                {/* Hero Image - Overlapping from Right */}
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '-100px',
                    width: '200px',
                    zIndex: 5
                  }}
                >
                  <img 
                    src="/Image/icon.png" 
                    alt="TMT Superhero"
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Side by Side Layout */}
        <div className="hidden lg:flex lg:min-h-screen lg:items-center lg:justify-center lg:p-12">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Login Form */}
              <div className="flex flex-col">
                {/* Logo Section */}
                <div className="mb-8">
                  <div className="mb-4 flex flex-col gap-2">
                    <img 
                      src="/Image/logo.jpg" 
                      alt="Sarthak TMT Logo"
                      className="h-24 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <img 
                      src="/Image/JSW.png" 
                      alt="JSW One TMT Logo"
                      className="h-16 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <h1 className="text-4xl font-bold" style={{ color: '#991b1b' }}>
                    Delivery Tracker
                  </h1>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 bg-red-50 border-l-4 border-red-700 p-3">
                    <div className="flex items-center">
                      <AlertCircle size={16} className="text-red-700 mr-2 flex-shrink-0" />
                      <span className="text-red-800 text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5 max-w-sm w-full">
                  {/* User ID Input */}
                  <div>
                    <label htmlFor="username-desktop" className="block text-lg font-bold mb-2" style={{ color: '#991b1b' }}>
                      User ID
                    </label>
                    <input
                      id="username-desktop"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black rounded"
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password-desktop" className="block text-lg font-bold mb-2" style={{ color: '#991b1b' }}>
                      Password
                    </label>
                    <input
                      id="password-desktop"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-black rounded"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 text-white text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-70"
                    style={{ backgroundColor: '#991b1b' }}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              </div>

              {/* Right Side - Hero Image (Desktop) */}
              <div className="flex items-center justify-center">
                <img 
                  src="/Image/icon.png" 
                  alt="TMT Superhero"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '550px', maxWidth: '100%' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;