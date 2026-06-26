import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MobileShell } from "@/components/layout/MobileShell";
import { useAppStore } from "@/store/useAppStore";
import { funFacts } from "@/utils/mockData";

const steps = [
  { key: "analyzing", label: "分析相册照片" },
  { key: "matching", label: "匹配叙事线" },
  { key: "generating", label: "生成电影短片" },
];

export default function Generating() {
  const navigate = useNavigate();
  const {
    generatingStatus,
    generatingProgress,
    cancelGenerating,
    setGeneratingStatus,
    setGeneratingProgress,
    completeGenerating,
    selectedTemplate,
  } = useAppStore();

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (generatingStatus === "idle") {
      navigate("/templates");
      return;
    }

    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);

    const animate = () => {
      progressRef.current += 1;
      const progress = Math.min(progressRef.current, 100);
      setGeneratingProgress(progress);

      if (progress <= 33) {
        setGeneratingStatus("analyzing");
      } else if (progress <= 66) {
        setGeneratingStatus("matching");
      } else if (progress < 100) {
        setGeneratingStatus("generating");
      }

      if (progress >= 100) {
        completeGenerating();
        setTimeout(() => {
          const newWork = useAppStore.getState().currentWork;
          if (newWork) {
            navigate(`/preview/${newWork.id}`);
          } else {
            navigate("/home");
          }
        }, 500);
        return;
      }

      timerRef.current = setTimeout(animate, 80);
    };

    timerRef.current = setTimeout(animate, 300);

    return () => {
      clearInterval(factInterval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    cancelGenerating();
    navigate("/home");
  };

  const getStepStatus = (
    stepKey: string,
  ): "completed" | "active" | "pending" => {
    const statusOrder = ["analyzing", "matching", "generating"];
    const currentIndex = statusOrder.indexOf(generatingStatus);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  const estimatedSeconds = Math.max(
    0,
    Math.ceil((100 - generatingProgress) * 0.8),
  );

  return (
    <MobileShell dark>
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(
            160deg,
            #2D1F14 0%,
            #3D2A1A 25%,
            #4A3220 50%,
            #3D2A1A 75%,
            #2D1F14 100%
          )`,
          padding: "40px 24px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/assets/generating-visual.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(30px) brightness(0.3) saturate(0.6) sepia(0.3)",
            opacity: 0.6,
            animation: "bgBreath 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(212, 132, 90, 0.15) 0%, rgba(201, 169, 110, 0.08) 40%, transparent 70%)",
            animation: "glowPulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-[-20%] w-[60%] h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(212,132,90,0.03) 30%, rgba(201,169,110,0.05) 50%, rgba(212,132,90,0.02) 70%, transparent 100%)",
            animation: "leakDrift 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(45,31,20,0.4) 100%)",
          }}
        />

        <div
          className="relative z-10 flex flex-col items-center w-full"
          style={{ maxWidth: 320 }}
        >
          <div
            className="relative mb-8"
            style={{ width: 120, height: 120, margin: "0 auto" }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 160,
                height: 160,
                background:
                  "radial-gradient(circle, rgba(212,132,90,0.2) 0%, rgba(201,169,110,0.1) 40%, transparent 70%)",
                animation: "glowPulse 3s ease-in-out infinite",
              }}
            />
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              width={120}
              height={120}
              viewBox="0 0 120 120"
              style={{ display: "block", margin: "0 auto" }}
            >
              <circle
                cx={60}
                cy={60}
                r={54}
                fill="none"
                stroke="rgba(201,169,110,0.6)"
                strokeWidth={2}
              />
              <circle
                cx={60}
                cy={60}
                r={48}
                fill="none"
                stroke="rgba(201,169,110,0.6)"
                strokeWidth={2}
              />
              <circle
                cx={60}
                cy={60}
                r={20}
                fill="none"
                stroke="rgba(212,132,90,0.5)"
                strokeWidth={1.5}
              />
              <line
                x1={60}
                y1={12}
                x2={60}
                y2={40}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={60}
                y1={80}
                x2={60}
                y2={108}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={12}
                y1={60}
                x2={40}
                y2={60}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={80}
                y1={60}
                x2={108}
                y2={60}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={25}
                y1={25}
                x2={44}
                y2={44}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={76}
                y1={76}
                x2={95}
                y2={95}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={95}
                y1={25}
                x2={76}
                y2={44}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <line
                x1={44}
                y1={76}
                x2={25}
                y2={95}
                stroke="rgba(201,169,110,0.4)"
                strokeWidth={1.5}
              />
              <circle cx={60} cy={12} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={60} cy={108} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={12} cy={60} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={108} cy={60} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={25} cy={25} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={95} cy={95} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={95} cy={25} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={25} cy={95} r={3} fill="rgba(201,169,110,0.3)" />
              <circle cx={60} cy={60} r={8} fill="rgba(212,132,90,0.5)" />
              <circle cx={60} cy={60} r={3} fill="rgba(45,31,20,0.6)" />
            </motion.svg>
            <div
              className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
              style={{ bottom: -8, width: 60, height: 80, opacity: 0.4 }}
            >
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                style={{
                  width: "100%",
                  height: "200%",
                  background:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, rgba(201,169,110,0.3) 6px, rgba(201,169,110,0.3) 8px, transparent 8px, transparent 14px)",
                }}
              />
            </div>
          </div>

          <h1
            className="text-center mt-8 mb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 600,
              color: "rgba(232,168,124,0.95)",
              letterSpacing: "0.02em",
              lineHeight: 1.4,
            }}
          >
            AI 正在为你剪辑回忆
          </h1>
          <p
            className="text-center mb-9"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(156,133,119,0.5)",
            }}
          >
            {selectedTemplate
              ? `正在使用「${selectedTemplate.name}」模板`
              : "请稍候，美好的故事即将呈现"}
          </p>

          <div className="w-full mb-7">
            {steps.map((step) => {
              const status = getStepStatus(step.key);
              return (
                <div
                  key={step.key}
                  className="flex items-center gap-2.5 py-2.5"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs transition-all"
                    style={{
                      background:
                        status === "completed"
                          ? "var(--color-primary)"
                          : status === "active"
                            ? "transparent"
                            : "rgba(156,133,119,0.2)",
                      border:
                        status === "active"
                          ? "2px solid var(--color-primary)"
                          : status === "pending"
                            ? "1.5px solid rgba(156,133,119,0.3)"
                            : "none",
                      boxShadow:
                        status === "completed"
                          ? "0 0 12px rgba(212,132,90,0.4)"
                          : "none",
                      animation:
                        status === "active"
                          ? "dotPulse 2s ease-in-out infinite"
                          : "none",
                    }}
                  >
                    {status === "completed" && (
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 7L6 10L11 4"
                          stroke="white"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {status === "active" && (
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1], scale: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="rounded-full"
                        style={{
                          width: 10,
                          height: 10,
                          background: "var(--color-primary)",
                        }}
                      />
                    )}
                    {status === "pending" && (
                      <div
                        className="rounded-full"
                        style={{
                          width: 8,
                          height: 8,
                          background: "rgba(156,133,119,0.4)",
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-body)",
                      color:
                        status === "completed"
                          ? "var(--color-primary-light)"
                          : status === "active"
                            ? "rgba(232,168,124,0.9)"
                            : "rgba(156,133,119,0.5)",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full mb-3">
            <div className="flex justify-between items-center mb-2">
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(156,133,119,0.5)",
                }}
              >
                处理进度
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--color-film-gold)",
                  fontWeight: 600,
                }}
              >
                {generatingProgress}%
              </span>
            </div>
            <div
              className="w-full h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(156,133,119,0.15)" }}
            >
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary-dark) 0%, var(--color-primary) 40%, var(--color-film-gold) 100%)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${generatingProgress}%` }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: "var(--color-film-gold)",
                    boxShadow: "0 0 8px rgba(201,169,110,0.6)",
                    animation: "progressGlow 2s ease-in-out infinite",
                  }}
                />
              </motion.div>
            </div>
          </div>

          <div
            className="w-full mt-5 mb-10 flex items-center justify-center"
            style={{ minHeight: 40 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
                className="text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(201,169,110,0.7)",
                  lineHeight: 1.5,
                }}
              >
                {funFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "rgba(156,133,119,0.4)",
                letterSpacing: "0.02em",
              }}
            >
              预计还需 {estimatedSeconds} 秒
            </p>
            <button
              onClick={handleCancel}
              className="bg-transparent border-none cursor-pointer px-5 py-2 transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(156,133,119,0.5)",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(232,168,124,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(156,133,119,0.5)")
              }
            >
              取消
            </button>
          </div>
        </div>

        <style>{`
          @keyframes glowPulse {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
          }
          @keyframes bgBreath {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 0.7; }
          }
          @keyframes dotPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212,132,90,0.3); }
            50% { box-shadow: 0 0 0 6px rgba(212,132,90,0); }
          }
          @keyframes progressGlow {
            0%, 100% { box-shadow: 0 0 6px rgba(201,169,110,0.4); }
            50% { box-shadow: 0 0 14px rgba(201,169,110,0.8); }
          }
          @keyframes leakDrift {
            0%, 100% { transform: translateX(0) rotate(0deg); opacity: 0.5; }
            33% { transform: translateX(-10px) rotate(1deg); opacity: 0.8; }
            66% { transform: translateX(5px) rotate(-0.5deg); opacity: 0.6; }
          }
        `}</style>
      </div>
    </MobileShell>
  );
}
