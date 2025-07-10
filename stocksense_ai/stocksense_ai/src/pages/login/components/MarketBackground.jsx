import React from 'react';

const MarketBackground = () => {
  const marketData = [
    { symbol: 'AAPL', price: '$175.43', change: '+2.34%', positive: true },
    { symbol: 'GOOGL', price: '$142.56', change: '-0.87%', positive: false },
    { symbol: 'MSFT', price: '$378.85', change: '+1.23%', positive: true },
    { symbol: 'TSLA', price: '$248.50', change: '+4.56%', positive: true },
    { symbol: 'AMZN', price: '$151.94', change: '-1.45%', positive: false },
    { symbol: 'NVDA', price: '$875.28', change: '+3.21%', positive: true }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-1 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="bg-primary/20 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Market Data */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 opacity-10">
          {marketData.map((stock, index) => (
            <div
              key={stock.symbol}
              className="text-center animate-pulse"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: '4s'
              }}
            >
              <div className="text-lg font-mono font-bold text-foreground">
                {stock.symbol}
              </div>
              <div className="text-sm text-text-secondary">{stock.price}</div>
              <div className={`text-xs ${stock.positive ? 'text-success' : 'text-destructive'}`}>
                {stock.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal-style Lines */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-primary"
            style={{
              top: `${(i + 1) * 5}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketBackground;