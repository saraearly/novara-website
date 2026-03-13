import { FC } from "react";
import { useCanvasContext } from "../hooks/useCanvas";
import useResponsiveSize from "../hooks/useResponsiveSize";
import HexNetObj from "../utils/hexNet";

const HexNetAnimation: FC = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 700; // Match hero height roughly
  let time = 0;

  // Create layers for depth
  const net = new HexNetObj("rgba(123, 47, 247, 0.4)"); // Purple-ish

  // Actually, let's just stick to one net for now or modify the class to handle multiple better
  // The class I wrote creates a fixed grid. If I want multiple, I might need to offset them.
  // Let's stick to one complex one for performance first.

  const render = () => {
    context?.clearRect(0, 0, width, height);

    // Draw
    net.draw(context!, width, height, time);

    time += 0.02;
    requestAnimationFrame(render);
  };

  if (context) render();

  return null;
};

export default HexNetAnimation;
