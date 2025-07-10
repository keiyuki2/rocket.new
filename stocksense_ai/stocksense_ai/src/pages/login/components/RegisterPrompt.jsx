import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegisterPrompt = () => {
  return (
    <div className="mt-8 pt-6 border-t border-border text-center">
      <p className="text-text-secondary mb-4">
        New to the platform?
      </p>
      
      <Link
        to="/register"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-surface hover:bg-surface/80 border border-border rounded-lg transition-smooth group"
      >
        <Icon name="UserPlus" size={18} className="text-primary group-hover:text-primary/80" />
        <span className="text-foreground group-hover:text-foreground/80">
          Create Account
        </span>
      </Link>
      
      <div className="mt-4 text-xs text-text-secondary">
        Join thousands of traders using AI-powered market analysis
      </div>
    </div>
  );
};

export default RegisterPrompt;