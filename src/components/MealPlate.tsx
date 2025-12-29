import React from "react";
import indianMeal from "@/assets/indianMeal.jpg";

interface MealPlateProps {
  progress: number; // 0-100 remaining percentage
  size?: number;
}

const MealPlate: React.FC<MealPlateProps> = ({ progress, size = 280 }) => {
  const clamped = Math.max(0, Math.min(100, progress));
  const outerRadius = 100;
  const innerRadius = 80;
  const cx = 120;
  const cy = 120;
  const circumference = 2 * Math.PI * outerRadius;
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <div className="vessel-container" style={{ width: size, height: size }}>
      <svg viewBox="0 0 240 240" width={size} height={size} className="overflow-visible">
        <defs>
          {/* Plate gradients */}
          <radialGradient id="plate-base" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--meal-plate))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--meal-plate))" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="plate-rim" cx="50%" cy="50%" r="65%">
            <stop offset="70%" stopColor="hsl(var(--meal-plate-rim))" stopOpacity="0.0" />
            <stop offset="100%" stopColor="hsl(var(--meal-plate-rim))" stopOpacity="0.7" />
          </radialGradient>
          {/* Subtle shadow */}
          <radialGradient id="plate-shadow" cx="50%" cy="50%" r="60%">
            <stop offset="60%" stopColor="#00000020" />
            <stop offset="100%" stopColor="#00000000" />
          </radialGradient>

          {/* Circular clip for meal image */}
          <clipPath id="meal-clip">
            <circle cx={cx} cy={cy} r={innerRadius} />
          </clipPath>

          {/* Vignette overlay to blend edges */}
          <radialGradient id="meal-vignette" cx="50%" cy="50%" r="60%">
            <stop offset="70%" stopColor="#00000000" />
            <stop offset="100%" stopColor="#00000055" />
          </radialGradient>

          {/* Filter to key out white background from the image */}
          <filter id="remove-white" colorInterpolationFilters="sRGB">
            {/* Convert luminance to alpha: white -> alpha 1, black -> 0 */}
            <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="lum" />
            {/* Invert alpha so white becomes transparent */}
            <feComponentTransfer in="lum" result="inv">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            {/* Apply inverted alpha as mask to original colors */}
            <feComposite in="SourceGraphic" in2="inv" operator="in" result="cut" />
          </filter>
        </defs>

        {/* Table shadow */}
        <ellipse cx={cx} cy={cy + 86} rx={outerRadius} ry={14} fill="#00000018" />

        {/* Plate body */}
        <circle cx={cx} cy={cy} r={outerRadius} fill="url(#plate-base)" />
        {/* Rim overlay */}
        <circle cx={cx} cy={cy} r={outerRadius} fill="url(#plate-rim)" />
        {/* Inner plate base behind the image */}
        <circle cx={cx} cy={cy} r={innerRadius} fill="hsl(var(--meal-plate))" opacity={0.85} />

        {/* Indian meal image clipped to circle with white removed */}
        <g clipPath="url(#meal-clip)">
          {/* Neutral backdrop to mitigate any semi-transparent edges */}
          <rect x={cx - innerRadius} y={cy - innerRadius} width={innerRadius * 2} height={innerRadius * 2} fill="hsl(var(--meal-plate))" />
          <image
            href={indianMeal}
            x={cx - innerRadius}
            y={cy - innerRadius}
            width={innerRadius * 2}
            height={innerRadius * 2}
            preserveAspectRatio="xMidYMid slice"
            filter="url(#remove-white)"
            style={{ imageRendering: "auto" }}
          />
          {/* Vignette for edge blending */}
          <circle cx={cx} cy={cy} r={innerRadius} fill="url(#meal-vignette)" />
        </g>

        {/* Progress ring around the plate */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="none"
          stroke="hsl(var(--meal-accent))"
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          opacity={0.85}
        />

        {/* Decorative cutlery silhouette for flair */}
        <g opacity={0.22}>
          <path d={`M ${cx - 90} ${cy - 80} Q ${cx - 96} ${cy - 40} ${cx - 88} ${cy - 8}`} stroke="hsl(var(--meal-plate-rim))" strokeWidth={6} strokeLinecap="round" />
          <path d={`M ${cx - 92} ${cy - 78} Q ${cx - 98} ${cy - 44} ${cx - 90} ${cy - 10}`} stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.3} />
        </g>
      </svg>
    </div>
  );
};

export default MealPlate;
