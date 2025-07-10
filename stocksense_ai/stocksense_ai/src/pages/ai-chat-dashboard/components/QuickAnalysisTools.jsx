import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickAnalysisTools = ({ onAnalysisRequest }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analysisTools = [
    {
      id: 'technical',
      name: 'Technical Analysis',
      icon: 'TrendingUp',
      description: 'RSI, MACD, Moving Averages',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    {
      id: 'fundamental',
      name: 'Fundamental Analysis',
      icon: 'FileText',
      description: 'P/E, Revenue, Growth metrics',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    {
      id: 'sentiment',
      name: 'Sentiment Analysis',
      icon: 'Heart',
      description: 'News, Social media, Analyst ratings',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20'
    },
    {
      id: 'comparison',
      name: 'Stock Comparison',
      icon: 'GitCompare',
      description: 'Compare multiple stocks',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20'
    }
  ];

  const quickActions = [
    {
      id: 'market-overview',
      name: 'Market Overview',
      icon: 'BarChart3',
      query: 'Give me a comprehensive market overview for today'
    },
    {
      id: 'top-gainers',
      name: 'Top Gainers',
      icon: 'TrendingUp',
      query: 'Show me today\'s top gaining stocks with analysis'
    },
    {
      id: 'earnings-calendar',
      name: 'Earnings This Week',
      icon: 'Calendar',
      query: 'What are the key earnings reports this week?'
    },
    {
      id: 'sector-analysis',
      name: 'Sector Performance',
      icon: 'PieChart',
      query: 'Analyze sector performance and rotation trends'
    }
  ];

  const popularStocks = [
    'AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'
  ];

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleQuickAction = (action) => {
    setIsAnalyzing(true);
    onAnalysisRequest(action.query);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const handleStockAnalysis = () => {
    if (stockSymbol.trim() && selectedTool) {
      setIsAnalyzing(true);
      const query = `Perform ${selectedTool.name.toLowerCase()} on ${stockSymbol.toUpperCase()}`;
      onAnalysisRequest(query);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStockSymbol('');
        setSelectedTool(null);
      }, 2000);
    }
  };

  const handlePopularStockClick = (symbol) => {
    setStockSymbol(symbol);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-card-foreground">
          Quick Analysis
        </h3>
      </div>

      {/* Analysis Tools */}
      <div className="mb-6">
        <div className="text-sm font-medium text-card-foreground mb-3">
          Analysis Tools
        </div>
        <div className="grid grid-cols-1 gap-2">
          {analysisTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool)}
              className={`p-3 rounded-lg border transition-smooth text-left ${
                selectedTool?.id === tool.id
                  ? `${tool.bgColor} ${tool.borderColor}`
                  : 'bg-muted/50 border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={tool.icon}
                  size={18}
                  className={selectedTool?.id === tool.id ? tool.color : 'text-muted-foreground'}
                />
                <div>
                  <div className={`font-medium text-sm ${
                    selectedTool?.id === tool.id ? 'text-card-foreground' : 'text-card-foreground'
                  }`}>
                    {tool.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tool.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stock Input */}
      <div className="mb-6">
        <Input
          label="Stock Symbol"
          type="text"
          placeholder="Enter symbol (e.g., AAPL)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          className="mb-3"
        />
        
        {/* Popular Stocks */}
        <div className="mb-3">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Popular Stocks
          </div>
          <div className="flex flex-wrap gap-1">
            {popularStocks.map((symbol) => (
              <button
                key={symbol}
                onClick={() => handlePopularStockClick(symbol)}
                className={`px-2 py-1 rounded text-xs font-medium transition-smooth ${
                  stockSymbol === symbol
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleStockAnalysis}
          disabled={!stockSymbol.trim() || !selectedTool || isAnalyzing}
          loading={isAnalyzing}
          variant="default"
          fullWidth
          iconName="Search"
        >
          Analyze Stock
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex-1">
        <div className="text-sm font-medium text-card-foreground mb-3">
          Quick Actions
        </div>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              disabled={isAnalyzing}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted text-left transition-smooth disabled:opacity-50"
            >
              <Icon name={action.icon} size={16} className="text-primary" />
              <span className="text-sm text-card-foreground">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Powered by AI agents</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAnalysisTools;