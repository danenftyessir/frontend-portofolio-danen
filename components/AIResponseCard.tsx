import React, { useState, useEffect, useRef } from "react";

interface AIResponseCardProps {
  response: string;
  loading?: boolean;
  isOfflineMode?: boolean;
  onRegenerate?: () => void;
  variant?: "dark" | "light";
}

const AIResponseCard = ({
  response,
  loading = false,
  isOfflineMode = false,
  onRegenerate,
  variant = "light",
}: AIResponseCardProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // theme classes untuk light/clean style
  const cardBg =
    variant === "dark"
      ? "bg-gray-800/80 border-gray-700/50"
      : "bg-white/95 border-gray-200/50 shadow-xl";

  const headerBg =
    variant === "dark"
      ? "bg-gray-700/50 border-gray-600/30"
      : "bg-gray-50/80 border-gray-200/40";

  const textColor = variant === "dark" ? "text-white" : "text-gray-800";
  const textSecondary = variant === "dark" ? "text-gray-300" : "text-gray-600";
  const textMuted = variant === "dark" ? "text-gray-400" : "text-gray-500";
  const borderColor =
    variant === "dark" ? "border-gray-600/30" : "border-gray-200/50";

  // reset saat respons berubah
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(true);
    setIsCompleted(false);
  }, [response]);

  // efek typing dengan kecepatan yang konsisten
  useEffect(() => {
    if (!isTyping || !response) return;

    if (currentIndex < response.length) {
      let typingSpeed = 12;

      const currentChar = response[currentIndex];
      if ([".", "!", "?"].includes(currentChar)) {
        typingSpeed = 200;
      } else if ([",", ";", ":"].includes(currentChar)) {
        typingSpeed = 100;
      }

      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + response[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      setIsCompleted(true);
    }
  }, [currentIndex, response, isTyping]);

  // scroll otomatis saat mengetik
  useEffect(() => {
    if (containerRef.current && isTyping) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayText, isTyping]);

  // format teks dengan pemrosesan markdown sederhana
  const formatText = (text: string) => {
    const withLineBreaks = text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {formatTextSegment(line)}
        {i < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));

    return withLineBreaks;
  };

  const formatTextSegment = (text: string) => {
    let parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      const italicParts = part.split(/(\*.*?\*)/g);
      if (italicParts.length > 1) {
        return italicParts.map((italicPart, j) => {
          if (italicPart.startsWith("*") && italicPart.endsWith("*")) {
            return (
              <em key={`${i}-${j}`} className="italic">
                {italicPart.slice(1, -1)}
              </em>
            );
          }
          return italicPart;
        });
      }

      return part;
    });
  };

  const getLoadingMessage = () => {
    const messages = [
      "menganalisis context dari knowledge base...",
      "memproses dengan ai neural network...",
      "menyusun respons yang personal...",
      "mengoptimalkan jawaban untuk anda...",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      // bisa tambah toast notification di sini
    });
  };

  return (
    <div
      className={`mt-8 rounded-2xl border-2 ${cardBg} backdrop-blur-md transition-all duration-300 hover:shadow-2xl`}
    >
      <div
        className={`flex items-center justify-between border-b-2 ${borderColor} ${headerBg} px-6 py-4 rounded-t-2xl`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-12 w-12 overflow-hidden rounded-full ${
              variant === "dark"
                ? "bg-gradient-to-r from-gray-600 to-gray-800"
                : "bg-gradient-to-r from-gray-200 to-gray-400"
            } p-0.5 shadow-lg`}
          >
            <div
              className={`flex h-full w-full items-center justify-center rounded-full ${
                variant === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-300">
                <path d="M17.5,15.5C17.5,16.61 16.61,17.5 15.5,17.5C14.39,17.5 13.5,16.61 13.5,15.5C13.5,14.39 14.39,13.5 15.5,13.5C16.61,13.5 17.5,14.39 17.5,15.5M8.5,15.5C8.5,16.61 7.61,17.5 6.5,17.5C5.39,17.5 4.5,16.61 4.5,15.5C4.5,14.39 5.39,13.5 6.5,13.5C7.61,13.5 8.5,14.39 8.5,15.5M12,0C7,0 2.73,3.11 1.23,7.39C0.46,7.39 0,8.11 0,9V11.5C0,12.39 0.46,13.11 1.23,13.11C1.83,15.92 3.71,18.28 6.21,19.64L6.5,19.11C6.5,19.11 7,18 8.5,18H13.5C15,18 15.5,19.11 15.5,19.11L15.79,19.64C18.29,18.28 20.17,15.92 20.77,13.11C21.54,13.11 22,12.39 22,11.5V9C22,8.11 21.54,7.39 20.77,7.39C19.27,3.11 15,0 12,0Z"/>
              </svg>
            </div>
          </div>
          <div>
            <p className={`text-sm font-semibold ${textColor}`}>AI Assistant</p>
            <div className={`flex items-center text-xs ${textSecondary}`}>
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  isOfflineMode ? "bg-amber-500" : "bg-green-500"
                } animate-pulse`}
              ></span>
              {isOfflineMode ? "Offline Mode" : "Online Mode"}
              {isCompleted && (
                <span
                  className={`ml-3 ${
                    variant === "dark" ? "text-green-400" : "text-green-600"
                  } font-medium`}
                >
                  • Response Complete
                </span>
              )}
            </div>
          </div>
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-2">
          {isCompleted && response && (
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${textSecondary} transition-all hover:scale-105 ${
                variant === "dark"
                  ? "hover:bg-gray-700/50 hover:text-white"
                  : "hover:bg-gray-100/80 hover:text-gray-800"
              } font-medium`}
              title="Copy Response"
            >
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
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </button>
          )}

          {isCompleted && onRegenerate && (
            <button
              onClick={onRegenerate}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${textSecondary} transition-all hover:scale-105 ${
                variant === "dark"
                  ? "hover:bg-gray-700/50 hover:text-white"
                  : "hover:bg-gray-100/80 hover:text-gray-800"
              } font-medium`}
              title="Regenerate Response"
            >
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
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className={`min-h-[120px] overflow-y-auto overflow-x-hidden p-6 ${textColor}`}
      >
        {loading ? (
          <div className="space-y-6 p-4">
            {/* modern skeleton loader dengan wave effect */}
            <div className="flex items-center space-x-4">
              <div
                className={`relative w-12 h-12 ${
                  variant === "dark" ? "bg-gray-600/30" : "bg-gray-200/50"
                } rounded-full overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 ${
                    variant === "dark"
                      ? "bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"
                      : "bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"
                  } animate-shimmer`}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
              <div className="flex-1 space-y-3">
                <div
                  className={`relative h-4 ${
                    variant === "dark" ? "bg-gray-600/30" : "bg-gray-200/50"
                  } rounded-full w-3/4 overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 ${
                      variant === "dark"
                        ? "bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"
                        : "bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
                    } animate-shimmer`}
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  />
                </div>
                <div
                  className={`relative h-3 ${
                    variant === "dark" ? "bg-gray-700/20" : "bg-gray-100/60"
                  } rounded-full w-1/2 overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 ${
                      variant === "dark"
                        ? "bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"
                        : "bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"
                    } animate-shimmer`}
                    style={{
                      backgroundSize: "200% 100%",
                      animationDelay: "0.5s",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* skeleton content lines dengan wave effect */}
            <div className="space-y-4">
              {[1, 0.85, 0.9, 0.75].map((width, index) => (
                <div
                  key={index}
                  className={`relative h-4 ${
                    variant === "dark" ? "bg-gray-600/20" : "bg-gray-200/40"
                  } rounded-full overflow-hidden`}
                  style={{ width: `${width * 100}%` }}
                >
                  <div
                    className={`absolute inset-0 ${
                      variant === "dark"
                        ? "bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"
                        : "bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
                    } animate-shimmer`}
                    style={{
                      backgroundSize: "200% 100%",
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* animated thinking indicator dengan pulse effect */}
            <div className="flex items-center space-x-3 justify-center py-6">
              <div className="flex space-x-2">
                {[0, 0.15, 0.3].map((delay, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 ${
                      variant === "dark" ? "bg-blue-500" : "bg-gray-600"
                    } rounded-full animate-bounce opacity-70`}
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
              <span
                className={`text-sm ${
                  variant === "dark" ? "text-gray-400" : "text-gray-500"
                } font-medium ml-3`}
              >
                {getLoadingMessage()}
              </span>
            </div>

            {/* progress bar simulation */}
            <div
              className={`w-full ${
                variant === "dark" ? "bg-gray-700/20" : "bg-gray-200/50"
              } rounded-full h-1 overflow-hidden`}
            >
              <div
                className={`h-full ${
                  variant === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-gray-600 to-gray-800"
                } rounded-full animate-pulse`}
                style={{
                  width: "60%",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="relative whitespace-pre-wrap break-words leading-relaxed">
            <span ref={textRef} className="text-base">
              {formatText(displayText)}
            </span>
            {isTyping && (
              <span
                ref={cursorRef}
                className={`inline-block h-5 w-2 animate-pulse ${
                  variant === "dark" ? "bg-blue-400" : "bg-gray-600"
                } align-text-bottom ml-1 rounded-sm`}
                style={{ verticalAlign: "text-bottom" }}
              />
            )}
          </div>
        )}
      </div>

      {/* footer dengan informasi tambahan */}
      {isCompleted && response && (
        <div
          className={`border-t-2 ${borderColor} ${
            variant === "dark" ? "bg-gray-800/30" : "bg-gray-50/60"
          } px-6 py-3 rounded-b-2xl`}
        >
          <div
            className={`flex items-center justify-between text-xs ${textMuted}`}
          >
            <span className="font-medium">
              {response.length} chars • Response Mode:{" "}
              {isOfflineMode ? "Offline" : "Online"}
            </span>
            <span className="font-medium">
              {new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export { AIResponseCard };
