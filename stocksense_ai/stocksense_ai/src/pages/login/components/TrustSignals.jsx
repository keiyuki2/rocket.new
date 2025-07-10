import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Login',
      description: 'Bank-level encryption'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'Your data is never shared'
    },
    {
      icon: 'Zap',
      title: 'Real-time Data',
      description: 'Live market updates'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 text-center sm:text-left">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{feature.title}</div>
              <div className="text-xs text-text-secondary">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;