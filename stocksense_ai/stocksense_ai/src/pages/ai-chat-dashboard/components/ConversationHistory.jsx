import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ConversationHistory = ({ conversations, activeConversation, onConversationSelect, onNewConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockConversations = [
    {
      id: 1,
      title: "AAPL Technical Analysis",
      lastMessage: "The RSI indicates AAPL is currently oversold...",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      messageCount: 8,
      agents: ['OpenAI', 'Claude']
    },
    {
      id: 2,
      title: "Market Sentiment Analysis",
      lastMessage: "Current market sentiment shows mixed signals...",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      messageCount: 12,
      agents: ['OpenAI', 'Claude', 'Gemini']
    },
    {
      id: 3,
      title: "Tesla Earnings Review",
      lastMessage: "Tesla\'s Q4 earnings exceeded expectations...",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 6,
      agents: ['Claude', 'Gemini']
    },
    {
      id: 4,
      title: "Crypto Market Overview",
      lastMessage: "Bitcoin\'s recent price action suggests...",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 15,
      agents: ['OpenAI', 'Gemini']
    },
    {
      id: 5,
      title: "S&P 500 Forecast",
      lastMessage: "Based on current economic indicators...",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 9,
      agents: ['OpenAI', 'Claude', 'Gemini']
    }
  ];

  const filteredConversations = mockConversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getAgentColor = (agent) => {
    const colors = {
      'OpenAI': 'text-green-400',
      'Claude': 'text-blue-400',
      'Gemini': 'text-purple-400'
    };
    return colors[agent] || 'text-gray-400';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-card-foreground">
            Conversations
          </h3>
        </div>
        <button
          onClick={onNewConversation}
          className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
          title="New Conversation"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onConversationSelect(conversation)}
            className={`w-full text-left p-3 rounded-lg transition-smooth border ${
              activeConversation?.id === conversation.id
                ? 'bg-primary/10 border-primary/20 text-card-foreground'
                : 'bg-muted/50 border-transparent hover:bg-muted hover:border-border text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm line-clamp-1">
                {conversation.title}
              </h4>
              <span className="text-xs opacity-75 flex-shrink-0 ml-2">
                {formatTimestamp(conversation.timestamp)}
              </span>
            </div>
            
            <p className="text-xs opacity-75 line-clamp-2 mb-2">
              {conversation.lastMessage}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {conversation.agents.map((agent, index) => (
                  <span
                    key={index}
                    className={`text-xs font-medium ${getAgentColor(agent)}`}
                  >
                    {agent}
                    {index < conversation.agents.length - 1 && ','}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-1 text-xs opacity-75">
                <Icon name="MessageCircle" size={12} />
                <span>{conversation.messageCount}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredConversations.length} conversations</span>
          <button className="hover:text-card-foreground transition-smooth">
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;