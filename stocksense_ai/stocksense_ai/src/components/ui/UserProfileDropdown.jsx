import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
    closeDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const dropdownItems = [
    {
      label: 'Profile Settings',
      path: '/user-profile-settings',
      icon: 'Settings',
      description: 'Manage your account'
    },
    {
      label: 'Subscription',
      path: '/user-profile-settings',
      icon: 'CreditCard',
      description: `${user.subscription} Plan`
    },
    {
      label: 'Help & Support',
      path: '#',
      icon: 'HelpCircle',
      description: 'Get assistance'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface border border-border">
          <Image
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-foreground">{user.name}</div>
          <div className="text-xs text-text-secondary">{user.subscription} Plan</div>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-[1100] animate-in fade-in-0 zoom-in-95">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface border border-border">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-popover-foreground">{user.name}</div>
                <div className="text-sm text-text-secondary">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={closeDropdown}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-smooth"
              >
                <Icon name={item.icon} size={18} className="text-text-secondary" />
                <div>
                  <div className="text-sm font-medium text-popover-foreground">
                    {item.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border py-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-muted transition-smooth"
            >
              <Icon name="LogOut" size={18} className="text-text-secondary" />
              <div>
                <div className="text-sm font-medium text-popover-foreground">
                  Sign Out
                </div>
                <div className="text-xs text-text-secondary">
                  End your session
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;