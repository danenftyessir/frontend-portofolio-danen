import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { AIResponseCard } from "@/components/AIResponseCard";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://portofolio-danen-backend.up.railway.app";

interface ConversationItem {
  question: string;
  response: string;
  timestamp: number;
  category?: string;
  relatedTopics?: string[];
}

interface AIApiResponse {
  response: string;
  session_id: string;
  related_topics?: string[];
}

const AISection = () => {
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

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const recommendedQuestions = [
    "Kenapa saya harus merekrut kamu ke tim data science kami?",
    "Ceritakan tentang proyek terbaik yang pernah kamu kerjakan",
    "Kamu suka lagu apa?",
    "Makanan favorit kamu apa?",
    "Bagaimana pengalaman jadi asisten praktikum?",
    "Ceritakan tentang Rush Hour Solver project",
  ];

  // check backend dan rag status
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_URL}/`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setBackendStatus("connected");
          setUseMock(false);

          // check rag status
          if (data.rag_status) {
            setRagStatus(data.rag_status);
          }
        } else {
          setBackendStatus("error");
          setUseMock(true);
        }
      } catch (error) {
        console.error("error connecting to backend:", error);
        setBackendStatus("error");
        setUseMock(true);
      }
    };

    const checkRagStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/rag-status`);
        if (response.ok) {
          const data = await response.json();
          setRagStatus(data.status);
        }
      } catch (error) {
        console.error("error checking rag status:", error);
      }
    };

    checkBackend();
    checkRagStatus();

    if (!sessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, [sessionId]);

  const isGibberishQuestion = (question: string): boolean => {
    if (question.split(/\s+/).length < 2) {
      const validShortQueries = ["python", "react", "java", "next"];
      return !validShortQueries.some((q) => question.toLowerCase().includes(q));
    }

    const hasRepeatingChars = /(.)\1{3,}/.test(question);
    if (hasRepeatingChars) return true;

    return false;
  };

  const enhanceQuestionWithContext = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (
      lowerQuestion.includes("ceritakan") &&
      (lowerQuestion.includes("python") ||
        lowerQuestion.includes("react") ||
        lowerQuestion.includes("data science"))
    ) {
      return question;
    }

    if (
      lowerQuestion === "python" ||
      (lowerQuestion.includes("python") && question.split(/\s+/).length < 3)
    ) {
      return "Ceritakan pengalamanmu dengan Python dan bagaimana kamu menggunakannya dalam proyek";
    }

    for (const tech of ["react", "javascript", "java", "next.js"]) {
      if (
        lowerQuestion === tech ||
        (lowerQuestion.includes(tech) && question.split(/\s+/).length < 3)
      ) {
        return `Ceritakan pengalamanmu dengan ${tech} dan proyek apa yang sudah kamu buat`;
      }
    }

    return question;
  };

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
      setPreviousQuestions((prev) => [question, ...prev].slice(0, 5));
    }

    let processedQuestion = question;
    if (question.split(/\s+/).length < 3) {
      processedQuestion = enhanceQuestionWithContext(question);
    }

    const endpoint = useMock ? `${API_URL}/ask-mock` : `${API_URL}/ask`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: processedQuestion,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorDetail;
        try {
          errorDetail = JSON.parse(responseText).detail;
        } catch (e) {
          errorDetail = responseText || "Gagal mendapatkan respons";
        }

        setErrorMessage(`Error: ${errorDetail}`);

        if (!useMock) {
          toast({
            title: "Info",
            description: "Beralih ke mode offline untuk sementara",
          });
          setUseMock(true);
          await askAI(processedQuestion, true);
          return;
        } else {
          toast({
            title: "Error",
            description: "Terjadi kesalahan saat menghubungi backend",
            variant: "destructive",
          });
        }
        return;
      }

      const data: AIApiResponse = await response.json();

      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
      }

      const cleanedResponse = data.response
        .replace(/\s+/g, " ")
        .replace(/\s+\./g, ".")
        .trim();

      if (
        cleanedResponse.includes("Hmm, maaf aku tidak mengerti") &&
        !isGibberishQuestion(processedQuestion)
      ) {
        const enhancedQuestion = enhanceQuestionWithContext(processedQuestion);
        if (enhancedQuestion !== processedQuestion) {
          setUserPrompt(enhancedQuestion);
          await askAI(enhancedQuestion, true);
          return;
        }
      }

      setAiResponse(cleanedResponse);

      // set related topics dari rag system
      if (data.related_topics && data.related_topics.length > 0) {
        setRelatedTopics(data.related_topics);
      }

      const detectedCategory = processedQuestion
        .toLowerCase()
        .includes("python")
        ? "teknologi"
        : processedQuestion.toLowerCase().includes("proyek")
        ? "proyek"
        : processedQuestion.toLowerCase().includes("lagu")
        ? "lagu_favorit"
        : processedQuestion.toLowerCase().includes("makanan")
        ? "makanan_favorit"
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
          },
        ].slice(-20)
      );

      setUserPrompt("");

      // fetch suggested followups
      const fetchSuggestedFollowups = async () => {
        try {
          const response = await fetch(
            `${API_URL}/suggested-followups/${sessionId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (
              data.suggested_followups &&
              data.suggested_followups.length > 0
            ) {
              setSuggestedFollowups(data.suggested_followups.slice(0, 2));
            }
          }
        } catch (error) {
          console.error("error fetching followups:", error);
        }
      };

      fetchSuggestedFollowups();
    } catch (error) {
      console.error("Error:", error);

      if (!useMock) {
        toast({
          title: "Info",
          description: "Beralih ke mode offline untuk sementara",
        });
        setUseMock(true);
        await askAI(processedQuestion, true);
        return;
      }

      setErrorMessage(
        `Error: ${
          error instanceof Error ? error.message : "Terjadi kesalahan koneksi"
        }`
      );
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghubungi backend",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setUseMock(!useMock);
    toast({
      title: "Mode Diubah",
      description: `Beralih ke mode ${!useMock ? "offline" : "online"}`,
    });
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

  const selectPreviousQuestion = (question: string) => {
    setUserPrompt(question);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(question.length, question.length);
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
        toast({
          title: "Percakapan Dihapus",
          description: "Sesi percakapan baru telah dimulai",
        });
      }
    }
  };

  const clearHistory = () => {
    if (conversationHistory.length > 0) {
      if (window.confirm("hapus semua riwayat percakapan?")) {
        setConversationHistory([]);
        toast({
          title: "riwayat dihapus",
          description: "semua riwayat percakapan telah dibersihkan",
        });
      }
    }
  };

  const selectQuestionFromHistory = (question: string) => {
    setUserPrompt(question);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(question.length, question.length);
    }
    setHistoryVisible(false);
  };

  const selectRelatedTopic = (topic: string) => {
    const topicQuestions: Record<string, string> = {
      "Keahlian Python": "Ceritakan lebih detail tentang keahlian Python kamu",
      "Rush Hour Puzzle Solver":
        "Bagaimana cara kerja Rush Hour Solver yang kamu buat?",
      "Web Development": "Apa saja teknologi web development yang kamu kuasai?",
      "Street Food Enthusiast":
        "Rekomendasi street food favorit di Jakarta dong",
      "Selera Musik": "Lagu apa yang lagi sering kamu dengerin?",
    };

    const question = topicQuestions[topic] || `Ceritakan tentang ${topic}`;
    setUserPrompt(question);
    askAI(question);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // drag functionality untuk modal
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") return;

    isDragging = true;
    offsetX = e.clientX - modalPosition.x;
    offsetY = e.clientY - modalPosition.y;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    document.body.style.userSelect = "none";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    setModalPosition({ x, y });
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (historyVisible) {
      const centerX = (window.innerWidth - 320) / 2;
      const centerY = (window.innerHeight - 400) / 2;
      setModalPosition({ x: centerX, y: centerY });
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };
  }, [historyVisible]);

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold">Tanya AI Asisten</h2>
      <div className="rounded-xl bg-white p-6 shadow-md">
        {/* header dengan status dan controls */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-3 w-3 rounded-full ${
                backendStatus === "connected"
                  ? "bg-green-500"
                  : backendStatus === "error"
                  ? "bg-red-500"
                  : "bg-yellow-500 animate-pulse"
              }`}
            ></span>
            <span className="text-sm text-slate-600">
              {backendStatus === "connected"
                ? "Backend terhubung"
                : backendStatus === "error"
                ? "Backend tidak terhubung"
                : "Mengecek status..."}
            </span>

            {/* rag status indicator */}
            {ragStatus && ragStatus !== "unknown" && (
              <div className="flex items-center gap-1 ml-3">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    ragStatus === "healthy" || ragStatus === "initialized"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  }`}
                ></span>
                <span className="text-xs text-slate-500">RAG: {ragStatus}</span>
              </div>
            )}

            {conversationHistory.length > 0 && (
              <span className="ml-3 text-xs text-slate-500">
                {conversationHistory.length} percakapan dalam sesi ini
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMode}
              className="text-xs"
            >
              <span
                className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                  useMock ? "bg-amber-500" : "bg-green-500"
                }`}
              ></span>
              Mode: {useMock ? "Offline" : "Online"}
            </Button>
            {conversationHistory.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearConversation}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
                title="Hapus riwayat percakapan dan mulai sesi baru"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                Hapus & Mulai Baru
              </Button>
            )}
          </div>
        </div>

        {/* context display */}
        {conversationHistory.length > 0 && (
          <div className="mb-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
            <p className="text-xs text-indigo-600 font-medium mb-1">
              Konteks Percakapan:
            </p>
            <p className="text-sm text-indigo-800">
              {conversationHistory.length > 1
                ? `Melanjutkan dari: "${conversationHistory[
                    conversationHistory.length - 1
                  ].question.substring(0, 50)}${
                    conversationHistory[conversationHistory.length - 1].question
                      .length > 50
                      ? "..."
                      : ""
                  }"`
                : `Memulai percakapan dengan: "${conversationHistory[0].question.substring(
                    0,
                    50
                  )}${
                    conversationHistory[0].question.length > 50 ? "..." : ""
                  }"`}
            </p>
          </div>
        )}

        {/* textarea input */}
        <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-inner transition-all focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300">
          <Textarea
            ref={textareaRef}
            placeholder={
              conversationHistory.length > 0
                ? "Lanjutkan percakapan atau tanyakan hal baru..."
                : "Tanyakan sesuatu tentang saya... (misal: Kenapa saya harus merekrut kamu?)"
            }
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[130px] max-h-[200px] resize-y border-0 bg-transparent transition-all duration-300 focus-visible:ring-0"
          />
          <div className="border-t border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-500">
            <span>Tekan Ctrl+Enter untuk kirim</span>
          </div>
        </div>

        {/* related topics dari rag */}
        {relatedTopics.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs text-slate-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 text-blue-500"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="font-medium text-blue-600">
                Topik terkait yang mungkin menarik:
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {relatedTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => selectRelatedTopic(topic)}
                  className="text-xs border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-all duration-300 text-left justify-start h-auto py-2 px-3"
                >
                  <span className="truncate">{topic}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* pertanyaan sebelumnya */}
        {previousQuestions.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs text-slate-500">
              Pertanyaan sebelumnya:
            </p>
            <div className="flex flex-wrap gap-2">
              {previousQuestions.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  onClick={() => selectPreviousQuestion(q)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 transition-colors hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200"
                >
                  {q.length > 30 ? q.substring(0, 30) + "..." : q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* suggested followups */}
        {suggestedFollowups.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs text-slate-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 text-indigo-500"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span className="font-medium text-indigo-600">
                Pertanyaan lanjutan:
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedFollowups.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUserPrompt(question);
                    askAI(question);
                  }}
                  className="text-xs border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-300 transition-all duration-300 text-left justify-start h-auto py-2 px-3"
                >
                  <span className="truncate">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* pertanyaan rekomendasi */}
        <div className="mb-4">
          <p className="mb-2 text-xs text-slate-500">Pertanyaan rekomendasi:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recommendedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserPrompt(question);
                  askAI(question);
                }}
                className={`text-xs border-slate-200 
                  ${
                    index < 2
                      ? "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                      : "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                  } 
                  transition-all duration-300 text-left justify-start h-auto py-2 px-3`}
              >
                <span className="truncate">{question}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* tombol aksi */}
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            onClick={() => setHistoryVisible(true)}
            className="border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1.5 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            riwayat ({conversationHistory.length})
          </Button>

          <div className="flex-1"></div>

          <Button
            variant="outline"
            onClick={() => setUserPrompt("")}
            disabled={isLoading || !userPrompt}
            className="border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors duration-300 mr-2"
          >
            Reset
          </Button>
          <Button
            onClick={() => askAI(userPrompt)}
            disabled={isLoading || !userPrompt.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
            ) : (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {conversationHistory.length > 0 ? "Lanjutkan" : "Mulai Chat"}
              </span>
            )}
          </Button>
        </div>

        {/* AI response card */}
        {(aiResponse || isLoading) && (
          <AIResponseCard
            response={aiResponse}
            loading={isLoading}
            isOfflineMode={useMock}
            onRegenerate={regenerateResponse}
          />
        )}

        {/* error message */}
        {errorMessage && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            <div className="flex items-center gap-2 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>Error</h3>
            </div>
            <div className="mt-2 text-sm">{errorMessage}</div>
          </div>
        )}
      </div>

      {/* modal riwayat percakapan dengan drag */}
      {historyVisible && (
        <div
          className="fixed w-80 max-h-96 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
          style={{
            left: `${modalPosition.x}px`,
            top: `${modalPosition.y}px`,
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50 rounded-t-lg cursor-grab"
            onMouseDown={onMouseDown}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5 opacity-60">
                <div className="w-3 h-0.5 bg-slate-400 rounded-full"></div>
                <div className="w-3 h-0.5 bg-slate-400 rounded-full"></div>
                <div className="w-3 h-0.5 bg-slate-400 rounded-full"></div>
              </div>
              <h3 className="text-sm font-medium text-slate-800">
                Riwayat ({conversationHistory.length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {conversationHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-slate-500 hover:text-red-600 transition-colors"
                >
                  hapus semua
                </button>
              )}
              <button
                onClick={() => setHistoryVisible(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded hover:bg-slate-100"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {conversationHistory.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <div className="text-slate-400 mb-2">
                  <svg
                    className="mx-auto h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-500">Belum ada percakapan</p>
              </div>
            ) : (
              <div className="p-2">
                {[...conversationHistory].reverse().map((item, index) => (
                  <div
                    key={conversationHistory.length - 1 - index}
                    className="mb-3 last:mb-0 p-3 rounded-md border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-indigo-600">
                        #{conversationHistory.length - index}
                      </span>
                      <button
                        onClick={() => selectQuestionFromHistory(item.question)}
                        className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        gunakan lagi
                      </button>
                    </div>

                    <p className="text-sm text-slate-700 mb-2 leading-relaxed">
                      {item.question}
                    </p>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.response.length > 80
                        ? `${item.response.substring(0, 80)}...`
                        : item.response}
                    </p>

                    {/* related topics dari history */}
                    {item.relatedTopics && item.relatedTopics.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.relatedTopics.slice(0, 2).map((topic, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <span className="text-xs text-slate-400">
                        {formatTime(item.timestamp)}
                      </span>
                      {item.category && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { AISection };
