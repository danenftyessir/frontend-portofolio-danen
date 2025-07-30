"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { AIResponseCard } from "@/components/AIResponseCard";

// debug: coba beberapa kemungkinan URL backend
const BACKEND_URLS = [
  "http://localhost:8000", // untuk development
];

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || BACKEND_URLS[0];

console.log("🔍 Debug Info:");
console.log("API_URL:", API_URL);
console.log("Environment:", process.env.NODE_ENV);
console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

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
  const [backendStatus, setBackendStatus] = useState("checking");
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [conversationHistory, setConversationHistory] = useState<
    ConversationItem[]
  >([]);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [suggestedFollowups, setSuggestedFollowups] = useState<string[]>([]);
  const [relatedTopics, setRelatedTopics] = useState<string[]>([]);
  const [ragStatus, setRagStatus] = useState<string>("unknown");
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  // fungsi untuk menambah debug info
  const addDebugInfo = (message: string) => {
    console.log("🔍", message);
    setDebugInfo((prev) =>
      [...prev, `${new Date().toLocaleTimeString()}: ${message}`].slice(-10)
    );
  };

  // theme classes untuk light variant
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

  // sample questions - hanya 2 pertanyaan
  const recommendedQuestions = [
    "Ceritakan tentang pengalamanmu selama ini!",
    "Ceritakan tentang project apa saja yang sudah kamu kerjakan!",
  ];

  // enhanced backend checker dengan multiple URLs
  const checkBackendHealth = async (url: string): Promise<boolean> => {
    try {
      addDebugInfo(`Checking backend: ${url}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`${url}/`, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors", // explicitly set CORS mode
      });

      clearTimeout(timeoutId);

      addDebugInfo(`Response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        addDebugInfo(`Backend response: ${JSON.stringify(data)}`);
        return true;
      }
      return false;
    } catch (error) {
      addDebugInfo(`Backend check failed: ${error}`);
      return false;
    }
  };

  // check backend status dengan fallback URLs
  useEffect(() => {
    const checkBackend = async () => {
      addDebugInfo("Starting backend health check...");
      setBackendStatus("checking");

      // coba URL utama dulu
      const mainBackendWorking = await checkBackendHealth(API_URL);

      if (mainBackendWorking) {
        addDebugInfo("Main backend working!");
        setBackendStatus("connected");
        setUseMock(false);

        // check RAG status
        try {
          const ragResponse = await fetch(`${API_URL}/rag-status`);
          if (ragResponse.ok) {
            const ragData = await ragResponse.json();
            setRagStatus(ragData.status);
            addDebugInfo(`RAG status: ${ragData.status}`);
          }
        } catch (error) {
          addDebugInfo(`RAG status check failed: ${error}`);
        }

        return;
      }

      // coba URL alternatif
      addDebugInfo("Main backend failed, trying alternatives...");
      for (const url of BACKEND_URLS.slice(1)) {
        const isWorking = await checkBackendHealth(url);
        if (isWorking) {
          addDebugInfo(`Alternative backend working: ${url}`);
          setBackendStatus("connected");
          setUseMock(false);
          // update API_URL untuk requests selanjutnya
          return;
        }
      }

      // semua backend gagal
      addDebugInfo("All backends failed, switching to mock mode");
      setBackendStatus("error");
      setUseMock(true);

      toast({
        title: "Backend Connection Failed",
        description: "Switching to offline mode. Some features may be limited.",
        variant: "destructive",
      });
    };

    checkBackend();

    if (!sessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, [sessionId, toast]);

  // auto-scroll to response
  useEffect(() => {
    if (aiResponse && responseRef.current) {
      responseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [aiResponse]);

  // enhanced question processing
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

  // enhanced AI interaction function dengan better error handling
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

    let processedQuestion = enhanceQuestionWithContext(question);

    // use mock mode if backend is down
    if (useMock) {
      addDebugInfo("Using mock mode");
      handleMockResponse(processedQuestion);
      setIsLoading(false);
      return;
    }

    const endpoint = `${API_URL}/ask`;
    addDebugInfo(`Making request to: ${endpoint}`);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout for AI requests

      const requestBody = {
        question: processedQuestion,
        session_id: sessionId,
        conversation_history: conversationHistory.slice(-5).map((item) => ({
          question: item.question,
          response: item.response,
        })),
      };

      addDebugInfo(`Request body: ${JSON.stringify(requestBody)}`);

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
      addDebugInfo(`AI response status: ${response.status}`);

      if (!response.ok) {
        const responseText = await response.text();
        addDebugInfo(`AI error response: ${responseText}`);

        let errorDetail;
        try {
          errorDetail = JSON.parse(responseText).detail;
        } catch (e) {
          errorDetail = responseText || "Gagal mendapatkan respons";
        }

        setErrorMessage(`Error: ${errorDetail}`);

        // fallback to mock
        addDebugInfo("Falling back to mock mode");
        setUseMock(true);
        handleMockResponse(processedQuestion);
      } else {
        const data = await response.json();
        addDebugInfo(`AI success response: ${JSON.stringify(data)}`);
        handleResponse(data, processedQuestion);
        fetchSuggestedFollowups();
      }
    } catch (error) {
      addDebugInfo(`AI request error: ${error}`);
      console.error("Error:", error);

      // fallback to mock
      setUseMock(true);
      handleMockResponse(processedQuestion);

      setErrorMessage(
        `Error: ${
          error instanceof Error ? error.message : "Terjadi kesalahan koneksi"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // mock response handler
  const handleMockResponse = (question: string) => {
    const mockResponses = [
      "Terima kasih atas pertanyaannya! Saat ini saya menggunakan mode offline. Backend AI sedang dalam proses perbaikan.",
      "Pertanyaan yang menarik! Dalam mode offline ini, saya tidak dapat memberikan respons yang personal seperti biasanya.",
      "Maaf, saat ini backend AI sedang tidak tersedia. Silakan coba lagi nanti atau hubungi saya langsung melalui email.",
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
        `${API_URL}/suggested-followups/${sessionId}`
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      askAI(userPrompt);
    }
  };

  const selectQuestion = (question: string) => {
    setUserPrompt(question);
    if (textareaRef.current) {
      textareaRef.current.focus();
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

  return (
    <div className="space-y-8">
      <motion.div
        className={`glass-strong rounded-3xl ${containerClass} backdrop-blur-xl p-8 border-2 relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* debug panel - hanya tampil di development */}
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

        {/* header dengan status dan controls */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <motion.div
              className="flex items-center gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  backendStatus === "connected"
                    ? "bg-green-500 shadow-lg"
                    : backendStatus === "error"
                    ? "bg-red-500"
                    : "bg-yellow-500 animate-pulse"
                }`}
              ></span>
              <span className={`text-sm font-medium ${textSecondary}`}>
                Backend Status:{" "}
                {backendStatus === "connected"
                  ? "Connected ✅"
                  : backendStatus === "error"
                  ? "Offline ❌"
                  : "Checking... ⏳"}
              </span>
            </motion.div>

            {ragStatus && ragStatus !== "unknown" && (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    ragStatus === "healthy" || ragStatus === "initialized"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  }`}
                ></span>
                <span className={`text-xs ${textMuted}`}>
                  RAG Status: {ragStatus}
                </span>
              </div>
            )}

            {conversationHistory.length > 0 && (
              <span className={`text-xs ${textMuted}`}>
                Messages: {conversationHistory.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseMock(!useMock)}
              className={`text-xs ${badgeClass} hover:scale-105 transition-transform`}
            >
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  useMock ? "bg-amber-500" : "bg-green-500"
                }`}
              ></span>
              Mode: {useMock ? "Offline" : "Online"}
            </Button>

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

        {/* conversation context display */}
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

        {/* enhanced textarea input */}
        <div
          className={`mb-8 overflow-hidden rounded-2xl border-2 ${borderColor} ${
            variant === "dark" ? "bg-slate-800/40" : "bg-gray-50/60"
          } shadow-inner transition-all focus-within:border-opacity-70 focus-within:ring-2 focus-within:ring-gray-500/50 relative`}
        >
          <Textarea
            ref={textareaRef}
            placeholder={
              conversationHistory.length > 0
                ? "// Lanjutkan percakapan atau tanyakan hal baru..."
                : "// Tanyakan sesuatu tentang saya... (misal: kenapa saya harus merekrut kamu?)"
            }
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`min-h-[140px] max-h-[250px] resize-y border-0 bg-transparent ${inputBg} transition-all duration-300 focus-visible:ring-0 text-base`}
          />

          <div
            className={`border-t-2 ${borderColor} ${
              variant === "dark" ? "bg-slate-800/30" : "bg-gray-50/50"
            } px-6 py-4 text-xs ${textMuted} flex justify-between items-center`}
          >
            <span className="font-medium">
              Ctrl+Enter to send || Cmd+Enter to send
            </span>
            <span className="font-medium">{userPrompt.length}/500</span>
          </div>
        </div>

        {/* related topics dari previous response */}
        <AnimatePresence>
          {relatedTopics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <p
                className={`mb-4 text-sm ${textMuted} flex items-center font-medium`}
              >
                🏷️{" "}
                <span
                  className={`ml-2 ${
                    variant === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Related Topics:
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        selectQuestion(`ceritakan tentang ${topic}`)
                      }
                      className={`text-sm ${borderColor} ${badgeClass} hover:scale-105 transition-all duration-300 text-left justify-start h-auto py-4 px-4 w-full`}
                    >
                      <span className="truncate font-medium">{topic}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* previous questions */}
        <AnimatePresence>
          {previousQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p className={`mb-4 text-sm ${textMuted} font-medium`}>
                📝 Recent Questions:
              </p>
              <div className="flex flex-wrap gap-3">
                {previousQuestions.slice(0, 4).map((q, i) => (
                  <motion.button
                    key={i}
                    onClick={() => selectQuestion(q)}
                    className={`rounded-full border-2 ${borderColor} ${badgeClass} px-4 py-2 text-sm transition-all duration-300 hover:scale-105 font-medium`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {q.length > 35 ? q.substring(0, 35) + "..." : q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* suggested followups */}
        <AnimatePresence>
          {suggestedFollowups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p
                className={`mb-4 text-sm ${textMuted} flex items-center font-medium`}
              >
                💡{" "}
                <span
                  className={`ml-2 ${
                    variant === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Suggested Followups:
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedFollowups.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUserPrompt(question);
                        askAI(question);
                      }}
                      className={`text-sm ${borderColor} ${badgeClass} hover:scale-105 transition-all duration-300 text-left justify-start h-auto py-4 px-4 w-full`}
                    >
                      <span className="truncate font-medium">{question}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* recommended questions - hanya 2 pertanyaan */}
        <div className="mb-8">
          <p className={`mb-6 text-sm ${textMuted} font-medium`}>
            💼 Recommended Questions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUserPrompt(question);
                    askAI(question);
                  }}
                  className={`text-sm ${borderColor} ${badgeClass} hover:scale-105 transition-all duration-300 text-left justify-start h-auto py-4 px-4 w-full`}
                >
                  <span className="truncate font-medium">{question}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* action buttons */}
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
            disabled={isLoading || !userPrompt}
            className={`${borderColor} ${badgeClass} hover:scale-105 transition-all duration-300 font-medium`}
          >
            🔄 Reset
          </Button>

          <Button
            onClick={() => askAI(userPrompt)}
            disabled={isLoading || !userPrompt.trim()}
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
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                🚀 {conversationHistory.length > 0 ? "Continue" : "Start"}
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

      {/* error message */}
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
              Troubleshooting: Check browser console (F12) for detailed error
              logs.
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