import React, { useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { LuSend, LuSparkles, LuUser } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';

const AiAssistant = () => {
  useUserAuth();

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your AI spending advisor. Ask me anything about your income, expenses, or spending habits.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GET_ADVICE, {
        question: userMessage.text,
      });

      const aiMessage = { role: "ai", text: response.data.advice };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Advisor error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout activeMenu="AI Assistant">
      <div className="my-5 mx-auto max-w-3xl">
        <div className="card flex flex-col h-[75vh]">
          {/* Header */}
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
            <LuSparkles className="text-purple-500 text-xl" />
            <h5 className="text-lg font-medium">AI Spending Advisor</h5>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <LuSparkles className="text-purple-500 text-sm" />
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-[14px] ${msg.role === "user"
                      ? "bg-purple-500 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                >
                  {msg.role === "ai" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <LuUser className="text-gray-600 text-sm" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <LuSparkles className="text-purple-500 text-sm" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-500 text-[14px]">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Ask about your spending, income, or specific transactions..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-[14px] outline-none focus:border-purple-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-10 h-10 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-full disabled:opacity-50"
            >
              <LuSend className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AiAssistant;