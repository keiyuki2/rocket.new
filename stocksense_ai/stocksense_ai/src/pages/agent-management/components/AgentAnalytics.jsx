import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AgentAnalytics = ({ isOpen, onClose, agent, analyticsData }) => {
  const [activeTab, setActiveTab] = useState('performance');

  const tabs = [
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'usage', label: 'Usage Stats', icon: 'Activity' },
    { id: 'costs', label: 'Cost Analysis', icon: 'DollarSign' },
    { id: 'feedback', label: 'User Feedback', icon: 'MessageSquare' }
  ];

  const COLORS = ['#00FF88', '#00D4FF', '#FFC107', '#DC3545'];

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
              <span className="text-popover-foreground font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.bgColor}`}>
              <Icon name={agent.icon} size={20} color={agent.iconColor} />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">
                {agent.name} Analytics
              </h2>
              <p className="text-sm text-text-secondary">Detailed performance insights</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'performance' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-success">{analyticsData.accuracy}%</div>
                  <div className="text-sm text-text-secondary">Accuracy Rate</div>
                  <div className="text-xs text-success mt-1">+2.3% from last week</div>
                </div>
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{analyticsData.avgResponseTime}ms</div>
                  <div className="text-sm text-text-secondary">Avg Response Time</div>
                  <div className="text-xs text-success mt-1">-15ms from last week</div>
                </div>
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{analyticsData.totalQueries}</div>
                  <div className="text-sm text-text-secondary">Total Queries</div>
                  <div className="text-xs text-success mt-1">+12% from last week</div>
                </div>
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{analyticsData.userRating}/5</div>
                  <div className="text-sm text-text-secondary">User Rating</div>
                  <div className="text-xs text-success mt-1">+0.2 from last week</div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Performance Over Time
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.performanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
                      <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="accuracy" fill="#00FF88" name="Accuracy %" />
                      <Bar dataKey="responseTime" fill="#00D4FF" name="Response Time (ms)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-6">
              {/* Usage Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Query Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.queryTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {analyticsData.queryTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-surface p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Usage Patterns
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Peak Usage Time</span>
                      <span className="text-foreground font-medium">2:00 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Most Active Day</span>
                      <span className="text-foreground font-medium">Tuesday</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Avg Session Length</span>
                      <span className="text-foreground font-medium">12 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Repeat Users</span>
                      <span className="text-foreground font-medium">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div className="space-y-6">
              {/* Cost Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">${analyticsData.totalCost}</div>
                  <div className="text-sm text-text-secondary">Total Cost (30 days)</div>
                  <div className="text-xs text-error mt-1">+$12.50 from last month</div>
                </div>
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">${analyticsData.costPerQuery}</div>
                  <div className="text-sm text-text-secondary">Cost per Query</div>
                  <div className="text-xs text-success mt-1">-$0.002 from last month</div>
                </div>
                <div className="bg-surface p-4 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">${analyticsData.projectedCost}</div>
                  <div className="text-sm text-text-secondary">Projected Monthly</div>
                  <div className="text-xs text-warning mt-1">Based on current usage</div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-surface p-6 rounded-lg">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  {analyticsData.costBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-foreground">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-foreground font-medium">${item.amount}</div>
                        <div className="text-xs text-text-secondary">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
              {/* Feedback Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Rating Distribution
                  </h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = analyticsData.ratingDistribution[rating] || 0;
                      const percentage = (count / analyticsData.totalRatings) * 100;
                      return (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm text-text-secondary w-8">{rating}★</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-foreground w-12">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-surface p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Recent Feedback
                  </h3>
                  <div className="space-y-4">
                    {analyticsData.recentFeedback.map((feedback, index) => (
                      <div key={index} className="border-b border-border pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < feedback.rating ? 'text-warning' : 'text-muted'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-text-secondary">{feedback.date}</span>
                        </div>
                        <p className="text-sm text-foreground">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentAnalytics;