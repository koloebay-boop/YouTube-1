import React from "react";
import { 
  Tv, 
  Terminal, 
  Bot, 
  ShieldCheck, 
  FolderDown, 
  Play, 
  RefreshCw
} from "lucide-react";
import { TimeDisplay } from "./TimeDisplay";

interface HeaderProps {
  activeTab: 'dashboard' | 'terminal' | 'fleet' | 'security' | 'code';
  setActiveTab: (tab: 'dashboard' | 'terminal' | 'fleet' | 'security' | 'code') => void;
  onTriggerAutonomousCycle: () => void;
  isCycling: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onTriggerAutonomousCycle,
  isCycling,
}) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
      {/* Compact Top App Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shrink-0">
            <Tv className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight truncate">
                YouTube Studio <span className="text-red-500">Agent</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Win 11 / PS 7.4
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-zinc-400">
              Автономное управление контентом и A/B оптимизация
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Контент &amp; Видео</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'terminal'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>PowerShell CLI</span>
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'fleet'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Агенты &amp; Обучение</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'security'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Безопасность &amp; Ключи</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'code'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            <span>Python Код</span>
          </button>
        </nav>

        {/* Right Corner: Action Button & TimeDisplay in Upper Right */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onTriggerAutonomousCycle}
            disabled={isCycling}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold transition-all ${
              isCycling
                ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700'
                : 'bg-red-600 hover:bg-red-500 text-white active:scale-95'
            }`}
          >
            {isCycling ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Агенты работают...</span>
                <span className="sm:hidden">Работа...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Запустить цикл</span>
                <span className="sm:hidden">Авто-цикл</span>
              </>
            )}
          </button>

          {/* Dedicated TimeDisplay in Top Right Corner */}
          <TimeDisplay />
        </div>
      </div>
    </header>
  );
};
