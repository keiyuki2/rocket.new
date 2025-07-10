import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PresetConfigurations = ({ presets, onApplyPreset, currentPreset }) => {
  const getPresetIcon = (type) => {
    switch (type) {
      case 'beginner':
        return 'GraduationCap';
      case 'analyst':
        return 'TrendingUp';
      case 'trader':
        return 'Zap';
      case 'custom':
        return 'Settings';
      default:
        return 'User';
    }
  };

  const getPresetColor = (type) => {
    switch (type) {
      case 'beginner':
        return 'bg-success/10 border-success/20 text-success';
      case 'analyst':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'trader':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'custom':
        return 'bg-accent/10 border-accent/20 text-accent';
      default:
        return 'bg-surface border-border text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Preset Configurations
        </h3>
        <Button variant="outline" size="sm" iconName="Plus">
          Create Custom
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {presets.map((preset) => (
          <div
            key={preset.id}
            className={`relative p-4 border rounded-lg transition-smooth cursor-pointer ${
              currentPreset === preset.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onApplyPreset(preset.id)}
          >
            {/* Current Indicator */}
            {currentPreset === preset.id && (
              <div className="absolute top-2 right-2">
                <Icon name="Check" size={16} className="text-primary" />
              </div>
            )}

            {/* Preset Icon */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getPresetColor(preset.type)}`}>
              <Icon name={getPresetIcon(preset.type)} size={24} />
            </div>

            {/* Preset Info */}
            <div className="mb-3">
              <h4 className="font-medium text-foreground mb-1">{preset.name}</h4>
              <p className="text-sm text-text-secondary line-clamp-2">
                {preset.description}
              </p>
            </div>

            {/* Preset Features */}
            <div className="space-y-2 mb-4">
              {preset.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <Icon name="Check" size={12} className="text-success" />
                  <span className="text-text-secondary">{feature}</span>
                </div>
              ))}
              {preset.features.length > 3 && (
                <div className="text-xs text-text-secondary">
                  +{preset.features.length - 3} more features
                </div>
              )}
            </div>

            {/* Apply Button */}
            <Button
              variant={currentPreset === preset.id ? "default" : "outline"}
              size="sm"
              fullWidth
              disabled={currentPreset === preset.id}
            >
              {currentPreset === preset.id ? 'Active' : 'Apply'}
            </Button>
          </div>
        ))}
      </div>

      {/* Preset Comparison */}
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Configuration Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-secondary">Feature</th>
                <th className="text-center py-2 text-text-secondary">Beginner</th>
                <th className="text-center py-2 text-text-secondary">Analyst</th>
                <th className="text-center py-2 text-text-secondary">Trader</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border">
                <td className="py-2">Response Detail</td>
                <td className="text-center py-2">Simple</td>
                <td className="text-center py-2">Detailed</td>
                <td className="text-center py-2">Quick</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Active Agents</td>
                <td className="text-center py-2">1-2</td>
                <td className="text-center py-2">2-3</td>
                <td className="text-center py-2">All</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Real-time Data</td>
                <td className="text-center py-2">
                  <Icon name="X" size={16} className="text-error mx-auto" />
                </td>
                <td className="text-center py-2">
                  <Icon name="Check" size={16} className="text-success mx-auto" />
                </td>
                <td className="text-center py-2">
                  <Icon name="Check" size={16} className="text-success mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-2">Advanced Tools</td>
                <td className="text-center py-2">Limited</td>
                <td className="text-center py-2">Full</td>
                <td className="text-center py-2">Full</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PresetConfigurations;