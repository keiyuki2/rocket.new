import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      id: 'ai-analysis',
      label: 'AI Analysis',
      description: 'Get AI insights on market trends',
      icon: 'Bot',
      color: 'primary',
      action: () => navigate('/ai-chat-dashboard')
    },
    {
      id: 'portfolio-check',
      label: 'Portfolio Check',
      description: 'Analyze your holdings',
      icon: 'PieChart',
      color: 'accent',
      action: () => console.log('Portfolio check')
    },
    {
      id: 'market-alerts',
      label: 'Set Alerts',
      description: 'Create price alerts',
      icon: 'Bell',
      color: 'warning',
      action: () => console.log('Set alerts')
    },
    {
      id: 'research',
      label: 'Research',
      description: 'Deep dive analysis',
      icon: 'Search',
      color: 'secondary',
      action: () => console.log('Research')
    }
  ];

  const marketActions = [
    {
      id: 'screener',
      label: 'Stock Screener',
      icon: 'Filter',
      action: () => console.log('Stock screener')
    },
    {
      id: 'compare',
      label: 'Compare Stocks',
      icon: 'GitCompare',
      action: () => console.log('Compare stocks')
    },
    {
      id: 'calendar',
      label: 'Earnings Calendar',
      icon: 'Calendar',
      action: () => console.log('Earnings calendar')
    },
    {
      id: 'news-sentiment',
      label: 'News Sentiment',
      icon: 'Newspaper',
      action: () => console.log('News sentiment')
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30';
      case 'accent':
        return 'bg-accent/20 text-accent border-accent/30 hover:bg-accent/30';
      case 'warning':
        return 'bg-warning/20 text-warning border-warning/30 hover:bg-warning/30';
      case 'secondary':
        return 'bg-secondary/20 text-secondary-foreground border-secondary/30 hover:bg-secondary/30';
      default:
        return 'bg-muted text-text-secondary border-border hover:bg-muted/80';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-smooth"
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </button>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`p-4 rounded-lg border transition-smooth text-left ${getColorClasses(action.color)}`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={action.icon} size={20} />
              <div>
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-80">{action.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Expanded Actions */}
      {isExpanded && (
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-card-foreground mb-3">Market Tools</h4>
          <div className="grid grid-cols-1 gap-2">
            {marketActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth text-left"
              >
                <Icon name={action.icon} size={18} className="text-text-secondary" />
                <span className="text-sm text-card-foreground">{action.label}</span>
                <Icon name="ChevronRight" size={14} className="text-text-secondary ml-auto" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Chat Integration */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-card-foreground text-sm">Ask AI Assistant</h4>
              <p className="text-xs text-text-secondary">Get instant market insights</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => navigate('/ai-chat-dashboard')}
            >
              Analyze Market Trends
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="xs"
                iconName="DollarSign"
                onClick={() => navigate('/ai-chat-dashboard')}
              >
                Stock Price
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="BarChart3"
                onClick={() => navigate('/ai-chat-dashboard')}
              >
                Earnings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-card-foreground">4,567</div>
            <div className="text-xs text-text-secondary">S&P 500</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-accent">+0.52%</div>
            <div className="text-xs text-text-secondary">Today</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-card-foreground">3.2B</div>
            <div className="text-xs text-text-secondary">Volume</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;