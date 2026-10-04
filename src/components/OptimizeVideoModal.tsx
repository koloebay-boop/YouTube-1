import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  Check, 
  TrendingUp, 
  Tag, 
  Send, 
  Lightbulb, 
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { VideoItem, OptimizationResult } from "../types";

interface OptimizeVideoModalProps {
  video: VideoItem;
  onClose: () => void;
  onApplyChanges: (videoId: string, updatedFields: Partial<VideoItem>) => void;
}

export const OptimizeVideoModal: React.FC<OptimizeVideoModalProps> = ({
  video,
  onClose,
  onApplyChanges,
}) => {
  const [goal, setGoal] = useState("maximize_ctr_and_retention");
  const [engine, setEngine] = useState("google");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [selectedTitleIdx, setSelectedTitleIdx] = useState(0);
  const [editedDescription, setEditedDescription] = useState(video.description);
  const [editedTags, setEditedTags] = useState<string[]>(video.tags);
  const [newTagInput, setNewTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleRunOptimization = async () => {
    try {
      setIsOptimizing(true);
      const res = await fetch("/api/agents/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: video.title,
          description: video.description,
          tags: video.tags,
          category: video.category,
          autonomousGoal: goal,
          modelEngine: engine,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
        if (json.data.recommendedDescription) {
          setEditedDescription(json.data.recommendedDescription);
        }
        if (json.data.recommendedTags && json.data.recommendedTags.length > 0) {
          setEditedTags(json.data.recommendedTags);
        }
      }
    } catch (err) {
      console.error("Optimization failed:", err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyToYouTube = () => {
    const chosenTitle =
      result?.optimizedTitles?.[selectedTitleIdx]?.title || video.title;

    onApplyChanges(video.id, {
      title: chosenTitle,
      description: editedDescription,
      tags: editedTags,
      status: "optimized",
      seoScore: result?.seoScore || 95,
      ctr: Number((video.ctr * 1.25).toFixed(1)),
    });

    setIsPublished(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTagInput.trim()) {
      e.preventDefault();
      if (!editedTags.includes(newTagInput.trim())) {
        setEditedTags([...editedTags, newTagInput.trim()]);
      }
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border-t sm:border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 sm:fade-in duration-200">
        {/* Header */}
        <div className="bg-zinc-950 px-4 sm:px-6 py-3.5 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="min-w-0 pr-3">
            <h3 className="text-sm font-bold text-white truncate">
              Оптимизация видео: {video.title}
            </h3>
            <p className="text-[11px] text-zinc-400">
              Генерация A/B заголовков, описания, тегов и превью
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          {/* Strategy Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-950 p-3 sm:p-4 rounded-xl border border-zinc-800">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Цель оптимизации
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              >
                <option value="maximize_ctr_and_retention">
                  Максимизация CTR и удержания
                </option>
                <option value="seo_search_ranking">
                  Поисковый авторитет (SEO)
                </option>
                <option value="curiosity_gap_viral">
                  Вирусный крючок (Curiosity Gap)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                ИИ-провайдер
              </label>
              <select
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              >
                <option value="google">
                  Google Gemini 3.8 Flash (Быстрый серверный)
                </option>
                <option value="claude">
                  Anthropic Claude 3.5 Sonnet
                </option>
                <option value="openai">
                  OpenAI GPT-4o
                </option>
              </select>
            </div>
          </div>

          {/* Trigger button if not yet run */}
          {!result && (
            <div className="text-center py-6 space-y-3">
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Нажмите для запуска ИИ-агента. Будут сгенерированы 3 варианта заголовка, полное описание и ключевые теги.
              </p>
              <button
                onClick={handleRunOptimization}
                disabled={isOptimizing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Анализ и расчет метрик...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Запустить анализ и генерацию</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Result view */}
          {result && (
            <div className="space-y-4">
              {/* Predicted metric lifts */}
              <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-center">
                <div>
                  <span className="text-[10px] text-zinc-400 block">Прирост CTR</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                    {result.predictedMetrics.ctrIncreaseEstimate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Показ в поиске</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-200 font-mono">
                    {result.predictedMetrics.searchImpressionBoost}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Удержание</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-200 font-mono">
                    {result.predictedMetrics.avgRetentionImpact}
                  </span>
                </div>
              </div>

              {/* Real-Time Israel UTC+3 Timing Context */}
              {result.temporalContext && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-semibold text-white">
                      Локация: {result.temporalContext.location} ({result.temporalContext.currentTime})
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 sm:text-right">
                    <span className="text-emerald-400 font-medium">Окно публикации: {result.temporalContext.optimalUploadSchedule}</span>
                    <span className="hidden sm:inline text-zinc-500"> — {result.temporalContext.timingAdvice}</span>
                  </div>
                </div>
              )}

              {/* Title options */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Выберите вариант заголовка:
                </label>
                <div className="space-y-2">
                  {result.optimizedTitles.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTitleIdx(idx)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedTitleIdx === idx
                          ? "bg-zinc-800 border-red-500 text-white"
                          : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-medium">
                          {t.title}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                          {t.score} балл.
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        {t.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Оптимизированное описание (с таймкодами и хэштегами):
                </label>
                <textarea
                  rows={5}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-600"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Теги ({editedTags.length}):
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-950 border border-zinc-800 rounded-lg">
                  {editedTags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded font-mono"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-zinc-400 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="+ тег"
                    className="bg-transparent border-none outline-none text-xs text-zinc-300 placeholder-zinc-600 px-1 py-0.5 font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Mobile/Desktop Footer */}
        <div className="bg-zinc-950 px-4 sm:px-6 py-3 border-t border-zinc-800 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 transition-colors"
          >
            Закрыть
          </button>

          {result && (
            <button
              onClick={handleApplyToYouTube}
              disabled={isPublished}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
            >
              {isPublished ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Опубликовано!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Применить в YouTube Studio</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
