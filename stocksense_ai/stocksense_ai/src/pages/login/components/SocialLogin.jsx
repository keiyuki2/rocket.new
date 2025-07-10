import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    // Simulate social login
    setTimeout(() => {
      navigate('/ai-chat-dashboard');
      setLoadingProvider(null);
    }, 2000);
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      color: 'bg-white text-gray-900 hover:bg-gray-50 border border-border'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600 text-white hover:bg-blue-700'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-text-secondary">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            fullWidth
            loading={loadingProvider === provider.id}
            iconName={provider.icon}
            iconPosition="left"
            onClick={() => handleSocialLogin(provider.id)}
            className={`${provider.color} transition-smooth`}
          >
            Continue with {provider.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;