import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Register from "pages/register";
import AiChatDashboard from "pages/ai-chat-dashboard";
import AgentManagement from "pages/agent-management";
import UserProfileSettings from "pages/user-profile-settings";
import MarketDataDashboard from "pages/market-data-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AiChatDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai-chat-dashboard" element={<AiChatDashboard />} />
        <Route path="/agent-management" element={<AgentManagement />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/market-data-dashboard" element={<MarketDataDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;