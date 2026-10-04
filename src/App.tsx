import React, { useState } from "react";
import { Header } from "./components/Header";
import { StudioDashboard } from "./components/StudioDashboard";
import { PowerShellTerminal } from "./components/PowerShellTerminal";
import { AutonomousFleetView } from "./components/AutonomousFleetView";
import { SecurityVaultView } from "./components/SecurityVaultView";
import { CodeExporterView } from "./components/CodeExporterView";
import { OptimizeVideoModal } from "./components/OptimizeVideoModal";
import { INITIAL_CHANNEL_STATS, INITIAL_VIDEOS } from "./data/mockChannel";
import { VideoItem, ChannelStats, AutonomousDecision } from "./types";
import { 
  Tv, 
  Terminal, 
  Bot, 
  ShieldCheck, 
  FolderDown, 
  CheckCircle2 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'terminal' | 'fleet' | 'security' | 'code'>('dashboard');
  const [stats, setStats] = useState<ChannelStats>(INITIAL_CHANNEL_STATS);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isCycling, setIsCycling] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [decisions, setDecisions] = useState<AutonomousDecision[]>([
    {
      step: 1,
      agent: "Analytics Sentinel",
      action: "Аудит 14-дневных метрик 6 видео",
      finding: "Видео #yt_vid_02 ('YouTube Studio Automation') снизило CTR до 3.8% (норма: >4.5%).",
      confidence: 0.94,
    },
    {
      step: 2,
      agent: "SEO Intelligence Agent",
      action: "Анализ поисковых трендов",
      finding: "Высокий поисковый интерес к формулировкам с вирусным вопросом (Curiosity Gap).",
      confidence: 0.96,
    },
    {
      step: 3,
      agent: "Консенсус агентов",
      action: "Согласование моделей (Gemini + Claude + GPT-4o)",
      finding: "Одобрена A/B замена заголовка и добавление структурированных таймкодов.",
      confidence: 0.92,
    },
    {
      step: 4,
      agent: "Self-Learning Engine",
      action: "Обновление матрицы весов",
      finding: "Вес формулировок 'Curiosity Gap' увеличен до 1.58x на основе прироста CTR.",
      confidence: 0.98,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTriggerAutonomousCycle = async () => {
    try {
      setIsCycling(true);
      showToast("Запущен цикл анализа и консенсуса агентов...");

      const res = await fetch("/api/agents/autonomous-cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelName: stats.channelName,
          videoCount: videos.length,
        }),
      });

      const data = await res.json();
      if (data.success && data.decisions) {
        setDecisions(data.decisions);
      }

      setStats((prev) => ({
        ...prev,
        avgCtr: Number((prev.avgCtr + 0.2).toFixed(1)),
        avgRetention: Number((prev.avgRetention + 0.3).toFixed(1)),
      }));

      showToast("✔ Цикл завершен. Консенсус записан в журнал!");
    } catch (err) {
      console.error("Cycle error:", err);
      showToast("Цикл выполнен в локальном режиме.");
    } finally {
      setIsCycling(false);
    }
  };

  const handleApplyChanges = (videoId: string, updatedFields: Partial<VideoItem>) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, ...updatedFields } : v))
    );
    showToast(`✔ Видео ${videoId} успешно обновлено!`);
  };

  const handleLaunchOptimizer = (videoId: string) => {
    const found = videos.find((v) => v.id === videoId);
    if (found) {
      setSelectedVideo(found);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 left-4 sm:left-auto z-50 bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTriggerAutonomousCycle={handleTriggerAutonomousCycle}
        isCycling={isCycling}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {activeTab === 'dashboard' && (
          <StudioDashboard
            stats={stats}
            videos={videos}
            onSelectVideoForOptimization={(v) => setSelectedVideo(v)}
            onRefreshData={() => showToast("Данные YouTube API успешно синхронизированы.")}
          />
        )}

        {activeTab === 'terminal' && (
          <PowerShellTerminal
            onLaunchOptimizer={handleLaunchOptimizer}
            onRunAutonomousLoop={handleTriggerAutonomousCycle}
          />
        )}

        {activeTab === 'fleet' && (
          <AutonomousFleetView
            onRunCycle={handleTriggerAutonomousCycle}
            isCycling={isCycling}
            decisions={decisions}
          />
        )}

        {activeTab === 'security' && (
          <SecurityVaultView />
        )}

        {activeTab === 'code' && (
          <CodeExporterView />
        )}
      </main>

      {/* Video Optimization Modal / Bottom Sheet */}
      {selectedVideo && (
        <OptimizeVideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onApplyChanges={handleApplyChanges}
        />
      )}

      {/* Mobile Bottom Navigation Bar - Convenient 1-Thumb reach for Smartphones */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span className="text-[10px] font-medium">Видео</span>
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'terminal'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span className="text-[10px] font-medium">CLI</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'fleet'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-[10px] font-medium">Агенты</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'security'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-medium">Ключи</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'code'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <FolderDown className="w-4 h-4" />
          <span className="text-[10px] font-medium">Код</span>
        </button>
      </nav>

      {/* Global Minimal Footer (Desktop only) */}
      <footer className="hidden sm:block border-t border-zinc-800 bg-zinc-950 py-3 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-zinc-500">
          <span>YouTube Studio Autonomous Fleet &bull; Windows 11 &bull; PowerShell 7.4+</span>
          <span>Google Gemini 3.8 &bull; Claude 3.5 &bull; GPT-4o</span>
        </div>
      </footer>
    </div>
  );
}
