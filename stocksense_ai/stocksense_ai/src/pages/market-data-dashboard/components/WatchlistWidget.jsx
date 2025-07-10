import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WatchlistWidget = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddStock, setShowAddStock] = useState(false);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    // Mock watchlist data
    const mockWatchlist = [
      {
        id: 'AAPL',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.45,
        change: 5.67,
        changePercent: 3.08,
        volume: '45.2M',
        dayHigh: 192.34,
        dayLow: 186.78,
        logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=40&h=40&fit=crop&crop=center',
        alerts: 2
      },
      {
        id: 'TSLA',
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 267.89,
        change: 12.34,
        changePercent: 4.83,
        volume: '67.8M',
        dayHigh: 275.45,
        dayLow: 260.12,
        logo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=40&h=40&fit=crop&crop=center',
        alerts: 0
      },
      {
        id: 'MSFT',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 334.56,
        change: -2.45,
        changePercent: -0.73,
        volume: '34.7M',
        dayHigh: 338.90,
        dayLow: 332.15,
        logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=40&h=40&fit=crop&crop=center',
        alerts: 1
      },
      {
        id: 'GOOGL',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 134.78,
        change: -4.23,
        changePercent: -3.04,
        volume: '45.6M',
        dayHigh: 139.45,
        dayLow: 133.67,
        logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&h=40&fit=crop&crop=center',
        alerts: 0
      }
    ];

    setTimeout(() => {
      setWatchlist(mockWatchlist);
      setIsLoading(false);
    }, 1000);
  }, []);

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

  const handleAddStock = () => {
    if (newStock.trim()) {
      // Mock adding stock to watchlist
      const mockNewStock = {
        id: newStock.toUpperCase(),
        symbol: newStock.toUpperCase(),
        name: `${newStock.toUpperCase()} Corporation`,
        price: Math.random() * 200 + 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        volume: `${(Math.random() * 100).toFixed(1)}M`,
        dayHigh: 0,
        dayLow: 0,
        logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=40&h=40&fit=crop&crop=center',
        alerts: 0
      };
      
      setWatchlist(prev => [...prev, mockNewStock]);
      setNewStock('');
      setShowAddStock(false);
    }
  };

  const handleRemoveStock = (stockId) => {
    setWatchlist(prev => prev.filter(stock => stock.id !== stockId));
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">My Watchlist</h3>
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
        <h3 className="text-lg font-semibold text-card-foreground">My Watchlist</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => setShowAddStock(!showAddStock)}
          >
            Add Stock
          </Button>
          <button className="p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-smooth">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>

      {/* Add Stock Form */}
      {showAddStock && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleAddStock}
              disabled={!newStock.trim()}
            >
              Add
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => {
                setShowAddStock(false);
                setNewStock('');
              }}
            />
          </div>
        </div>
      )}

      {/* Watchlist Items */}
      <div className="space-y-3">
        {watchlist.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Star" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">Your watchlist is empty</p>
            <p className="text-sm text-text-secondary mt-1">Add stocks to track their performance</p>
          </div>
        ) : (
          watchlist.map((stock) => (
            <div key={stock.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface border border-border">
                    <Image
                      src={stock.logo}
                      alt={stock.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {stock.alerts > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{stock.alerts}</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-card-foreground">{stock.symbol}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="MessageSquare" size={14} className="text-text-secondary hover:text-primary" />
                    </button>
                  </div>
                  <div className="text-sm text-text-secondary truncate max-w-[120px] sm:max-w-none">
                    {stock.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    H: {formatValue(stock.dayHigh)} L: {formatValue(stock.dayLow)}
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
                <div className="text-xs text-text-secondary">
                  Vol: {stock.volume}
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <button
                  onClick={() => handleRemoveStock(stock.id)}
                  className="p-1 rounded text-text-secondary hover:text-destructive transition-smooth"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
              <Icon name="Bell" size={14} />
              <span>Alerts</span>
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

export default WatchlistWidget;