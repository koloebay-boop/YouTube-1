import React, { useState, useRef, useEffect } from "react";
import { 
  Terminal as TerminalIcon, 
  RotateCcw, 
  Copy, 
  Check, 
  Minus, 
  Square, 
  X,
  Play,
  CornerDownLeft
} from "lucide-react";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error" | "banner" | "table" | "progress";
  text?: string;
  rawHtml?: React.ReactNode;
}

const INITIAL_WELCOME_BANNER: TerminalLine[] = [
  {
    id: "banner-1",
    type: "banner",
    rawHtml: (
      <div className="font-mono text-xs select-none space-y-1">
        <div className="text-zinc-400 font-semibold">
          YouTube Studio Autonomous Agent CLI [PowerShell 7.4.2 x64]
        </div>
        <div className="text-zinc-500 text-[11px]">
          Управление агентами и оптимизация контента для Windows 11.
        </div>
        <div className="text-zinc-400 text-[11px] pt-1">
          Нажмите быструю команду ниже или введите <span className="text-white font-semibold">python main.py status</span>
        </div>
      </div>
    ),
  },
];

export const PowerShellTerminal: React.FC<{
  onLaunchOptimizer?: (videoId: string) => void;
  onRunAutonomousLoop?: () => void;
}> = ({ onLaunchOptimizer, onRunAutonomousLoop }) => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_WELCOME_BANNER);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines, isExecuting]);

  const handleExecute = async (cmdToRun?: string) => {
    const rawCmd = (cmdToRun !== undefined ? cmdToRun : inputVal).trim();
    if (!rawCmd) return;

    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);
    setInputVal("");

    const newCommandEntry: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: "command",
      text: rawCmd,
    };

    setLines((prev) => [...prev, newCommandEntry]);
    setIsExecuting(true);

    const cmdLower = rawCmd.toLowerCase();

    if (cmdLower === "cls" || cmdLower === "clear") {
      setLines([]);
      setIsExecuting(false);
      return;
    }

    if (cmdLower === "dir" || cmdLower === "ls") {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            id: `out-${Date.now()}`,
            type: "output",
            rawHtml: (
              <div className="text-zinc-300 font-mono text-xs my-1 space-y-0.5">
                <div className="text-zinc-500">Directory: C:\Users\Aleksey\YouTubeAgents</div>
                <div className="text-zinc-400">main.py, config.py, requirements.txt</div>
                <div className="text-zinc-400">run_agent.ps1, install_windows11.bat</div>
                <div className="text-zinc-400">agents/ (seo, analytics, self_learning, orchestrator)</div>
                <div className="text-zinc-400">services/ (youtube_service, ai_provider, vault)</div>
              </div>
            ),
          },
        ]);
        setIsExecuting(false);
      }, 250);
      return;
    }

    if (rawCmd.includes("status") || rawCmd.includes("test-keys")) {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            id: `out-${Date.now()}`,
            type: "table",
            rawHtml: (
              <div className="my-2 border border-zinc-800 rounded-lg overflow-hidden font-mono text-xs bg-zinc-950">
                <div className="bg-zinc-900 px-3 py-1.5 font-bold text-zinc-200 border-b border-zinc-800">
                  Статус API провайдеров и безопасности
                </div>
                <div className="p-3 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Google Gemini API:</span>
                    <span className="text-emerald-400 font-semibold">АКТИВЕН (gemini-3.8-flash)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Anthropic Claude:</span>
                    <span className="text-zinc-300 font-semibold">ГОТОВ (claude-3-5-sonnet)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">OpenAI GPT-4o:</span>
                    <span className="text-zinc-300 font-semibold">ГОТОВ (gpt-4o)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">YouTube Data API:</span>
                    <span className="text-emerald-400 font-semibold">ПОДКЛЮЧЕН (OAuth 2.0)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Хранилище ключей:</span>
                    <span className="text-zinc-300 font-semibold">Маскировано &amp; Защищено</span>
                  </div>
                </div>
              </div>
            ),
          },
        ]);
        setIsExecuting(false);
      }, 350);
      return;
    }

    if (rawCmd.includes("run")) {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            id: `p1-${Date.now()}`,
            type: "progress",
            text: "[1/3] Analytics Agent: Сканирование 6 видео. Просадка CTR на #yt_vid_02 (3.8%).",
          },
          {
            id: `p2-${Date.now()}`,
            type: "progress",
            text: "[2/3] SEO Specialist: Формирование консенсуса (Gemini + Claude + GPT-4o)...",
          },
          {
            id: `p3-${Date.now()}`,
            type: "progress",
            text: "[3/3] Self-Learning Engine: Обновление весов формулы (+0.42 к награде).",
          },
          {
            id: `p4-${Date.now()}`,
            type: "output",
            text: "✔ Цикл успешно выполнен. Рекомендации отправлены в раздел управления.",
          },
        ]);
        setIsExecuting(false);
        if (onRunAutonomousLoop) onRunAutonomousLoop();
      }, 1000);
      return;
    }

    if (rawCmd.includes("optimize")) {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            id: `opt-1-${Date.now()}`,
            type: "output",
            rawHtml: (
              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-xs font-mono my-2 space-y-1.5">
                <div className="text-emerald-400 font-bold">✔ Предложение по оптимизации видео yt_vid_02:</div>
                <div>Заголовок: <span className="text-white font-semibold">"Как я управляю YouTube-студией с помощью ИИ"</span></div>
                <div>Прогноз CTR: <span className="text-emerald-400 font-semibold">+35% прироста</span></div>
                <div>Теги: youtube studio, ai agents, python windows 11, gemini 3.8</div>
              </div>
            ),
          },
        ]);
        setIsExecuting(false);
        if (onLaunchOptimizer) onLaunchOptimizer("yt_vid_02");
      }, 500);
      return;
    }

    if (rawCmd.includes("learn")) {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            id: `learn-${Date.now()}`,
            type: "output",
            rawHtml: (
              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-xs font-mono my-2 space-y-1">
                <div className="font-bold text-zinc-200">Веса самообучения (Эпоха 42 | Награда: +128.40)</div>
                <div className="text-zinc-400">curiosity_gap: <span className="text-white font-bold">1.58x</span> (+2.8% CTR)</div>
                <div className="text-zinc-400">question_titles: <span className="text-white font-bold">1.34x</span> (поисковый трафик)</div>
                <div className="text-zinc-400">year_bracket [2026]: <span className="text-white font-bold">1.15x</span> (актуальность)</div>
                <div className="text-zinc-400">emoji_prefix: <span className="text-white font-bold">0.88x</span> (защита от спама)</div>
              </div>
            ),
          },
        ]);
        setIsExecuting(false);
      }, 350);
      return;
    }

    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: `Команда '${rawCmd}' принята. Доступные команды: status, run, optimize, learn, dir, cls.`,
        },
      ]);
      setIsExecuting(false);
    }, 200);
  };

  const copyOutput = () => {
    const text = lines
      .map((l) => (l.type === "command" ? `PS> ${l.text}` : l.text || ""))
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 pb-16 sm:pb-0">
      {/* Quick Action Command Chips - Easy one-tap on smartphones */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 sm:p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-zinc-300">
            Быстрые команды для PowerShell:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={copyOutput}
              className="p-1 text-zinc-400 hover:text-white rounded"
              title="Скопировать вывод"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setLines([])}
              className="p-1 text-zinc-400 hover:text-white rounded"
              title="Очистить терминал"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable button pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleExecute("python main.py run")}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white rounded-lg text-xs font-mono whitespace-nowrap transition-colors border border-zinc-700"
          >
            ▶ python main.py run
          </button>
          <button
            onClick={() => handleExecute("python main.py status")}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white rounded-lg text-xs font-mono whitespace-nowrap transition-colors border border-zinc-700"
          >
            python main.py status
          </button>
          <button
            onClick={() => handleExecute("python main.py optimize")}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white rounded-lg text-xs font-mono whitespace-nowrap transition-colors border border-zinc-700"
          >
            python main.py optimize
          </button>
          <button
            onClick={() => handleExecute("python main.py learn")}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white rounded-lg text-xs font-mono whitespace-nowrap transition-colors border border-zinc-700"
          >
            python main.py learn
          </button>
          <button
            onClick={() => handleExecute("dir")}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 rounded-lg text-xs font-mono whitespace-nowrap transition-colors border border-zinc-700"
          >
            dir
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
        {/* Title Bar */}
        <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800 select-none">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-200 font-semibold">
              PowerShell 7.4 (Win 11)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block"></span>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="p-3 sm:p-4 font-mono text-xs leading-relaxed min-h-[360px] max-h-[480px] overflow-y-auto space-y-2 cursor-text"
        >
          {lines.map((line) => {
            if (line.type === "command") {
              return (
                <div key={line.id} className="flex items-start gap-1.5 text-zinc-200">
                  <span className="text-zinc-500 select-none">PS&gt;</span>
                  <span className="font-semibold text-white">{line.text}</span>
                </div>
              );
            }

            if (line.type === "progress") {
              return (
                <div key={line.id} className="text-zinc-300 flex items-center gap-1.5">
                  <span className="text-red-500">●</span>
                  <span>{line.text}</span>
                </div>
              );
            }

            if (line.rawHtml) {
              return <div key={line.id}>{line.rawHtml}</div>;
            }

            return (
              <div key={line.id} className="text-zinc-400 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}

          {isExecuting && (
            <div className="flex items-center gap-2 text-zinc-400 font-mono py-1">
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Выполнение команды...</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar at bottom */}
        <div className="p-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2">
          <span className="text-zinc-500 font-mono text-xs select-none">PS&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleExecute();
              }
            }}
            disabled={isExecuting}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 p-0"
            placeholder={isExecuting ? "Ожидание..." : "Введите команду..."}
          />
          <button
            onClick={() => handleExecute()}
            disabled={!inputVal.trim() || isExecuting}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white rounded transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
