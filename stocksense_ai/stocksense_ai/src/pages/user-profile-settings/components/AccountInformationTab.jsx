import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountInformationTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Trader',
    email: 'john.trader@stocksense.ai',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'English (US)',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: '30'
  });

  const subscriptionData = {
    plan: 'Pro',
    status: 'Active',
    nextBilling: '2025-08-09',
    price: '$29.99/month',
    features: ['Unlimited AI Queries', 'Real-time Market Data', 'Advanced Analytics', 'Priority Support']
  };

  const usageStats = {
    queriesThisMonth: 1247,
    queryLimit: 5000,
    dataUsage: '2.3 GB',
    dataLimit: '10 GB',
    agentsUsed: 3,
    agentsLimit: 5
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Profile Information</h3>
          <Button
            variant={isEditing ? "outline" : "default"}
            size="sm"
            iconName={isEditing ? "X" : "Edit"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface border-2 border-border">
              <Image
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" iconName="Camera">
                Change Photo
              </Button>
            )}
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Timezone"
                type="text"
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <Button variant="default" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Subscription</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-success font-medium">{subscriptionData.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Current Plan</span>
              <span className="font-semibold text-card-foreground">{subscriptionData.plan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Price</span>
              <span className="font-semibold text-card-foreground">{subscriptionData.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Next Billing</span>
              <span className="font-semibold text-card-foreground">{subscriptionData.nextBilling}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-card-foreground">Plan Features</h4>
            <ul className="space-y-2">
              {subscriptionData.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button variant="outline" iconName="CreditCard">
            Manage Billing
          </Button>
          <Button variant="outline" iconName="ArrowUp">
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Usage Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">AI Queries</span>
              <span className="text-sm text-card-foreground">
                {usageStats.queriesThisMonth.toLocaleString()} / {usageStats.queryLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(usageStats.queriesThisMonth / usageStats.queryLimit) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Data Usage</span>
              <span className="text-sm text-card-foreground">
                {usageStats.dataUsage} / {usageStats.dataLimit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: '23%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Active Agents</span>
              <span className="text-sm text-card-foreground">
                {usageStats.agentsUsed} / {usageStats.agentsLimit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-text-secondary">Add an extra layer of security to your account</p>
            </div>
            <Button
              variant={securitySettings.twoFactorEnabled ? "default" : "outline"}
              size="sm"
              iconName={securitySettings.twoFactorEnabled ? "Shield" : "ShieldOff"}
              onClick={() => handleSecurityChange('twoFactorEnabled', !securitySettings.twoFactorEnabled)}
            >
              {securitySettings.twoFactorEnabled ? 'Enabled' : 'Enable'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Login Alerts</h4>
              <p className="text-sm text-text-secondary">Get notified of new login attempts</p>
            </div>
            <Button
              variant={securitySettings.loginAlerts ? "default" : "outline"}
              size="sm"
              iconName={securitySettings.loginAlerts ? "Bell" : "BellOff"}
              onClick={() => handleSecurityChange('loginAlerts', !securitySettings.loginAlerts)}
            >
              {securitySettings.loginAlerts ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Session Timeout</h4>
              <p className="text-sm text-text-secondary">Automatically log out after inactivity</p>
            </div>
            <div className="w-32">
              <Input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                placeholder="Minutes"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" iconName="Key" className="mr-3">
              Change Password
            </Button>
            <Button variant="outline" iconName="Download">
              Download Account Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformationTab;