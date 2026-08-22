import React, { useState, useRef, useEffect } from 'react';
import { BotMessageSquare, X, Send, Sparkles, ChevronRight, CornerDownLeft, RefreshCw } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { formatTons, formatPercent } from '../../utils/formatters';

const PRESET_PROMPTS = [
  "Which bin needs collection first?",
  "Show today's waste statistics.",
  "Which zone has the highest fill level?",
  "What does ORBIT recommend?",
  "Show recyclable waste percentage."
];

export default function FloatingAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello, I am ORBIT AI — your municipal waste intelligence assistant. How can I assist your operations today?",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { bins, dashboard, wasteStats, priorities, recommendations } = useAppData();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAnswer = (query) => {
    const q = query.toLowerCase();

    // 1. First collection priority
    if (q.includes('first') || q.includes('collection') || q.includes('urgent') || q.includes('which bin')) {
      if (priorities && priorities.length > 0) {
        const topBin = priorities[0];
        return `🚨 **Priority #1 Recommendation**: Bin **${topBin.bin_id}** (${topBin.name}) in **${topBin.zone}** requires immediate collection. It is currently at **${topBin.fill_level}% fill level** (estimated overflow in ${topBin.time_to_overflow}). Recommended vehicle: **${topBin.recommended_vehicle}**.`;
      }
      const topCritical = bins.find(b => b.status === 'CRITICAL');
      if (topCritical) {
        return `🚨 Smart Bin **${topCritical.bin_id}** in **${topCritical.zone}** is currently at **${topCritical.fill_level}% capacity** and requires top priority dispatch.`;
      }
      return "All smart bins are operating within nominal capacity. No immediate critical overflow is detected.";
    }

    // 2. Waste statistics
    if (q.includes('statistic') || q.includes('today') || q.includes('volume') || q.includes('ton')) {
      if (dashboard) {
        return `📊 **Today's Waste Metrics**:\n• Total Waste: **${formatTons(dashboard.total_waste_tons)}**\n• Recyclable Rate: **${formatPercent(dashboard.recyclable_rate)}**\n• Organic Stream: **${formatTons(dashboard.organic_waste_tons)}**\n• Active Smart Bins: **${dashboard.active_bins} / ${dashboard.total_bins}**\n• CO₂ Emissions Prevented: **${dashboard.co2_saved_tons} tons**.`;
      }
      return "I don't have enough backend data to answer that yet.";
    }

    // 3. Zone with highest fill level
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
        return `📍 **Zone Analysis**: **${highestZone}** has the highest average bin fill level at **${highestAvg.toFixed(1)}%**. Priority dispatch is suggested for this sector.`;
      }
      return "Zone fill metrics are currently synchronizing with the telemetry hub.";
    }

    // 4. Recommendations
    if (q.includes('recommend') || q.includes('action') || q.includes('suggest')) {
      if (recommendations && recommendations.length > 0) {
        const topRec = recommendations[0];
        return `💡 **ORBIT AI Recommendation**: **${topRec.title}**\n\n*Action*: ${topRec.recommended_action}\n*Impact*: ${topRec.impact} (${topRec.potential_savings})`;
      }
      return "ORBIT suggests maintaining standard route cycles. No anomaly alerts are pending.";
    }

    // 5. Recyclable percentage
    if (q.includes('recycl') || q.includes('percent')) {
      if (dashboard) {
        return `♻️ The municipal **Recyclable Recovery Rate** is currently **${formatPercent(dashboard.recyclable_rate)}**. Plastic and Metal streams are showing high compliance.`;
      }
      return "Recycling rate calculation is currently updating.";
    }

    // Generic response with live context
    return `Based on live municipal telemetry, ORBIT is monitoring **${bins.length} smart bins** across 4 zones with **${priorities.filter(p => p.priority === 'Critical').length} critical bins** flagged. You can ask for route dispatch suggestions, material breakdowns, or specific bin telemetry.`;
  };

  const handleSendMessage = (textToSend = null) => {
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
      const replyText = generateAnswer(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '28px',
            zIndex: 60,
            background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-glow), 0 8px 24px rgba(32, 166, 106, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '700',
            fontSize: '13.5px',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="btn-primary"
          title="Open ORBIT AI Assistant"
        >
          <BotMessageSquare size={20} />
          <span>Ask ORBIT AI</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--bright-green)',
              boxShadow: '0 0 8px #00D2A0'
            }}
          />
        </button>
      )}

      {/* Slide-Up Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '28px',
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '560px',
            maxHeight: 'calc(100vh - 48px)',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 70,
            overflow: 'hidden',
            animation: 'float-subtle 0.25s ease-out'
          }}
        >
          {/* Assistant Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, var(--soft-mint) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--orbit-green) 0%, var(--deep-green) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(32, 166, 106, 0.3)'
                }}
              >
                <Sparkles size={18} color="#FFFFFF" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  ORBIT AI Assistant
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--deep-green)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
                  Telemetry Engine Active
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="btn-ghost"
              style={{ padding: '6px' }}
              aria-label="Close Assistant"
            >
              <X size={18} color="var(--text-secondary)" />
            </button>
          </div>

          {/* Quick Preset Prompts */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {PRESET_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
                className="btn-ghost"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAi ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      borderBottomLeftRadius: isAi ? '4px' : '14px',
                      borderBottomRightRadius: !isAi ? '4px' : '14px',
                      backgroundColor: isAi ? 'var(--bg-secondary)' : 'var(--orbit-green)',
                      color: isAi ? 'var(--text-primary)' : '#FFFFFF',
                      fontSize: '13px',
                      lineHeight: 1.45,
                      border: isAi ? '1px solid var(--border)' : 'none',
                      boxShadow: 'var(--shadow-xs)',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {m.text}
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
                    {m.time}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                <RefreshCw size={13} className="animate-spin-slow" color="var(--orbit-green)" />
                ORBIT AI is analyzing telemetry...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '12px 14px',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask about bins, routes, waste stats..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 12px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="btn-primary"
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                opacity: inputValue.trim() ? 1 : 0.6
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
