import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping
  const breadcrumbMap = {
    '/ai-chat-dashboard': [
      { label: 'Dashboard', path: '/ai-chat-dashboard' }
    ],
    '/market-data-dashboard': [
      { label: 'Market Data', path: '/market-data-dashboard' }
    ],
    '/agent-management': [
      { label: 'Agents', path: '/agent-management' }
    ],
    '/user-profile-settings': [
      { label: 'Profile', path: '/user-profile-settings' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use default mapping
  const breadcrumbs = customBreadcrumbs || breadcrumbMap[location.pathname] || [];

  // Don't render if no breadcrumbs or only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-text-secondary mx-2"
                />
              )}
              
              {isLast ? (
                <span className="text-foreground font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-text-secondary hover:text-foreground transition-smooth"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;