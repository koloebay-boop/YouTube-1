import React, { useState } from "react";
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  BrainCircuit, 
  SlidersHorizontal 
} from "lucide-react";
import { AutonomousDecision } from "../types";

interface AutonomousFleetViewProps {
  onRunCycle: () => void;
  isCycling: boolean;
  decisions: AutonomousDecision[];
}

export const AutonomousFleetView: React.FC<AutonomousFleetViewProps> = ({
  onRunCycle,
  isCycling,
  decisions,
}) => {
  const [autoApprove, setAutoApprove] = useState(false);
  const [cycleInterval, setCycleInterval] = useState("6 hours");

  return (
    <div className="space-y-4 sm:space-y-6 pb-16 sm:pb-0">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-zinc-300" />
            Автономные агенты и цикл самообучения
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Консенсус 3 моделей: Google Gemini, Anthropic Claude и OpenAI GPT-4o
          </p>
        </div>

        <button
          onClick={onRunCycle}
          disabled={isCycling}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
            isCycling
              ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700"
              : "bg-red-600 hover:bg-red-500 text-white active:scale-95"
          }`}
        >
          {isCycling ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Идет анализ канала...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Запустить автономный цикл</span>
            </>
          )}
        </button>
      </div>

      {/* Agents Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">SEO &amp; Метаданные</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-zinc-800 px-2 py-0.5 rounded">АКТИВЕН</span>
          </div>
          <p className="text-xs text-zinc-400">
            Оптимизация заголовков, ключевых слов, глав и тегов под поисковый алгоритм.
          </p>
          <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex justify-between">
            <span>Модель:</span>
            <span className="font-mono text-zinc-200">Gemini 3.8 Flash</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Analytics Sentinel</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-zinc-800 px-2 py-0.5 rounded">АКТИВЕН</span>
          </div>
          <p className="text-xs text-zinc-400">
            Мониторинг YouTube Analytics API, выявление спада просмотров и CTR.
          </p>
          <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex justify-between">
            <span>Порог триггера:</span>
            <span className="font-mono text-zinc-200">CTR &lt; 4.5%</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Консенсус агентов</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-zinc-800 px-2 py-0.5 rounded">АКТИВЕН</span>
          </div>
          <p className="text-xs text-zinc-400">
            Сравнение предложений Claude, Gemini и GPT-4o для исключения галлюцинаций.
          </p>
          <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex justify-between">
            <span>Порог согласия:</span>
            <span className="font-mono text-zinc-200">&gt; 85%</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Самообучение</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-zinc-800 px-2 py-0.5 rounded">ЭПОХА 42</span>
          </div>
          <p className="text-xs text-zinc-400">
            Обновление весов формулы на основе фактической дельты просмотров.
          </p>
          <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex justify-between">
            <span>Награда Q-table:</span>
            <span className="font-mono text-emerald-400 font-semibold">+128.40</span>
          </div>
        </div>
      </div>

      {/* Settings & Mode */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Настройки режима работы
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1">Режим подтверждения правок</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAutoApprove(false)}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  !autoApprove
                    ? "bg-zinc-800 border-zinc-600 text-white"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400"
                }`}
              >
                <div className="font-semibold text-xs">С подтверждением</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Ручной контроль правок</div>
              </button>
              <button
                onClick={() => setAutoApprove(true)}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  autoApprove
                    ? "bg-zinc-800 border-zinc-600 text-white"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400"
                }`}
              >
                <div className="font-semibold text-xs">Автопилот</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Публикация без запроса</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">Периодичность автономного сканирования</label>
            <select
              value={cycleInterval}
              onChange={(e) => setCycleInterval(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-zinc-600"
            >
              <option value="1 hour">Каждый 1 час (Высокая активность)</option>
              <option value="6 hours">Каждые 6 часов (Рекомендуется)</option>
              <option value="24 hours">1 раз в сутки</option>
            </select>
          </div>
        </div>
      </div>

      {/* Decision Log */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Журнал последних действий агентов
        </h3>

        <div className="space-y-2.5">
          {decisions.map((d, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-white">{d.agent}</span>
                <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-zinc-900 px-1.5 py-0.5 rounded">
                  {(d.confidence * 100).toFixed(0)}% увер.
                </span>
              </div>
              <p className="text-zinc-400 text-[11px]">{d.finding}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
