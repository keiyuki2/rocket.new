import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthMonitor = ({ systemHealth, activeQueries, queueStatus }) => {
  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          System Health Monitor
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">Live</span>
        </div>
      </div>

      {/* Overall System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border ${getHealthColor(systemHealth.overall)}`}>
            <Icon name={getHealthIcon(systemHealth.overall)} size={16} />
            <span className="text-sm font-medium capitalize">{systemHealth.overall}</span>
          </div>
          <div className="text-xs text-text-secondary mt-1">Overall Status</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{systemHealth.uptime}</div>
          <div className="text-xs text-text-secondary">Uptime</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{systemHealth.responseTime}ms</div>
          <div className="text-xs text-text-secondary">Avg Response</div>
        </div>
      </div>

      {/* Active Queries */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Active Queries</h4>
        <div className="space-y-2">
          {activeQueries.map((query, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MessageSquare" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground truncate max-w-xs">
                    {query.question}
                  </div>
                  <div className="text-xs text-text-secondary">
                    Agent: {query.agent} • Started: {query.startTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-text-secondary">{query.duration}s</span>
              </div>
            </div>
          ))}
          
          {activeQueries.length === 0 && (
            <div className="text-center py-8 text-text-secondary">
              <Icon name="Zap" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No active queries</p>
            </div>
          )}
        </div>
      </div>

      {/* Queue Status */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Queue Status</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-lg font-semibold text-foreground">{queueStatus.pending}</div>
            <div className="text-xs text-text-secondary">Pending</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-lg font-semibold text-foreground">{queueStatus.processing}</div>
            <div className="text-xs text-text-secondary">Processing</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-lg font-semibold text-foreground">{queueStatus.completed}</div>
            <div className="text-xs text-text-secondary">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;