import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import RegisterPrompt from './components/RegisterPrompt';
import MarketBackground from './components/MarketBackground';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - StockSense AI | AI-Powered Market Analysis</title>
        <meta name="description" content="Sign in to StockSense AI for personalized AI-powered stock market analysis and insights. Access your dashboard with secure authentication." />
        <meta name="keywords" content="stock analysis, AI trading, market insights, financial dashboard, login" />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
        {/* Animated Market Background */}
        <MarketBackground />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Login Card */}
          <div className="bg-card border border-border rounded-xl shadow-modal p-8">
            {/* Header */}
            <LoginHeader />

            {/* Login Form */}
            <LoginForm />

            {/* Social Login */}
            <div className="mt-6">
              <SocialLogin />
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Register Prompt */}
            <RegisterPrompt />
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              By signing in, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-smooth">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-smooth">
                Privacy Policy
              </a>
            </p>
            <div className="mt-2 text-xs text-text-secondary">
              © {new Date().getFullYear()} StockSense AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;