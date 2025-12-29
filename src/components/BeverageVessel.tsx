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

  // Render coffee cup with saucer
  if (type === "coffee") {
    return <CoffeeCup fillPercentage={clampedFill} size={size} />;
  }

  // Render realistic water glass with animated waves
  if (type === "water") {
    return <WaterGlass fillPercentage={clampedFill} size={size} />;
  }

  const vesselConfig = useMemo(() => {
    return {
      vesselClass: "fill-water-vessel",
      liquidClass: "fill-water-liquid",
      handleColor: "stroke-water-vessel",
    };
  }, []);

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

// Coffee Cup with Saucer Component - matching reference image
const CoffeeCup = ({ fillPercentage, size }: { fillPercentage: number; size: number }) => {
  const cupHeight = 70;
  const cupTopWidth = 100;
  const cupBottomWidth = 60;
  const cupTop = 60;

  // Calculate liquid position
  const maxLiquidHeight = cupHeight - 10;
  const liquidHeight = (fillPercentage / 100) * maxLiquidHeight;
  const liquidTop = cupTop + cupHeight - liquidHeight - 5;

  return (
    <div className="vessel-container" style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 180 150"
        width={size}
        height={size * 0.85}
        className="overflow-visible"
      >
        <defs>
          {/* Clip path for the cup */}
          <clipPath id="coffee-cup-clip">
            <path d={`
              M${(180 - cupTopWidth) / 2} ${cupTop}
              Q${(180 - cupTopWidth) / 2 - 5} ${cupTop + cupHeight * 0.7} ${(180 - cupBottomWidth) / 2} ${cupTop + cupHeight}
              Q${(180 - cupBottomWidth) / 2 - 3} ${cupTop + cupHeight + 5} 90 ${cupTop + cupHeight + 5}
              Q${(180 + cupBottomWidth) / 2 + 3} ${cupTop + cupHeight + 5} ${(180 + cupBottomWidth) / 2} ${cupTop + cupHeight}
              Q${(180 + cupTopWidth) / 2 + 5} ${cupTop + cupHeight * 0.7} ${(180 + cupTopWidth) / 2} ${cupTop}
              Z
            `} />
          </clipPath>

          {/* Cup body gradient - warm tan/beige */}
          <linearGradient id="coffee-cup-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8a07d" />
            <stop offset="20%" stopColor="#c9b08a" />
            <stop offset="50%" stopColor="#d4bc94" />
            <stop offset="80%" stopColor="#c9b08a" />
            <stop offset="100%" stopColor="#b8a07d" />
          </linearGradient>

          {/* Coffee liquid gradient - dark brown */}
          <linearGradient id="coffee-liquid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b6b4a" />
            <stop offset="50%" stopColor="#6d5339" />
            <stop offset="100%" stopColor="#5a432f" />
          </linearGradient>

          {/* Saucer gradient */}
          <linearGradient id="saucer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a08b6a" />
            <stop offset="30%" stopColor="#c4ad8a" />
            <stop offset="50%" stopColor="#d4bc94" />
            <stop offset="70%" stopColor="#c4ad8a" />
            <stop offset="100%" stopColor="#a08b6a" />
          </linearGradient>
        </defs>

        {/* Saucer - ellipse under the cup */}
        <ellipse
          cx="90"
          cy={cupTop + cupHeight + 12}
          rx="70"
          ry="14"
          fill="url(#saucer-gradient)"
        />
        
        {/* Saucer top highlight */}
        <ellipse
          cx="90"
          cy={cupTop + cupHeight + 8}
          rx="55"
          ry="8"
          fill="#c9b894"
          opacity="0.6"
        />

        {/* Cup body */}
        <path
          d={`
            M${(180 - cupTopWidth) / 2} ${cupTop}
            Q${(180 - cupTopWidth) / 2 - 5} ${cupTop + cupHeight * 0.7} ${(180 - cupBottomWidth) / 2} ${cupTop + cupHeight}
            Q${(180 - cupBottomWidth) / 2 - 3} ${cupTop + cupHeight + 5} 90 ${cupTop + cupHeight + 5}
            Q${(180 + cupBottomWidth) / 2 + 3} ${cupTop + cupHeight + 5} ${(180 + cupBottomWidth) / 2} ${cupTop + cupHeight}
            Q${(180 + cupTopWidth) / 2 + 5} ${cupTop + cupHeight * 0.7} ${(180 + cupTopWidth) / 2} ${cupTop}
            Z
          `}
          fill="url(#coffee-cup-gradient)"
        />

        {/* Liquid inside the cup */}
        <g clipPath="url(#coffee-cup-clip)">
          {fillPercentage > 0 && (
            <rect
              x="35"
              y={liquidTop}
              width="110"
              height={liquidHeight + 15}
              fill="url(#coffee-liquid-gradient)"
              className="liquid-fill"
            />
          )}

          {/* Coffee surface highlight */}
          {fillPercentage > 5 && (
            <ellipse
              cx="90"
              cy={liquidTop + 3}
              rx="42"
              ry="6"
              fill="#7a5c42"
              opacity="0.8"
            />
          )}
        </g>

        {/* Cup rim - curved top edge */}
        <ellipse
          cx="90"
          cy={cupTop}
          rx={cupTopWidth / 2}
          ry="8"
          fill="#d8c49c"
        />
        
        {/* Inner rim */}
        <ellipse
          cx="90"
          cy={cupTop}
          rx={cupTopWidth / 2 - 5}
          ry="5"
          fill="#c4ad88"
          opacity="0.7"
        />

        {/* Handle - curved loop on the right */}
        <path
          d={`
            M${(180 + cupTopWidth) / 2 - 5} ${cupTop + 15}
            Q${(180 + cupTopWidth) / 2 + 25} ${cupTop + 15}
            ${(180 + cupTopWidth) / 2 + 28} ${cupTop + cupHeight * 0.5}
            Q${(180 + cupTopWidth) / 2 + 25} ${cupTop + cupHeight - 5}
            ${(180 + cupBottomWidth) / 2 + 15} ${cupTop + cupHeight - 5}
          `}
          fill="none"
          stroke="#c4ad88"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Handle inner curve */}
        <path
          d={`
            M${(180 + cupTopWidth) / 2} ${cupTop + 20}
            Q${(180 + cupTopWidth) / 2 + 15} ${cupTop + 20}
            ${(180 + cupTopWidth) / 2 + 18} ${cupTop + cupHeight * 0.5}
            Q${(180 + cupTopWidth) / 2 + 15} ${cupTop + cupHeight - 10}
            ${(180 + cupBottomWidth) / 2 + 18} ${cupTop + cupHeight - 10}
          `}
          fill="none"
          stroke="#a08b6a"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Left side shine on cup */}
        <path
          d={`M${(180 - cupTopWidth) / 2 + 12} ${cupTop + 10} Q${(180 - cupBottomWidth) / 2 + 5} ${cupTop + cupHeight * 0.6} ${(180 - cupBottomWidth) / 2 + 10} ${cupTop + cupHeight - 5}`}
          stroke="#e8dcc4"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Steam - wavy lines rising from the cup */}
        {fillPercentage > 30 && (
          <g className="animate-float" opacity="0.5">
            <path
              d="M80 45 Q85 35 80 25 Q75 15 80 5"
              stroke="#d0d0d0"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M100 48 Q105 38 100 28 Q95 18 100 8"
              stroke="#d0d0d0"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        )}
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

// Realistic Water Glass with wavy animated surface
function WaterGlass({ fillPercentage, size }: { fillPercentage: number; size: number }) {
  // Glass dimensions
  const glassTop = 50;
  const glassHeight = 150;
  const glassBottom = glassTop + glassHeight;
  const innerLeft = 50;
  const innerRight = 150;
  const innerWidth = innerRight - innerLeft; // 100

  // Liquid calculations
  const maxLiquidHeight = glassHeight - 10;
  const liquidHeight = (fillPercentage / 100) * maxLiquidHeight;
  const liquidTop = glassBottom - liquidHeight;

  // Build a smooth wave path using quadratic curves across the inner width
  const buildWavePath = (
    baseY: number,
    amplitude: number,
    wavelength: number,
    phase: number
  ) => {
    const startX = innerLeft - wavelength + (phase % wavelength);
    const endX = innerRight + wavelength;
    let d = `M ${startX} ${baseY}`;
    let toggle = 1;
    for (let x = startX; x <= endX; x += wavelength / 2) {
      const cpX = x + wavelength / 4;
      const cpY = baseY + amplitude * toggle;
      const nx = x + wavelength / 2;
      const ny = baseY;
      d += ` Q ${cpX} ${cpY}, ${nx} ${ny}`;
      toggle *= -1; // alternate crest/trough
    }
    // Close the shape down to the bottom of the glass so it fills below the wave
    d += ` L ${endX} ${glassBottom} L ${startX} ${glassBottom} Z`;
    return d;
  };

  // Visual tuning
  const waveAmp1 = 4;
  const waveAmp2 = 7;
  const wavelength = 28; // smaller = more waves

  return (
    <div className="vessel-container" style={{ width: size, height: size * 1.1 }}>
      <svg viewBox="0 0 200 240" width={size} height={size * 1.1} className="overflow-visible">
        <defs>
          {/* Clip path for cylindrical glass with subtle taper */}
          <clipPath id="water-glass-clip">
            <path d={`
              M ${innerLeft} ${glassTop}
              Q ${innerLeft - 4} ${glassTop + glassHeight * 0.65} ${innerLeft + 6} ${glassBottom}
              Q 100 ${glassBottom + 6} ${innerRight - 6} ${glassBottom}
              Q ${innerRight + 4} ${glassTop + glassHeight * 0.65} ${innerRight} ${glassTop}
              Z
            `} />
          </clipPath>

          {/* Glass body gradient */}
          <linearGradient id="water-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--water-vessel))" stopOpacity="0.55" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#f7faff" stopOpacity="0.18" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--water-vessel))" stopOpacity="0.55" />
          </linearGradient>

          {/* Water gradient (lighter at surface) */}
          <linearGradient id="water-liquid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--water-liquid))" stopOpacity="0.9" />
            <stop offset="35%" stopColor="hsl(var(--water-liquid))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--water-accent))" stopOpacity="0.9" />
          </linearGradient>

          {/* Rim shading */}
          <radialGradient id="rim-shade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c9d6e8" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy={glassBottom + 14} rx="46" ry="8" fill="#00000022" />

        {/* Glass body */}
        <path
          d={`
            M ${innerLeft} ${glassTop}
            Q ${innerLeft - 4} ${glassTop + glassHeight * 0.65} ${innerLeft + 6} ${glassBottom}
            Q 100 ${glassBottom + 6} ${innerRight - 6} ${glassBottom}
            Q ${innerRight + 4} ${glassTop + glassHeight * 0.65} ${innerRight} ${glassTop}
            Z
          `}
          fill="url(#water-glass-body)"
        />

        {/* Liquid with wavy surface inside clip */}
        <g clipPath="url(#water-glass-clip)">
          {fillPercentage > 0 && (
            <>
              {/* Base water fill as fallback to ensure full color */}
              <rect
                x={innerLeft}
                y={liquidTop}
                width={innerWidth}
                height={glassBottom - liquidTop}
                fill="url(#water-liquid-gradient)"
              />

              {/* Wave layer 1 */}
              <path
                d={buildWavePath(liquidTop, waveAmp2, wavelength, 0)}
                fill="url(#water-liquid-gradient)"
                opacity="0.9"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="-28 0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Wave layer 2 (parallax, opposite direction) */}
              <path
                d={buildWavePath(liquidTop + 1.5, waveAmp1, wavelength * 1.2, wavelength / 2)}
                fill="url(#water-liquid-gradient)"
                opacity="0.7"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="28 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>
            </>
          )}

          {/* Caustic-like soft highlight on water surface */}
          {fillPercentage > 2 && (
            <ellipse
              cx="100"
              cy={liquidTop + 2}
              rx={innerWidth / 2 - 4}
              ry="6"
              fill="#ffffff"
              opacity="0.2"
            />
          )}
        </g>

        {/* Rim */}
        <ellipse cx="100" cy={glassTop} rx={innerWidth / 2} ry="7" fill="url(#rim-shade)" />

        {/* Inner rim */}
        <ellipse cx="100" cy={glassTop} rx={innerWidth / 2 - 6} ry="4" fill="#ffffff" opacity="0.55" />

        {/* Edge outline and subtle shine */}
        <path
          d={`
            M ${innerLeft} ${glassTop}
            Q ${innerLeft - 4} ${glassTop + glassHeight * 0.65} ${innerLeft + 6} ${glassBottom}
            Q 100 ${glassBottom + 6} ${innerRight - 6} ${glassBottom}
            Q ${innerRight + 4} ${glassTop + glassHeight * 0.65} ${innerRight} ${glassTop}
          `}
          fill="none"
          stroke="hsl(var(--water-vessel))"
          strokeWidth="2"
          opacity="0.55"
        />

        {/* Left vertical shine */}
        <path
          d={`M ${innerLeft + 8} ${glassTop + 10} L ${innerLeft + 10} ${glassBottom - 14}`}
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Right subtle shine */}
        <path
          d={`M ${innerRight - 10} ${glassTop + 14} L ${innerRight - 8} ${glassBottom - 18}`}
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.18"
        />
      </svg>
    </div>
  );
}
