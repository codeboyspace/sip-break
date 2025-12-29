import { useMemo } from "react";

interface BeverageVesselProps {
  type: "tea" | "coffee" | "water";
  fillPercentage: number;
  size?: number;
}

const BeverageVessel = ({ type, fillPercentage, size = 280 }: BeverageVesselProps) => {
  const clampedFill = Math.max(0, Math.min(100, fillPercentage));

  const vesselConfig = useMemo(() => {
    switch (type) {
      case "tea":
        return {
          vesselClass: "fill-tea-vessel",
          liquidClass: "fill-tea-liquid",
          handleColor: "stroke-tea-vessel",
        };
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

export default BeverageVessel;
