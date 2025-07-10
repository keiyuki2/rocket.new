import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MarketNewsWidget = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock news data
    const mockNews = [
      {
        id: 1,
        title: "Federal Reserve Signals Potential Rate Cut in Q4 2024",
        summary: "Fed Chair Powell hints at monetary policy shift amid cooling inflation data and labor market concerns.",
        source: "Reuters",
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        category: 'monetary',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop&crop=center',
        readTime: '3 min read',
        tags: ['Fed', 'Interest Rates', 'Monetary Policy']
      },
      {
        id: 2,
        title: "Tech Stocks Rally on Strong AI Earnings Reports",
        summary: "Major technology companies report better-than-expected quarterly results driven by AI investments and cloud growth.",
        source: "Bloomberg",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        category: 'earnings',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center',
        readTime: '4 min read',
        tags: ['Tech', 'AI', 'Earnings']
      },
      {
        id: 3,
        title: "Oil Prices Surge Amid Middle East Tensions",
        summary: "Crude oil futures jump 3% as geopolitical concerns raise supply disruption fears in key producing regions.",
        source: "CNBC",
        timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
        category: 'commodities',
        sentiment: 'negative',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center',
        readTime: '2 min read',
        tags: ['Oil', 'Commodities', 'Geopolitics']
      },
      {
        id: 4,
        title: "Consumer Spending Data Shows Resilient Economy",
        summary: "Retail sales exceed expectations for third consecutive month, indicating strong consumer confidence despite inflation concerns.",
        source: "Wall Street Journal",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        category: 'economic',
        sentiment: 'positive',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center',
        readTime: '5 min read',
        tags: ['Consumer', 'Retail', 'Economy']
      },
      {
        id: 5,
        title: "Cryptocurrency Market Volatility Continues",
        summary: "Bitcoin and major altcoins experience significant price swings as regulatory clarity remains uncertain.",
        source: "CoinDesk",
        timestamp: new Date(Date.now() - 9000000), // 2.5 hours ago
        category: 'crypto',
        sentiment: 'neutral',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300&h=200&fit=crop&crop=center',
        readTime: '3 min read',
        tags: ['Crypto', 'Bitcoin', 'Regulation']
      },
      {
        id: 6,
        title: "Housing Market Shows Signs of Cooling",
        summary: "Mortgage rates hit 7.5% as home sales decline for fourth consecutive month, signaling potential market correction.",
        source: "MarketWatch",
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        category: 'real-estate',
        sentiment: 'negative',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop&crop=center',
        readTime: '4 min read',
        tags: ['Housing', 'Mortgages', 'Real Estate']
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setIsLoading(false);
    }, 1200);
  }, []);

  const categories = [
    { id: 'all', label: 'All News', icon: 'Newspaper' },
    { id: 'earnings', label: 'Earnings', icon: 'TrendingUp' },
    { id: 'monetary', label: 'Fed', icon: 'DollarSign' },
    { id: 'economic', label: 'Economic', icon: 'BarChart3' },
    { id: 'crypto', label: 'Crypto', icon: 'Bitcoin' }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-accent';
      case 'negative': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Market News</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-text-secondary" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex space-x-3">
                <div className="w-20 h-16 bg-muted rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
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
        <h3 className="text-lg font-semibold text-card-foreground">Market News</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category.icon} size={16} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.map((article) => (
          <div key={article.id} className="flex space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
            <div className="w-20 h-16 rounded-lg overflow-hidden bg-surface border border-border flex-shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-medium text-card-foreground text-sm leading-tight line-clamp-2">
                  {article.title}
                </h4>
                <div className={`ml-2 flex-shrink-0 ${getSentimentColor(article.sentiment)}`}>
                  <Icon name={getSentimentIcon(article.sentiment)} size={16} />
                </div>
              </div>
              
              <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{article.source}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(article.timestamp)}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {article.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Updated: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
              <Icon name="Filter" size={14} />
              <span>Filter</span>
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

export default MarketNewsWidget;