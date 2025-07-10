import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettingsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    marketAlerts: true,
    analysisComplete: true,
    systemUpdates: false,
    weeklyDigest: true,
    priceTargets: true,
    portfolioUpdates: true,
    newsAlerts: false,
    maintenanceNotices: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    marketAlerts: true,
    analysisComplete: false,
    systemUpdates: false,
    priceTargets: true,
    portfolioUpdates: false,
    newsAlerts: true,
    urgentAlerts: true
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    marketAlerts: true,
    analysisComplete: true,
    systemUpdates: true,
    priceTargets: true,
    portfolioUpdates: true,
    newsAlerts: true,
    chatResponses: true,
    agentUpdates: true
  });

  const [notificationTiming, setNotificationTiming] = useState({
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    timezone: 'America/New_York',
    frequency: 'immediate',
    batchDelay: '15'
  });

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Send notifications right away' },
    { value: 'batched', label: 'Batched', description: 'Group notifications together' },
    { value: 'daily', label: 'Daily Digest', description: 'Once per day summary' },
    { value: 'weekly', label: 'Weekly Summary', description: 'Weekly compilation' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  const handleEmailChange = (field, value) => {
    setEmailNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePushChange = (field, value) => {
    setPushNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInAppChange = (field, value) => {
    setInAppNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimingChange = (field, value) => {
    setNotificationTiming(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const notificationTypes = [
    {
      key: 'marketAlerts',
      label: 'Market Alerts',
      description: 'Significant market movements and events',
      icon: 'TrendingUp'
    },
    {
      key: 'analysisComplete',
      label: 'Analysis Complete',
      description: 'When AI analysis finishes processing',
      icon: 'CheckCircle'
    },
    {
      key: 'systemUpdates',
      label: 'System Updates',
      description: 'Platform updates and new features',
      icon: 'Settings'
    },
    {
      key: 'priceTargets',
      label: 'Price Targets',
      description: 'When stocks hit your target prices',
      icon: 'Target'
    },
    {
      key: 'portfolioUpdates',
      label: 'Portfolio Updates',
      description: 'Changes to your watchlist and portfolio',
      icon: 'Briefcase'
    },
    {
      key: 'newsAlerts',
      label: 'News Alerts',
      description: 'Breaking financial news and events',
      icon: 'Newspaper'
    }
  ];

  const additionalInAppTypes = [
    {
      key: 'chatResponses',
      label: 'Chat Responses',
      description: 'New messages in AI chat sessions',
      icon: 'MessageSquare'
    },
    {
      key: 'agentUpdates',
      label: 'Agent Updates',
      description: 'AI agent status and configuration changes',
      icon: 'Bot'
    }
  ];

  const additionalPushTypes = [
    {
      key: 'urgentAlerts',
      label: 'Urgent Alerts',
      description: 'Critical market events requiring immediate attention',
      icon: 'AlertTriangle'
    }
  ];

  const additionalEmailTypes = [
    {
      key: 'weeklyDigest',
      label: 'Weekly Digest',
      description: 'Summary of your week\'s activity and insights',
      icon: 'Calendar'
    },
    {
      key: 'maintenanceNotices',
      label: 'Maintenance Notices',
      description: 'Scheduled maintenance and downtime alerts',
      icon: 'Tool'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Email Notifications</h3>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
        
        <div className="space-y-4">
          {[...notificationTypes, ...additionalEmailTypes].map((type) => (
            <div key={type.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={type.icon} size={20} className="text-text-secondary" />
                <div>
                  <h4 className="font-medium text-card-foreground">{type.label}</h4>
                  <p className="text-sm text-text-secondary">{type.description}</p>
                </div>
              </div>
              <Checkbox
                checked={emailNotifications[type.key]}
                onChange={(e) => handleEmailChange(type.key, e.target.checked)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Smartphone" size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Push Notifications</h3>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
        
        <div className="space-y-4">
          {[...notificationTypes, ...additionalPushTypes].map((type) => (
            <div key={type.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={type.icon} size={20} className="text-text-secondary" />
                <div>
                  <h4 className="font-medium text-card-foreground">{type.label}</h4>
                  <p className="text-sm text-text-secondary">{type.description}</p>
                </div>
              </div>
              <Checkbox
                checked={pushNotifications[type.key]}
                onChange={(e) => handlePushChange(type.key, e.target.checked)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">In-App Notifications</h3>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
        
        <div className="space-y-4">
          {[...notificationTypes, ...additionalInAppTypes].map((type) => (
            <div key={type.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={type.icon} size={20} className="text-text-secondary" />
                <div>
                  <h4 className="font-medium text-card-foreground">{type.label}</h4>
                  <p className="text-sm text-text-secondary">{type.description}</p>
                </div>
              </div>
              <Checkbox
                checked={inAppNotifications[type.key]}
                onChange={(e) => handleInAppChange(type.key, e.target.checked)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Timing */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Clock" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Notification Timing</h3>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Notification Frequency"
              description="How often to receive notifications"
              options={frequencyOptions}
              value={notificationTiming.frequency}
              onChange={(value) => handleTimingChange('frequency', value)}
            />

            <Select
              label="Timezone"
              description="Your local timezone for scheduling"
              options={timezoneOptions}
              value={notificationTiming.timezone}
              onChange={(value) => handleTimingChange('timezone', value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-card-foreground">Quiet Hours</h4>
                <p className="text-sm text-text-secondary">Disable notifications during specified hours</p>
              </div>
              <Checkbox
                checked={notificationTiming.quietHours}
                onChange={(e) => handleTimingChange('quietHours', e.target.checked)}
              />
            </div>

            {notificationTiming.quietHours && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Quiet Start Time
                  </label>
                  <input
                    type="time"
                    value={notificationTiming.quietStart}
                    onChange={(e) => handleTimingChange('quietStart', e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Quiet End Time
                  </label>
                  <input
                    type="time"
                    value={notificationTiming.quietEnd}
                    onChange={(e) => handleTimingChange('quietEnd', e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            )}
          </div>

          {notificationTiming.frequency === 'batched' && (
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-card-foreground">
                Batch Delay (minutes):
              </label>
              <input
                type="number"
                value={notificationTiming.batchDelay}
                onChange={(e) => handleTimingChange('batchDelay', e.target.value)}
                min="5"
                max="60"
                className="w-20 px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Quick Actions</h3>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" iconName="Volume2">
            Test Notifications
          </Button>
          <Button variant="outline" iconName="VolumeX">
            Disable All
          </Button>
          <Button variant="outline" iconName="Volume1">
            Enable All
          </Button>
          <Button variant="outline" iconName="RotateCcw">
            Reset to Defaults
          </Button>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">
          Cancel Changes
        </Button>
        <Button variant="default" iconName="Save">
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettingsTab;