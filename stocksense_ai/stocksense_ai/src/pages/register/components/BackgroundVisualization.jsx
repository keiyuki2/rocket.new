import React, { useEffect, useState } from 'react';

const BackgroundVisualization = () => {
  const [marketData, setMarketData] = useState([]);

  // Mock market data for background visualization
  const generateMarketData = () => {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX'];
    return symbols.map(symbol => ({
      symbol,
      price: (Math.random() * 500 + 50).toFixed(2),
      change: (Math.random() * 20 - 10).toFixed(2),
      changePercent: (Math.random() * 10 - 5).toFixed(2)
    }));
  };

  useEffect(() => {
    setMarketData(generateMarketData());
    
    // Update market data every 3 seconds for animation effect
    const interval = setInterval(() => {
      setMarketData(generateMarketData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-1 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="bg-primary/20 rounded-sm animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Market Data */}
      <div className="absolute inset-0 opacity-10">
        {marketData.map((stock, index) => (
          <div
            key={stock.symbol}
            className="absolute text-xs font-mono text-primary animate-pulse"
            style={{
              top: `${10 + (index * 12)}%`,
              left: `${5 + (index * 11)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{stock.symbol}</span>
              <span>${stock.price}</span>
              <span className={stock.change >= 0 ? 'text-success' : 'text-error'}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Chart Lines */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Animated chart lines */}
          <path
            d="M0,200 Q150,100 300,150 T600,120 T900,180 L900,400 L0,400 Z"
            fill="url(#chartGradient)"
            className="animate-pulse"
          />
          <path
            d="M0,300 Q200,200 400,250 T800,220 T1200,280"
            stroke="var(--color-primary)"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundVisualization;