import React, { useState } from "react";
import { 
  FolderDown, 
  FileCode, 
  Copy, 
  Check, 
  Download
} from "lucide-react";
import JSZip from "jszip";
import { PYTHON_CODEBASE, PythonFile } from "../data/pythonCodebase";

export const CodeExporterView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PythonFile>(PYTHON_CODEBASE[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipDownloaded, setZipDownloaded] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      PYTHON_CODEBASE.forEach((file) => {
        zip.file(file.path, file.content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);

      const a = document.createElement("a");
      a.href = url;
      a.download = "YouTube_Studio_Agents_Windows11.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsZipping(false);
      setZipDownloaded(true);
      setTimeout(() => setZipDownloaded(false), 3000);
    } catch (err) {
      console.error("Zip generation error:", err);
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-16 sm:pb-0">
      {/* Top Banner Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FolderDown className="w-4 h-4 text-zinc-300" />
            Исходный Python-код для Windows 11
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Архив с 12 файлами проекта: CLI PowerShell, модули YouTube API и агентские коннекторы
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shrink-0 active:scale-95"
        >
          {isZipping ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Сборка архива...</span>
            </>
          ) : zipDownloaded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Скачано!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Скачать весь проект (.ZIP)</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Setup Instructions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
          <span className="text-zinc-500 block text-[10px] font-mono">ШАГ 1</span>
          <span className="font-semibold text-white">Распаковать ZIP</span>
          <p className="text-zinc-400 text-[11px] mt-0.5">в папку C:\Users\Aleksey\YouTubeAgents</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
          <span className="text-zinc-500 block text-[10px] font-mono">ШАГ 2</span>
          <span className="font-semibold text-white">Запустить install_windows11.bat</span>
          <p className="text-zinc-400 text-[11px] mt-0.5">автоустановка .venv и библиотек pip</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
          <span className="text-zinc-500 block text-[10px] font-mono">ШАГ 3</span>
          <span className="font-semibold text-white">Запустить в PowerShell</span>
          <p className="text-zinc-400 text-[11px] mt-0.5">командой .\run_agent.ps1</p>
        </div>
      </div>

      {/* Mobile File Selector Dropdown */}
      <div className="block lg:hidden">
        <label className="block text-xs font-semibold text-zinc-300 mb-1">
          Выберите файл для просмотра:
        </label>
        <select
          value={selectedFile.path}
          onChange={(e) => {
            const found = PYTHON_CODEBASE.find((f) => f.path === e.target.value);
            if (found) setSelectedFile(found);
          }}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-zinc-600 font-mono"
        >
          {PYTHON_CODEBASE.map((f) => (
            <option key={f.path} value={f.path}>
              {f.name} ({f.category})
            </option>
          ))}
        </select>
      </div>

      {/* File Browser for Desktop / Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 space-y-1">
          <div className="px-2 py-1 text-[11px] font-bold text-zinc-400 uppercase">
            Файлы проекта
          </div>
          {PYTHON_CODEBASE.map((file) => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                selectedFile.path === file.path
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="truncate font-mono">{file.name}</span>
              <span className="text-[10px] text-zinc-500 uppercase">{file.category}</span>
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-zinc-950 px-3.5 py-2.5 border-b border-zinc-800 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-zinc-200 truncate">
              {selectedFile.path}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 sm:p-4 bg-black font-mono text-xs text-zinc-300 overflow-x-auto max-h-[460px] overflow-y-auto leading-relaxed">
            <pre>
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
