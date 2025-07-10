import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AgentManagement = ({ activeAgents, onAgentToggle, onAgentConfigure }) => {
  const [showSettings, setShowSettings] = useState(false);

  const availableAgents = [
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      description: 'Advanced reasoning and analysis',
      status: 'active',
      confidence: 92,
      responseTime: '1.2s',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20',
      capabilities: ['Technical Analysis', 'Market Research', 'Risk Assessment'],
      isEnabled: true
    },
    {
      id: 'claude',
      name: 'Claude 3',
      description: 'Detailed financial analysis',
      status: 'active',
      confidence: 88,
      responseTime: '1.8s',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20',
      capabilities: ['Earnings Analysis', 'Company Research', 'Sentiment Analysis'],
      isEnabled: true
    },
    {
      id: 'gemini',
      name: 'Gemini Pro',
      description: 'Multi-modal data processing',
      status: 'active',
      confidence: 85,
      responseTime: '2.1s',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20',
      capabilities: ['Chart Analysis', 'News Processing', 'Pattern Recognition'],
      isEnabled: true
    },
    {
      id: 'custom',
      name: 'Custom Agent',
      description: 'User-defined parameters',
      status: 'inactive',
      confidence: 0,
      responseTime: '--',
      color: 'text-gray-400',
      bgColor: 'bg-gray-400/10',
      borderColor: 'border-gray-400/20',
      capabilities: ['Configurable'],
      isEnabled: false
    }
  ];

  const handleAgentToggle = (agentId) => {
    onAgentToggle(agentId);
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? 'CheckCircle' : 'Circle';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bot" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-card-foreground">
            AI Agents
          </h3>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground transition-smooth"
          title="Agent Settings"
        >
          <Icon name="Settings" size={16} />
        </button>
      </div>

      {/* Active Agents Summary */}
      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Active Agents</span>
          <span className="text-sm text-primary font-medium">
            {availableAgents.filter(agent => agent.isEnabled).length}/4
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {availableAgents.filter(agent => agent.isEnabled).map((agent) => (
            <div
              key={agent.id}
              className={`w-3 h-3 rounded-full ${agent.bgColor} border ${agent.borderColor}`}
              title={agent.name}
            />
          ))}
        </div>
      </div>

      {/* Agents List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {availableAgents.map((agent) => (
          <div
            key={agent.id}
            className={`p-3 rounded-lg border transition-smooth ${
              agent.isEnabled
                ? `${agent.bgColor} ${agent.borderColor}`
                : 'bg-muted/30 border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon
                  name={getStatusIcon(agent.status)}
                  size={16}
                  className={`${getStatusColor(agent.status)} ${agent.isEnabled ? agent.color : ''}`}
                />
                <div>
                  <h4 className={`font-medium text-sm ${agent.isEnabled ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                    {agent.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {agent.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleAgentToggle(agent.id)}
                className={`w-10 h-6 rounded-full transition-smooth relative ${
                  agent.isEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    agent.isEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {agent.isEnabled && (
              <>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className={`font-medium ${agent.color}`}>
                    {agent.confidence}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-card-foreground font-medium">
                    {agent.responseTime}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {agent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </>
            )}

            {showSettings && agent.isEnabled && (
              <div className="mt-3 pt-3 border-t border-border">
                <button
                  onClick={() => onAgentConfigure(agent.id)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-muted hover:bg-muted/80 rounded-md text-xs text-muted-foreground hover:text-card-foreground transition-smooth"
                >
                  <Icon name="Settings" size={14} />
                  <span>Configure</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Agent Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-muted hover:bg-muted/80 rounded-lg text-sm text-muted-foreground hover:text-card-foreground transition-smooth border-2 border-dashed border-border hover:border-primary/50">
          <Icon name="Plus" size={16} />
          <span>Add Custom Agent</span>
        </button>
      </div>
    </div>
  );
};

export default AgentManagement;