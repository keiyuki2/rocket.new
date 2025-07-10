import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustElements = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your personal information with third parties'
    },
    {
      icon: 'Eye',
      title: 'AI Transparency',
      description: 'All AI recommendations include source attribution and confidence levels'
    },
    {
      icon: 'AlertTriangle',
      title: 'Risk Disclosure',
      description: 'Investment decisions carry risk. AI insights are for informational purposes only'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustElements.map((element, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-surface/30 rounded-lg border border-border/30"
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={element.icon} size={16} className="text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {element.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {element.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Disclaimer */}
      <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning mb-2">
              Important Financial Disclaimer
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              StockSense AI provides AI-generated insights for informational purposes only. 
              All investment decisions should be made based on your own research and risk tolerance. 
              Past performance does not guarantee future results. Please consult with a qualified 
              financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Data Usage Notice */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Database" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">
              How We Use Your Data
            </h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Personalize AI insights based on your investor profile</li>
              <li>• Improve our AI models and recommendation accuracy</li>
              <li>• Provide relevant market analysis and alerts</li>
              <li>• Ensure platform security and prevent fraud</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;