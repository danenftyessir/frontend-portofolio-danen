import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { AIResponseCard } from "@/components/AIResponseCard";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://portofolio-danen-backend.up.railway.app";

const AISection = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [useMock, setUseMock] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>(""); // track session id
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ question: string; response: string; timestamp: number }>
  >([]);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // preset pertanyaan yang lebih engaging dan natural
  const presetQuestions = [
    "Kenapa saya harus merekrut kamu ke tim data science kami?",
    "Apa yang membuat kamu berbeda dari kandidat lain?",
    "Ceritakan tentang proyek terbaik yang pernah kamu kerjakan",
    "Gimana pengalaman kamu dengan data science selama ini?",
    "Apa keahlian teknis yang paling kamu banggakan?",
    "Bagaimana kamu mengatasi tantangan dalam coding?",
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
        console.error("Error connecting to backend:", error);
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

  // fungsi untuk mengirim pertanyaan ke backend
  const askAI = async (question: string) => {
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
    if (!previousQuestions.includes(question)) {
      setPreviousQuestions((prev) => [question, ...prev].slice(0, 5));
    }

    const endpoint = useMock ? `${API_URL}/ask-mock` : `${API_URL}/ask`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          session_id: sessionId, // kirim session id untuk konteks
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
          await askAI(question);
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
        .replace(/\s+,/g, ",")
        .replace(/,\s+/g, ", ")
        .replace(/\.\s+/g, ". ")
        .replace(/\s+!/g, "!")
        .replace(/!\s+/g, "! ")
        .replace(/\s+\?/g, "?")
        .replace(/\?\s+/g, "? ")
        .replace(/\s+:/g, ":")
        .replace(/:\s+/g, ": ")
        .replace(/\s+;/g, ";")
        .replace(/;\s+/g, "; ")
        .replace(/\s+$/g, "")
        .replace(/^\s+/g, "")
        .trim();

      setAiResponse(cleanedResponse);

      // simpan ke conversation history
      setConversationHistory((prev) =>
        [
          ...prev,
          {
            question,
            response: cleanedResponse,
            timestamp: Date.now(),
          },
        ].slice(-10)
      ); // keep last 10 exchanges
    } catch (error) {
      console.error("Error:", error);

      // jika bukan mode mock, coba dengan mode mock
      if (!useMock) {
        toast({
          title: "Info",
          description: "Beralih ke mode offline untuk sementara",
        });
        setUseMock(true);
        await askAI(question);
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
    askAI(userPrompt);
  };

  // fungsi untuk handle keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // kirim pertanyaan dengan Ctrl+Enter
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      askAI(userPrompt);
    }
  };

  // fungsi untuk menampilkan pertanyaan dari history
  const selectPreviousQuestion = (question: string) => {
    setUserPrompt(question);
    // focus ke textarea dan posisikan cursor di akhir
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(question.length, question.length);
    }
  };

  // fungsi untuk clear conversation
  const clearConversation = () => {
    setAiResponse("");
    setConversationHistory([]);
    setPreviousQuestions([]);
    setSessionId(crypto.randomUUID()); // generate new session
    setUserPrompt("");
    toast({
      title: "Percakapan Dibersihkan",
      description: "Memulai sesi percakapan baru",
    });
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
                {conversationHistory.length} exchange
                {conversationHistory.length !== 1 ? "s" : ""}
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
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear Chat
              </Button>
            )}
          </div>
        </div>

        {/* conversation context display (if there's history) */}
        {conversationHistory.length > 0 && (
          <div className="mb-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
            <p className="text-xs text-indigo-600 font-medium mb-1">
              Konteks Percakapan:
            </p>
            <p className="text-sm text-indigo-800">
              {conversationHistory.length > 1
                ? `Melanjutkan dari: "${conversationHistory[
                    conversationHistory.length - 1
                  ].question.substring(0, 50)}..."`
                : `Memulai percakapan dengan: "${conversationHistory[0].question.substring(
                    0,
                    50
                  )}..."`}
            </p>
          </div>
        )}

        {/* Input area dengan styling yang lebih menarik */}
        <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-inner transition-all focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300">
          <Textarea
            ref={textareaRef}
            placeholder={
              conversationHistory.length > 0
                ? "Lanjutkan percakapan..."
                : "Tanyakan sesuatu tentang saya... (misal: Kenapa saya harus merekrut kamu?)"
            }
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[130px] max-h-[200px] resize-y border-0 bg-transparent transition-all duration-300 focus-visible:ring-0"
          />
          <div className="border-t border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-500 flex justify-between items-center">
            <span>Tekan Ctrl+Enter untuk kirim</span>
            {sessionId && (
              <span className="font-mono">
                Session: {sessionId.substring(0, 8)}...
              </span>
            )}
          </div>
        </div>

        {/* Sejarah pertanyaan sebelumnya */}
        {previousQuestions.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs text-slate-500">
              Pertanyaan sebelumnya:
            </p>
            <div className="flex flex-wrap gap-2">
              {previousQuestions.map((q, i) => (
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

        {/* Preset questions dengan UI yang lebih menarik */}
        <div className="mb-4">
          <p className="mb-2 text-xs text-slate-500 flex items-center">
            <span>Pertanyaan rekomendasi:</span>
            {conversationHistory.length > 0 && (
              <span className="ml-2 text-indigo-600">
                (untuk melanjutkan percakapan)
              </span>
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {presetQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserPrompt(question);
                  askAI(question);
                }}
                className="text-xs border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-300 text-left justify-start h-auto py-2 px-3"
              >
                <span className="truncate">{question}</span>
              </Button>
            ))}
          </div>
        </div>

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

        {/* AI Response Card */}
        {(aiResponse || isLoading) && (
          <AIResponseCard
            response={aiResponse}
            loading={isLoading}
            isOfflineMode={useMock}
            onRegenerate={regenerateResponse}
          />
        )}

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
            <div className="mt-3 text-sm">
              <p>Periksa apakah:</p>
              <ul className="mt-1 list-disc pl-5">
                <li>Backend server berjalan di {API_URL}</li>
                <li>
                  API key OpenAI sudah dikonfigurasi dengan benar di file .env
                </li>
                <li>Koneksi internet tersedia untuk menghubungi API OpenAI</li>
              </ul>
            </div>
          </div>
        )}

        {/* conversation summary (jika ada history) */}
        {conversationHistory.length > 3 && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Ringkasan Percakapan
            </h4>
            <div className="space-y-2">
              {conversationHistory.slice(-3).map((exchange, index) => (
                <div key={index} className="text-xs">
                  <div className="text-slate-600">
                    <span className="font-medium">Q:</span>{" "}
                    {exchange.question.substring(0, 60)}...
                  </div>
                  <div className="text-slate-500 ml-3">
                    <span className="font-medium">A:</span>{" "}
                    {exchange.response.substring(0, 80)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { AISection };
