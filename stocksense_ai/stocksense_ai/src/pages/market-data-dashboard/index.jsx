import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all dashboard components
import MarketIndicesWidget from './components/MarketIndicesWidget';
import TrendingStocksWidget from './components/TrendingStocksWidget';
import SectorPerformanceWidget from './components/SectorPerformanceWidget';
import WatchlistWidget from './components/WatchlistWidget';
import MarketNewsWidget from './components/MarketNewsWidget';
import EconomicIndicatorsWidget from './components/EconomicIndicatorsWidget';
import MarketHeatMapWidget from './components/MarketHeatMapWidget';
import QuickActionsPanel from './components/QuickActionsPanel';

const MarketDataDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState('open');
  const [layoutMode, setLayoutMode] = useState('grid');

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Update timestamp every minute
    const updateTimer = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    // Mock market status check
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    
    if (isWeekend || hour < 9 || hour >= 16) {
      setMarketStatus('closed');
    } else {
      setMarketStatus('open');
    }

    return () => {
      clearTimeout(timer);
      clearInterval(updateTimer);
    };
  }, []);

  const getMarketStatusColor = () => {
    switch (marketStatus) {
      case 'open': return 'text-accent';
      case 'closed': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  const getMarketStatusText = () => {
    switch (marketStatus) {
      case 'open': return 'Market Open';
      case 'closed': return 'Market Closed';
      default: return 'Pre-Market';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin mb-4">
              <Icon name="Loader2" size={48} className="text-primary mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Loading Market Data</h2>
            <p className="text-text-secondary">Fetching real-time financial information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Market Data Dashboard - StockSense AI</title>
        <meta name="description" content="Real-time market data, stock prices, sector performance, and financial news in one comprehensive dashboard." />
      </Helmet>

      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNavigation />
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Market Data Dashboard</h1>
            <p className="text-text-secondary">
              Real-time financial information and market insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* Market Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                marketStatus === 'open' ? 'bg-accent animate-pulse' : 'bg-destructive'
              }`}></div>
              <span className={`text-sm font-medium ${getMarketStatusColor()}`}>
                {getMarketStatusText()}
              </span>
            </div>
            
            {/* Layout Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-2 rounded transition-smooth ${
                  layoutMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-2 rounded transition-smooth ${
                  layoutMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
            
            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className={`grid gap-6 ${
          layoutMode === 'grid' ?'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
        }`}>
          
          {/* Market Indices - Always prominent */}
          <div className={layoutMode === 'grid' ? 'xl:col-span-1' : ''}>
            <MarketIndicesWidget />
          </div>

          {/* Trending Stocks */}
          <div className={layoutMode === 'grid' ? 'xl:col-span-1' : ''}>
            <TrendingStocksWidget />
          </div>

          {/* Quick Actions Panel */}
          <div className={layoutMode === 'grid' ? 'xl:col-span-1' : ''}>
            <QuickActionsPanel />
          </div>

          {/* Watchlist - Full width in list mode */}
          <div className={layoutMode === 'grid' ? 'lg:col-span-2 xl:col-span-2' : ''}>
            <WatchlistWidget />
          </div>

          {/* Sector Performance */}
          <div className={layoutMode === 'grid' ? 'xl:col-span-1' : ''}>
            <SectorPerformanceWidget />
          </div>

          {/* Market Heat Map */}
          <div className={layoutMode === 'grid' ? 'lg:col-span-2 xl:col-span-2' : ''}>
            <MarketHeatMapWidget />
          </div>

          {/* Economic Indicators */}
          <div className={layoutMode === 'grid' ? 'xl:col-span-1' : ''}>
            <EconomicIndicatorsWidget />
          </div>

          {/* Market News - Full width */}
          <div className={layoutMode === 'grid' ? 'lg:col-span-2 xl:col-span-3' : ''}>
            <MarketNewsWidget />
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-text-secondary">
              <p>Last updated: {lastUpdate.toLocaleTimeString()}</p>
              <p className="mt-1">
                Data provided by TwelveData, Finnhub, and other financial data providers
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button className="flex items-center space-x-2 text-sm text-text-secondary hover:text-foreground transition-smooth">
                <Icon name="Settings" size={16} />
                <span>Customize Dashboard</span>
              </button>
              
              <button className="flex items-center space-x-2 text-sm text-text-secondary hover:text-foreground transition-smooth">
                <Icon name="Download" size={16} />
                <span>Export Data</span>
              </button>
              
              <button className="flex items-center space-x-2 text-sm text-text-secondary hover:text-foreground transition-smooth">
                <Icon name="HelpCircle" size={16} />
                <span>Help</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-text-secondary">
            <p>
              © {new Date().getFullYear()} StockSense AI. Market data is delayed by at least 15 minutes. 
              This information is for educational purposes only and should not be considered as investment advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDataDashboard;