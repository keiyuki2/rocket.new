import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingStocksWidget = () => {
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gainers');

  useEffect(() => {
    // Mock data for trending stocks
    const mockStocks = {
      gainers: [
        {
          id: 'AAPL',
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 189.45,
          change: 5.67,
          changePercent: 3.08,
          volume: '45.2M',
          logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'TSLA',
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 267.89,
          change: 12.34,
          changePercent: 4.83,
          volume: '67.8M',
          logo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'NVDA',
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 456.78,
          change: 18.92,
          changePercent: 4.32,
          volume: '89.1M',
          logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'MSFT',
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          price: 334.56,
          change: 8.45,
          changePercent: 2.59,
          volume: '34.7M',
          logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=40&h=40&fit=crop&crop=center'
        }
      ],
      losers: [
        {
          id: 'META',
          symbol: 'META',
          name: 'Meta Platforms, Inc.',
          price: 298.67,
          change: -15.23,
          changePercent: -4.85,
          volume: '56.3M',
          logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'NFLX',
          symbol: 'NFLX',
          name: 'Netflix, Inc.',
          price: 423.12,
          change: -18.45,
          changePercent: -4.18,
          volume: '23.8M',
          logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'AMZN',
          symbol: 'AMZN',
          name: 'Amazon.com, Inc.',
          price: 145.67,
          change: -5.89,
          changePercent: -3.89,
          volume: '78.9M',
          logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'GOOGL',
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 134.78,
          change: -4.23,
          changePercent: -3.04,
          volume: '45.6M',
          logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&h=40&fit=crop&crop=center'
        }
      ],
      active: [
        {
          id: 'GME',
          symbol: 'GME',
          name: 'GameStop Corp.',
          price: 23.45,
          change: 1.23,
          changePercent: 5.54,
          volume: '234.5M',
          logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'AMC',
          symbol: 'AMC',
          name: 'AMC Entertainment',
          price: 8.67,
          change: -0.45,
          changePercent: -4.93,
          volume: '189.3M',
          logo: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'PLTR',
          symbol: 'PLTR',
          name: 'Palantir Technologies',
          price: 16.78,
          change: 0.89,
          changePercent: 5.60,
          volume: '156.7M',
          logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=40&h=40&fit=crop&crop=center'
        },
        {
          id: 'SOFI',
          symbol: 'SOFI',
          name: 'SoFi Technologies',
          price: 7.89,
          change: -0.34,
          changePercent: -4.13,
          volume: '123.4M',
          logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=40&h=40&fit=crop&crop=center'
        }
      ]
    };

    setTimeout(() => {
      setTrendingStocks(mockStocks);
      setIsLoading(false);
    }, 1200);
  }, []);

  const tabs = [
    { id: 'gainers', label: 'Top Gainers', icon: 'TrendingUp' },
    { id: 'losers', label: 'Top Losers', icon: 'TrendingDown' },
    { id: 'active', label: 'Most Active', icon: 'Activity' }
  ];

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
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
          <h3 className="text-lg font-semibold text-card-foreground">Trending Stocks</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-text-secondary" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Trending Stocks</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Stock List */}
      <div className="space-y-3">
        {trendingStocks[activeTab]?.map((stock) => (
          <div key={stock.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface border border-border">
                <Image
                  src={stock.logo}
                  alt={stock.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-card-foreground">{stock.symbol}</span>
                  <span className="text-xs text-text-secondary hidden sm:inline">
                    Vol: {stock.volume}
                  </span>
                </div>
                <div className="text-sm text-text-secondary truncate max-w-[150px] sm:max-w-none">
                  {stock.name}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-card-foreground">
                {formatValue(stock.price)}
              </div>
              <div className={`text-sm flex items-center justify-end space-x-1 ${
                stock.change >= 0 ? 'text-accent' : 'text-destructive'
              }`}>
                <Icon 
                  name={stock.change >= 0 ? 'ArrowUp' : 'ArrowDown'} 
                  size={14} 
                />
                <span>{formatChange(stock.changePercent, true)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Updated: {new Date().toLocaleTimeString()}</span>
          <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
            <Icon name="ExternalLink" size={14} />
            <span>View All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingStocksWidget;