import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PerformanceChart = ({ data, selectedMetric, onMetricChange }) => {
  const metrics = [
    { key: 'accuracy', label: 'Accuracy (%)', color: '#00FF88' },
    { key: 'responseTime', label: 'Response Time (ms)', color: '#00D4FF' },
    { key: 'userRating', label: 'User Rating', color: '#FFC107' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="text-popover-foreground font-medium">
                {entry.value}
                {selectedMetric === 'accuracy' || selectedMetric === 'userRating' ? '%' : 'ms'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Performance Trends
        </h3>
        <div className="flex items-center space-x-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => onMetricChange(metric.key)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                selectedMetric === metric.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-secondary hover:text-foreground'
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="openai"
              stroke="#00FF88"
              strokeWidth={2}
              dot={{ fill: '#00FF88', strokeWidth: 2, r: 4 }}
              name="OpenAI"
            />
            <Line
              type="monotone"
              dataKey="claude"
              stroke="#00D4FF"
              strokeWidth={2}
              dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
              name="Claude"
            />
            <Line
              type="monotone"
              dataKey="gemini"
              stroke="#FFC107"
              strokeWidth={2}
              dot={{ fill: '#FFC107', strokeWidth: 2, r: 4 }}
              name="Gemini"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;