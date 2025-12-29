import { useMemo } from "react";

interface BeverageVesselProps {
  type: "tea" | "coffee" | "water";
  fillPercentage: number;
  size?: number;
}

const BeverageVessel = ({ type, fillPercentage, size = 280 }: BeverageVesselProps) => {
  const clampedFill = Math.max(0, Math.min(100, fillPercentage));

  // Render Indian chai glass for tea
  if (type === "tea") {
    return <ChaiGlass fillPercentage={clampedFill} size={size} />;
  }

  const vesselConfig = useMemo(() => {
    switch (type) {
      case "coffee":
        return {
          vesselClass: "fill-coffee-vessel",
          liquidClass: "fill-coffee-liquid",
          handleColor: "stroke-coffee-vessel",
        };
      case "water":
        return {
          vesselClass: "fill-water-vessel",
          liquidClass: "fill-water-liquid",
          handleColor: "stroke-water-vessel",
        };
      default:
        return {
          vesselClass: "fill-coffee-vessel",
          liquidClass: "fill-coffee-liquid",
          handleColor: "stroke-coffee-vessel",
        };
    }
  }, [type]);

  // Calculate liquid height based on fill percentage
  const vesselHeight = 160;
  const vesselTop = 60;
  const liquidHeight = (clampedFill / 100) * vesselHeight;
  const liquidTop = vesselTop + vesselHeight - liquidHeight;

  return (
    <div className="vessel-container" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 240"
        width={size}
        height={size * 1.2}
        className="overflow-visible"
      >
        <defs>
          {/* Clip path for the vessel interior */}
          <clipPath id={`vessel-clip-${type}`}>
            <path d="M50 60 Q50 55 55 55 L145 55 Q150 55 150 60 L150 200 Q150 220 130 220 L70 220 Q50 220 50 200 Z" />
          </clipPath>

          {/* Gradient for liquid depth effect */}
          <linearGradient id={`liquid-gradient-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
          </linearGradient>

          {/* Subtle wave pattern */}
          <pattern id={`wave-${type}`} patternUnits="userSpaceOnUse" width="40" height="10" patternTransform="rotate(0)">
            <path d="M0 5 Q10 0 20 5 T40 5" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          </pattern>
        </defs>

        {/* Vessel body (back) */}
        <path
          d="M50 60 Q50 55 55 55 L145 55 Q150 55 150 60 L150 200 Q150 220 130 220 L70 220 Q50 220 50 200 Z"
          className={vesselConfig.vesselClass}
          opacity="0.6"
        />

        {/* Liquid */}
        <g clipPath={`url(#vessel-clip-${type})`}>
          <rect
            x="50"
            y={liquidTop}
            width="100"
            height={liquidHeight}
            className={`${vesselConfig.liquidClass} liquid-fill`}
          />
          
          {/* Liquid surface wave effect */}
          {clampedFill > 0 && (
            <ellipse
              cx="100"
              cy={liquidTop}
              rx="48"
              ry="6"
              className={vesselConfig.liquidClass}
              opacity="0.8"
            />
          )}
        </g>

        {/* Vessel body (front stroke) */}
        <path
          d="M50 60 Q50 55 55 55 L145 55 Q150 55 150 60 L150 200 Q150 220 130 220 L70 220 Q50 220 50 200 Z"
          fill="none"
          className={vesselConfig.handleColor}
          strokeWidth="3"
          opacity="0.4"
        />

        {/* Handle */}
        <path
          d="M150 80 Q180 80 180 120 Q180 160 150 160"
          fill="none"
          className={vesselConfig.handleColor}
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Rim highlight */}
        <ellipse
          cx="100"
          cy="57"
          rx="47"
          ry="6"
          className={vesselConfig.vesselClass}
          opacity="0.8"
        />

        {/* Shine effect */}
        <path
          d="M60 70 L60 180"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.15"
        />
      </svg>
    </div>
  );
};

// Indian Chai Glass Component - tall fluted glass
const ChaiGlass = ({ fillPercentage, size }: { fillPercentage: number; size: number }) => {
  const glassHeight = 180;
  const glassTop = 30;
  const liquidHeight = (fillPercentage / 100) * (glassHeight - 10);
  const liquidTop = glassTop + glassHeight - liquidHeight - 5;

  return (
    <div className="vessel-container" style={{ width: size, height: size * 1.1 }}>
      <svg
        viewBox="0 0 120 220"
        width={size * 0.6}
        height={size * 1.1}
        className="overflow-visible"
      >
        <defs>
          {/* Clip path for the glass interior */}
          <clipPath id="chai-glass-clip">
            <path d="M25 35 L30 195 Q30 205 60 205 Q90 205 90 195 L95 35 Q95 30 60 30 Q25 30 25 35 Z" />
          </clipPath>

          {/* Glass gradient for transparency effect */}
          <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--tea-vessel))" stopOpacity="0.4" />
            <stop offset="20%" stopColor="hsl(var(--tea-vessel-shine))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--tea-vessel))" stopOpacity="0.1" />
            <stop offset="80%" stopColor="hsl(var(--tea-vessel-shine))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--tea-vessel))" stopOpacity="0.4" />
          </linearGradient>

          {/* Chai liquid gradient - warm brown milky tone */}
          <linearGradient id="chai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--tea-liquid))" stopOpacity="0.95" />
            <stop offset="30%" stopColor="hsl(28 60% 58%)" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(28 55% 52%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--tea-liquid))" stopOpacity="0.9" />
          </linearGradient>

          {/* Foam gradient */}
          <radialGradient id="foam-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--tea-foam))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--tea-foam))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--tea-liquid))" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Glass body - fluted design */}
        <g>
          {/* Vertical flutes/ridges - creates the classic chai glass look */}
          {[...Array(12)].map((_, i) => {
            const x = 28 + i * 5.5;
            return (
              <path
                key={i}
                d={`M${x} 38 L${x + 2} 192`}
                stroke="hsl(var(--tea-vessel-shine))"
                strokeWidth="1"
                opacity="0.3"
                fill="none"
              />
            );
          })}
        </g>

        {/* Liquid */}
        <g clipPath="url(#chai-glass-clip)">
          {/* Main chai liquid */}
          <rect
            x="25"
            y={liquidTop}
            width="70"
            height={liquidHeight + 10}
            fill="url(#chai-gradient)"
            className="liquid-fill"
          />
          
          {/* Foam layer on top */}
          {fillPercentage > 5 && (
            <>
              <ellipse
                cx="60"
                cy={liquidTop}
                rx="32"
                ry="8"
                fill="url(#foam-gradient)"
              />
              {/* Foam bubbles */}
              {fillPercentage > 20 && (
                <g opacity="0.6">
                  <circle cx="45" cy={liquidTop - 1} r="2" fill="hsl(var(--tea-foam))" />
                  <circle cx="55" cy={liquidTop + 1} r="3" fill="hsl(var(--tea-foam))" />
                  <circle cx="68" cy={liquidTop - 2} r="2.5" fill="hsl(var(--tea-foam))" />
                  <circle cx="75" cy={liquidTop + 1} r="1.5" fill="hsl(var(--tea-foam))" />
                  <circle cx="50" cy={liquidTop + 2} r="1.8" fill="hsl(var(--tea-foam))" />
                  <circle cx="62" cy={liquidTop - 1} r="2.2" fill="hsl(var(--tea-foam))" />
                </g>
              )}
            </>
          )}
        </g>

        {/* Glass outline - slightly tapered shape */}
        <path
          d="M25 35 L30 195 Q30 205 60 205 Q90 205 90 195 L95 35"
          fill="none"
          stroke="hsl(var(--tea-vessel))"
          strokeWidth="2.5"
          opacity="0.6"
        />

        {/* Glass body fill for transparency */}
        <path
          d="M25 35 L30 195 Q30 205 60 205 Q90 205 90 195 L95 35 Q95 30 60 30 Q25 30 25 35 Z"
          fill="url(#glass-gradient)"
        />

        {/* Rim */}
        <ellipse
          cx="60"
          cy="32"
          rx="35"
          ry="6"
          fill="none"
          stroke="hsl(var(--tea-vessel))"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Rim highlight */}
        <ellipse
          cx="60"
          cy="32"
          rx="33"
          ry="5"
          fill="hsl(var(--tea-vessel-shine))"
          opacity="0.3"
        />

        {/* Left shine line */}
        <path
          d="M32 50 L34 180"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* Secondary shine */}
        <path
          d="M38 55 L39 175"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.15"
        />

        {/* Steam wisps when hot (only when more than 50% full) */}
        {fillPercentage > 50 && (
          <g className="animate-float" opacity="0.4">
            <path
              d="M50 20 Q45 10 50 0"
              stroke="hsl(var(--tea-vessel))"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M60 18 Q65 8 60 -2"
              stroke="hsl(var(--tea-vessel))"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M70 22 Q75 12 70 2"
              stroke="hsl(var(--tea-vessel))"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default BeverageVessel;
