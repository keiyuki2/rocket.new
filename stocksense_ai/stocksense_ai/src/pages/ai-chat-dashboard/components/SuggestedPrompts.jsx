import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { generateSuggestedPrompts } from '../../../services/openaiService';

const SuggestedPrompts = ({ onPromptSelect }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadSuggestedPrompts();
  }, []);

  const loadSuggestedPrompts = async () => {
    try {
      setLoading(true);
      const suggestedPrompts = await generateSuggestedPrompts();
      setPrompts(suggestedPrompts);
    } catch (error) {
      console.error('Error loading suggested prompts:', error);
      // Use fallback prompts if API fails
      setPrompts([
        { text: "What's happening with Tesla stock today?", category: "Stock Analysis", icon: "TrendingUp" },
        { text: "Analyze Apple's latest earnings report", category: "Earnings", icon: "FileText" },
        { text: "Should I buy or sell Microsoft stock?", category: "Investment", icon: "DollarSign" },
        { text: "What are the best tech stocks for 2024?", category: "Sector", icon: "Cpu" },
        { text: "Explain the current market volatility", category: "Market Trends", icon: "Activity" },
        { text: "Compare Amazon vs Google stock performance", category: "Comparison", icon: "BarChart3" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    onPromptSelect(prompt.text);
  };

  const handleRefresh = () => {
    loadSuggestedPrompts();
  };

  const displayPrompts = showAll ? prompts : prompts.slice(0, 4);

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-card-foreground">
            Suggested Prompts
          </h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground transition-smooth disabled:opacity-50"
          title="Refresh suggestions"
        >
          <Icon name="RefreshCw" size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Prompts List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="p-3 bg-muted/50 rounded-lg animate-pulse"
              >
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          displayPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(prompt)}
              className="w-full p-3 bg-muted/50 hover:bg-muted/70 border border-border/50 hover:border-primary/20 rounded-lg transition-smooth text-left group"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                  <Icon name={prompt.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                    {prompt.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {prompt.category}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Show More/Less Button */}
      {!loading && prompts.length > 4 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-muted hover:bg-muted/80 rounded-lg text-sm text-muted-foreground hover:text-card-foreground transition-smooth"
          >
            <Icon name={showAll ? 'ChevronUp' : 'ChevronDown'} size={16} />
            <span>{showAll ? 'Show Less' : `Show ${prompts.length - 4} More`}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SuggestedPrompts;