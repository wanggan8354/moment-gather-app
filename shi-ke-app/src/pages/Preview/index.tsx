import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MoreHorizontal,
  Play,
  Share2,
  Download,
  Edit3,
  ChevronRight,
  Calendar,
  Disc,
  Mail,
  Trash2,
} from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { useAppStore } from "@/store/useAppStore";

export default function Preview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { works, currentWork } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(52);

  const work =
    currentWork?.id === id
      ? currentWork
      : works.find((w) => w.id === id) || works[0];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const formatTime = (percent: number, totalSeconds: number) => {
    const current = Math.floor((percent / 100) * totalSeconds);
    const mins = Math.floor(current / 60);
    const secs = current % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const totalDurationSec = work
    ? parseInt(work.duration.split(":")[0]) * 60 +
      parseInt(work.duration.split(":")[1])
    : 154;

  const socialPlatforms = [
    { name: "微信", color: "#07C160", icon: WeChatIcon },
    { name: "朋友圈", color: "#07C160", icon: MomentsIcon },
    {
      name: "抖音",
      color: "linear-gradient(135deg, #1a1a2e, #16213e)",
      icon: DouyinIcon,
    },
    { name: "微博", color: "#E6162D", icon: WeiboIcon },
  ];

  return (
    <MobileShell>
      <div
        className="relative"
        style={{ background: "var(--color-bg)", minHeight: "100vh" }}
      >
        <nav
          className="flex items-center justify-between px-4 py-3 sticky top-0 z-30"
          style={{ background: "var(--color-bg)" }}
        >
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 transition-colors active:opacity-70"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">返回</span>
          </button>
          <h1
            className="text-sm font-semibold tracking-wide"
            style={{ color: "var(--color-text-primary)" }}
          >
            短片预览
          </h1>
          <button
            className="transition-colors active:opacity-70"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <MoreHorizontal size={20} />
          </button>
        </nav>

        <section
          className="relative overflow-hidden"
          style={{ background: "#1a1008" }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none"
            style={{
              width: 28,
              background: `
                repeating-linear-gradient(to bottom, var(--color-film-gold) 0px, var(--color-film-gold) 2px, transparent 2px, transparent 6px),
                linear-gradient(to right, rgba(45,31,20,0.65), rgba(45,31,20,0.45))
              `,
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none"
            style={{
              width: 28,
              background: `
                repeating-linear-gradient(to bottom, var(--color-film-gold) 0px, var(--color-film-gold) 2px, transparent 2px, transparent 6px),
                linear-gradient(to left, rgba(45,31,20,0.65), rgba(45,31,20,0.45))
              `,
            }}
          />

          <div className="relative mx-7" style={{ aspectRatio: "16/9" }}>
            <img
              src={work?.coverImage || "/assets/preview-video.jpg"}
              alt={work?.title || "预览"}
              className="w-full h-full object-cover"
              style={{
                filter: isPlaying
                  ? "bright(1) contrast(1)"
                  : "brightness(0.85) contrast(1.05) saturate(1.1)",
              }}
            />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              {!isPlaying && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-20 h-20 rounded-full"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Play
                      size={28}
                      style={{
                        color: "var(--color-primary-dark)",
                        marginLeft: 4,
                      }}
                      fill="var(--color-primary-dark)"
                    />
                  </div>
                </>
              )}
            </button>

            <div
              className="absolute top-3 right-3 z-10 px-2 py-1 rounded-md text-xs font-medium text-white"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
              }}
            >
              {work?.duration || "2:34"}
            </div>
          </div>

          <div
            className="px-8 py-3"
            style={{
              background:
                "linear-gradient(to top, rgba(26,16,8,0.9), rgba(26,16,8,0.4))",
            }}
          >
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${progress}%, rgba(255,255,255,0.25) ${progress}%, rgba(255,255,255,0.25) 100%)`,
                WebkitAppearance: "none",
              }}
            />
            <div className="flex justify-between mt-1.5">
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {formatTime(progress, totalDurationSec)}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {work?.duration || "2:34"}
              </span>
            </div>
          </div>
        </section>

        <section className="px-5 pt-5 pb-4">
          <h2
            className="text-2xl font-bold leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            {work?.title || "三亚之旅"} · 2024
          </h2>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            AI 从 {work?.photoCount || 847} 张照片中精选{" "}
            {work?.selectedMoments || 42} 个瞬间
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <Calendar
              size={14}
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {work?.dateRange || "2024年3月15日 — 3月22日"}
            </span>
          </div>
        </section>

        <section className="px-5 pb-5">
          <div className="flex gap-3">
            {[
              { icon: Share2, label: "分享" },
              { icon: Download, label: "下载" },
              { icon: Edit3, label: "编辑" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex-1 flex flex-col items-center gap-2 py-3.5 rounded-xl border active:scale-95 transition-transform"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <Icon
                  size={22}
                  style={{ color: "var(--color-primary)" }}
                  strokeWidth={1.8}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div
          className="mx-5 h-px"
          style={{ background: "var(--color-border-light)" }}
        />

        <section className="px-5 py-5">
          <h3
            className="text-sm font-semibold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            分享到
          </h3>
          <div className="flex items-center justify-between">
            {socialPlatforms.map(({ name, color, icon: IconComponent }) => (
              <button
                key={name}
                className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: color }}
                >
                  <IconComponent />
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {name}
                </span>
              </button>
            ))}
            <button className="flex flex-col items-center gap-2 active:scale-90 transition-transform">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--color-bg-tertiary)" }}
              >
                <MoreHorizontal
                  size={22}
                  style={{ color: "var(--color-text-tertiary)" }}
                />
              </div>
              <span
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                更多
              </span>
            </button>
          </div>
        </section>

        <div
          className="mx-5 h-px"
          style={{ background: "var(--color-border-light)" }}
        />

        <section className="px-5 py-4 pb-8">
          <h3
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            更多操作
          </h3>
          <div
            className="rounded-xl overflow-hidden border"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            {[
              {
                icon: Download,
                label: "保存到相册",
                iconBg: "var(--color-primary-bg)",
                iconColor: "var(--color-primary)",
              },
              {
                icon: Disc,
                label: "制作 DVD",
                iconBg: "var(--color-primary-bg)",
                iconColor: "var(--color-primary)",
              },
              {
                icon: Mail,
                label: "制作明信片",
                iconBg: "var(--color-primary-bg)",
                iconColor: "var(--color-primary)",
              },
              {
                icon: Trash2,
                label: "删除",
                iconBg: "#FEF2F2",
                iconColor: "var(--state-error)",
              },
            ].map(({ icon: Icon, label, iconBg, iconColor }, idx) => (
              <button
                key={label}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-[var(--color-bg-secondary)] transition-colors"
                style={{
                  borderBottom:
                    idx < 3 ? "1px solid var(--color-border-light)" : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: iconBg }}
                >
                  <Icon
                    size={18}
                    style={{ color: iconColor }}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className="text-sm font-medium flex-1"
                  style={{
                    color:
                      idx === 3
                        ? "var(--state-error)"
                        : "var(--color-text-primary)",
                  }}
                >
                  {label}
                </span>
                <ChevronRight
                  size={16}
                  style={{
                    color: "var(--color-text-tertiary)",
                    opacity: idx === 3 ? 0.5 : 1,
                  }}
                />
              </button>
            ))}
          </div>
        </section>

        <div className="h-8" style={{ background: "var(--color-bg)" }} />
      </div>
    </MobileShell>
  );
}

function WeChatIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="white">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 0 1-.253-1.726c0-3.574 3.263-6.48 7.287-6.48.253 0 .499.021.743.042C16.794 4.308 13.084 2.188 8.691 2.188zm-2.35 4.154a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24zm4.7 0a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24z" />
      <path d="M23.997 14.58c0-3.247-3.06-5.88-6.835-5.88-3.775 0-6.835 2.633-6.835 5.88s3.06 5.88 6.835 5.88c.795 0 1.56-.112 2.273-.312a.69.69 0 0 1 .572.078l1.52.89a.26.26 0 0 0 .133.043.236.236 0 0 0 .232-.236c0-.058-.023-.114-.038-.17l-.312-1.182a.472.472 0 0 1 .17-.532C22.997 18.194 23.997 16.49 23.997 14.58zm-9.143-1.12a.896.896 0 1 1 0-1.792.896.896 0 0 1 0 1.792zm4.616 0a.896.896 0 1 1 0-1.792.896.896 0 0 1 0 1.792z" />
    </svg>
  );
}

function MomentsIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <circle cx={12} cy={12} r={10} stroke="white" strokeWidth={1.5} />
      <circle cx={12} cy={12} r={4} stroke="white" strokeWidth={1.5} />
      <circle cx={12} cy={12} r={1.5} fill="white" />
      <line x1={12} y1={2} x2={12} y2={5} stroke="white" strokeWidth={1.5} />
      <line x1={12} y1={19} x2={12} y2={22} stroke="white" strokeWidth={1.5} />
      <line x1={2} y1={12} x2={5} y2={12} stroke="white" strokeWidth={1.5} />
      <line x1={19} y1={12} x2={22} y2={12} stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

function DouyinIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <path
        d="M16.6 5.82C15.56 4.94 14.86 3.71 14.74 2.32c-.01-.14-.01-.28-.01-.42V1.5h-3.68v14.28c0 1.42-1.14 2.58-2.56 2.58-1.42 0-2.58-1.16-2.58-2.58s1.16-2.58 2.58-2.58c.28 0 .54.04.78.12V9.48c-.26-.04-.52-.06-.78-.06-3.82 0-6.92 3.1-6.92 6.92s3.1 6.92 6.92 6.92 6.92-3.1 6.92-6.92V9.5c1.18.88 2.64 1.4 4.22 1.4V7.22c-1.52 0-2.9-.56-3.96-1.4z"
        fill="#FE2C55"
      />
    </svg>
  );
}

function WeiboIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="white">
      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.812.985.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.307-.361-.168-.585.138-.227.436-.346.672-.248.239.09.318.363.185.58zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.642 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149z" />
      <path
        d="M19.47 5.069c.643-.716 1.107-1.586 1.107-2.517 0-1.537-1.248-2.552-2.776-2.552-1.528 0-2.776 1.015-2.776 2.552 0 .931.464 1.801 1.107 2.517.643.716 1.669 1.248 1.669 1.248s1.026-.532 1.669-1.248z"
        fill="#FF9933"
      />
    </svg>
  );
}
