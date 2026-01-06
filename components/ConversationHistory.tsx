import React from "react";
import { Button } from "@/components/ui/button";

interface ConversationItem {
  question: string;
  response: string;
  timestamp: number;
  category?: string;
}

interface ConversationHistoryProps {
  history: ConversationItem[];
  isVisible: boolean;
  onToggle: () => void;
  onClear: () => void;
  onSelectQuestion: (question: string) => void;
}

export const ConversationHistory = ({
  history,
  isVisible,
  onToggle,
  onClear,
  onSelectQuestion,
}: ConversationHistoryProps) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return "hari ini";
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
      return "kemarin";
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg border-indigo-200 hover:bg-indigo-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>riwayat ({history.length})</span>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-80 max-h-96 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      {/* header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">
          riwayat percakapan
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500">
            {history.length} percakapan
          </span>
          {history.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              hapus
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="h-6 px-2 text-xs"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
            </svg>
          </Button>
        </div>
      </div>

      {/* content */}
      <div className="max-h-80 overflow-y-auto p-2">
        {history.length === 0 ? (
          <div className="text-center text-sm text-slate-500 py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-2 text-slate-300"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>belum ada percakapan</p>
            <p className="text-xs mt-1">mulai bertanya pada ai!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...history].reverse().map((item, index) => (
              <div
                key={history.length - 1 - index}
                className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                {/* question */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-indigo-600">
                      pertanyaan #{history.length - index}
                    </span>
                    <button
                      onClick={() => onSelectQuestion(item.question)}
                      className="text-xs text-slate-500 hover:text-indigo-600 hover:underline"
                      title="gunakan pertanyaan ini lagi"
                    >
                      tanyakan lagi
                    </button>
                  </div>
                  <p className="text-sm text-slate-700" title={item.question}>
                    {item.question}
                  </p>
                </div>

                {/* response preview */}
                <div className="mb-2">
                  <span className="text-xs font-medium text-green-600 mb-1 block">
                    jawaban:
                  </span>
                  <p
                    className="text-xs text-slate-600 line-clamp-2"
                    title={item.response}
                  >
                    {item.response.length > 100
                      ? `${item.response.substring(0, 100)}...`
                      : item.response}
                  </p>
                </div>

                {/* metadata */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {formatDate(item.timestamp)} - {formatTime(item.timestamp)}
                  </span>
                  {item.category && (
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* footer info */}
      {history.length > 0 && (
        <div className="p-2 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <p className="text-xs text-slate-500 text-center">
            klik "tanyakan lagi" untuk mengulang pertanyaan lama
          </p>
        </div>
      )}
    </div>
  );
};
