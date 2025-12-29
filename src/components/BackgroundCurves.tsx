import React from "react";

const BackgroundCurves: React.FC = () => {
  return (
    <div className="pointer-events-none select-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        aria-hidden
        role="img"
        viewBox="0 0 1440 900"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        className="opacity-60 [mask-image:radial-gradient(100%_60%_at_50%_40%,#000,transparent)]"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(25 55% 50%)" stopOpacity="0.35" />
            <stop offset="50%" stopColor="hsl(28 50% 45%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(22 50% 40%)" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="curveGradientDark" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(28 45% 60%)" stopOpacity="0.18" />
            <stop offset="50%" stopColor="hsl(28 45% 55%)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="hsl(25 45% 60%)" stopOpacity="0.18" />
          </linearGradient>
          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Light theme strokes */}
        <g className="dark:hidden" filter="url(#soften)">
          <path d="M-50 180 C 220 120, 420 220, 720 180 S 1220 120, 1530 190" stroke="url(#curveGradient)" strokeWidth="3" fill="none" />
          <path d="M-60 360 C 260 300, 520 420, 820 360 S 1300 300, 1540 380" stroke="url(#curveGradient)" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M-70 560 C 180 520, 520 620, 840 580 S 1340 520, 1560 600" stroke="url(#curveGradient)" strokeWidth="2.5" fill="none" opacity="0.65" />
          <path d="M-40 740 C 240 700, 440 820, 820 780 S 1300 720, 1540 800" stroke="url(#curveGradient)" strokeWidth="2" fill="none" opacity="0.55" />
        </g>

        {/* Dark theme strokes */}
        <g className="hidden dark:block" filter="url(#soften)">
          <path d="M-50 180 C 220 120, 420 220, 720 180 S 1220 120, 1530 190" stroke="url(#curveGradientDark)" strokeWidth="3" fill="none" />
          <path d="M-60 360 C 260 300, 520 420, 820 360 S 1300 300, 1540 380" stroke="url(#curveGradientDark)" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M-70 560 C 180 520, 520 620, 840 580 S 1340 520, 1560 600" stroke="url(#curveGradientDark)" strokeWidth="2.5" fill="none" opacity="0.75" />
          <path d="M-40 740 C 240 700, 440 820, 820 780 S 1300 720, 1540 800" stroke="url(#curveGradientDark)" strokeWidth="2" fill="none" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};

export default BackgroundCurves;
