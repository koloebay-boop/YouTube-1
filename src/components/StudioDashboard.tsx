import React, { useState } from "react";
import { 
  VideoItem, 
  ChannelStats 
} from "../types";
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle, 
  Search, 
  Tag, 
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";

interface StudioDashboardProps {
  stats: ChannelStats;
  videos: VideoItem[];
  onSelectVideoForOptimization: (video: VideoItem) => void;
  onRefreshData: () => void;
}

export const StudioDashboard: React.FC<StudioDashboardProps> = ({
  stats,
  videos,
  onSelectVideoForOptimization,
  onRefreshData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const flaggedCount = videos.filter((v) => v.status === "flagged").length;

  return (
    <div className="space-y-4 sm:space-y-6 pb-16 sm:pb-0">
      {/* Channel Header Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-base shrink-0">
              AK
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-white truncate">
                  {stats.channelName}
                </h2>
                <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {stats.channelHandle}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Автономный мониторинг Studio: анализ CTR, удержания и A/B метаданных
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
            <button
              onClick={onRefreshData}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Обновить</span>
            </button>
            <a
              href="https://studio.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
            >
              <span>YouTube Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid - Mobile Friendly */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {/* Subscribers */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">Подписчики</span>
          <div className="mt-1">
            <div className="text-base sm:text-lg font-bold text-white font-mono">
              {stats.subscriberCount.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">
              {stats.weeklyGrowth} за 7 дн.
            </span>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">Просмотры</span>
          <div className="mt-1">
            <div className="text-base sm:text-lg font-bold text-white font-mono">
              {(stats.totalViews / 1000000).toFixed(2)}M
            </div>
            <span className="text-[10px] text-zinc-400">Общий охват</span>
          </div>
        </div>

        {/* Average CTR */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">Средний CTR</span>
          <div className="mt-1">
            <div className="text-base sm:text-lg font-bold text-white font-mono">
              {stats.avgCtr}%
            </div>
            <span className="text-[10px] text-zinc-400">Норма &gt; 5.0%</span>
          </div>
        </div>

        {/* Average Retention */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">Удержание</span>
          <div className="mt-1">
            <div className="text-base sm:text-lg font-bold text-white font-mono">
              {stats.avgRetention}%
            </div>
            <span className="text-[10px] text-emerald-400">+3.2% к норме</span>
          </div>
        </div>

        {/* Videos count */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">Всего видео</span>
          <div className="mt-1">
            <div className="text-base sm:text-lg font-bold text-white font-mono">
              {stats.totalVideos}
            </div>
            <span className="text-[10px] text-zinc-400">На канале</span>
          </div>
        </div>

        {/* Flagged / Alerts */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">Требуют правок</span>
          <div className="mt-1">
            <div className={`text-base sm:text-lg font-bold font-mono ${flaggedCount > 0 ? 'text-red-400' : 'text-zinc-200'}`}>
              {flaggedCount} видео
            </div>
            <span className="text-[10px] text-red-400">
              {flaggedCount > 0 ? "Просадка CTR" : "Все в норме"}
            </span>
          </div>
        </div>
      </div>

      {/* Flagged Alert Banner if CTR dropped */}
      {flaggedCount > 0 && (
        <div className="bg-zinc-900 border-l-4 border-l-red-500 border-y border-r border-zinc-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white">
                Обнаружена просадка CTR на 1 видео (3.8% при пороге 4.5%)
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Агент рекомендует обновить заголовок и описание для восстановления охватов.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const flagged = videos.find((v) => v.status === "flagged");
              if (flagged) onSelectVideoForOptimization(flagged);
            }}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shrink-0 text-center transition-colors"
          >
            Оптимизировать с ИИ
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск по названию или тегам..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Filter Chips - Horizontal scroll for phone */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === "all"
                ? "bg-zinc-800 text-white border border-zinc-700"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
            }`}
          >
            Все ({videos.length})
          </button>
          <button
            onClick={() => setStatusFilter("flagged")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === "flagged"
                ? "bg-red-950/50 text-red-300 border border-red-800/80"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
            }`}
          >
            Требуют внимания ({flaggedCount})
          </button>
          <button
            onClick={() => setStatusFilter("optimized")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === "optimized"
                ? "bg-emerald-950/50 text-emerald-300 border border-emerald-800/80"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
            }`}
          >
            Оптимизированы
          </button>
        </div>
      </div>

      {/* Mobile Card List (Active on small screens, clean & thumb-friendly) */}
      <div className="space-y-3 sm:hidden">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-3"
          >
            <div className="flex gap-3">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono px-1 rounded text-white">
                  {video.duration}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  {video.status === "flagged" ? (
                    <span className="text-[10px] font-semibold text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/60">
                      Внимание: CTR {video.ctr}%
                    </span>
                  ) : video.status === "optimized" ? (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/60">
                      Оптимизировано
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                      Мониторинг
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-500 font-mono">
                    SEO {video.seoScore}/100
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {video.title}
                </h4>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 py-2 border-t border-zinc-800 text-[11px]">
              <div>
                <span className="text-zinc-500 block text-[10px]">Просмотры</span>
                <span className="font-mono text-zinc-200 font-semibold">{video.views.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">CTR</span>
                <span className={`font-mono font-semibold ${video.ctr < 4.5 ? 'text-red-400' : 'text-zinc-200'}`}>
                  {video.ctr}%
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Удержание</span>
                <span className="font-mono text-zinc-200 font-semibold">{video.avgRetentionPct}%</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onSelectVideoForOptimization(video)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white text-xs font-semibold transition-colors border border-zinc-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Оптимизировать метаданные с ИИ</span>
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Kept clean on sm+ screens) */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider border-b border-zinc-800 text-[11px]">
            <tr>
              <th className="py-3 px-4">Видео</th>
              <th className="py-3 px-3">Категория</th>
              <th className="py-3 px-3">Просмотры</th>
              <th className="py-3 px-3">CTR</th>
              <th className="py-3 px-3">Удержание</th>
              <th className="py-3 px-3">SEO балл</th>
              <th className="py-3 px-3">Статус</th>
              <th className="py-3 px-4 text-right">Действие</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
            {filteredVideos.map((video) => (
              <tr key={video.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-12 rounded overflow-hidden shrink-0 bg-zinc-800">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[9px] font-mono px-1 rounded text-white">
                        {video.duration}
                      </span>
                    </div>
                    <div className="max-w-md">
                      <h4 className="font-semibold text-white line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-zinc-400 font-mono text-[11px]">
                  {video.category}
                </td>
                <td className="py-3 px-3 font-mono font-medium text-white">
                  {video.views.toLocaleString()}
                </td>
                <td className="py-3 px-3 font-mono font-medium">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[11px] ${
                      video.ctr < 4.5
                        ? "text-red-400 font-bold"
                        : "text-zinc-300"
                    }`}
                  >
                    {video.ctr}%
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-zinc-300">
                  {video.avgRetentionPct}%
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-zinc-200">
                  {video.seoScore}/100
                </td>
                <td className="py-3 px-3">
                  {video.status === "flagged" ? (
                    <span className="text-[10px] font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                      Внимание
                    </span>
                  ) : video.status === "optimized" ? (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                      Оптимизировано
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                      Мониторинг
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onSelectVideoForOptimization(video)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-red-600 text-white transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Оптимизировать</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
