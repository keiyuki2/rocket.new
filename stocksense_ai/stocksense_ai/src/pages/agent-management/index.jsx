import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AgentCard from './components/AgentCard';
import PerformanceChart from './components/PerformanceChart';
import ConfigurationPanel from './components/ConfigurationPanel';
import SystemHealthMonitor from './components/SystemHealthMonitor';
import PresetConfigurations from './components/PresetConfigurations';
import AgentAnalytics from './components/AgentAnalytics';

const AgentManagement = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [currentPreset, setCurrentPreset] = useState('analyst');

  // Mock data for agents
  const [agents, setAgents] = useState([
    {
      id: 'openai-gpt4',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: 'Advanced language model with superior reasoning capabilities for complex financial analysis and market interpretation.',
      icon: 'Brain',
      iconColor: '#FFFFFF',
      bgColor: 'bg-success/10',
      status: 'active',
      enabled: true,
      accuracy: 94,
      avgResponseTime: 1200,
      costPerQuery: 0.045,
      model: 'gpt-4-turbo',
      version: '2024-01-25',
      lastUpdated: '2 hours ago',
      queriesToday: 127,
      capabilities: ['Text Analysis', 'Code Generation', 'Mathematical Reasoning', 'Market Analysis'],
      apiKey: '••••••••••••sk-abc123',
      temperature: 0.7,
      maxTokens: 2000,
      timeout: 30,
      searchEnabled: true,
      toolAccess: ['web-search', 'market-data', 'news-analysis'],
      responseFormat: 'detailed',
      customInstructions: 'Focus on providing clear, actionable financial insights with risk assessments.'
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: 'Highly capable AI assistant with strong analytical skills and nuanced understanding of financial markets and trading strategies.',
      icon: 'Zap',
      iconColor: '#FFFFFF',
      bgColor: 'bg-primary/10',
      status: 'active',
      enabled: true,
      accuracy: 91,
      avgResponseTime: 980,
      costPerQuery: 0.038,
      model: 'claude-3-opus',
      version: '2024-02-01',
      lastUpdated: '1 hour ago',
      queriesToday: 89,
      capabilities: ['Research Analysis', 'Document Processing', 'Risk Assessment', 'Strategy Planning'],
      apiKey: '••••••••••••sk-ant-123',
      temperature: 0.6,
      maxTokens: 1800,
      timeout: 25,
      searchEnabled: true,
      toolAccess: ['web-search', 'market-data', 'sentiment-analysis'],
      responseFormat: 'structured',
      customInstructions: 'Emphasize risk management and provide balanced perspectives on investment opportunities.'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Multimodal AI model with strong performance in data analysis, chart interpretation, and real-time market data processing.',
      icon: 'Sparkles',
      iconColor: '#FFFFFF',
      bgColor: 'bg-warning/10',
      status: 'active',
      enabled: false,
      accuracy: 88,
      avgResponseTime: 850,
      costPerQuery: 0.025,
      model: 'gemini-pro',
      version: '2024-01-15',
      lastUpdated: '3 hours ago',
      queriesToday: 45,
      capabilities: ['Image Analysis', 'Data Visualization', 'Pattern Recognition', 'Trend Analysis'],
      apiKey: '••••••••••••AIza-xyz789',
      temperature: 0.8,
      maxTokens: 1500,
      timeout: 20,
      searchEnabled: false,
      toolAccess: ['market-data', 'chart-generation'],
      responseFormat: 'summary',
      customInstructions: 'Focus on visual data interpretation and trend identification.'
    }
  ]);

  // Mock performance data
  const performanceData = [
    { date: 'Jan 1', openai: 92, claude: 89, gemini: 85 },
    { date: 'Jan 2', openai: 94, claude: 91, gemini: 87 },
    { date: 'Jan 3', openai: 93, claude: 90, gemini: 88 },
    { date: 'Jan 4', openai: 95, claude: 92, gemini: 89 },
    { date: 'Jan 5', openai: 94, claude: 91, gemini: 88 },
    { date: 'Jan 6', openai: 96, claude: 93, gemini: 90 },
    { date: 'Jan 7', openai: 94, claude: 91, gemini: 88 }
  ];

  // Mock system health data
  const systemHealth = {
    overall: 'healthy',
    uptime: '99.8%',
    responseTime: 1010
  };

  const activeQueries = [
    {
      question: 'What is the current sentiment around TSLA stock?',
      agent: 'GPT-4 Turbo',
      startTime: '14:32',
      duration: 8
    },
    {
      question: 'Analyze the recent Fed meeting impact on tech stocks',
      agent: 'Claude 3 Opus',
      startTime: '14:35',
      duration: 5
    }
  ];

  const queueStatus = {
    pending: 3,
    processing: 2,
    completed: 156
  };

  // Mock preset configurations
  const presets = [
    {
      id: 'beginner',
      name: 'Beginner Friendly',
      type: 'beginner',
      description: 'Simplified responses with educational context and risk warnings for new investors.',
      features: [
        'Simple language explanations',
        'Educational context included',
        'Risk warnings emphasized',
        'Limited to 1-2 agents',
        'Slower response for accuracy'
      ]
    },
    {
      id: 'analyst',
      name: 'Financial Analyst',
      type: 'analyst',
      description: 'Detailed analysis with comprehensive data, charts, and professional insights.',
      features: [
        'Detailed technical analysis',
        'Multiple data sources',
        'Chart generation enabled',
        '2-3 agents for comparison',
        'Real-time data access'
      ]
    },
    {
      id: 'trader',
      name: 'Active Trader',
      type: 'trader',
      description: 'Fast responses optimized for quick decision-making with all agents active.',
      features: [
        'Ultra-fast responses',
        'All agents active',
        'Real-time alerts',
        'Advanced tools access',
        'Minimal explanations'
      ]
    },
    {
      id: 'custom',
      name: 'Custom Setup',
      type: 'custom',
      description: 'Personalized configuration tailored to your specific trading style and preferences.',
      features: [
        'Fully customizable',
        'Personal preferences',
        'Custom instructions',
        'Flexible agent selection',
        'Advanced parameters'
      ]
    }
  ];

  // Mock analytics data
  const analyticsData = {
    accuracy: 94,
    avgResponseTime: 1200,
    totalQueries: 1247,
    userRating: 4.6,
    totalCost: 127.50,
    costPerQuery: 0.045,
    projectedCost: 385.20,
    totalRatings: 234,
    performanceHistory: [
      { date: 'Week 1', accuracy: 92, responseTime: 1300 },
      { date: 'Week 2', accuracy: 94, responseTime: 1250 },
      { date: 'Week 3', accuracy: 93, responseTime: 1200 },
      { date: 'Week 4', accuracy: 95, responseTime: 1150 }
    ],
    queryTypes: [
      { name: 'Stock Analysis', value: 45 },
      { name: 'Market Trends', value: 30 },
      { name: 'Risk Assessment', value: 15 },
      { name: 'Portfolio Review', value: 10 }
    ],
    ratingDistribution: {
      5: 145,
      4: 67,
      3: 18,
      2: 3,
      1: 1
    },
    costBreakdown: [
      { category: 'API Calls', amount: 89.50, percentage: 70 },
      { category: 'Data Access', amount: 25.60, percentage: 20 },
      { category: 'Storage', amount: 8.90, percentage: 7 },
      { category: 'Other', amount: 3.50, percentage: 3 }
    ],
    recentFeedback: [
      {
        rating: 5,
        comment: 'Excellent analysis of the market conditions. Very helpful for my trading decisions.',
        date: '2 hours ago'
      },
      {
        rating: 4,
        comment: 'Good insights but could be faster. Overall satisfied with the quality.',
        date: '5 hours ago'
      },
      {
        rating: 5,
        comment: 'The risk assessment feature is outstanding. Saved me from a bad trade.',
        date: '1 day ago'
      }
    ]
  };

  const handleToggleAgent = (agentId) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, enabled: !agent.enabled, status: !agent.enabled ? 'active' : 'inactive' }
        : agent
    ));
  };

  const handleConfigureAgent = (agent) => {
    setSelectedAgent(agent);
    setConfigPanelOpen(true);
  };

  const handleViewAnalytics = (agent) => {
    setSelectedAgent(agent);
    setAnalyticsOpen(true);
  };

  const handleSaveConfiguration = (agentId, config) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, ...config }
        : agent
    ));
  };

  const handleApplyPreset = (presetId) => {
    setCurrentPreset(presetId);
    // Apply preset configuration logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNavigation />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Agent Management
            </h1>
            <p className="text-text-secondary">
              Configure and monitor your AI agents for optimal market analysis performance
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download">
              Export Config
            </Button>
            <Button variant="default" iconName="Plus">
              Add Agent
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {agents.filter(a => a.enabled).length}
                </div>
                <div className="text-sm text-text-secondary">Active Agents</div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={24} className="text-success" />
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">261</div>
                <div className="text-sm text-text-secondary">Queries Today</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={24} className="text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">92.3%</div>
                <div className="text-sm text-text-secondary">Avg Accuracy</div>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={24} className="text-warning" />
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">$127.50</div>
                <div className="text-sm text-text-secondary">Monthly Cost</div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Agents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Cards */}
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                Available Agents
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onToggle={handleToggleAgent}
                    onConfigure={handleConfigureAgent}
                    onViewDetails={handleViewAnalytics}
                  />
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <PerformanceChart
              data={performanceData}
              selectedMetric={selectedMetric}
              onMetricChange={setSelectedMetric}
            />

            {/* Preset Configurations */}
            <PresetConfigurations
              presets={presets}
              onApplyPreset={handleApplyPreset}
              currentPreset={currentPreset}
            />
          </div>

          {/* Right Column - Monitoring */}
          <div className="space-y-6">
            <SystemHealthMonitor
              systemHealth={systemHealth}
              activeQueries={activeQueries}
              queueStatus={queueStatus}
            />
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <ConfigurationPanel
        isOpen={configPanelOpen}
        onClose={() => setConfigPanelOpen(false)}
        agent={selectedAgent}
        onSave={handleSaveConfiguration}
      />

      {/* Analytics Modal */}
      <AgentAnalytics
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        agent={selectedAgent}
        analyticsData={analyticsData}
      />
    </div>
  );
};

export default AgentManagement;