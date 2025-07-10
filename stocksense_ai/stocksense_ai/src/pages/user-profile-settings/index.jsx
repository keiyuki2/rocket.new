import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import tab components
import AccountInformationTab from './components/AccountInformationTab';
import AIPreferencesTab from './components/AIPreferencesTab';
import NotificationSettingsTab from './components/NotificationSettingsTab';
import DataManagementTab from './components/DataManagementTab';
import PresetProfileSelector from './components/PresetProfileSelector';
import SettingsPreview from './components/SettingsPreview';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showPreview, setShowPreview] = useState(false);
  const [currentSettings, setCurrentSettings] = useState({
    defaultTone: 'analyst',
    responseFormat: 'detailed',
    riskTolerance: 'moderate',
    investmentGoal: 'growth',
    autoSuggestions: true,
    contextMemory: true,
    realTimeData: true
  });

  const tabs = [
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      description: 'Profile information and subscription'
    },
    {
      id: 'ai-preferences',
      label: 'AI Preferences',
      icon: 'Bot',
      description: 'Customize AI behavior and responses'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Manage alerts and communication'
    },
    {
      id: 'data-management',
      label: 'Data Management',
      icon: 'Database',
      description: 'Privacy, export, and API settings'
    }
  ];

  const breadcrumbs = [
    { label: 'Dashboard', path: '/ai-chat-dashboard' },
    { label: 'Profile Settings', path: '/user-profile-settings' }
  ];

  const handleProfileSelect = (profile) => {
    setCurrentSettings(profile.settings);
    setActiveTab('ai-preferences');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountInformationTab />;
      case 'ai-preferences':
        return <AIPreferencesTab />;
      case 'notifications':
        return <NotificationSettingsTab />;
      case 'data-management':
        return <DataManagementTab />;
      default:
        return <AccountInformationTab />;
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        const tabIndex = parseInt(event.key) - 1;
        if (tabIndex >= 0 && tabIndex < tabs.length) {
          setActiveTab(tabs[tabIndex].id);
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [tabs]);

  return (
    <>
      <Helmet>
        <title>Profile Settings - StockSense AI</title>
        <meta name="description" content="Customize your StockSense AI experience with personalized settings for AI preferences, notifications, and data management." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationBar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
              <p className="text-text-secondary">
                Customize your StockSense AI experience and manage your account preferences
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                iconName="Eye"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              <Button variant="outline" size="sm" iconName="RotateCcw">
                Reset All
              </Button>
            </div>
          </div>

          {/* Quick Setup Profiles */}
          <div className="mb-8">
            <PresetProfileSelector onProfileSelect={handleProfileSelect} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="xl:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <h3 className="font-semibold text-card-foreground mb-4">Settings</h3>
                <nav className="space-y-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-xs opacity-75 truncate">
                          {tab.description}
                        </div>
                      </div>
                      <div className="text-xs opacity-50">
                        ⌘{index + 1}
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-card-foreground mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Last Login</span>
                      <span className="text-card-foreground">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Settings Updated</span>
                      <span className="text-card-foreground">3 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Profile Completion</span>
                      <span className="text-success">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className={`${showPreview ? 'xl:col-span-2' : 'xl:col-span-3'}`}>
              <div className="bg-card rounded-lg border border-border">
                {/* Tab Header */}
                <div className="border-b border-border p-6">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={tabs.find(tab => tab.id === activeTab)?.icon || 'Settings'} 
                      size={24} 
                      className="text-primary" 
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-card-foreground">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                      </h2>
                      <p className="text-text-secondary">
                        {tabs.find(tab => tab.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Settings Preview Sidebar */}
            {showPreview && (
              <div className="xl:col-span-1">
                <div className="sticky top-24">
                  <SettingsPreview currentSettings={currentSettings} />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Tab Navigation */}
          <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
            <div className="flex justify-around">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                    activeTab === tab.id
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={20} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile spacing for fixed navigation */}
          <div className="h-20 xl:hidden"></div>
        </div>
      </div>
    </>
  );
};

export default UserProfileSettings;