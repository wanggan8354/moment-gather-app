import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <main
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ maxWidth: 375, margin: "0 auto" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/welcome-hero.jpg"
          alt="Welcome background"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(45, 31, 20, 0.55) 0%,
              rgba(45, 31, 20, 0.40) 40%,
              rgba(212, 132, 90, 0.30) 70%,
              rgba(184, 106, 66, 0.50) 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-20 flex flex-col items-center px-8 text-center pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "drop-shadow(0 4px 12px rgba(212, 132, 90, 0.35))",
            }}
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="var(--color-film-gold)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.9"
            />
            <circle
              cx="40"
              cy="40"
              r="24"
              stroke="var(--color-film-gold)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            <circle
              cx="40"
              cy="8"
              r="3"
              fill="var(--color-film-gold)"
              opacity="0.8"
            />
            <circle
              cx="40"
              cy="72"
              r="3"
              fill="var(--color-film-gold)"
              opacity="0.8"
            />
            <circle
              cx="8"
              cy="40"
              r="3"
              fill="var(--color-film-gold)"
              opacity="0.8"
            />
            <circle
              cx="72"
              cy="40"
              r="3"
              fill="var(--color-film-gold)"
              opacity="0.8"
            />
            <circle
              cx="16.2"
              cy="16.2"
              r="2.5"
              fill="var(--color-film-gold)"
              opacity="0.6"
            />
            <circle
              cx="63.8"
              cy="16.2"
              r="2.5"
              fill="var(--color-film-gold)"
              opacity="0.6"
            />
            <circle
              cx="16.2"
              cy="63.8"
              r="2.5"
              fill="var(--color-film-gold)"
              opacity="0.6"
            />
            <circle
              cx="63.8"
              cy="63.8"
              r="2.5"
              fill="var(--color-film-gold)"
              opacity="0.6"
            />
            <circle cx="40" cy="40" r="3.5" fill="var(--color-primary-light)" />
            <line
              x1="40"
              y1="40"
              x2="30"
              y2="28"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="40"
              x2="52"
              y2="26"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="2"
              y="30"
              width="6"
              height="20"
              rx="1"
              fill="var(--color-film-gold)"
              opacity="0.4"
            />
            <rect
              x="3"
              y="33"
              width="4"
              height="3"
              rx="0.5"
              fill="var(--color-bg)"
              opacity="0.3"
            />
            <rect
              x="3"
              y="38"
              width="4"
              height="3"
              rx="0.5"
              fill="var(--color-bg)"
              opacity="0.3"
            />
            <rect
              x="3"
              y="43"
              width="4"
              height="3"
              rx="0.5"
              fill="var(--color-bg)"
              opacity="0.3"
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3.5rem",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "0.08em",
            color: "white",
            textShadow:
              "0 2px 16px rgba(212, 132, 90, 0.4), 0 1px 4px rgba(45, 31, 20, 0.3)",
          }}
        >
          拾刻
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="mb-2"
          style={{
            fontFamily: "'Noto Serif SC', var(--font-display), Georgia, serif",
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 8px rgba(45, 31, 20, 0.3)",
          }}
        >
          把日子剪成一部电影
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="my-6"
          style={{
            width: 48,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--color-film-gold), transparent)",
            opacity: 0.6,
          }}
        />

        <div style={{ minHeight: 120 }} />

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          onClick={handleStart}
          className="w-full mb-4 active:scale-95 transition-transform"
          style={{
            maxWidth: 260,
            padding: "16px 32px",
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            border: "none",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            boxShadow:
              "0 4px 20px rgba(212, 132, 90, 0.4), 0 2px 6px rgba(184, 106, 66, 0.25)",
          }}
        >
          开始你的第一部电影
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.02em",
            paddingBottom: 48,
          }}
        >
          授权相册，AI 自动生成回忆短片
        </motion.p>
      </div>
    </main>
  );
}
