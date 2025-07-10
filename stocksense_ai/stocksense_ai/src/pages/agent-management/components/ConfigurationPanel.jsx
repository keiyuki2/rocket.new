import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfigurationPanel = ({ isOpen, onClose, agent, onSave }) => {
  const [config, setConfig] = useState({
    apiKey: agent?.apiKey || '',
    model: agent?.model || '',
    temperature: agent?.temperature || 0.7,
    maxTokens: agent?.maxTokens || 2000,
    timeout: agent?.timeout || 30,
    searchEnabled: agent?.searchEnabled || false,
    toolAccess: agent?.toolAccess || [],
    responseFormat: agent?.responseFormat || 'detailed',
    customInstructions: agent?.customInstructions || ''
  });

  const modelOptions = {
    'OpenAI': [
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
    ],
    'Claude': [
      { value: 'claude-3-opus', label: 'Claude 3 Opus' },
      { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
      { value: 'claude-3-haiku', label: 'Claude 3 Haiku' }
    ],
    'Gemini': [
      { value: 'gemini-pro', label: 'Gemini Pro' },
      { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' }
    ]
  };

  const responseFormatOptions = [
    { value: 'detailed', label: 'Detailed Analysis' },
    { value: 'summary', label: 'Quick Summary' },
    { value: 'bullet-points', label: 'Bullet Points' },
    { value: 'structured', label: 'Structured Data' }
  ];

  const availableTools = [
    { id: 'web-search', label: 'Web Search', description: 'Access to real-time web search' },
    { id: 'market-data', label: 'Market Data', description: 'Real-time financial data access' },
    { id: 'news-analysis', label: 'News Analysis', description: 'Financial news processing' },
    { id: 'chart-generation', label: 'Chart Generation', description: 'Create visual charts' },
    { id: 'sentiment-analysis', label: 'Sentiment Analysis', description: 'Market sentiment evaluation' }
  ];

  const handleSave = () => {
    onSave(agent.id, config);
    onClose();
  };

  const handleToolToggle = (toolId) => {
    setConfig(prev => ({
      ...prev,
      toolAccess: prev.toolAccess.includes(toolId)
        ? prev.toolAccess.filter(id => id !== toolId)
        : [...prev.toolAccess, toolId]
    }));
  };

  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.bgColor}`}>
              <Icon name={agent.icon} size={20} color={agent.iconColor} />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">
                Configure {agent.name}
              </h2>
              <p className="text-sm text-text-secondary">{agent.provider}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Configuration Form */}
        <div className="p-6 space-y-6">
          {/* API Configuration */}
          <div>
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              API Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="API Key"
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter API key"
                description="Your API key will be encrypted and stored securely"
              />
              <Select
                label="Model"
                options={modelOptions[agent.provider] || []}
                value={config.model}
                onChange={(value) => setConfig(prev => ({ ...prev, model: value }))}
              />
            </div>
          </div>

          {/* Model Parameters */}
          <div>
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              Model Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Temperature"
                type="number"
                min="0"
                max="2"
                step="0.1"
                value={config.temperature}
                onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                description="Controls randomness (0-2)"
              />
              <Input
                label="Max Tokens"
                type="number"
                min="100"
                max="4000"
                value={config.maxTokens}
                onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                description="Maximum response length"
              />
              <Input
                label="Timeout (seconds)"
                type="number"
                min="5"
                max="120"
                value={config.timeout}
                onChange={(e) => setConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                description="Request timeout"
              />
            </div>
          </div>

          {/* Response Configuration */}
          <div>
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              Response Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Response Format"
                options={responseFormatOptions}
                value={config.responseFormat}
                onChange={(value) => setConfig(prev => ({ ...prev, responseFormat: value }))}
              />
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  checked={config.searchEnabled}
                  onChange={(e) => setConfig(prev => ({ ...prev, searchEnabled: e.target.checked }))}
                  label="Enable Web Search"
                  description="Allow agent to search the web for current information"
                />
              </div>
            </div>
          </div>

          {/* Tool Access */}
          <div>
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              Tool Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableTools.map((tool) => (
                <div
                  key={tool.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
                    config.toolAccess.includes(tool.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleToolToggle(tool.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      config.toolAccess.includes(tool.id)
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {config.toolAccess.includes(tool.id) && (
                        <Icon name="Check" size={12} color="var(--color-primary-foreground)" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{tool.label}</div>
                      <div className="text-sm text-text-secondary">{tool.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Instructions */}
          <div>
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              Custom Instructions
            </h3>
            <textarea
              value={config.customInstructions}
              onChange={(e) => setConfig(prev => ({ ...prev, customInstructions: e.target.value }))}
              placeholder="Enter custom instructions for this agent..."
              className="w-full h-32 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;