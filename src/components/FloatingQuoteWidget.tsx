import React, { useState } from 'react';
import { MessageSquare, Phone, Send, X, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface FloatingQuoteWidgetProps {
  onRequestQuoteClick: () => void;
}

export const FloatingQuoteWidget: React.FC<FloatingQuoteWidgetProps> = ({
  onRequestQuoteClick,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      text: 'Jambo! 👋 Welcome to Push World Travel. How can our team on Northern By-Pass, Nairobi assist your travel plans today? You can also reach us directly via Call & WhatsApp at 0725 356 926.',
      time: 'Just now',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage.trim();
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' },
    ]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Thank you for your inquiry about "${userMsg}". Our senior tour consultant is available right now. Would you like us to prepare an official quotation or call you directly on WhatsApp?`,
          time: 'Just now',
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Pill Button matching the screenshot bottom-right position */}
      <aside aria-label="Quick safari consultation" className="fixed bottom-5 right-5 z-40 flex items-center shadow-2xl rounded-full">
        <button
          onClick={onRequestQuoteClick}
          className="bg-[#801416] hover:bg-[#991b1b] text-white px-4 py-2.5 text-xs font-bold rounded-l-full shadow-md tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>Request A Quote</span>
        </button>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#801416] hover:bg-[#6b1012] border-l border-white/20 text-white p-2.5 rounded-r-full shadow-md transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Open 24/7 Safari Chat"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
          </div>
        </button>
      </aside>

      {/* Interactive Chat Popup Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="bg-[#0a2265] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold text-xs">
                  PW
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold font-['Outfit',sans-serif]">
                  Push World Travel Desk
                </h4>
                <p className="text-[10px] text-blue-200">
                  Online · Avg. reply time: &lt; 5 mins
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/70 hover:text-white p-1 cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Badges */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px]">
            <a
              href="tel:+254725356926"
              className="flex items-center gap-1 text-[#0a2265] font-semibold hover:underline"
            >
              <Phone className="w-3 h-3 text-[#ea580c]" />
              0725 356 926
            </a>
            <button
              onClick={() => {
                setIsChatOpen(false);
                onRequestQuoteClick();
              }}
              className="text-[#ea580c] font-bold hover:underline cursor-pointer"
            >
              Open Full Form →
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-3.5 space-y-3 h-64 overflow-y-auto text-xs bg-slate-50/50">
            {chatHistory.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  item.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    item.sender === 'user'
                      ? 'bg-[#ea580c] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  {item.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 px-1">
                  {item.time}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 border-t border-slate-200 bg-white flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask about safaris, dates, or prices..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#ea580c]"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#ea580c] hover:bg-[#ff7700] text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
