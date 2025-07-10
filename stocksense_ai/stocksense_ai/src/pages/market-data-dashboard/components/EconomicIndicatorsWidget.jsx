import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EconomicIndicatorsWidget = () => {
  const [indicators, setIndicators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock economic indicators data
    const mockIndicators = [
      {
        id: 'gdp',
        name: 'GDP Growth',
        value: 2.4,
        unit: '%',
        change: 0.1,
        period: 'Q3 2024',
        status: 'positive',
        description: 'Quarterly annualized growth rate',
        nextRelease: '2024-10-26',
        icon: 'TrendingUp'
      },
      {
        id: 'unemployment',
        name: 'Unemployment Rate',
        value: 3.8,
        unit: '%',
        change: -0.1,
        period: 'Sep 2024',
        status: 'positive',
        description: 'Seasonally adjusted rate',
        nextRelease: '2024-10-06',
        icon: 'Users'
      },
      {
        id: 'inflation',
        name: 'CPI Inflation',
        value: 3.2,
        unit: '%',
        change: -0.2,
        period: 'Sep 2024',
        status: 'positive',
        description: 'Year-over-year change',
        nextRelease: '2024-10-10',
        icon: 'DollarSign'
      },
      {
        id: 'fed-rate',
        name: 'Federal Funds Rate',
        value: 5.25,
        unit: '%',
        change: 0.0,
        period: 'Sep 2024',
        status: 'neutral',
        description: 'Target rate range upper bound',
        nextRelease: '2024-11-07',
        icon: 'Percent'
      },
      {
        id: 'retail-sales',
        name: 'Retail Sales',
        value: 0.4,
        unit: '%',
        change: 0.2,
        period: 'Sep 2024',
        status: 'positive',
        description: 'Monthly change',
        nextRelease: '2024-10-17',
        icon: 'ShoppingCart'
      },
      {
        id: 'housing-starts',
        name: 'Housing Starts',
        value: 1.35,
        unit: 'M',
        change: -0.05,
        period: 'Sep 2024',
        status: 'negative',
        description: 'Annualized rate (millions)',
        nextRelease: '2024-10-18',
        icon: 'Home'
      },
      {
        id: 'consumer-confidence',
        name: 'Consumer Confidence',
        value: 102.6,
        unit: '',
        change: 3.2,
        period: 'Sep 2024',
        status: 'positive',
        description: 'Conference Board Index',
        nextRelease: '2024-10-29',
        icon: 'Heart'
      },
      {
        id: 'pmi',
        name: 'Manufacturing PMI',
        value: 49.8,
        unit: '',
        change: -0.7,
        period: 'Sep 2024',
        status: 'negative',
        description: 'ISM Manufacturing Index',
        nextRelease: '2024-11-01',
        icon: 'Factory'
      }
    ];

    setTimeout(() => {
      setIndicators(mockIndicators);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'positive': return 'text-accent';
      case 'negative': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'positive': return 'ArrowUp';
      case 'negative': return 'ArrowDown';
      default: return 'Minus';
    }
  };

  const formatValue = (value, unit) => {
    if (unit === 'M') {
      return `${value.toFixed(2)}${unit}`;
    }
    return `${value.toFixed(1)}${unit}`;
  };

  const formatChange = (change, unit) => {
    const sign = change > 0 ? '+' : '';
    if (unit === 'M') {
      return `${sign}${change.toFixed(2)}${unit}`;
    }
    return `${sign}${change.toFixed(1)}${unit}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Economic Indicators</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-text-secondary" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Economic Indicators</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-smooth">
            <Icon name="Calendar" size={16} />
          </button>
          <button className="p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-smooth">
            <Icon name="Settings" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {indicators.map((indicator) => (
          <div key={indicator.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-smooth cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${
                  indicator.status === 'positive' ? 'bg-accent/20 text-accent' :
                  indicator.status === 'negative'? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'
                }`}>
                  <Icon name={indicator.icon} size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground text-sm">{indicator.name}</h4>
                  <p className="text-xs text-text-secondary">{indicator.period}</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-1 ${getStatusColor(indicator.status)}`}>
                <Icon name={getStatusIcon(indicator.status)} size={14} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl font-bold text-card-foreground">
                  {formatValue(indicator.value, indicator.unit)}
                </div>
                <div className={`text-sm ${getStatusColor(indicator.status)}`}>
                  {formatChange(indicator.change, indicator.unit)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-text-secondary">Next Release</div>
                <div className="text-xs font-medium text-card-foreground">
                  {formatDate(indicator.nextRelease)}
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-text-secondary">{indicator.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Data sources: BLS, Fed, Census Bureau</span>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
              <Icon name="Calendar" size={14} />
              <span>Economic Calendar</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
              <Icon name="ExternalLink" size={14} />
              <span>View All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicIndicatorsWidget;