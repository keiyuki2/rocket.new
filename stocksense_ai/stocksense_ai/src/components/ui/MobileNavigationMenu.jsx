import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const MobileNavigationMenu = ({ 
  isOpen, 
  onClose, 
  navigationItems, 
  currentUser, 
  activeRoute 
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[1200] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Menu */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-[1200] md:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="var(--color-primary-foreground)" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                StockSense AI
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-surface transition-smooth"
              aria-label="Close menu"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface border border-border">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-foreground">{currentUser.name}</div>
                <div className="text-sm text-text-secondary">{currentUser.email}</div>
                <div className="text-xs text-primary">{currentUser.subscription} Plan</div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4">
            <nav className="space-y-2 px-4">
              {navigationItems.map((item) => {
                const isActive = activeRoute === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/20' :'text-text-secondary hover:text-foreground hover:bg-surface'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-75">{item.tooltip}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 px-4">
              <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                Quick Actions
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation('/user-profile-settings')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-text-secondary hover:text-foreground hover:bg-surface transition-smooth"
                >
                  <Icon name="Settings" size={18} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => handleNavigation('/user-profile-settings')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-text-secondary hover:text-foreground hover:bg-surface transition-smooth"
                >
                  <Icon name="HelpCircle" size={18} />
                  <span>Help & Support</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-text-secondary hover:text-foreground hover:bg-surface transition-smooth"
            >
              <Icon name="LogOut" size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigationMenu;