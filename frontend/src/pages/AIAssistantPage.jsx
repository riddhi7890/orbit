import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BotMessageSquare, Sparkles, Send, RefreshCw, Layers, MapPin, ListOrdered, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { formatTons, formatPercent } from '../utils/formatters';

const PRESET_PROMPTS = [
  "Which bin needs collection first?",
  "Show today's waste statistics.",
  "Which zone has the highest fill level?",
  "What does ORBIT recommend?",
  "Show recyclable waste percentage."
];

export default function AIAssistantPage() {
  const { bins, dashboard, wasteStats, priorities, recommendations } = useAppData();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your ORBIT AI assistant. I have live access to municipal sensor telemetry across all city zones, predictive route algorithms, and material stream analytics. How can I assist you?",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAnswer = (query) => {
    const q = query.toLowerCase();

    if (q.includes('first') || q.includes('collection') || q.includes('urgent') || q.includes('which bin')) {
      if (priorities && priorities.length > 0) {
        const topBin = priorities[0];
        return `🚨 **Priority #1 Collection Target**:\n\n• **Smart Bin**: ${topBin.bin_id} (${topBin.name})\n• **Location**: ${topBin.zone}\n• **Fill Level**: ${topBin.fill_level}%\n• **Estimated Time to Overflow**: ${topBin.time_to_overflow}\n• **Recommended Fleet Unit**: ${topBin.recommended_vehicle}\n• **Estimated Load**: ${topBin.estimated_load_kg} kg`;
      }
      return "All smart bins are operating below 75% capacity. No immediate critical overflow is flagged.";
    }

    if (q.includes('statistic') || q.includes('today') || q.includes('volume') || q.includes('ton')) {
      if (dashboard) {
        return `📊 **Municipal Real-Time Waste Summary**:\n\n• **Total Waste Managed**: ${formatTons(dashboard.total_waste_tons)}\n• **Recyclable Recovery Rate**: ${formatPercent(dashboard.recyclable_rate)}\n• **Organic Compost Stream**: ${formatTons(dashboard.organic_waste_tons)}\n• **Plastics & Packaging**: ${formatTons(dashboard.plastic_waste_tons)}\n• **Connected Smart Bins**: ${dashboard.active_bins} of ${dashboard.total_bins}\n• **CO₂ Emissions Prevented**: ${dashboard.co2_saved_tons} tons`;
      }
      return "I don't have enough backend data to answer that yet.";
    }

    if (q.includes('zone') || q.includes('highest')) {
      if (bins && bins.length > 0) {
        const zoneMap = {};
        bins.forEach(b => {
          if (!zoneMap[b.zone]) zoneMap[b.zone] = { total: 0, count: 0 };
          zoneMap[b.zone].total += b.fill_level;
          zoneMap[b.zone].count += 1;
        });
        let highestZone = 'Zone A';
        let highestAvg = 0;
        Object.entries(zoneMap).forEach(([z, data]) => {
          const avg = data.total / data.count;
          if (avg > highestAvg) {
            highestAvg = avg;
            highestZone = z;
          }
        });
        return `📍 **Zone Analysis**:\n\n**${highestZone}** has the highest average bin fill level at **${highestAvg.toFixed(1)}%**. Priority dispatch is suggested for this sector to avoid peak overflow events.`;
      }
      return "Zone fill metrics are currently synchronizing with the telemetry hub.";
    }

    if (q.includes('recommend') || q.includes('action') || q.includes('suggest')) {
      if (recommendations && recommendations.length > 0) {
        const topRec = recommendations[0];
        return `💡 **ORBIT AI Operational Recommendation**:\n\n**${topRec.title}**\n\n• **Category**: ${topRec.category} (Urgency: ${topRec.urgency})\n• **Action Required**: ${topRec.recommended_action}\n• **Projected Impact**: ${topRec.impact}\n• **Operational Savings**: ${topRec.potential_savings}`;
      }
      return "ORBIT suggests maintaining standard route cycles. No anomaly alerts are pending.";
    }

    if (q.includes('recycl') || q.includes('percent')) {
      if (dashboard) {
        return `♻️ The municipal **Recyclable Recovery Rate** is currently **${formatPercent(dashboard.recyclable_rate)}**. Plastics, Paper, and Metals segregation compliance is currently at 92.6%.`;
      }
      return "Recycling rate calculation is currently updating.";
    }

    return `Based on live municipal telemetry, ORBIT is monitoring **${bins.length} smart bins** across 4 zones with **${priorities.filter(p => p.priority === 'Critical').length} critical bins** flagged. Feel free to ask about specific zones, collection routes, or material recovery yields.`;
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAnswer(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 130px)' }}>
      {/* Header Banner */}
      <div
        className="card-orbit card-orbit-highlight"
        style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(32, 166, 106, 0.3)'
            }}
          >
            <Sparkles size={20} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
              ORBIT AI Intelligence Console
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Autonomous Natural Language Telemetry Querying
            </p>
          </div>
        </div>

        <div className="badge badge-mint">
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
          Online & Telemetry Synced
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div
        className="card-orbit"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Preset Prompt Chips Bar */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Quick Prompts:
          </span>
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                color: 'var(--deep-green)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              className="btn-ghost"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Feed */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  maxWidth: '75%'
                }}
              >
                {isAi && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Sparkles size={16} color="#FFFFFF" />
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAi ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: '16px',
                      borderBottomLeftRadius: isAi ? '4px' : '16px',
                      borderBottomRightRadius: !isAi ? '4px' : '16px',
                      backgroundColor: isAi ? 'var(--bg-secondary)' : 'var(--orbit-green)',
                      color: isAi ? 'var(--text-primary)' : '#FFFFFF',
                      fontSize: '13.5px',
                      lineHeight: 1.5,
                      border: isAi ? '1px solid var(--border)' : 'none',
                      boxShadow: 'var(--shadow-xs)',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {m.text}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <RefreshCw size={14} className="animate-spin-slow" color="var(--orbit-green)" />
              ORBIT AI is analyzing municipal data streams...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <input
            type="text"
            placeholder="Ask anything about bins, routes, waste categories, or circular yield..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-secondary)',
              fontSize: '14px',
              color: 'var(--text-primary)'
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="btn-primary"
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              opacity: inputValue.trim() ? 1 : 0.6
            }}
          >
            <Send size={16} />
            <span>Send Query</span>
          </button>
        </form>
      </div>
    </div>
  );
}
