import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TrustIndicators from './components/TrustIndicators';
import BackgroundVisualization from './components/BackgroundVisualization';

const Register = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Visualization */}
      <BackgroundVisualization />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column - Branding & Trust Indicators */}
            <div className="space-y-8">
              {/* Logo and Branding */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name="TrendingUp" size={28} color="var(--color-primary-foreground)" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      StockSense AI
                    </h1>
                    <p className="text-sm text-text-secondary">
                      AI-Powered Investment Intelligence
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                    Join the Future of
                    <span className="text-primary block">Smart Investing</span>
                  </h2>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    Get personalized AI insights from multiple expert agents. 
                    Make informed investment decisions with confidence.
                  </p>
                </div>

                {/* Key Features */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Bot" size={16} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground">Multi-AI Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="BarChart3" size={16} className="text-accent" />
                    </div>
                    <span className="text-sm text-foreground">Real-time Data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Target" size={16} className="text-success" />
                    </div>
                    <span className="text-sm text-foreground">Personalized Insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Shield" size={16} className="text-warning" />
                    </div>
                    <span className="text-sm text-foreground">Secure Platform</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <TrustIndicators />
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <div className="bg-card border border-border rounded-2xl shadow-modal p-6 lg:p-8">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-heading font-bold text-card-foreground mb-2">
                    Create Your Account
                  </h3>
                  <p className="text-text-secondary">
                    Start your AI-powered investment journey today
                  </p>
                </div>

                {/* Registration Form */}
                <RegistrationForm />

                {/* Social Registration */}
                <div className="mt-8">
                  <SocialRegistration />
                </div>

                {/* Sign In Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-text-secondary">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>

                {/* Mobile Trust Indicators */}
                <div className="mt-8 lg:hidden">
                  <TrustIndicators />
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
                  <Link to="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="#" className="hover:text-foreground transition-colors">
                    Risk Disclosure
                  </Link>
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                  © {new Date().getFullYear()} StockSense AI. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;