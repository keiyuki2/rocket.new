import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import MobileNavigationMenu from './MobileNavigationMenu';

const NavigationBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser] = useState({
    name: 'John Trader',
    email: 'john.trader@stocksense.ai',
    avatar: '/assets/images/avatar.jpg',
    subscription: 'Pro'
  });

  const navigationItems = [
  {
    label: 'Dashboard',
    path: '/ai-chat-dashboard',
    icon: 'MessageSquare',
    tooltip: 'AI Chat Analysis Hub'
  },
  {
    label: 'Market Data',
    path: '/market-data-dashboard',
    icon: 'TrendingUp',
    tooltip: 'Real-time Market Information'
  },
  {
    label: 'Agents',
    path: '/agent-management',
    icon: 'Bot',
    tooltip: 'AI System Configuration'
  },
  {
    label: 'Profile',
    path: '/user-profile-settings',
    icon: 'User',
    tooltip: 'Account Settings'
  }];


  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/ai-chat-dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="var(--color-primary-foreground)" className="flex" />
                </div>
                <span className="font-heading font-bold text-xl text-foreground">
                  StockSense AI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) =>
              <Link
                key={item.path}
                to={item.path}




                title={item.tooltip}>

                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop User Profile */}
              <div className="hidden md:block">
                <UserProfileDropdown user={currentUser} />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-surface transition-smooth"
                aria-label="Toggle mobile menu">

                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <MobileNavigationMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        navigationItems={navigationItems}
        currentUser={currentUser}
        activeRoute={location.pathname} />


      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>);

};

export default NavigationBar;