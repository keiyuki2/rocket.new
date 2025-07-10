import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PresetProfileSelector = ({ onProfileSelect }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const presetProfiles = [
    {
      id: 'beginner',
      name: 'Beginner Investor',
      description: 'Perfect for those new to investing with simplified explanations and educational content',
      icon: 'GraduationCap',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      features: [
        'Beginner-friendly explanations',
        'Educational content focus',
        'Risk-averse recommendations',
        'Step-by-step guidance',
        'Basic market terminology'
      ],
      settings: {
        defaultTone: 'beginner',
        responseFormat: 'summary',
        riskTolerance: 'conservative',
        investmentGoal: 'income',
        autoSuggestions: true,
        contextMemory: true
      }
    },
    {
      id: 'trader',
      name: 'Active Trader',
      description: 'Optimized for frequent trading with real-time data and quick analysis',
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      features: [
        'Real-time market data',
        'Technical analysis focus',
        'Quick response format',
        'Price alerts and targets',
        'Advanced charting tools'
      ],
      settings: {
        defaultTone: 'quick',
        responseFormat: 'bullet',
        riskTolerance: 'aggressive',
        investmentGoal: 'trading',
        autoSuggestions: true,
        realTimeData: true
      }
    },
    {
      id: 'analyst',
      name: 'Financial Analyst',
      description: 'Comprehensive analysis tools for professional research and detailed insights',
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      features: [
        'Detailed analytical reports',
        'Multiple AI perspectives',
        'Professional terminology',
        'Comprehensive data access',
        'Export capabilities'
      ],
      settings: {
        defaultTone: 'analyst',
        responseFormat: 'detailed',
        riskTolerance: 'moderate',
        investmentGoal: 'balanced',
        contextMemory: true,
        realTimeData: true
      }
    }
  ];

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile.id);
    if (onProfileSelect) {
      onProfileSelect(profile);
    }
  };

  const handleApplyProfile = () => {
    const profile = presetProfiles.find(p => p.id === selectedProfile);
    if (profile) {
      // Apply profile settings logic here
      console.log('Applying profile:', profile);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="User" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-card-foreground">Quick Setup Profiles</h3>
      </div>
      
      <p className="text-text-secondary mb-6">
        Choose a preset profile to quickly configure your settings based on your investment style and experience level.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {presetProfiles.map((profile) => (
          <div
            key={profile.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedProfile === profile.id
                ? `${profile.bgColor} ${profile.borderColor}`
                : 'bg-muted border-border hover:border-primary/30'
            }`}
            onClick={() => handleProfileSelect(profile)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-lg ${profile.bgColor} flex items-center justify-center`}>
                <Icon name={profile.icon} size={24} className={profile.color} />
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">{profile.name}</h4>
                <div className="flex items-center space-x-2">
                  {selectedProfile === profile.id && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4">
              {profile.description}
            </p>

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-card-foreground">Key Features:</h5>
              <ul className="space-y-1">
                {profile.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-xs text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              {profile.features.length > 3 && (
                <p className="text-xs text-text-secondary">
                  +{profile.features.length - 3} more features
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Settings" size={20} className="text-primary" />
            <h4 className="font-medium text-card-foreground">Profile Configuration Preview</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {(() => {
              const profile = presetProfiles.find(p => p.id === selectedProfile);
              return Object.entries(profile.settings).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-text-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-card-foreground font-medium">
                    {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
                  </span>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-text-secondary">
          {selectedProfile ? 'Profile selected. Click apply to configure your settings.' : 'Select a profile to get started quickly.'}
        </div>
        <div className="flex space-x-3">
          {selectedProfile && (
            <Button variant="outline" onClick={() => setSelectedProfile(null)}>
              Clear Selection
            </Button>
          )}
          <Button
            variant="default"
            iconName="Zap"
            disabled={!selectedProfile}
            onClick={handleApplyProfile}
          >
            Apply Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresetProfileSelector;