import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      navigate('/ai-chat-dashboard');
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-blue-600/10 hover:border-blue-600/30',
      textColor: 'text-blue-400'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'hover:bg-blue-500/10 hover:border-blue-500/30',
      textColor: 'text-blue-300'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            size="default"
            onClick={() => handleSocialLogin(provider.id)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider !== null}
            iconName={provider.icon}
            iconPosition="left"
            className={`transition-all duration-200 ${provider.color}`}
          >
            <span className={provider.textColor}>
              {loadingProvider === provider.id ? 'Connecting...' : provider.name}
            </span>
          </Button>
        ))}
      </div>

      {/* Social Registration Benefits */}
      <div className="mt-6 p-4 bg-surface/50 rounded-lg border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Secure Social Registration
            </h4>
            <p className="text-xs text-text-secondary">
              Your social account information is encrypted and never stored on our servers. 
              We only use it for secure authentication and profile setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;