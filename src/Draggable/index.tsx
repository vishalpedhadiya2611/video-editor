/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/prefer-read-only-props */
import React, { useState } from "react";

interface DraggableProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  width = "100px",
  height = "50px",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width,
          height,
          cursor: "grab",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Draggable;
