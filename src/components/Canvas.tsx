import { useRef, FC, useEffect, useState, ReactNode } from "react";

import { CanvasContext } from "../hooks/useCanvas";
import useResponsiveSize from "../hooks/useResponsiveSize";

interface CanvasProps {
  children?: ReactNode;
  height?: number;
  className?: string;
}

const Canvas: FC<CanvasProps> = ({ children, height = 220, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width } = useResponsiveSize();
  const [context, setContext] = useState<
    CanvasRenderingContext2D | undefined
  >();

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (ctx) setContext(ctx);
  }, []);

  return (
    <CanvasContext.Provider value={{ context }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
      />
      {children}
    </CanvasContext.Provider>
  );
};

export default Canvas;
