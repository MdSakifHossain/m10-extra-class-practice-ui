// @ts-nocheck

import { useEffect, useState } from "react";

const GhostCursor = ({ className = "" }) => {
  // Always start bottom-right
  const [position, setPosition] = useState({ x: 9000, y: 5000 });

  useEffect(() => {
    const handleMove = (e) => {
      // ONLY follow if it's a real mouse
      if (e.pointerType === "mouse") {
        setPosition({ x: e.clientX, y: e.clientY });
      }
      // Touch/pen? Do nothing → stays at position states value.
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-99999 pointer-events-none duration-75 ease-out"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className="relative -top-2.5 -left-3 grid place-items-center">
        <span className={`rounded-full size-4 bg-red-500 ${className}`} />
        <span
          className={`absolute rounded-full opacity-60 size-8 bg-red-500 animate-ping ${className}`}
        />
      </div>
    </div>
  );
};

export default GhostCursor;
