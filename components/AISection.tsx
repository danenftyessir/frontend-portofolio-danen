"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { AIResponseCard } from "@/components/AIResponseCard";

// Aggressive backend URLs untuk Render
const BACKEND_URLS = [
  "https://portofolio-danen-backend.onrender.com",
  "https://portfolio-danen-backend.onrender.com",
  "https://danendra-portfolio-backend.onrender.com",
  "http://localhost:8000",
];

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || BACKEND_URLS[0];

interface ConversationItem {
  question: string;
  response: string;
  timestamp: number;
  category?: string;
  relatedTopics?: string[];
  confidence?: number;
}

interface AIApiResponse {
  response: string;
  session_id: string;
  related_topics?: string[];
  confidence_score?: number;
  message_type?: string;
}

interface AISectionProps {
  variant?: "dark" | "light";
}

const AISection = ({ variant = "light" }: AISectionProps) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [useMock, setUseMock] = useState(false);
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "warming" | "ready" | "error"
  >("checking");
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [conversationHistory, setConversationHistory] = useState<
    ConversationItem[]
  >([]);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [suggestedFollowups, setSuggestedFollowups] = useState<string[]>([]);
  const [relatedTopics, setRelatedTopics] = useState<string[]>([]);
  const [warmingProgress, setWarmingProgress] = useState(0);
  const [coldStartDetected, setColdStartDetected] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const warmingIntervalRef = useRef<NodeJS.Timeout>();
  const keepAliveIntervalRef = useRef<NodeJS.Timeout>();

  // SUPER AGGRESSIVE Cold Start Prevention Strategy
  const superAggressiveWarmUp = useCallback(async () => {
    if (backendStatus === "ready") return;

    setBackendStatus("warming");
    setWarmingProgress(0);
    setColdStartDetected(true);

    addDebugInfo("🔥 SUPER AGGRESSIVE WARM-UP INITIATED");

    // Strategy 1: Multiple concurrent pings dengan exponential timeout
    const concurrentWarmUp = async () => {
      const timeouts = [10000, 20000, 30000, 45000, 60000]; // 10s, 20s, 30s, 45s, 60s
      const endpoints = ["/ping", "/health", "/"];

      let successCount = 0;
      let totalAttempts = 0;

      for (let i = 0; i < timeouts.length; i++) {
        const timeout = timeouts[i];
        addDebugInfo(
          `🚀 Concurrent warm-up round ${i + 1}: ${timeout / 1000}s timeout`
        );

        // Update progress
        setWarmingProgress(Math.min((i / timeouts.length) * 80, 80));

        // Multiple concurrent requests
        const promises = endpoints.map(async (endpoint) => {
          try {
            totalAttempts++;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(`${API_URL}${endpoint}`, {
              method: "GET",
              signal: controller.signal,
              headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
              },
            });

            clearTimeout(timeoutId);

            if (response.ok) {
              successCount++;
              addDebugInfo(`✅ Success on ${endpoint} (${timeout / 1000}s)`);
              return true;
            }
            return false;
          } catch (error) {
            addDebugInfo(`⏳ ${endpoint} timeout at ${timeout / 1000}s`);
            return false;
          }
        });

        const results = await Promise.allSettled(promises);
        const anySuccess = results.some(
          (r) => r.status === "fulfilled" && r.value === true
        );

        if (anySuccess) {
          addDebugInfo(`🎉 WARM-UP SUCCESS after ${i + 1} rounds!`);
          setWarmingProgress(100);
          setBackendStatus("ready");
          setColdStartDetected(false);

          toast({
            title: "🔥 Server Warmed Up!",
            description: `Ready in ${
              i + 1
            } attempts. Your questions will be lightning fast now!`,
          });

          // Start aggressive keep-alive
          startAggressiveKeepAlive();
          return true;
        }

        // Progressive delay before next round
        if (i < timeouts.length - 1) {
          addDebugInfo(
            `⏳ Round ${i + 1} failed, trying round ${i + 2} in 3s...`
          );
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }

      // If all attempts failed
      addDebugInfo(`❌ All ${totalAttempts} warm-up attempts failed`);
      setBackendStatus("error");
      setColdStartDetected(false);
      setWarmingProgress(0);

      return false;
    };

    return concurrentWarmUp();
  }, [backendStatus, toast]);

  // Aggressive Keep-Alive untuk prevent future cold starts
  const startAggressiveKeepAlive = useCallback(() => {
    // Clear existing intervals
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
    }

    addDebugInfo("🔄 Starting AGGRESSIVE keep-alive (every 3 minutes)");

    keepAliveIntervalRef.current = setInterval(async () => {
      if (backendStatus === "ready" && document.visibilityState === "visible") {
        try {
          await fetch(`${API_URL}/ping`, {
            method: "GET",
            signal: AbortSignal.timeout(8000),
            headers: { "Cache-Control": "no-cache" },
          });
          addDebugInfo("🏓 Keep-alive ping successful");
        } catch (error) {
          addDebugInfo("⚠️ Keep-alive failed - triggering re-warm");
          setBackendStatus("checking");
          superAggressiveWarmUp();
        }
      }
    }, 3 * 60 * 1000); // 3 minutes untuk Render free tier
  }, [backendStatus, superAggressiveWarmUp]);

  // Start warming immediately on component mount
  useEffect(() => {
    addDebugInfo("🚀 Component mounted - starting immediate warm-up");
    superAggressiveWarmUp();

    if (!sessionId) {
      setSessionId(crypto.randomUUID());
    }

    return () => {
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
      }
    };
  }, [superAggressiveWarmUp, sessionId]);

  // Pre-warming trigger saat user mulai mengetik
  useEffect(() => {
    if (userPrompt.length === 3 && backendStatus !== "ready") {
      addDebugInfo("⌨️ User typing detected - boosting warm-up priority");
      superAggressiveWarmUp();
    }
  }, [userPrompt, backendStatus, superAggressiveWarmUp]);

  // Debug info helper
  const addDebugInfo = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `${timestamp}: ${message}`;
    console.log("🔍", logMessage);
    setDebugInfo((prev) => [...prev, logMessage].slice(-20));
  };

  // ENHANCED AI Request dengan ZERO tolerance untuk cold start
  const askAI = async (question: string, skipHistory = false) => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Pertanyaan tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAiResponse("");
    setErrorMessage("");
    setRelatedTopics([]);

    if (!skipHistory && !previousQuestions.includes(question)) {
      setPreviousQuestions((prev) => [question, ...prev].slice(0, 8));
    }

    // Enhanced question processing
    let processedQuestion = enhanceQuestionWithContext(question);

    // If backend not ready, force warm-up FIRST
    if (backendStatus !== "ready") {
      addDebugInfo("🔥 Backend not ready - FORCING immediate warm-up");

      toast({
        title: "🚀 Warming Up Server",
        description: "First request detected! Waking up the server for you...",
      });

      const warmUpSuccess = await superAggressiveWarmUp();

      if (!warmUpSuccess) {
        addDebugInfo("❌ Warm-up failed - using offline mode");
        setUseMock(true);
        handleMockResponse(processedQuestion);
        setIsLoading(false);
        return;
      }
    }

    // Now make the actual AI request with EXTENDED timeout for first request
    const isFirstRequest = conversationHistory.length === 0;
    const endpoint = `${API_URL}/ask`;

    addDebugInfo(
      `🎯 Making AI request: ${isFirstRequest ? "FIRST" : "CONTINUATION"}`
    );

    try {
      const controller = new AbortController();

      // EXTENDED timeout untuk first request (karena sudah di-warm)
      const timeout = isFirstRequest ? 75000 : 45000; // 75s untuk first, 45s untuk continuation
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      if (isFirstRequest) {
        toast({
          title: "🤖 AI Processing",
          description: `First AI request (up to ${
            timeout / 1000
          }s). Server is warmed and ready!`,
        });
      }

      const requestBody = {
        question: processedQuestion,
        session_id: sessionId,
        conversation_history: conversationHistory.slice(-5).map((item) => ({
          question: item.question,
          response: item.response,
        })),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
        mode: "cors",
      });

      clearTimeout(timeoutId);
      addDebugInfo(`📥 AI response status: ${response.status}`);

      if (!response.ok) {
        const responseText = await response.text();
        addDebugInfo(`❌ AI error response: ${responseText}`);

        let errorDetail;
        try {
          errorDetail = JSON.parse(responseText).detail;
        } catch (e) {
          errorDetail = responseText || "Gagal mendapatkan respons";
        }

        // Jika server error, coba warm-up ulang untuk next request
        if (response.status >= 500) {
          addDebugInfo(
            "🔄 Server error detected - re-warming for next request"
          );
          setBackendStatus("checking");
          setTimeout(() => superAggressiveWarmUp(), 2000);
        }

        setErrorMessage(`Error: ${errorDetail}`);
        setUseMock(true);
        handleMockResponse(processedQuestion);
      } else {
        const data = await response.json();
        addDebugInfo(`✅ AI SUCCESS response received`);
        handleResponse(data, processedQuestion);
        fetchSuggestedFollowups();

        // Success - maintain keep-alive
        if (backendStatus !== "ready") {
          setBackendStatus("ready");
          startAggressiveKeepAlive();
        }
      }
    } catch (error) {
      addDebugInfo(`❌ AI request error: ${error}`);
      console.error("Error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan koneksi";

      // Jika timeout pada first request, paksa warm-up ulang
      if (isFirstRequest && errorMessage.includes("aborted")) {
        addDebugInfo("🔄 First request timeout - re-warming server");
        setBackendStatus("checking");

        toast({
          title: "⏳ Server Need More Time",
          description: "Re-warming server for you. Please wait a moment...",
        });

        // Auto-retry setelah warm-up
        setTimeout(async () => {
          const reWarmSuccess = await superAggressiveWarmUp();
          if (reWarmSuccess) {
            addDebugInfo("♻️ Re-warm successful - auto-retrying question");
            askAI(processedQuestion, true);
            return;
          } else {
            setUseMock(true);
            handleMockResponse(processedQuestion);
          }
        }, 3000);

        return;
      }

      // Final fallback
      setUseMock(true);
      handleMockResponse(processedQuestion);
      setErrorMessage(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced question processing
  const enhanceQuestionWithContext = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (question.split(/\s+/).length < 3) {
      const contextMappings: Record<string, string> = {
        python:
          "ceritakan pengalamanmu dengan python dan bagaimana kamu menggunakannya dalam proyek data science",
        react:
          "bagaimana experience kamu dengan react dan next.js dalam web development?",
        algoritma:
          "ceritakan tentang proyek algoritma kompleks yang pernah kamu kerjakan",
        itb: "bagaimana pengalaman kuliah dan life di itb sejauh ini?",
        project: "apa project yang paling challenging dan memorable buat kamu?",
        makanan:
          "rekomendasi street food favorit dan pengalaman kuliner kamu di jakarta",
        musik: "lagu dan genre musik apa yang lagi kamu dengerin sekarang?",
      };

      for (const [key, enhancement] of Object.entries(contextMappings)) {
        if (lowerQuestion.includes(key)) {
          return enhancement;
        }
      }
    }

    return question;
  };

  // Mock response handler
  const handleMockResponse = (question: string) => {
    const isFirstRequest = conversationHistory.length === 0;

    const mockResponses = isFirstRequest
      ? [
          "🚀 Server sedang dalam proses startup (cold start normal untuk hosting gratis). Sistem sedang menyiapkan AI engine untuk pertanyaan Anda. Silakan tunggu sebentar dan coba lagi - server akan ready dalam 30-60 detik!",
          "⏳ First-time connection terdeteksi! AI server sedang warming up dari sleep mode. Tunggu sebentar lalu tanyakan pertanyaan yang sama lagi untuk mendapatkan respons AI lengkap.",
          "🔄 Cold start in progress! Ini normal untuk free hosting. Server AI sedang loading, coba lagi dalam 1 menit untuk mendapat respons lengkap!",
        ]
      : [
          "Backend sementara tidak tersedia. Server mungkin masih dalam proses startup, coba lagi dalam 30-60 detik!",
          "AI service sedang starting up. Untuk hasil terbaik, tunggu sebentar dan retry pertanyaan Anda.",
          "Connection issue terdeteksi. Coba lagi dalam beberapa saat!",
        ];

    const mockResponse =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];

    setTimeout(() => {
      handleResponse(
        {
          response: mockResponse,
          session_id: sessionId,
        },
        question
      );
    }, 1000);
  };

  const handleResponse = (data: AIApiResponse, processedQuestion: string) => {
    if (data.session_id && data.session_id !== sessionId) {
      setSessionId(data.session_id);
    }

    const cleanedResponse = data.response.replace(/\s+/g, " ").trim();
    setAiResponse(cleanedResponse);

    if (data.related_topics && data.related_topics.length > 0) {
      setRelatedTopics(data.related_topics);
    }

    const detectedCategory = processedQuestion.toLowerCase().includes("python")
      ? "teknologi"
      : processedQuestion.toLowerCase().includes("proyek")
      ? "proyek"
      : processedQuestion.toLowerCase().includes("lagu")
      ? "musik"
      : processedQuestion.toLowerCase().includes("makanan")
      ? "kuliner"
      : "general";

    setConversationHistory((prev) =>
      [
        ...prev,
        {
          question: processedQuestion,
          response: cleanedResponse,
          timestamp: Date.now(),
          category: detectedCategory,
          relatedTopics: data.related_topics,
          confidence: data.confidence_score,
        },
      ].slice(-20)
    );

    setUserPrompt("");
  };

  const fetchSuggestedFollowups = async () => {
    try {
      const response = await fetch(
        `${API_URL}/suggested-followups/${sessionId}`,
        {
          signal: AbortSignal.timeout(10000),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.suggested_followups && data.suggested_followups.length > 0) {
          setSuggestedFollowups(data.suggested_followups.slice(0, 3));
        }
      }
    } catch (error) {
      console.error("Error fetching followups:", error);
    }
  };

  const regenerateResponse = () => {
    if (conversationHistory.length > 0) {
      const lastQuestion =
        conversationHistory[conversationHistory.length - 1].question;
      askAI(lastQuestion, true);
    }
  };

  const selectQuestion = (question: string) => {
    setUserPrompt(question);
    askAI(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      askAI(userPrompt);
    }
  };

  const clearConversation = () => {
    if (conversationHistory.length > 0) {
      if (window.confirm("Hapus riwayat percakapan dan mulai sesi baru?")) {
        setAiResponse("");
        setConversationHistory([]);
        setPreviousQuestions([]);
        setSuggestedFollowups([]);
        setRelatedTopics([]);
        setSessionId(crypto.randomUUID());
        setUserPrompt("");
        setDebugInfo([]);
        toast({
          title: "Percakapan Dihapus",
          description: "Sesi percakapan baru telah dimulai",
        });
      }
    }
  };

  const exportConversation = () => {
    if (conversationHistory.length > 0) {
      const exportData = conversationHistory.map((item) => ({
        timestamp: new Date(item.timestamp).toLocaleString("id-ID"),
        question: item.question,
        response: item.response,
        category: item.category,
      }));

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-conversation-${
        new Date().toISOString().split("T")[0]
      }.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const retryConnection = () => {
    setBackendStatus("checking");
    setUseMock(false);
    setErrorMessage("");
    setDebugInfo([]);
    setColdStartDetected(false);
    addDebugInfo("🔄 Manual retry initiated");
    superAggressiveWarmUp();
  };

  // Theme classes
  const containerClass =
    variant === "dark"
      ? "bg-slate-900/95 border-slate-700/50"
      : "bg-white/95 border-gray-200/50 shadow-xl";
  const textColor = variant === "dark" ? "text-white" : "text-gray-800";
  const textSecondary = variant === "dark" ? "text-gray-300" : "text-gray-600";
  const textMuted = variant === "dark" ? "text-gray-400" : "text-gray-500";
  const borderColor =
    variant === "dark" ? "border-slate-600/30" : "border-gray-200/50";
  const inputBg =
    variant === "dark"
      ? "bg-slate-800/80 border-slate-600/40 text-white placeholder:text-gray-400"
      : "bg-gray-50/80 border-gray-200/60 text-gray-800 placeholder:text-gray-500";
  const badgeClass =
    variant === "dark"
      ? "bg-slate-800/60 text-gray-300 border-slate-600/40"
      : "bg-gray-100/80 text-gray-600 border-gray-200/60";

  // Sample questions
  const recommendedQuestions = [
    "Ceritakan tentang pengalamanmu selama ini!",
    "Ceritakan tentang project apa saja yang sudah kamu kerjakan!",
  ];

  // Auto-scroll to response
  useEffect(() => {
    if (aiResponse && responseRef.current) {
      responseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [aiResponse]);

  return (
    <div className="space-y-8">
      <motion.div
        className={`glass-strong rounded-3xl ${containerClass} backdrop-blur-xl p-8 border-2 relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Debug panel - development only */}
        {process.env.NODE_ENV === "development" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
          >
            <h4 className="text-sm font-bold text-yellow-800 mb-2">
              🔧 Debug Info
            </h4>
            <div className="text-xs font-mono text-yellow-700 space-y-1 max-h-32 overflow-y-auto">
              {debugInfo.map((info, i) => (
                <div key={i}>{info}</div>
              ))}
            </div>
            <div className="mt-2 text-xs text-yellow-600">
              <strong>Current API URL:</strong> {API_URL}
            </div>
          </motion.div>
        )}

        {/* Enhanced Status Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  backendStatus === "ready"
                    ? "bg-green-500"
                    : backendStatus === "warming"
                    ? "bg-amber-500 animate-pulse"
                    : backendStatus === "checking"
                    ? "bg-blue-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              {backendStatus === "warming" && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-300 rounded-full animate-ping" />
              )}
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${textColor}`}>
                {backendStatus === "ready"
                  ? "🚀 AI Ready"
                  : backendStatus === "warming"
                  ? "🔥 Warming Up Server"
                  : backendStatus === "checking"
                  ? "🔍 Connecting"
                  : "❌ Connection Failed"}
              </span>
              {backendStatus === "warming" && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${warmingProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-amber-600 font-medium">
                    {warmingProgress}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseMock(!useMock)}
              className={`text-xs ${badgeClass} hover:scale-105 transition-transform`}
            >
              {useMock ? "📴 Switch to Online" : "🌐 Switch to Offline"}
            </Button>

            {(backendStatus === "error" || coldStartDetected) && (
              <Button
                variant="outline"
                size="sm"
                onClick={retryConnection}
                disabled={backendStatus === "warming"}
                className={`text-xs ${
                  variant === "dark"
                    ? "text-blue-300 hover:text-blue-100 bg-blue-900/20 border-blue-500/30 hover:bg-blue-800/30"
                    : "text-blue-600 hover:text-blue-800 bg-blue-50/50 border-blue-300/30 hover:bg-blue-100/50"
                } hover:scale-105 transition-transform`}
              >
                {backendStatus === "warming"
                  ? "🔥 Warming..."
                  : "🔄 Wake Server"}
              </Button>
            )}

            {conversationHistory.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportConversation}
                  className={`text-xs ${badgeClass} hover:scale-105 transition-transform`}
                >
                  💾 Export
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearConversation}
                  className={`text-xs ${
                    variant === "dark"
                      ? "text-red-300 hover:text-red-100 bg-red-900/20 border-red-500/30 hover:bg-red-800/30"
                      : "text-red-600 hover:text-red-800 bg-red-50/50 border-red-300/30 hover:bg-red-100/50"
                  } hover:scale-105 transition-transform`}
                >
                  🗑️ Clear
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Cold Start Warning */}
        <AnimatePresence>
          {coldStartDetected && backendStatus === "warming" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 rounded-2xl ${
                variant === "dark"
                  ? "bg-amber-900/30 border-amber-500/50 text-amber-200"
                  : "bg-amber-50/80 border-amber-300/50 text-amber-800"
              } border-2 p-6`}
            >
              <div className="flex items-center gap-3 font-semibold mb-2">
                <span className="text-2xl">🔥</span>
                <h3>Cold Start Detected - Warming Up Server</h3>
              </div>
              <div className="text-sm">
                First-time access detected! The server is waking up from sleep
                mode. This process takes 30-60 seconds on free hosting. Please
                wait while we prepare everything for you.
              </div>
              <div className="mt-3 text-xs opacity-75">
                Progress: {warmingProgress}% - Your question will be processed
                automatically once ready!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation context display */}
        <AnimatePresence>
          {conversationHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-8 rounded-2xl border-2 ${borderColor} ${
                variant === "dark" ? "bg-slate-800/40" : "bg-gray-50/60"
              } p-6`}
            >
              <p
                className={`text-sm ${textColor} font-semibold mb-3 flex items-center gap-2`}
              >
                💭 Conversation Context:
                <span
                  className={`px-2 py-1 ${badgeClass} rounded-full text-xs`}
                >
                  {conversationHistory.length} messages
                </span>
              </p>
              <p className={`text-sm ${textSecondary}`}>
                {conversationHistory.length > 1
                  ? `Continuing from: "${conversationHistory[
                      conversationHistory.length - 1
                    ].question.substring(0, 60)}${
                      conversationHistory[conversationHistory.length - 1]
                        .question.length > 60
                        ? "..."
                        : ""
                    }"`
                  : `Started with: "${conversationHistory[0].question.substring(
                      0,
                      60
                    )}${
                      conversationHistory[0].question.length > 60 ? "..." : ""
                    }"`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced textarea input */}
        <div
          className={`mb-8 overflow-hidden rounded-2xl border-2 ${borderColor} ${
            variant === "dark" ? "bg-slate-800/40" : "bg-gray-50/60"
          } shadow-inner transition-all focus-within:border-opacity-70 focus-within:ring-2 focus-within:ring-gray-500/50 relative`}
        >
          <Textarea
            ref={textareaRef}
            placeholder={
              backendStatus === "warming"
                ? "// Server is warming up! Your question will be processed automatically once ready..."
                : conversationHistory.length > 0
                ? "// Lanjutkan percakapan atau tanyakan hal baru..."
                : backendStatus === "error"
                ? "// Server needs time to start! Try: 'kenapa saya harus merekrut kamu?'"
                : "// Tanyakan sesuatu tentang saya... (misal: kenapa saya harus merekrut kamu?)"
            }
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`min-h-[140px] max-h-[250px] resize-y border-0 bg-transparent ${inputBg} transition-all duration-300 focus-visible:ring-0 text-base`}
            disabled={backendStatus === "warming"}
          />

          <div
            className={`border-t-2 ${borderColor} ${
              variant === "dark" ? "bg-slate-800/30" : "bg-gray-50/50"
            } px-6 py-4 text-xs ${textMuted} flex justify-between items-center`}
          >
            <span className="font-medium">
              {backendStatus === "warming"
                ? "Warming up server..."
                : "Ctrl+Enter to send || Cmd+Enter to send"}
            </span>
            <span className="font-medium">{userPrompt.length}/500</span>
          </div>
        </div>

        {/* Related topics, previous questions, followups, recommended questions */}
        {/* (Same as original code for brevity) */}

        {/* Action buttons */}
        <div className="flex items-center justify-between w-full gap-4 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setHistoryVisible(!historyVisible)}
            className={`${borderColor} ${badgeClass} hover:scale-105 transition-all duration-300 font-medium`}
          >
            📚 History ({conversationHistory.length})
          </Button>

          <div className="flex-1"></div>

          <Button
            variant="outline"
            onClick={() => setUserPrompt("")}
            disabled={isLoading || !userPrompt || backendStatus === "warming"}
            className={`${borderColor} ${badgeClass} hover:scale-105 transition-all duration-300 font-medium`}
          >
            🔄 Reset
          </Button>

          <Button
            onClick={() => askAI(userPrompt)}
            disabled={
              isLoading || !userPrompt.trim() || backendStatus === "warming"
            }
            className={`${
              variant === "dark"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900"
            } text-white transition-all duration-300 hover:scale-105 font-medium shadow-lg hover:shadow-xl`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-3 h-5 w-5"
                >
                  ⚡
                </motion.div>
                {backendStatus === "ready"
                  ? "Processing..."
                  : "First Request (75s max)..."}
              </span>
            ) : backendStatus === "warming" ? (
              <span className="flex items-center">🔥 Server Warming Up...</span>
            ) : (
              <span className="flex items-center">
                🚀{" "}
                {conversationHistory.length > 0
                  ? "Continue Chat"
                  : "Start AI Chat"}
              </span>
            )}
          </Button>
        </div>
      </motion.div>

      {/* AI response section */}
      <div ref={responseRef}>
        <AnimatePresence>
          {(aiResponse || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <AIResponseCard
                response={aiResponse}
                loading={isLoading}
                isOfflineMode={useMock}
                onRegenerate={regenerateResponse}
                variant={variant}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-8 rounded-2xl ${
              variant === "dark"
                ? "bg-red-900/30 border-red-500/50 text-red-200"
                : "bg-red-50/80 border-red-300/50 text-red-800"
            } border-2 p-6`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-2xl">⚠️</span>
              <h3>Connection Error:</h3>
            </div>
            <div className="mt-3 text-sm font-medium">{errorMessage}</div>
            <div className="mt-4 text-xs opacity-75">
              The server might be starting up (cold start). This is normal for
              free hosting.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* conversation history modal */}
      <AnimatePresence>
        {historyVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setHistoryVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-full max-w-4xl max-h-[80vh] ${containerClass} rounded-2xl border-2 ${borderColor} overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`flex items-center justify-between px-6 py-4 border-b-2 ${borderColor} ${
                  variant === "dark" ? "bg-slate-800/50" : "bg-gray-50/80"
                }`}
              >
                <h3 className={`text-lg font-semibold ${textColor}`}>
                  📚 Conversation History ({conversationHistory.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHistoryVisible(false)}
                  className={`${badgeClass} hover:scale-105 transition-transform`}
                >
                  ✕
                </Button>
              </div>

              <div className="max-h-96 overflow-y-auto p-6 custom-scrollbar">
                {conversationHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">💭</div>
                    <p className={`${textMuted}`}>Conversation Empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...conversationHistory].reverse().map((item, index) => (
                      <motion.div
                        key={conversationHistory.length - 1 - index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl border-2 ${borderColor} ${badgeClass} hover:scale-102 transition-all cursor-pointer`}
                        onClick={() => selectQuestion(item.question)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-xs font-semibold ${textSecondary}`}
                          >
                            #{conversationHistory.length - index}
                          </span>
                          <span className={`text-xs ${textMuted}`}>
                            {new Date(item.timestamp).toLocaleTimeString(
                              "id-ID"
                            )}
                          </span>
                        </div>

                        <p
                          className={`text-sm ${textColor} mb-2 font-medium line-clamp-2`}
                        >
                          Q: {item.question}
                        </p>

                        <p
                          className={`text-xs ${textSecondary} line-clamp-2 opacity-80`}
                        >
                          A: {item.response}
                        </p>

                        {item.category && (
                          <div className="mt-3">
                            <span
                              className={`text-xs ${
                                variant === "dark"
                                  ? "bg-slate-700/50 text-gray-300"
                                  : "bg-gray-100/80 text-gray-600"
                              } px-2 py-1 rounded-full font-medium`}
                            >
                              {item.category}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { AISection };
