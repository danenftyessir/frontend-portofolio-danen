import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { AIResponseCard } from "@/components/AIResponseCard";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://portofolio-danen-backend.up.railway.app";

// definisikan tipe untuk history percakapan
interface ConversationItem {
  question: string;
  response: string;
  timestamp: number;
  category?: string;
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
  const [suggestedFollowups, setSuggestedFollowups] = useState<string[]>([]);
  const [lastQuestionCategory, setLastQuestionCategory] = useState<string>("");
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // preset pertanyaan (4 pertanyaan saja sesuai permintaan)
  const recommendedQuestions = [
    "Kenapa saya harus merekrut kamu ke tim data science kami?",
    "Ceritakan tentang proyek terbaik yang pernah kamu kerjakan",
    "Kamu suka lagu apa?",
    "Makanan favorit kamu apa?",
  ];

  // cek koneksi ke backend saat komponen dimuat
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_URL}/`, {
          method: "GET",
        });

        if (response.ok) {
          setBackendStatus("connected");
          setUseMock(false);
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

    checkBackend();

    // generate session id jika belum ada
    if (!sessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, [sessionId]);

  // ambil suggested followups
  useEffect(() => {
    const fetchSuggestedFollowups = async () => {
      if (!sessionId || conversationHistory.length === 0) return;

      try {
        const response = await fetch(
          `${API_URL}/suggested-followups/${sessionId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.suggested_followups && data.suggested_followups.length > 0) {
            // ambil maksimal 2 followups saja
            setSuggestedFollowups(data.suggested_followups.slice(0, 2));
          }
        }
      } catch (error) {
        console.error("error fetching suggested followups:", error);
      }
    };

    fetchSuggestedFollowups();
  }, [sessionId, conversationHistory]);

  // validasi pertanyaan - diperbaiki untuk pertanyaan singkat
  const isGibberishQuestion = (question: string): boolean => {
    // pertanyaan terlalu pendek tetapi bukan kata kunci yang dikenal
    if (question.split(/\s+/).length < 2) {
      const validShortQueries = ["python", "react", "java", "next"];
      return !validShortQueries.some((q) => question.toLowerCase().includes(q));
    }

    // deteksi karakter berulang yang tidak normal
    const hasRepeatingChars = /(.)\1{3,}/.test(question);
    if (hasRepeatingChars) return true;

    // pertanyaan valid
    return false;
  };

  // tingkatkan pertanyaan dengan konteks jika diperlukan
  const enhanceQuestionWithContext = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // jika sudah "ceritakan" dan ada kata kunci teknologi, langsung terima
    if (
      lowerQuestion.includes("ceritakan") &&
      (lowerQuestion.includes("python") ||
        lowerQuestion.includes("react") ||
        lowerQuestion.includes("data science"))
    ) {
      return question;
    }

    // untuk pertanyaan sangat singkat, tambah konteks
    if (
      lowerQuestion === "python" ||
      (lowerQuestion.includes("python") && question.split(/\s+/).length < 3)
    ) {
      return "Ceritakan pengalamanmu dengan Python dan bagaimana kamu menggunakannya dalam proyek";
    }

    // untuk teknologi lain
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

  // fungsi untuk mengirim pertanyaan ke backend
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

    // simpan pertanyaan ke history
    if (!skipHistory && !previousQuestions.includes(question)) {
      setPreviousQuestions((prev) => [question, ...prev].slice(0, 5));
    }

    // tingkatkan pertanyaan jika perlu
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

        // coba gunakan mode mock jika endpoint /ask gagal
        if (!useMock) {
          toast({
            title: "Info",
            description: "Beralih ke mode offline untuk sementara",
          });
          setUseMock(true);
          await askAI(processedQuestion, true); // skip adding to history again
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

      const data = await response.json();

      // update session id jika dapat dari response
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
      }

      const cleanedResponse = data.response
        .replace(/\s+/g, " ")
        .replace(/\s+\./g, ".")
        .trim();

      // cek apakah respons adalah gibberish tapi pertanyaan valid
      if (
        cleanedResponse.includes("Hmm, maaf aku tidak mengerti") &&
        !isGibberishQuestion(processedQuestion)
      ) {
        // coba lagi dengan pertanyaan yang ditingkatkan
        const enhancedQuestion = enhanceQuestionWithContext(processedQuestion);
        if (enhancedQuestion !== processedQuestion) {
          setUserPrompt(enhancedQuestion);
          await askAI(enhancedQuestion, true);
          return;
        }
      }

      setAiResponse(cleanedResponse);

      // deteksi kategori dari pertanyaan (sederhana)
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

      setLastQuestionCategory(detectedCategory);

      // simpan ke conversation history
      setConversationHistory((prev) =>
        [
          ...prev,
          {
            question: processedQuestion,
            response: cleanedResponse,
            timestamp: Date.now(),
            category: detectedCategory,
          },
        ].slice(-10)
      ); // simpan 10 percakapan terakhir

      // reset userPrompt setelah mendapatkan respons
      setUserPrompt("");

      // cek apakah ada followups yang disarankan
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

      // jika bukan mode mock, coba dengan mode mock
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

  // fungsi untuk toggle mode
  const toggleMode = () => {
    setUseMock(!useMock);
    toast({
      title: "Mode Diubah",
      description: `Beralih ke mode ${!useMock ? "offline" : "online"}`,
    });
  };

  // fungsi untuk regenerate respons
  const regenerateResponse = () => {
    if (conversationHistory.length > 0) {
      const lastQuestion =
        conversationHistory[conversationHistory.length - 1].question;
      askAI(lastQuestion, true); // skip adding to history
    }
  };

  // fungsi untuk handle keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // kirim pertanyaan dengan Ctrl+Enter atau Command+Enter
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      askAI(userPrompt);
    }
  };

  // fungsi untuk menampilkan pertanyaan dari history
  const selectPreviousQuestion = (question: string) => {
    setUserPrompt(question);
    // focus ke textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(question.length, question.length);
    }
  };

  // fungsi untuk clear conversation dengan konfirmasi
  const clearConversation = () => {
    if (conversationHistory.length > 0) {
      if (window.confirm("Hapus riwayat percakapan dan mulai sesi baru?")) {
        setAiResponse("");
        setConversationHistory([]);
        setPreviousQuestions([]);
        setSuggestedFollowups([]);
        setSessionId(crypto.randomUUID());
        setUserPrompt("");
        toast({
          title: "Percakapan Dihapus",
          description: "Sesi percakapan baru telah dimulai",
        });
      }
    }
  };

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

        {/* context display jika ada percakapan sebelumnya */}
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

        {/* textarea untuk input pertanyaan */}
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

        {/* hanya tampilkan 4 pertanyaan rekomendasi */}
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
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setUserPrompt("")}
            disabled={isLoading || !userPrompt}
            className="border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors duration-300"
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
    </div>
  );
};

export { AISection };
