import { FC, useEffect, useRef } from "react";
import { useCanvasContext } from "../hooks/useCanvas";
import useResponsiveSize from "../hooks/useResponsiveSize";
import { NetworkAnimation } from "../utils/networkAnimation";

type NetworkGraphAnimationProps = {
  color?: string;
  particleCount?: number;
};

const NetworkGraphAnimation: FC<NetworkGraphAnimationProps> = ({
  color = "#18D3C5",
  particleCount = 50,
}) => {
  const { context } = useCanvasContext();
  const { width, height } = useResponsiveSize();
  const animRef = useRef<NetworkAnimation | null>(null);

  useEffect(() => {
    if (width > 0 && height > 0) {
      animRef.current = new NetworkAnimation(color, particleCount, 150);
      animRef.current.init(width, height);
    }
  }, [width, height, color, particleCount]);

  const render = () => {
    if (context && animRef.current) {
      context.clearRect(0, 0, width, height);
      animRef.current.draw(context, width, height);
    }
    requestAnimationFrame(render);
  };

  useEffect(() => {
    let animationFrameId: number;
    const reqRender = () => {
      render();
    };
    if (context) {
      animationFrameId = requestAnimationFrame(reqRender);
    }
    return () => cancelAnimationFrame(animationFrameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return null;
};

export default NetworkGraphAnimation;
