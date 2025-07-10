import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataManagementTab = () => {
  const [dataRetention, setDataRetention] = useState({
    queryHistory: '1year',
    chatSessions: '6months',
    marketData: '3months',
    userPreferences: 'forever',
    analyticsData: '1year'
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: false,
    improveAI: true,
    marketingEmails: false,
    thirdPartySharing: false,
    dataProcessing: true
  });

  const [apiAccess, setApiAccess] = useState({
    enabled: false,
    rateLimit: '1000',
    currentUsage: 247,
    lastReset: '2025-07-01'
  });

  const [exportOptions, setExportOptions] = useState({
    format: 'json',
    includeChats: true,
    includeQueries: true,
    includePreferences: true,
    includeAnalytics: false,
    dateRange: '3months'
  });

  const retentionOptions = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: '2years', label: '2 Years' },
    { value: 'forever', label: 'Forever' }
  ];

  const exportFormatOptions = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
    { value: 'pdf', label: 'PDF', description: 'Human-readable report' },
    { value: 'xml', label: 'XML', description: 'Structured data format' }
  ];

  const dateRangeOptions = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const dataCategories = [
    {
      key: 'queryHistory',
      label: 'Query History',
      description: 'Your AI chat queries and responses',
      icon: 'MessageSquare',
      size: '2.3 MB'
    },
    {
      key: 'chatSessions',
      label: 'Chat Sessions',
      description: 'Conversation threads and context',
      icon: 'MessagesSquare',
      size: '1.8 MB'
    },
    {
      key: 'marketData',
      label: 'Market Data Cache',
      description: 'Cached financial data and charts',
      icon: 'TrendingUp',
      size: '15.7 MB'
    },
    {
      key: 'userPreferences',
      label: 'User Preferences',
      description: 'Settings and customizations',
      icon: 'Settings',
      size: '0.1 MB'
    },
    {
      key: 'analyticsData',
      label: 'Analytics Data',
      description: 'Usage patterns and performance metrics',
      icon: 'BarChart3',
      size: '0.8 MB'
    }
  ];

  const handleRetentionChange = (field, value) => {
    setDataRetention(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportChange = (field, value) => {
    setExportOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExportData = () => {
    // Handle data export logic
    console.log('Exporting data with options:', exportOptions);
  };

  const handleDeleteData = (category) => {
    // Handle data deletion logic
    console.log('Deleting data for category:', category);
  };

  const generateAPIKey = () => {
    setApiAccess(prev => ({
      ...prev,
      enabled: true
    }));
  };

  const revokeAPIKey = () => {
    setApiAccess(prev => ({
      ...prev,
      enabled: false
    }));
  };

  return (
    <div className="space-y-8">
      {/* Data Retention Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Database" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Data Retention</h3>
        </div>
        
        <div className="space-y-6">
          {dataCategories.map((category) => (
            <div key={category.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={category.icon} size={20} className="text-text-secondary" />
                <div>
                  <h4 className="font-medium text-card-foreground">{category.label}</h4>
                  <p className="text-sm text-text-secondary">{category.description}</p>
                  <span className="text-xs text-text-secondary">Current size: {category.size}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Select
                  options={retentionOptions}
                  value={dataRetention[category.key]}
                  onChange={(value) => handleRetentionChange(category.key, value)}
                  className="w-32"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => handleDeleteData(category.key)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Shield" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Privacy Controls</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Share Analytics</h4>
              <p className="text-sm text-text-secondary">Help improve the platform with anonymous usage data</p>
            </div>
            <Checkbox
              checked={privacySettings.shareAnalytics}
              onChange={(e) => handlePrivacyChange('shareAnalytics', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">AI Model Improvement</h4>
              <p className="text-sm text-text-secondary">Use your queries to improve AI responses (anonymized)</p>
            </div>
            <Checkbox
              checked={privacySettings.improveAI}
              onChange={(e) => handlePrivacyChange('improveAI', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Marketing Communications</h4>
              <p className="text-sm text-text-secondary">Receive promotional emails and product updates</p>
            </div>
            <Checkbox
              checked={privacySettings.marketingEmails}
              onChange={(e) => handlePrivacyChange('marketingEmails', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Third-Party Data Sharing</h4>
              <p className="text-sm text-text-secondary">Share data with trusted partners for enhanced features</p>
            </div>
            <Checkbox
              checked={privacySettings.thirdPartySharing}
              onChange={(e) => handlePrivacyChange('thirdPartySharing', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Data Processing</h4>
              <p className="text-sm text-text-secondary">Allow processing of your data for core functionality</p>
            </div>
            <Checkbox
              checked={privacySettings.dataProcessing}
              onChange={(e) => handlePrivacyChange('dataProcessing', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Download" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Data Export</h3>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Export Format"
              description="Choose your preferred file format"
              options={exportFormatOptions}
              value={exportOptions.format}
              onChange={(value) => handleExportChange('format', value)}
            />

            <Select
              label="Date Range"
              description="Select the time period to export"
              options={dateRangeOptions}
              value={exportOptions.dateRange}
              onChange={(value) => handleExportChange('dateRange', value)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Include in Export</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Chat History"
                description="All your AI conversations"
                checked={exportOptions.includeChats}
                onChange={(e) => handleExportChange('includeChats', e.target.checked)}
              />
              <Checkbox
                label="Query History"
                description="Individual queries and responses"
                checked={exportOptions.includeQueries}
                onChange={(e) => handleExportChange('includeQueries', e.target.checked)}
              />
              <Checkbox
                label="User Preferences"
                description="Settings and configurations"
                checked={exportOptions.includePreferences}
                onChange={(e) => handleExportChange('includePreferences', e.target.checked)}
              />
              <Checkbox
                label="Analytics Data"
                description="Usage statistics and metrics"
                checked={exportOptions.includeAnalytics}
                onChange={(e) => handleExportChange('includeAnalytics', e.target.checked)}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="default" iconName="Download" onClick={handleExportData}>
              Export Data
            </Button>
            <Button variant="outline" iconName="FileText">
              Preview Export
            </Button>
          </div>
        </div>
      </div>

      {/* API Access */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Code" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">API Access</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">API Key Status</h4>
              <p className="text-sm text-text-secondary">
                {apiAccess.enabled ? 'Active API key for programmatic access' : 'No API key generated'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${apiAccess.enabled ? 'bg-success' : 'bg-muted-foreground'}`}></div>
              <span className="text-sm font-medium">
                {apiAccess.enabled ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {apiAccess.enabled && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-card-foreground">Rate Limit</h4>
                  <p className="text-2xl font-bold text-primary">{apiAccess.rateLimit}</p>
                  <p className="text-sm text-text-secondary">requests/hour</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-card-foreground">Current Usage</h4>
                  <p className="text-2xl font-bold text-accent">{apiAccess.currentUsage}</p>
                  <p className="text-sm text-text-secondary">this hour</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-card-foreground">Last Reset</h4>
                  <p className="text-sm font-medium text-card-foreground">{apiAccess.lastReset}</p>
                  <p className="text-sm text-text-secondary">monthly cycle</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-card-foreground mb-2">API Key</h4>
                <div className="flex items-center space-x-3">
                  <code className="flex-1 p-2 bg-background rounded border text-sm font-mono">
                    sk-stocksense-••••••••••••••••••••••••••••••••••••••••
                  </code>
                  <Button variant="outline" size="sm" iconName="Copy">
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            {apiAccess.enabled ? (
              <>
                <Button variant="outline" iconName="RotateCcw">
                  Regenerate Key
                </Button>
                <Button variant="destructive" iconName="Trash2" onClick={revokeAPIKey}>
                  Revoke Access
                </Button>
              </>
            ) : (
              <Button variant="default" iconName="Key" onClick={generateAPIKey}>
                Generate API Key
              </Button>
            )}
            <Button variant="outline" iconName="ExternalLink">
              API Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-lg border border-destructive p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="AlertTriangle" size={24} className="text-destructive" />
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div>
              <h4 className="font-medium text-card-foreground">Delete All Data</h4>
              <p className="text-sm text-text-secondary">Permanently remove all your data from our servers</p>
            </div>
            <Button variant="destructive" iconName="Trash2">
              Delete Everything
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div>
              <h4 className="font-medium text-card-foreground">Close Account</h4>
              <p className="text-sm text-text-secondary">Permanently close your account and delete all associated data</p>
            </div>
            <Button variant="destructive" iconName="UserX">
              Close Account
            </Button>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">
          Reset Settings
        </Button>
        <Button variant="default" iconName="Save">
          Save Data Settings
        </Button>
      </div>
    </div>
  );
};

export default DataManagementTab;