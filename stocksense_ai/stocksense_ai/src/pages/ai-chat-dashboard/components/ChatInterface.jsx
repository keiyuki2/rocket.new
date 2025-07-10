import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { getStockAnalysis, getStreamingStockAnalysis, getMultiAgentAnalysis } from '../../../services/openaiService';

const ChatInterface = ({ activeConversation, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTone, setSelectedTone] = useState('analyst');
  const [selectedGoal, setSelectedGoal] = useState('summary');
  const [messages, setMessages] = useState([]);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [useStreaming, setUseStreaming] = useState(false);
  const [multiAgentMode, setMultiAgentMode] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const toneOptions = [
    { id: 'beginner', label: 'Beginner-friendly', icon: 'GraduationCap' },
    { id: 'analyst', label: 'Analyst Mode', icon: 'TrendingUp' },
    { id: 'quick', label: 'Quick Summary', icon: 'Zap' }
  ];

  const goalOptions = [
    { id: 'summary', label: 'Fast Summary', icon: 'FileText' },
    { id: 'bullish', label: 'Bullish Analysis', icon: 'TrendingUp' },
    { id: 'bearish', label: 'Bear Case', icon: 'TrendingDown' }
  ];

  // Initialize with sample message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'assistant',
          content: 'Hello! I\'m your AI stock market assistant. Ask me about any stock, market trends, or investment insights. I can provide analysis from multiple AI perspectives to help you make informed decisions.',
          timestamp: new Date(),
          agent: 'System',
          confidence: 100
        }
      ]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSendMessage = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      tone: selectedTone,
      goal: selectedGoal
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      if (useStreaming) {
        await handleStreamingResponse(message);
      } else if (multiAgentMode) {
        await handleMultiAgentResponse(message);
      } else {
        await handleSingleAgentResponse(message);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: Date.now(),
        type: 'agent',
        content: 'I apologize, but I encountered an error while processing your request. Please check your API key configuration and try again.',
        timestamp: new Date(),
        agent: 'System',
        confidence: 0,
        error: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setStreamingMessage('');
    }
  };

  const handleSingleAgentResponse = async (userMessage) => {
    const response = await getStockAnalysis(userMessage, selectedTone, selectedGoal);
    
    const agentMessage = {
      id: response.id,
      type: 'agent',
      content: response.analysis,
      timestamp: response.timestamp,
      agent: response.agent,
      confidence: response.confidence,
      keyPoints: response.key_points,
      recommendation: response.recommendation,
      riskLevel: response.risk_level,
      timeHorizon: response.time_horizon,
      votes: { up: 0, down: 0 }
    };

    setMessages(prev => [...prev, agentMessage]);
  };

  const handleMultiAgentResponse = async (userMessage) => {
    const agents = ['technical', 'fundamental', 'sentiment'];
    const responses = await getMultiAgentAnalysis(userMessage, selectedTone, selectedGoal, agents);
    
    const agentMessages = responses.map(response => ({
      id: response.id,
      type: 'agent',
      content: response.analysis,
      timestamp: response.timestamp,
      agent: response.agent,
      agentType: response.agentType,
      confidence: response.confidence,
      keyPoints: response.key_points,
      recommendation: response.recommendation,
      riskLevel: response.risk_level,
      votes: { up: 0, down: 0 }
    }));

    // Add messages with slight delay for better UX
    for (let i = 0; i < agentMessages.length; i++) {
      setTimeout(() => {
        setMessages(prev => [...prev, agentMessages[i]]);
      }, i * 500);
    }
  };

  const handleStreamingResponse = async (userMessage) => {
    const streamingMessageId = Date.now();
    let fullContent = '';

    const onChunk = (chunk, fullText) => {
      fullContent = fullText;
      setStreamingMessage(fullText);
    };

    await getStreamingStockAnalysis(userMessage, selectedTone, selectedGoal, onChunk);

    const finalMessage = {
      id: streamingMessageId,
      type: 'agent',
      content: fullContent,
      timestamp: new Date(),
      agent: 'OpenAI',
      confidence: 85,
      votes: { up: 0, down: 0 }
    };

    setMessages(prev => [...prev, finalMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVote = (messageId, voteType) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const newVotes = { ...msg.votes };
        if (voteType === 'up') {
          newVotes.up = (newVotes.up || 0) + 1;
        } else {
          newVotes.down = (newVotes.down || 0) + 1;
        }
        return { ...msg, votes: newVotes };
      }
      return msg;
    }));
  };

  const getAgentColor = (agent) => {
    const colors = {
      'OpenAI': 'text-green-400',
      'Technical Analyst': 'text-blue-400',
      'Fundamental Analyst': 'text-purple-400',
      'Sentiment Analyst': 'text-orange-400',
      'System': 'text-gray-400'
    };
    return colors[agent] || 'text-gray-400';
  };

  const getAgentBgColor = (agent) => {
    const colors = {
      'OpenAI': 'bg-green-400/10',
      'Technical Analyst': 'bg-blue-400/10',
      'Fundamental Analyst': 'bg-purple-400/10',
      'Sentiment Analyst': 'bg-orange-400/10',
      'System': 'bg-gray-400/10'
    };
    return colors[agent] || 'bg-gray-400/10';
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-card-foreground">
              {activeConversation?.title || 'AI Stock Analysis'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {multiAgentMode ? 'Multi-agent' : 'Single agent'} • {useStreaming ? 'Streaming' : 'Standard'} mode
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMultiAgentMode(!multiAgentMode)}
            className={`p-2 rounded-md text-xs font-medium transition-smooth ${
              multiAgentMode
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            title="Toggle multi-agent mode"
          >
            <Icon name="Users" size={16} />
          </button>
          <button
            onClick={() => setUseStreaming(!useStreaming)}
            className={`p-2 rounded-md text-xs font-medium transition-smooth ${
              useStreaming
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            title="Toggle streaming mode"
          >
            <Icon name="Zap" size={16} />
          </button>
          <button className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground transition-smooth">
            <Icon name="Download" size={16} />
          </button>
        </div>
      </div>

      {/* Configuration Bar */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-center gap-4">
          {/* Tone Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-card-foreground">Tone:</span>
            <div className="flex items-center space-x-1">
              {toneOptions.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-smooth ${
                    selectedTone === tone.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={tone.icon} size={14} />
                  <span className="hidden sm:inline">{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-card-foreground">Goal:</span>
            <div className="flex items-center space-x-1">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-smooth ${
                    selectedGoal === goal.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={goal.icon} size={14} />
                  <span className="hidden sm:inline">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                msg.type === 'user' ?'bg-primary text-primary-foreground'
                  : `${getAgentBgColor(msg.agent)} border border-border`
              } rounded-lg p-4`}
            >
              {msg.type === 'agent' && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Bot" size={16} className={getAgentColor(msg.agent)} />
                    <span className={`font-medium text-sm ${getAgentColor(msg.agent)}`}>
                      {msg.agent}
                    </span>
                    {msg.confidence && (
                      <span className="text-xs text-muted-foreground">
                        {msg.confidence}% confidence
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleVote(msg.id, 'up')}
                      className="p-1 rounded hover:bg-muted/50 transition-smooth"
                    >
                      <Icon name="ThumbsUp" size={14} className="text-muted-foreground hover:text-success" />
                    </button>
                    <button
                      onClick={() => handleVote(msg.id, 'down')}
                      className="p-1 rounded hover:bg-muted/50 transition-smooth"
                    >
                      <Icon name="ThumbsDown" size={14} className="text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="text-sm whitespace-pre-wrap">
                {msg.content}
              </div>

              {msg.keyPoints && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Points:</h4>
                  <ul className="text-xs space-y-1">
                    {msg.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {msg.recommendation && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center space-x-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Recommendation: </span>
                      <span className="font-medium">{msg.recommendation}</span>
                    </div>
                    {msg.riskLevel && (
                      <div>
                        <span className="text-muted-foreground">Risk: </span>
                        <span className={`font-medium ${
                          msg.riskLevel === 'Low' ? 'text-success' :
                          msg.riskLevel === 'Medium' ? 'text-warning' : 'text-destructive'
                        }`}>
                          {msg.riskLevel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(msg.timestamp)}
                </span>
                {msg.type === 'agent' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="text-xs text-muted-foreground hover:text-card-foreground transition-smooth"
                    >
                      Copy
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-card-foreground transition-smooth">
                      Share
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Streaming Message */}
        {streamingMessage && (
          <div className="flex justify-start">
            <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4 max-w-[80%]">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Bot" size={16} className="text-green-400" />
                <span className="font-medium text-sm text-green-400">OpenAI</span>
                <span className="text-xs text-muted-foreground">Streaming...</span>
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {streamingMessage}
                <span className="animate-pulse">▊</span>
              </div>
            </div>
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && !streamingMessage && (
          <div className="flex justify-start">
            <div className="bg-muted/50 border border-border rounded-lg p-4 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Icon name="Bot" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {multiAgentMode ? 'AI agents are analyzing...' : 'AI is analyzing...'}
                </span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about stocks, market trends, or request analysis..."
              className="w-full p-3 bg-muted border border-border rounded-lg text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              rows={3}
              disabled={isTyping}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground transition-smooth">
              <Icon name="Paperclip" size={16} />
            </button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              variant="default"
              size="sm"
              iconName="Send"
              className="px-4"
            >
              Send
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{message.length}/2000</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;