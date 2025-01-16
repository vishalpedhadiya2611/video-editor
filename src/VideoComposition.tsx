import { spring } from "remotion";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "./VideoCompositionComponent/Logo";
import { Title } from "./VideoCompositionComponent/Title";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { useRef, useState } from "react";

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
});

export const VideoComposition: React.FC<{
  titleText: string;
  titleColor: string;
}> = ({ titleText: propOne, titleColor: propTwo }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const [position, setPosition] = useState({ x: 750, y: 700 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    let newX = e.clientX - rect.width / 2;
    let newY = e.clientY - rect.height / 2;

    newX = Math.max(
      containerRect.left,
      Math.min(newX, containerRect.right - rect.width),
    );
    newY = Math.max(
      containerRect.top,
      Math.min(newY, containerRect.bottom - rect.height),
    );

    setPosition({
      x: newX - containerRect.left,
      y: newY - containerRect.top,
    });
  };

  const logoTranslationProgress = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 100,
    },
  });

  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [0, -150],
  );

  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      ref={containerRef}
      className="bg-white h-full w-full relative overflow-hidden"
    >
      <div style={{ opacity }} className="h-full">
        <div
          style={{ transform: `translateY(${logoTranslation}px)` }}
          className="h-full"
        >
          <Logo />
        </div>
        <div
          draggable
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            color: propTwo,
          }}
          onDragEnd={handleDrag}
        >
          <Sequence from={35}>
            <Title titleText={propOne} titleColor={propTwo} />
          </Sequence>
        </div>
      </div>
    </div>
  );
};
