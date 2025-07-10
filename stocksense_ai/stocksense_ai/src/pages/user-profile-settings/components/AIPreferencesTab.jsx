import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AIPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    defaultTone: 'analyst',
    responseFormat: 'detailed',
    riskTolerance: 'moderate',
    investmentGoal: 'growth',
    marketFocus: ['stocks', 'crypto'],
    preferredAgents: ['openai', 'claude'],
    autoSuggestions: true,
    contextMemory: true,
    realTimeData: true
  });

  const [customPrompts, setCustomPrompts] = useState([
    {
      id: 1,
      name: 'Daily Market Summary',
      prompt: 'Provide a concise daily market summary focusing on major indices, top movers, and key economic events.',
      isActive: true
    },
    {
      id: 2,
      name: 'Risk Assessment',
      prompt: 'Analyze the risk factors for the given stock including volatility, market conditions, and sector performance.',
      isActive: true
    },
    {
      id: 3,
      name: 'Technical Analysis',
      prompt: 'Perform technical analysis including chart patterns, support/resistance levels, and momentum indicators.',
      isActive: false
    }
  ]);

  const toneOptions = [
    { value: 'beginner', label: 'Beginner-Friendly', description: 'Simple explanations with educational context' },
    { value: 'analyst', label: 'Analyst Mode', description: 'Professional analysis with technical details' },
    { value: 'quick', label: 'Quick Summary', description: 'Concise insights for fast decision making' },
    { value: 'detailed', label: 'Detailed Analysis', description: 'Comprehensive breakdown with multiple perspectives' }
  ];

  const formatOptions = [
    { value: 'summary', label: 'Summary Cards', description: 'Key points in digestible card format' },
    { value: 'detailed', label: 'Detailed Report', description: 'Full analysis with charts and explanations' },
    { value: 'bullet', label: 'Bullet Points', description: 'Quick bullet-point format' },
    { value: 'comparison', label: 'Side-by-Side', description: 'Compare multiple AI perspectives' }
  ];

  const riskToleranceOptions = [
    { value: 'conservative', label: 'Conservative', description: 'Low-risk, stable investments' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced risk-reward approach' },
    { value: 'aggressive', label: 'Aggressive', description: 'High-risk, high-reward strategies' }
  ];

  const investmentGoalOptions = [
    { value: 'income', label: 'Income Generation', description: 'Focus on dividends and steady returns' },
    { value: 'growth', label: 'Capital Growth', description: 'Long-term appreciation potential' },
    { value: 'trading', label: 'Active Trading', description: 'Short-term trading opportunities' },
    { value: 'balanced', label: 'Balanced Portfolio', description: 'Mix of growth and income' }
  ];

  const marketFocusOptions = [
    { value: 'stocks', label: 'Stocks' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'forex', label: 'Forex' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'bonds', label: 'Bonds' },
    { value: 'etfs', label: 'ETFs' }
  ];

  const agentOptions = [
    { value: 'openai', label: 'OpenAI GPT-4', description: 'Advanced reasoning and analysis' },
    { value: 'claude', label: 'Anthropic Claude', description: 'Detailed explanations and safety-focused' },
    { value: 'gemini', label: 'Google Gemini', description: 'Real-time data integration' }
  ];

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMarketFocusChange = (value) => {
    setPreferences(prev => ({
      ...prev,
      marketFocus: prev.marketFocus.includes(value)
        ? prev.marketFocus.filter(item => item !== value)
        : [...prev.marketFocus, value]
    }));
  };

  const handleAgentChange = (value) => {
    setPreferences(prev => ({
      ...prev,
      preferredAgents: prev.preferredAgents.includes(value)
        ? prev.preferredAgents.filter(item => item !== value)
        : [...prev.preferredAgents, value]
    }));
  };

  const togglePrompt = (id) => {
    setCustomPrompts(prev => prev.map(prompt => 
      prompt.id === id ? { ...prompt, isActive: !prompt.isActive } : prompt
    ));
  };

  const addCustomPrompt = () => {
    const newPrompt = {
      id: Date.now(),
      name: 'New Custom Prompt',
      prompt: 'Enter your custom prompt here...',
      isActive: false
    };
    setCustomPrompts(prev => [...prev, newPrompt]);
  };

  return (
    <div className="space-y-8">
      {/* Analysis Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Analysis Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Response Tone"
            description="How AI agents should communicate with you"
            options={toneOptions}
            value={preferences.defaultTone}
            onChange={(value) => handlePreferenceChange('defaultTone', value)}
          />

          <Select
            label="Response Format"
            description="Preferred format for AI responses"
            options={formatOptions}
            value={preferences.responseFormat}
            onChange={(value) => handlePreferenceChange('responseFormat', value)}
          />

          <Select
            label="Risk Tolerance"
            description="Your investment risk preference"
            options={riskToleranceOptions}
            value={preferences.riskTolerance}
            onChange={(value) => handlePreferenceChange('riskTolerance', value)}
          />

          <Select
            label="Investment Goal"
            description="Primary investment objective"
            options={investmentGoalOptions}
            value={preferences.investmentGoal}
            onChange={(value) => handlePreferenceChange('investmentGoal', value)}
          />
        </div>
      </div>

      {/* Market Focus */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Market Focus Areas</h3>
        <p className="text-text-secondary mb-4">Select the markets you're most interested in analyzing</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {marketFocusOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={preferences.marketFocus.includes(option.value)}
              onChange={() => handleMarketFocusChange(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Preferred AI Agents */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Preferred AI Agents</h3>
        <p className="text-text-secondary mb-4">Choose which AI agents to use for analysis</p>
        
        <div className="space-y-4">
          {agentOptions.map((agent) => (
            <div key={agent.value} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={preferences.preferredAgents.includes(agent.value)}
                  onChange={() => handleAgentChange(agent.value)}
                />
                <div>
                  <h4 className="font-medium text-card-foreground">{agent.label}</h4>
                  <p className="text-sm text-text-secondary">{agent.description}</p>
                </div>
              </div>
              <Icon name="Bot" size={20} className="text-text-secondary" />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Prompt Templates */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Custom Prompt Templates</h3>
          <Button variant="outline" size="sm" iconName="Plus" onClick={addCustomPrompt}>
            Add Template
          </Button>
        </div>
        
        <div className="space-y-4">
          {customPrompts.map((prompt) => (
            <div key={prompt.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={prompt.isActive}
                    onChange={() => togglePrompt(prompt.id)}
                  />
                  <h4 className="font-medium text-card-foreground">{prompt.name}</h4>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" iconName="Edit" />
                  <Button variant="ghost" size="sm" iconName="Trash2" />
                </div>
              </div>
              <p className="text-sm text-text-secondary ml-7">{prompt.prompt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Advanced Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Auto-Suggestions</h4>
              <p className="text-sm text-text-secondary">Show suggested follow-up questions</p>
            </div>
            <Checkbox
              checked={preferences.autoSuggestions}
              onChange={(e) => handlePreferenceChange('autoSuggestions', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Context Memory</h4>
              <p className="text-sm text-text-secondary">Remember conversation context across sessions</p>
            </div>
            <Checkbox
              checked={preferences.contextMemory}
              onChange={(e) => handlePreferenceChange('contextMemory', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Real-Time Data</h4>
              <p className="text-sm text-text-secondary">Include live market data in responses</p>
            </div>
            <Checkbox
              checked={preferences.realTimeData}
              onChange={(e) => handlePreferenceChange('realTimeData', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button variant="default" iconName="Save">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default AIPreferencesTab;