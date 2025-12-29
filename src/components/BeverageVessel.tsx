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
          <clipPath id={`vessel-clip-${type}`}>
            <path d="M50 60 Q50 55 55 55 L145 55 Q150 55 150 60 L150 200 Q150 220 130 220 L70 220 Q50 220 50 200 Z" />
          </clipPath>
        </defs>

        <path
          d="M50 60 Q50 55 55 55 L145 55 Q150 55 150 60 L150 200 Q150 220 130 220 L70 220 Q50 220 50 200 Z"
          className={vesselConfig.vesselClass}
          opacity="0.6"
        />

        <g clipPath={`url(#vessel-clip-${type})`}>
          <rect
            x="50"
            y={liquidTop}
            width="100"
            height={liquidHeight}
            className={`${vesselConfig.liquidClass} liquid-fill`}
          />
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

        <path
          d="M50 60 Q50 55 55 55 L145 55 Q150 55 150 60 L150 200 Q150 220 130 220 L70 220 Q50 220 50 200 Z"
          fill="none"
          className={vesselConfig.handleColor}
          strokeWidth="3"
          opacity="0.4"
        />

        <path
          d="M150 80 Q180 80 180 120 Q180 160 150 160"
          fill="none"
          className={vesselConfig.handleColor}
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.7"
        />

        <ellipse
          cx="100"
          cy="57"
          rx="47"
          ry="6"
          className={vesselConfig.vesselClass}
          opacity="0.8"
        />

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

// Indian Chai Glass Component - exact match to reference image
const ChaiGlass = ({ fillPercentage, size }: { fillPercentage: number; size: number }) => {
  // Glass dimensions - tapered shape wider at top
  const topWidth = 90;
  const bottomWidth = 70;
  const glassHeight = 130;
  const glassTop = 50;
  
  // Calculate liquid position
  const maxLiquidHeight = glassHeight - 15;
  const liquidHeight = (fillPercentage / 100) * maxLiquidHeight;
  const liquidTop = glassTop + glassHeight - liquidHeight - 8;

  // Calculate the width at the liquid top position (for tapered glass)
  const liquidTopRatio = 1 - (liquidHeight / glassHeight);
  const liquidTopWidth = bottomWidth + (topWidth - bottomWidth) * (1 - liquidTopRatio);

  return (
    <div className="vessel-container" style={{ width: size, height: size * 1.1 }}>
      <svg
        viewBox="0 0 140 200"
        width={size * 0.7}
        height={size * 1.1}
        className="overflow-visible"
      >
        <defs>
          {/* Clip path for the tapered glass */}
          <clipPath id="chai-glass-clip">
            <path d={`
              M${(140 - topWidth) / 2} ${glassTop}
              L${(140 - bottomWidth) / 2} ${glassTop + glassHeight}
              Q${(140 - bottomWidth) / 2} ${glassTop + glassHeight + 8} 70 ${glassTop + glassHeight + 8}
              Q${(140 + bottomWidth) / 2} ${glassTop + glassHeight + 8} ${(140 + bottomWidth) / 2} ${glassTop + glassHeight}
              L${(140 + topWidth) / 2} ${glassTop}
              Z
            `} />
          </clipPath>

          {/* Glass gradient - light gray/clear */}
          <linearGradient id="glass-body-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0.5" />
            <stop offset="15%" stopColor="#e8e8e8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f5f5f5" stopOpacity="0.2" />
            <stop offset="85%" stopColor="#e8e8e8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4d4d4" stopOpacity="0.5" />
          </linearGradient>

          {/* Chai liquid gradient - warm tan/brown */}
          <linearGradient id="chai-liquid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4956a" />
            <stop offset="20%" stopColor="#d4a574" />
            <stop offset="50%" stopColor="#d9ac7c" />
            <stop offset="80%" stopColor="#d4a574" />
            <stop offset="100%" stopColor="#c4956a" />
          </linearGradient>

          {/* Foam gradient - lighter creamy color */}
          <linearGradient id="foam-layer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d9b88a" />
            <stop offset="30%" stopColor="#e5c99d" />
            <stop offset="50%" stopColor="#ebd4a8" />
            <stop offset="70%" stopColor="#e5c99d" />
            <stop offset="100%" stopColor="#d9b88a" />
          </linearGradient>
        </defs>

        {/* Shadow under the glass */}
        <ellipse
          cx="70"
          cy={glassTop + glassHeight + 15}
          rx="35"
          ry="6"
          fill="#00000020"
        />

        {/* Glass body background - clear/gray */}
        <path
          d={`
            M${(140 - topWidth) / 2} ${glassTop}
            L${(140 - bottomWidth) / 2} ${glassTop + glassHeight}
            Q${(140 - bottomWidth) / 2} ${glassTop + glassHeight + 8} 70 ${glassTop + glassHeight + 8}
            Q${(140 + bottomWidth) / 2} ${glassTop + glassHeight + 8} ${(140 + bottomWidth) / 2} ${glassTop + glassHeight}
            L${(140 + topWidth) / 2} ${glassTop}
            Z
          `}
          fill="url(#glass-body-gradient)"
        />

        {/* Liquid inside the glass */}
        <g clipPath="url(#chai-glass-clip)">
          {/* Main chai liquid */}
          {fillPercentage > 0 && (
            <rect
              x="25"
              y={liquidTop}
              width="90"
              height={liquidHeight + 20}
              fill="url(#chai-liquid-gradient)"
              className="liquid-fill"
            />
          )}

          {/* Foam layer on top */}
          {fillPercentage > 5 && (
            <ellipse
              cx="70"
              cy={liquidTop}
              rx={liquidTopWidth / 2 - 2}
              ry="10"
              fill="url(#foam-layer-gradient)"
            />
          )}

          {/* Vertical ridges/flutes - visible through the chai */}
          {[...Array(11)].map((_, i) => {
            const xStart = 30 + i * 7;
            const xEnd = 33 + i * 6.2;
            return (
              <line
                key={i}
                x1={xStart}
                y1={glassTop + 5}
                x2={xEnd}
                y2={glassTop + glassHeight}
                stroke="#b8956d"
                strokeWidth="1.5"
                opacity="0.4"
              />
            );
          })}
        </g>

        {/* Vertical ridges on the glass (visible on empty part) */}
        {[...Array(11)].map((_, i) => {
          const xStart = 30 + i * 7;
          const xEnd = 33 + i * 6.2;
          return (
            <line
              key={`ridge-${i}`}
              x1={xStart}
              y1={glassTop + 5}
              x2={xEnd}
              y2={liquidTop}
              stroke="#c0c0c0"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Glass outline */}
        <path
          d={`
            M${(140 - topWidth) / 2} ${glassTop}
            L${(140 - bottomWidth) / 2} ${glassTop + glassHeight}
            Q${(140 - bottomWidth) / 2} ${glassTop + glassHeight + 8} 70 ${glassTop + glassHeight + 8}
            Q${(140 + bottomWidth) / 2} ${glassTop + glassHeight + 8} ${(140 + bottomWidth) / 2} ${glassTop + glassHeight}
            L${(140 + topWidth) / 2} ${glassTop}
          `}
          fill="none"
          stroke="#888888"
          strokeWidth="2"
        />

        {/* Rim - thicker gray border at top */}
        <path
          d={`
            M${(140 - topWidth) / 2 - 3} ${glassTop - 2}
            L${(140 + topWidth) / 2 + 3} ${glassTop - 2}
          `}
          stroke="#a0a0a0"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Inner rim highlight */}
        <ellipse
          cx="70"
          cy={glassTop}
          rx={topWidth / 2 - 2}
          ry="4"
          fill="#d0d0d0"
          opacity="0.6"
        />

        {/* Left side shine */}
        <path
          d={`M${(140 - topWidth) / 2 + 8} ${glassTop + 15} L${(140 - bottomWidth) / 2 + 8} ${glassTop + glassHeight - 10}`}
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Steam - wavy line rising from the glass */}
        {fillPercentage > 30 && (
          <g className="animate-float" opacity="0.6">
            <path
              d="M70 35 Q75 25 70 15 Q65 5 70 -5"
              stroke="#e0e0e0"
              strokeWidth="3"
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
