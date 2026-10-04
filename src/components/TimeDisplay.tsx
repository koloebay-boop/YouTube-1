import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export const TimeDisplay: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>(() => formatIsraelTime());

  function formatIsraelTime(): string {
    const now = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jerusalem",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  }

  useEffect(() => {
    // Synchronize to the next second boundary
    const interval = setInterval(() => {
      setTimeStr(formatIsraelTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 select-none shadow-sm"
      title="Текущее время в Израиле (UTC+3, Asia/Jerusalem)"
    >
      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
      <span className="font-mono text-xs font-bold tracking-wider text-white tabular-nums">
        {timeStr}
      </span>
      <span className="text-[10px] font-mono text-zinc-500 font-medium">
        UTC+3
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5"></span>
    </div>
  );
};
