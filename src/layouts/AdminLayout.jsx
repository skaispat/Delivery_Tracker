import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-redirect to dashboard on mount
  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo/Brand - Left */}
            <div className="flex items-center gap-3">
              <span className="text-lg sm:text-xl font-bold" style={{ color: '#991b1b' }}>
               Delivery Tracker
              </span>
            </div>

            {/* User Menu - Right */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Info */}
              {user && (
                <div className="flex items-center gap-2">
                  <img 
                    src={user.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2"
                    style={{ borderColor: '#991b1b' }}
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline-block truncate max-w-32">
                    {user.name}
                  </span>
                </div>
              )}

              {/* Logout Button - Desktop */}
              <button 
                onClick={logout}
                className="hidden sm:inline-flex items-center gap-1.5 hover:text-gray-700 focus:outline-none focus:ring-2 rounded-lg px-3 py-2 transition-colors"
                style={{ color: '#991b1b' }}
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Logout</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={toggleMobileMenu}
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: '#991b1b' }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden py-3 border-t border-gray-200">
              {/* Logout Button - Mobile */}
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{ color: '#991b1b', backgroundColor: '#fef2f2' }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-14">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      {/* Fixed Footer */}
      <Footer />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 sm:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;