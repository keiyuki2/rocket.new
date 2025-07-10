import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MarketDataPanel = () => {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [marketData, setMarketData] = useState({});

  const mockWatchlist = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.84,
      change: 2.45,
      changePercent: 1.41,
      volume: '52.3M',
      marketCap: '2.75T'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: -5.23,
      changePercent: -2.06,
      volume: '89.1M',
      marketCap: '789.2B'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 421.13,
      change: 12.87,
      changePercent: 3.15,
      volume: '45.7M',
      marketCap: '1.04T'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 378.85,
      change: 1.92,
      changePercent: 0.51,
      volume: '28.4M',
      marketCap: '2.81T'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 138.21,
      change: -0.87,
      changePercent: -0.63,
      volume: '31.2M',
      marketCap: '1.75T'
    }
  ];

  const mockMarketIndices = [
    {
      name: 'S&P 500',
      symbol: 'SPX',
      value: 4567.89,
      change: 23.45,
      changePercent: 0.52
    },
    {
      name: 'Dow Jones',
      symbol: 'DJI',
      value: 35234.12,
      change: -89.23,
      changePercent: -0.25
    },
    {
      name: 'NASDAQ',
      symbol: 'IXIC',
      value: 14123.67,
      change: 67.89,
      changePercent: 0.48
    },
    {
      name: 'Russell 2000',
      symbol: 'RUT',
      value: 1987.45,
      change: 12.34,
      changePercent: 0.62
    }
  ];

  const mockTopMovers = [
    { symbol: 'NVDA', change: 3.15, reason: 'AI chip demand surge' },
    { symbol: 'AMD', change: 2.87, reason: 'Earnings beat expectations' },
    { symbol: 'TSLA', change: -2.06, reason: 'Production concerns' },
    { symbol: 'META', change: 1.94, reason: 'User growth metrics' },
    { symbol: 'NFLX', change: -1.23, reason: 'Subscriber guidance' }
  ];

  const mockEconomicEvents = [
    {
      time: '09:30',
      event: 'Market Open',
      impact: 'high',
      description: 'US markets open'
    },
    {
      time: '10:00',
      event: 'ISM Manufacturing',
      impact: 'medium',
      description: 'Manufacturing PMI data'
    },
    {
      time: '14:00',
      event: 'Fed Speech',
      impact: 'high',
      description: 'Powell monetary policy remarks'
    },
    {
      time: '16:00',
      event: 'Market Close',
      impact: 'high',
      description: 'US markets close'
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change, changePercent) => {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-success' : 'text-destructive';
  };

  const getImpactColor = (impact) => {
    const colors = {
      high: 'text-destructive',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors[impact] || 'text-muted-foreground';
  };

  const tabs = [
    { id: 'watchlist', label: 'Watchlist', icon: 'Star' },
    { id: 'indices', label: 'Indices', icon: 'BarChart3' },
    { id: 'movers', label: 'Top Movers', icon: 'TrendingUp' },
    { id: 'events', label: 'Events', icon: 'Calendar' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-card-foreground">
            Market Data
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium transition-smooth ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name={tab.icon} size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'watchlist' && (
          <div className="space-y-3">
            {mockWatchlist.map((stock) => (
              <div
                key={stock.symbol}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm text-card-foreground">
                      {stock.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-card-foreground">
                      {formatPrice(stock.price)}
                    </div>
                    <div className={`text-xs ${getChangeColor(stock.change)}`}>
                      {formatChange(stock.change, stock.changePercent)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Vol: {stock.volume}</span>
                  <span>Cap: {stock.marketCap}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'indices' && (
          <div className="space-y-3">
            {mockMarketIndices.map((index) => (
              <div
                key={index.symbol}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-card-foreground">
                      {index.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {index.symbol}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-card-foreground">
                      {index.value.toLocaleString()}
                    </div>
                    <div className={`text-xs ${getChangeColor(index.change)}`}>
                      {formatChange(index.change, index.changePercent)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'movers' && (
          <div className="space-y-3">
            {mockTopMovers.map((mover, index) => (
              <div
                key={index}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm text-card-foreground">
                    {mover.symbol}
                  </div>
                  <div className={`text-sm font-medium ${getChangeColor(mover.change)}`}>
                    {mover.change >= 0 ? '+' : ''}{mover.change.toFixed(2)}%
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {mover.reason}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-3">
            {mockEconomicEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm text-card-foreground">
                      {event.event}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.description}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-card-foreground">
                      {event.time}
                    </div>
                    <div className={`text-xs ${getImpactColor(event.impact)}`}>
                      {event.impact} impact
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <button className="hover:text-card-foreground transition-smooth">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketDataPanel;