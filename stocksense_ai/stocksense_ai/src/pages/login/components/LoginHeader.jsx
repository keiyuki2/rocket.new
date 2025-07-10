import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/login" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="TrendingUp" size={28} color="var(--color-primary-foreground)" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            StockSense AI
          </h1>
          <p className="text-sm text-text-secondary">
            AI-Powered Market Insights
          </p>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Welcome Back
        </h2>
        <p className="text-text-secondary">
          Sign in to access your personalized AI stock analysis dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;