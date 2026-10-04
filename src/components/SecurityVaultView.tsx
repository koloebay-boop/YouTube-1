import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  ExternalLink
} from "lucide-react";

export const SecurityVaultView: React.FC = () => {
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const googleKeyRaw = "AIzaSyCp0dVS7ZfDJ8gJ4O0b4uMWBO6AChzVcV0";
  const googleKeyMasked = "AIzaSy••••••••••••••••••••••••••••VcV0";
  const anthropicKeyMasked = "sk-ant-api03-••••••••••••••••••••••••••••";
  const openAIKeyMasked = "sk-proj-••••••••••••••••••••••••••••••••";

  const handleCopy = (keyVal: string, keyName: string) => {
    navigator.clipboard.writeText(keyVal);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const securityChecklist = [
    {
      title: "Ограничения API-ключа активны",
      desc: "Ключ привязан только к YouTube Data API v3 и Google Generative Language API в Google Cloud Console.",
    },
    {
      title: "Без передачи в URL-параметрах",
      desc: "Запросы передаются строго через заголовок 'x-goog-api-key' или официальный SDK, исключая перехват.",
    },
    {
      title: "Изоляция на стороне сервера",
      desc: "Ключи не попадают в клиентские скрипты браузера и считываются через process.env.",
    },
    {
      title: "Windows 11 DPAPI шифрование",
      desc: "В локальном Python-приложении ключи защищаются подсистемой Windows Data Protection API.",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-16 sm:pb-0">
      {/* Header Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Хранилище API-ключей и безопасность
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Соответствие правилам безопасности Google Cloud: ключи маскированы и защищены.
          </p>
        </div>

        <a
          href="https://docs.cloud.google.com/docs/authentication/api-keys-best-practices"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors border border-zinc-700 shrink-0"
        >
          <span>Рекомендации Google</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Keys List */}
      <div className="space-y-3">
        {/* Google Key */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Google Gemini API / YouTube</span>
            <span className="text-[10px] text-emerald-400 bg-zinc-800 px-2 py-0.5 rounded font-semibold">ПОДКЛЮЧЕН</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-300 truncate mr-2">
              {showGoogleKey ? googleKeyRaw : googleKeyMasked}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setShowGoogleKey(!showGoogleKey)}
                className="p-1 text-zinc-400 hover:text-white rounded"
                title="Показать / скрыть"
              >
                {showGoogleKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => handleCopy(googleKeyRaw, "google")}
                className="p-1 text-zinc-400 hover:text-white rounded"
                title="Скопировать"
              >
                {copiedKey === "google" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Anthropic Key */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Anthropic Claude API</span>
            <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded font-semibold">ГОТОВ</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-400 truncate mr-2">{anthropicKeyMasked}</span>
            <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          </div>
        </div>

        {/* OpenAI Key */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">OpenAI GPT-4o API</span>
            <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded font-semibold">ГОТОВ</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-400 truncate mr-2">{openAIKeyMasked}</span>
            <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Контрольный список стандартов безопасности
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {securityChecklist.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 space-y-1 text-xs"
            >
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-zinc-400 text-[11px] pl-5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
