import openai from './openaiClient';

/**
 * Generates a structured chat completion response for stock analysis.
 * @param {string} userMessage - The user's input message.
 * @param {string} tone - The tone of analysis (beginner, analyst, quick).
 * @param {string} goal - The goal of analysis (summary, bullish, bearish).
 * @returns {Promise<object>} Structured response with analysis and confidence.
 */
export async function getStockAnalysis(userMessage, tone = 'analyst', goal = 'summary') {
  try {
    const systemPrompt = getSystemPrompt(tone, goal);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'stock_analysis_response',
          schema: {
            type: 'object',
            properties: {
              analysis: { type: 'string' },
              confidence: { type: 'number' },
              key_points: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              recommendation: { type: 'string' },
              risk_level: { type: 'string' },
              time_horizon: { type: 'string' }
            },
            required: ['analysis', 'confidence', 'key_points', 'recommendation', 'risk_level', 'time_horizon'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      ...result,
      timestamp: new Date(),
      agent: 'OpenAI',
      id: Date.now() + Math.random()
    };
  } catch (error) {
    console.error('Error in stock analysis:', error);
    throw new Error('Failed to generate stock analysis. Please try again.');
  }
}

/**
 * Streams a chat completion response for real-time stock analysis.
 * @param {string} userMessage - The user's input message.
 * @param {string} tone - The tone of analysis.
 * @param {string} goal - The goal of analysis.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function getStreamingStockAnalysis(userMessage, tone, goal, onChunk) {
  try {
    const systemPrompt = getSystemPrompt(tone, goal);
    
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1500,
    });

    let fullContent = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullContent += content;
        onChunk(content, fullContent);
      }
    }
    
    return fullContent;
  } catch (error) {
    console.error('Error in streaming stock analysis:', error);
    throw new Error('Failed to stream stock analysis. Please try again.');
  }
}

/**
 * Generates multiple AI agent responses for comparison.
 * @param {string} userMessage - The user's input message.
 * @param {string} tone - The tone of analysis.
 * @param {string} goal - The goal of analysis.
 * @param {string[]} agents - Array of agent configurations.
 * @returns {Promise<Array>} Array of responses from different agents.
 */
export async function getMultiAgentAnalysis(userMessage, tone, goal, agents = ['technical', 'fundamental', 'sentiment']) {
  try {
    const promises = agents.map(agent => 
      getAgentSpecificAnalysis(userMessage, tone, goal, agent)
    );
    
    const responses = await Promise.all(promises);
    return responses;
  } catch (error) {
    console.error('Error in multi-agent analysis:', error);
    throw new Error('Failed to generate multi-agent analysis. Please try again.');
  }
}

/**
 * Generates agent-specific analysis based on specialization.
 * @param {string} userMessage - The user's input message.
 * @param {string} tone - The tone of analysis.
 * @param {string} goal - The goal of analysis.
 * @param {string} agentType - Type of agent (technical, fundamental, sentiment).
 * @returns {Promise<object>} Agent-specific analysis response.
 */
async function getAgentSpecificAnalysis(userMessage, tone, goal, agentType) {
  const agentPrompts = {
    technical: 'You are a technical analysis expert. Focus on charts, patterns, indicators, and price action.',
    fundamental: 'You are a fundamental analysis expert. Focus on company financials, earnings, growth, and valuation.',
    sentiment: 'You are a market sentiment expert. Focus on news, social media, and market psychology.'
  };

  const agentNames = {
    technical: 'Technical Analyst',
    fundamental: 'Fundamental Analyst', 
    sentiment: 'Sentiment Analyst'
  };

  const systemPrompt = `${agentPrompts[agentType]} ${getSystemPrompt(tone, goal)}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'agent_analysis_response',
        schema: {
          type: 'object',
          properties: {
            analysis: { type: 'string' },
            confidence: { type: 'number' },
            key_points: { 
              type: 'array', 
              items: { type: 'string' } 
            },
            recommendation: { type: 'string' },
            risk_level: { type: 'string' }
          },
          required: ['analysis', 'confidence', 'key_points', 'recommendation', 'risk_level'],
          additionalProperties: false,
        },
      },
    },
    temperature: 0.7,
    max_tokens: 1200,
  });

  const result = JSON.parse(response.choices[0].message.content);
  
  return {
    ...result,
    timestamp: new Date(),
    agent: agentNames[agentType],
    agentType,
    id: Date.now() + Math.random()
  };
}

/**
 * Generates system prompt based on tone and goal.
 * @param {string} tone - The tone of analysis.
 * @param {string} goal - The goal of analysis.
 * @returns {string} System prompt for the AI.
 */
function getSystemPrompt(tone, goal) {
  const toneInstructions = {
    beginner: 'Explain concepts in simple terms, avoid jargon, and provide educational context.',
    analyst: 'Use professional financial terminology and provide detailed technical analysis.',
    quick: 'Be concise and direct, focusing on key actionable insights.'
  };

  const goalInstructions = {
    summary: 'Provide a balanced overview of the current situation and outlook.',
    bullish: 'Focus on positive factors, growth opportunities, and reasons for optimism.',
    bearish: 'Highlight risks, challenges, and potential negative scenarios.'
  };

  return `You are a professional stock market analyst with expertise in financial markets. 
  
  Style: ${toneInstructions[tone] || toneInstructions.analyst}
  Focus: ${goalInstructions[goal] || goalInstructions.summary}
  
  Provide analysis with:
  - Clear, actionable insights
  - Confidence level (0-100)
  - Key supporting points
  - Specific recommendation
  - Risk assessment (Low/Medium/High)
  - Appropriate time horizon
  
  Always base your analysis on current market conditions and provide realistic assessments.
  Current date: ${new Date().toLocaleDateString()}`;
}

/**
 * Generates suggested prompts for stock analysis.
 * @returns {Promise<Array>} Array of suggested prompts.
 */
export async function generateSuggestedPrompts() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'Generate 6 engaging stock market analysis prompts that users would find helpful. Focus on current market trends, popular stocks, and common investment questions.' 
        },
        { 
          role: 'user', 
          content: 'Generate suggested prompts for stock analysis' 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'suggested_prompts',
          schema: {
            type: 'object',
            properties: {
              prompts: { 
                type: 'array', 
                items: { 
                  type: 'object',
                  properties: {
                    text: { type: 'string' },
                    category: { type: 'string' },
                    icon: { type: 'string' }
                  },
                  required: ['text', 'category', 'icon']
                }
              }
            },
            required: ['prompts'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.8,
      max_tokens: 800,
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.prompts;
  } catch (error) {
    console.error('Error generating suggested prompts:', error);
    // Return fallback prompts
    return [
      { text: "What's happening with Tesla stock today?", category: "Stock Analysis", icon: "TrendingUp" },
      { text: "Analyze Apple's latest earnings report", category: "Earnings", icon: "FileText" },
      { text: "Should I buy or sell Microsoft stock?", category: "Investment", icon: "DollarSign" },
      { text: "What are the best tech stocks for 2024?", category: "Sector", icon: "Cpu" },
      { text: "Explain the current market volatility", category: "Market Trends", icon: "Activity" },
      { text: "Compare Amazon vs Google stock performance", category: "Comparison", icon: "BarChart3" }
    ];
  }
}

export default {
  getStockAnalysis,
  getStreamingStockAnalysis,
  getMultiAgentAnalysis,
  generateSuggestedPrompts
};