import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MarketHeatMapWidget = () => {
  const [heatMapData, setHeatMapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('sectors');

  useEffect(() => {
    // Mock heat map data
    const mockData = {
      sectors: [
        { id: 'tech', name: 'Technology', change: 2.45, size: 25, color: '#00D4FF' },
        { id: 'health', name: 'Healthcare', change: 1.23, size: 18, color: '#00FF88' },
        { id: 'finance', name: 'Financials', change: -0.87, size: 20, color: '#FFC107' },
        { id: 'energy', name: 'Energy', change: -2.34, size: 12, color: '#DC3545' },
        { id: 'consumer', name: 'Consumer', change: 0.56, size: 15, color: '#8B5CF6' },
        { id: 'industrial', name: 'Industrials', change: 1.78, size: 10, color: '#F59E0B' }
      ],
      stocks: [
        { id: 'AAPL', name: 'Apple', change: 3.08, size: 8, color: '#00D4FF' },
        { id: 'MSFT', name: 'Microsoft', change: 2.59, size: 7, color: '#00D4FF' },
        { id: 'GOOGL', name: 'Alphabet', change: -3.04, size: 6, color: '#DC3545' },
        { id: 'AMZN', name: 'Amazon', change: -3.89, size: 5, color: '#DC3545' },
        { id: 'TSLA', name: 'Tesla', change: 4.83, size: 4, color: '#00FF88' },
        { id: 'META', name: 'Meta', change: -4.85, size: 4, color: '#DC3545' },
        { id: 'NVDA', name: 'NVIDIA', change: 4.32, size: 6, color: '#00FF88' },
        { id: 'NFLX', name: 'Netflix', change: -4.18, size: 3, color: '#DC3545' }
      ]
    };

    setTimeout(() => {
      setHeatMapData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getHeatMapColor = (change) => {
    if (change > 2) return '#00FF88';
    if (change > 0) return '#00D4FF';
    if (change > -2) return '#FFC107';
    return '#DC3545';
  };

  const getIntensity = (change) => {
    const absChange = Math.abs(change);
    if (absChange > 3) return 1;
    if (absChange > 2) return 0.8;
    if (absChange > 1) return 0.6;
    return 0.4;
  };

  const formatChange = (change) => {
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Market Heat Map</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-text-secondary" />
          </div>
        </div>
        <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const currentData = heatMapData[viewMode] || [];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Market Heat Map</h3>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('sectors')}
              className={`px-3 py-1 text-sm font-medium rounded transition-smooth ${
                viewMode === 'sectors' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
              }`}
            >
              Sectors
            </button>
            <button
              onClick={() => setViewMode('stocks')}
              className={`px-3 py-1 text-sm font-medium rounded transition-smooth ${
                viewMode === 'stocks' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
              }`}
            >
              Stocks
            </button>
          </div>
        </div>
      </div>

      {/* Heat Map Grid */}
      <div className="relative h-64 bg-surface rounded-lg overflow-hidden">
        <div className="absolute inset-0 p-2">
          <div className="grid grid-cols-4 gap-1 h-full">
            {currentData.map((item, index) => {
              const color = getHeatMapColor(item.change);
              const intensity = getIntensity(item.change);
              
              return (
                <div
                  key={item.id}
                  className={`rounded-lg flex flex-col justify-center items-center p-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                    index < 2 ? 'col-span-2' : 
                    index === 2 ? 'col-span-2 row-span-2': 'col-span-1'
                  }`}
                  style={{
                    backgroundColor: `${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
                    border: `1px solid ${color}`,
                    minHeight: index === 2 ? '120px' : '60px'
                  }}
                >
                  <div className="text-center">
                    <div className="font-semibold text-white text-sm mb-1">
                      {item.name}
                    </div>
                    <div className="text-white text-xs font-medium">
                      {formatChange(item.change)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#DC3545' }}></div>
            <span className="text-xs text-text-secondary">Strong Decline</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FFC107' }}></div>
            <span className="text-xs text-text-secondary">Decline</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#00D4FF' }}></div>
            <span className="text-xs text-text-secondary">Gain</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#00FF88' }}></div>
            <span className="text-xs text-text-secondary">Strong Gain</span>
          </div>
        </div>
        
        <div className="text-xs text-text-secondary">
          Size represents market cap
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
              <Icon name="Maximize2" size={14} />
              <span>Full Screen</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
              <Icon name="RefreshCw" size={14} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeatMapWidget;