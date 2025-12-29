import React from "react";
import redbullImg from "@/assets/redbull.png";

interface RedBullCanProps {
  progress: number; // 0-100 remaining percentage
  size?: number;
}

const RedBullCan: React.FC<RedBullCanProps> = ({ progress, size = 280 }) => {
  const clamped = Math.max(0, Math.min(100, progress));
  const cx = 120;
  const cy = 120;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <div className="vessel-container" style={{ width: size, height: size * 1.15 }}>
      <svg viewBox="0 0 240 280" width={size} height={size * 1.15} className="overflow-visible">
        <defs>
          {/* Can shadow */}
          <filter id="soft-drop" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="0" dy="4" result="offset" />
            <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.25 0" />
            <feMerge>
              <feMergeNode in="offset" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Circular progress ring */}
          <radialGradient id="ringGlow" cx="50%" cy="50%" r="55%">
            <stop offset="60%" stopColor="hsl(var(--redbull-accent))" stopOpacity="0.0" />
            <stop offset="100%" stopColor="hsl(var(--redbull-accent))" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        {/* Table shadow */}
        <ellipse cx={cx} cy={cy + 110} rx={70} ry={12} fill="#00000018" />

        {/* Centered can image */}
        <image
          href={redbullImg}
          x={cx - 60}
          y={cy - 110}
          width={120}
          height={220}
          preserveAspectRatio="xMidYMid meet"
          filter="url(#soft-drop)"
        />

        {/* Progress ring around can */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="hsl(var(--redbull-accent))"
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity={0.9}
        />
        {/* Ring glow */}
        <circle cx={cx} cy={cy} r={radius} fill="url(#ringGlow)" />
      </svg>
    </div>
  );
};

export default RedBullCan;
