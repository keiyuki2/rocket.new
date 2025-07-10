import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import SuggestedPrompts from './components/SuggestedPrompts';
import ConversationHistory from './components/ConversationHistory';
import AgentManagement from './components/AgentManagement';
import ChatInterface from './components/ChatInterface';
import MarketDataPanel from './components/MarketDataPanel';
import QuickAnalysisTools from './components/QuickAnalysisTools';

const AIChatDashboard = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeAgents, setActiveAgents] = useState(['openai', 'claude', 'gemini']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
        setRightPanelCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePromptSelect = (prompt) => {
    // Handle prompt selection - would typically send to chat
    console.log('Selected prompt:', prompt);
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleNewConversation = () => {
    setActiveConversation(null);
  };

  const handleAgentToggle = (agentId) => {
    setActiveAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleAgentConfigure = (agentId) => {
    console.log('Configure agent:', agentId);
  };

  const handleSendMessage = (messageData) => {
    console.log('Send message:', messageData);
  };

  const handleAnalysisRequest = (query) => {
    console.log('Analysis request:', query);
  };

  const breadcrumbs = [
    { label: 'Dashboard', path: '/ai-chat-dashboard' }
  ];

  return (
    <>
      <Helmet>
        <title>AI Chat Dashboard - StockSense AI</title>
        <meta name="description" content="Interact with multiple AI agents to analyze stock market data and receive investment insights through natural language queries." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationBar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
          
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h1 className="text-2xl font-heading font-bold text-foreground">
                AI Chat Dashboard
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-md bg-card border border-border text-card-foreground hover:bg-muted transition-smooth"
                >
                  <span className="sr-only">Toggle sidebar</span>
                  <div className="w-4 h-4 flex flex-col justify-center space-y-1">
                    <div className="w-full h-0.5 bg-current" />
                    <div className="w-full h-0.5 bg-current" />
                    <div className="w-full h-0.5 bg-current" />
                  </div>
                </button>
                <button
                  onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                  className="p-2 rounded-md bg-card border border-border text-card-foreground hover:bg-muted transition-smooth"
                >
                  <span className="sr-only">Toggle market panel</span>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Sidebar */}
            <div className={`lg:col-span-3 ${sidebarCollapsed && isMobile ? 'hidden' : ''} ${isMobile ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
              {isMobile && (
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    Tools & History
                  </h2>
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    className="p-2 rounded-md bg-card border border-border text-card-foreground hover:bg-muted transition-smooth"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <div className="space-y-4 h-full">
                {/* Suggested Prompts */}
                <div className="h-1/3">
                  <SuggestedPrompts onPromptSelect={handlePromptSelect} />
                </div>
                
                {/* Conversation History */}
                <div className="h-1/3">
                  <ConversationHistory
                    activeConversation={activeConversation}
                    onConversationSelect={handleConversationSelect}
                    onNewConversation={handleNewConversation}
                  />
                </div>
                
                {/* Agent Management */}
                <div className="h-1/3">
                  <AgentManagement
                    activeAgents={activeAgents}
                    onAgentToggle={handleAgentToggle}
                    onAgentConfigure={handleAgentConfigure}
                  />
                </div>
              </div>
            </div>

            {/* Main Chat Interface */}
            <div className="lg:col-span-6">
              <ChatInterface
                activeConversation={activeConversation}
                onSendMessage={handleSendMessage}
              />
            </div>

            {/* Right Panel */}
            <div className={`lg:col-span-3 ${rightPanelCollapsed && isMobile ? 'hidden' : ''} ${isMobile ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
              {isMobile && (
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    Market Data
                  </h2>
                  <button
                    onClick={() => setRightPanelCollapsed(true)}
                    className="p-2 rounded-md bg-card border border-border text-card-foreground hover:bg-muted transition-smooth"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <div className="space-y-4 h-full">
                {/* Market Data Panel */}
                <div className="h-2/3">
                  <MarketDataPanel />
                </div>
                
                {/* Quick Analysis Tools */}
                <div className="h-1/3">
                  <QuickAnalysisTools onAnalysisRequest={handleAnalysisRequest} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Overlay */}
          {isMobile && (!sidebarCollapsed || !rightPanelCollapsed) && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => {
                setSidebarCollapsed(true);
                setRightPanelCollapsed(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AIChatDashboard;