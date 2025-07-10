import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsPreview = ({ currentSettings }) => {
  const mockAIResponse = {
    query: "What\'s the outlook for AAPL stock?",
    response: currentSettings?.defaultTone === 'beginner' ? `Apple (AAPL) is currently showing positive momentum. Here's what you need to know:\n\n• **Current Price**: $185.42 (+2.3% today)\n• **Why it's moving**: Strong iPhone sales and services growth\n• **What this means**: Apple continues to be a solid long-term investment\n\n**For beginners**: Apple is considered a "blue-chip" stock, meaning it's from a well-established, financially stable company.`
      : currentSettings?.defaultTone === 'analyst'
      ? `AAPL Technical Analysis Summary:\n\n• **Price Action**: Breaking above 50-day MA at $182.15\n• **Volume**: 15% above average, confirming breakout\n• **RSI**: 58.2 (neutral territory)\n• **Support/Resistance**: Key support at $180, resistance at $190\n\n**Fundamental Outlook**: Q4 earnings beat expectations with 8.1% revenue growth. Services segment showing 16.3% YoY growth. Maintain BUY rating with $200 price target.`
      : `AAPL Quick Summary:\n\n✅ **Bullish signals**: Breaking resistance, strong volume\n📈 **Price target**: $200 (8% upside)\n⚠️ **Risk factors**: Market volatility, China concerns\n🎯 **Action**: Consider entry on pullback to $182`
  };

  const formatOptions = {
    summary: 'Summary Cards',
    detailed: 'Detailed Report',
    bullet: 'Bullet Points',
    comparison: 'Side-by-Side'
  };

  const toneOptions = {
    beginner: 'Beginner-Friendly',
    analyst: 'Analyst Mode',
    quick: 'Quick Summary',
    detailed: 'Detailed Analysis'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Eye" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-card-foreground">Settings Preview</h3>
      </div>
      
      <p className="text-text-secondary mb-6">
        See how your current settings affect AI responses and dashboard layout.
      </p>

      {/* Current Settings Summary */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h4 className="font-medium text-card-foreground mb-3">Current Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Response Tone:</span>
            <span className="text-card-foreground font-medium">
              {toneOptions[currentSettings?.defaultTone] || 'Analyst Mode'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Response Format:</span>
            <span className="text-card-foreground font-medium">
              {formatOptions[currentSettings?.responseFormat] || 'Detailed Report'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Risk Tolerance:</span>
            <span className="text-card-foreground font-medium capitalize">
              {currentSettings?.riskTolerance || 'Moderate'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Investment Goal:</span>
            <span className="text-card-foreground font-medium capitalize">
              {currentSettings?.investmentGoal || 'Growth'}
            </span>
          </div>
        </div>
      </div>

      {/* AI Response Preview */}
      <div className="space-y-4">
        <h4 className="font-medium text-card-foreground">AI Response Preview</h4>
        
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="MessageSquare" size={18} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Sample Query</span>
          </div>
          <p className="text-text-secondary text-sm mb-4">{mockAIResponse.query}</p>
          
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Bot" size={16} className="text-accent" />
              <span className="text-sm font-medium text-card-foreground">AI Response</span>
              <span className="text-xs text-text-secondary">
                ({toneOptions[currentSettings?.defaultTone] || 'Analyst Mode'})
              </span>
            </div>
            <div className="text-sm text-card-foreground whitespace-pre-line">
              {mockAIResponse.response}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Layout Preview */}
      <div className="mt-6">
        <h4 className="font-medium text-card-foreground mb-4">Dashboard Layout Preview</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Chat Panel */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageSquare" size={16} className="text-primary" />
              <span className="text-sm font-medium text-card-foreground">Chat Panel</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-background rounded w-full"></div>
              <div className="h-2 bg-background rounded w-3/4"></div>
              <div className="h-2 bg-background rounded w-1/2"></div>
            </div>
            <div className="mt-2 text-xs text-text-secondary">
              {currentSettings?.autoSuggestions ? 'Auto-suggestions enabled' : 'Manual input only'}
            </div>
          </div>

          {/* Market Data */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-accent" />
              <span className="text-sm font-medium text-card-foreground">Market Data</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-background rounded w-full"></div>
              <div className="h-2 bg-background rounded w-2/3"></div>
              <div className="h-2 bg-background rounded w-4/5"></div>
            </div>
            <div className="mt-2 text-xs text-text-secondary">
              {currentSettings?.realTimeData ? 'Real-time updates' : 'Delayed data'}
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BarChart3" size={16} className="text-warning" />
              <span className="text-sm font-medium text-card-foreground">Analysis</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-background rounded w-full"></div>
              <div className="h-2 bg-background rounded w-5/6"></div>
              <div className="h-2 bg-background rounded w-2/3"></div>
            </div>
            <div className="mt-2 text-xs text-text-secondary">
              {formatOptions[currentSettings?.responseFormat] || 'Detailed format'}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Status */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-card-foreground mb-3">Active Features</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={currentSettings?.autoSuggestions ? "Check" : "X"} 
              size={14} 
              className={currentSettings?.autoSuggestions ? "text-success" : "text-text-secondary"} 
            />
            <span className="text-sm text-card-foreground">Auto-suggestions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={currentSettings?.contextMemory ? "Check" : "X"} 
              size={14} 
              className={currentSettings?.contextMemory ? "text-success" : "text-text-secondary"} 
            />
            <span className="text-sm text-card-foreground">Context Memory</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={currentSettings?.realTimeData ? "Check" : "X"} 
              size={14} 
              className={currentSettings?.realTimeData ? "text-success" : "text-text-secondary"} 
            />
            <span className="text-sm text-card-foreground">Real-time Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span className="text-sm text-card-foreground">Multi-agent AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPreview;