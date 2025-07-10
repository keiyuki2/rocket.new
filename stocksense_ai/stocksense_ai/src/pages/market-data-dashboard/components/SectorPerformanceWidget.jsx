import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SectorPerformanceWidget = () => {
  const [sectors, setSectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    // Mock data for sector performance
    const mockSectors = [
      {
        id: 'technology',
        name: 'Technology',
        change: 2.45,
        changePercent: 2.45,
        marketCap: '12.5T',
        color: '#00D4FF',
        companies: ['AAPL', 'MSFT', 'GOOGL', 'META']
      },
      {
        id: 'healthcare',
        name: 'Healthcare',
        change: 1.23,
        changePercent: 1.23,
        marketCap: '8.7T',
        color: '#00FF88',
        companies: ['JNJ', 'PFE', 'UNH', 'ABBV']
      },
      {
        id: 'financials',
        name: 'Financials',
        change: -0.87,
        changePercent: -0.87,
        marketCap: '6.2T',
        color: '#FFC107',
        companies: ['JPM', 'BAC', 'WFC', 'GS']
      },
      {
        id: 'energy',
        name: 'Energy',
        change: -2.34,
        changePercent: -2.34,
        marketCap: '4.1T',
        color: '#DC3545',
        companies: ['XOM', 'CVX', 'COP', 'EOG']
      },
      {
        id: 'consumer',
        name: 'Consumer Discretionary',
        change: 0.56,
        changePercent: 0.56,
        marketCap: '5.8T',
        color: '#8B5CF6',
        companies: ['AMZN', 'TSLA', 'HD', 'MCD']
      },
      {
        id: 'industrials',
        name: 'Industrials',
        change: 1.78,
        changePercent: 1.78,
        marketCap: '3.9T',
        color: '#F59E0B',
        companies: ['BA', 'CAT', 'GE', 'MMM']
      },
      {
        id: 'materials',
        name: 'Materials',
        change: -1.45,
        changePercent: -1.45,
        marketCap: '2.3T',
        color: '#EF4444',
        companies: ['LIN', 'APD', 'SHW', 'FCX']
      },
      {
        id: 'utilities',
        name: 'Utilities',
        change: 0.23,
        changePercent: 0.23,
        marketCap: '1.8T',
        color: '#10B981',
        companies: ['NEE', 'DUK', 'SO', 'D']
      }
    ];

    setTimeout(() => {
      setSectors(mockSectors);
      setIsLoading(false);
    }, 800);
  }, [timeframe]);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  const formatChange = (change) => {
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  const getSectorIcon = (sectorId) => {
    const iconMap = {
      technology: 'Cpu',
      healthcare: 'Heart',
      financials: 'DollarSign',
      energy: 'Zap',
      consumer: 'ShoppingCart',
      industrials: 'Factory',
      materials: 'Hammer',
      utilities: 'Power'
    };
    return iconMap[sectorId] || 'TrendingUp';
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Sector Performance</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-text-secondary" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Sector Performance</h3>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-xs font-medium rounded transition-smooth ${
                  timeframe === tf
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sectors.map((sector) => (
          <div key={sector.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${sector.color}20`, color: sector.color }}
              >
                <Icon name={getSectorIcon(sector.id)} size={20} />
              </div>
              <div>
                <div className="font-medium text-card-foreground">{sector.name}</div>
                <div className="text-xs text-text-secondary">
                  Cap: {sector.marketCap} • {sector.companies.slice(0, 3).join(', ')}
                  {sector.companies.length > 3 && ` +${sector.companies.length - 3}`}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-semibold ${
                sector.change >= 0 ? 'text-accent' : 'text-destructive'
              }`}>
                {formatChange(sector.changePercent)}
              </div>
              <div className="flex items-center justify-end space-x-1">
                <Icon 
                  name={sector.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={14}
                  className={sector.change >= 0 ? 'text-accent' : 'text-destructive'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Heat Map View Toggle */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-text-secondary">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <button className="flex items-center space-x-1 text-xs text-text-secondary hover:text-foreground transition-smooth">
            <Icon name="Grid3X3" size={14} />
            <span>Heat Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectorPerformanceWidget;