import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AgentCard = ({ agent, onToggle, onConfigure, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'inactive':
        return 'text-text-secondary bg-muted border-border';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${agent.bgColor}`}>
            <Icon name={agent.icon} size={24} color={agent.iconColor} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {agent.name}
            </h3>
            <p className="text-sm text-text-secondary">{agent.provider}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
            {agent.status}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={agent.enabled}
              onChange={() => onToggle(agent.id)}
              className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${
              agent.enabled ? 'bg-primary' : 'bg-muted'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                agent.enabled ? 'translate-x-5' : 'translate-x-0.5'
              } mt-0.5`} />
            </div>
          </label>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {agent.description}
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-lg font-semibold ${getPerformanceColor(agent.accuracy)}`}>
            {agent.accuracy}%
          </div>
          <div className="text-xs text-text-secondary">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {agent.avgResponseTime}ms
          </div>
          <div className="text-xs text-text-secondary">Avg Response</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            ${agent.costPerQuery}
          </div>
          <div className="text-xs text-text-secondary">Cost/Query</div>
        </div>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Model:</span>
              <span className="ml-2 text-foreground">{agent.model}</span>
            </div>
            <div>
              <span className="text-text-secondary">Version:</span>
              <span className="ml-2 text-foreground">{agent.version}</span>
            </div>
            <div>
              <span className="text-text-secondary">Last Updated:</span>
              <span className="ml-2 text-foreground">{agent.lastUpdated}</span>
            </div>
            <div>
              <span className="text-text-secondary">Queries Today:</span>
              <span className="ml-2 text-foreground">{agent.queriesToday}</span>
            </div>
          </div>
          
          <div>
            <span className="text-text-secondary text-sm">Capabilities:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {agent.capabilities.map((capability, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-surface text-xs text-foreground rounded-md"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Less Details' : 'More Details'}
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            onClick={() => onConfigure(agent)}
          >
            Configure
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="BarChart3"
            onClick={() => onViewDetails(agent)}
          >
            Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;