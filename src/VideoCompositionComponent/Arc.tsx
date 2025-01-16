import { useState } from "react";
import { random, useVideoConfig } from "remotion";

const getCircumferenceOfArc = (rx: number, ry: number) => {
  return Math.PI * 2 * Math.sqrt((rx * rx + ry * ry) / 2);
};

const rx = 135;
const ry = 300;
const cx = 960;
const cy = 540;
const arcLength = getCircumferenceOfArc(rx, ry);
const strokeWidth = 30;

export const Arc: React.FC<{
  progress: number;
  rotation: number;
  rotateProgress: number;
}> = ({ progress, rotation, rotateProgress }) => {
  const { width, height } = useVideoConfig();
  const [gradientId] = useState(() => String(random(null)));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        transform: `rotate(${rotation * rotateProgress}deg)`,
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#91EAE4" />
          <stop offset="100%" stopColor="#86A8E7" />
        </linearGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeDasharray={arcLength}
        strokeDashoffset={arcLength - arcLength * progress}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
