import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MarketIndicesWidget = () => {
  const [indices, setIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for market indices
    const mockIndices = [
      {
        id: 'sp500',
        name: 'S&P 500',
        symbol: 'SPX',
        value: 4567.89,
        change: 23.45,
        changePercent: 0.52,
        volume: '3.2B',
        lastUpdate: new Date()
      },
      {
        id: 'nasdaq',
        name: 'NASDAQ',
        symbol: 'IXIC',
        value: 14234.56,
        change: -45.67,
        changePercent: -0.32,
        volume: '4.1B',
        lastUpdate: new Date()
      },
      {
        id: 'dow',
        name: 'Dow Jones',
        symbol: 'DJI',
        value: 34567.12,
        change: 156.78,
        changePercent: 0.45,
        volume: '2.8B',
        lastUpdate: new Date()
      },
      {
        id: 'russell',
        name: 'Russell 2000',
        symbol: 'RUT',
        value: 1987.65,
        change: -12.34,
        changePercent: -0.62,
        volume: '1.5B',
        lastUpdate: new Date()
      }
    ];

    setTimeout(() => {
      setIndices(mockIndices);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatChange = (change, isPercent = false) => {
    const formatted = isPercent 
      ? `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
      : `${change > 0 ? '+' : ''}${formatValue(change)}`;
    return formatted;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Market Indices</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-text-secondary" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Market Indices</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {indices.map((index) => (
          <div key={index.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-card-foreground">{index.name}</h4>
                <span className="text-xs text-text-secondary">({index.symbol})</span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-lg font-semibold text-card-foreground">
                  {formatValue(index.value)}
                </span>
                <div className={`flex items-center space-x-1 ${
                  index.change >= 0 ? 'text-accent' : 'text-destructive'
                }`}>
                  <Icon 
                    name={index.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                  />
                  <span className="text-sm font-medium">
                    {formatChange(index.change)}
                  </span>
                  <span className="text-sm">
                    ({formatChange(index.changePercent, true)})
                  </span>
                </div>
              </div>
              <div className="text-xs text-text-secondary mt-1">
                Vol: {index.volume}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
            <Icon name="RefreshCw" size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketIndicesWidget;