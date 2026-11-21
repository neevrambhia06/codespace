"use client";

import { useEffect, useRef, useState } from "react";

interface NeoLeafLoaderProps {
  /** Optional callback fired when the zoom-through exit animation completes */
  onComplete?: () => void;
  /** Whether to auto-complete after the target duration (default: true) */
  autoComplete?: boolean;
  /** Target duration in ms to reach 100% (default: 1800ms) */
  duration?: number;
  /** Whether the destination page is mounted & ready in the background (default: true) */
  isReady?: boolean;
}

export function NeoLeafLoader({
  onComplete,
  autoComplete = true,
  duration = 1800,
  isReady = true,
}: NeoLeafLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkBoxRef = useRef<HTMLDivElement>(null);

  const isReadyRef = useRef(isReady);
  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;
    const startTime = performance.now();

    // High-resolution canvas coordinate system
    const baseWidth = 1000;
    const baseHeight = 220;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;
    ctx.scale(dpr, dpr);

    let currentProgress = 0;
    let exitTriggered = false;

    // Font definition: bold modern typography
    const fontString =
      '900 138px "Plus Jakarta Sans", "Bricolage Grotesque", -apple-system, BlinkMacSystemFont, sans-serif';

    const render = (now: number) => {
      const elapsed = now - startTime;

      // Smooth progress advancement synchronized with elapsed duration
      if (autoComplete) {
        const t = Math.min(elapsed / duration, 1);
        let target = t * 100;
        // If destination page is still loading in background, hold gracefully at 98%
        if (!isReadyRef.current && target >= 98) {
          target = 98;
        }
        currentProgress += (target - currentProgress) * 0.18;
        if (t >= 1 && isReadyRef.current) currentProgress = 100;
      } else {
        currentProgress += (95 - currentProgress) * 0.05;
      }

      const displayVal = Math.min(Math.round(currentProgress), 100);
      setProgress(displayVal);

      // Amplitude: settles smoothly from 20px down to 8px near completion
      const amplitude = Math.max(8, 20 * (1 - currentProgress / 115));

      // Synchronize water level precisely with the 0 -> 100 percentage:
      // The uppercase letters for 138px font span from y ≈ 62 (top) to y ≈ 168 (baseline)
      // At 0%: waterline is at baseline + amplitude (empty)
      // At 50%: waterline is halfway up the letters
      // At 100%: waterline reaches top of letters - amplitude (100% full right at 100%)
      const textTop = 62;
      const textBottom = 168;
      const startWaterline = textBottom + amplitude * 0.7;
      const endWaterline = textTop - amplitude * 0.6;
      const waterline =
        startWaterline + (endWaterline - startWaterline) * (currentProgress / 100);

      // 1. Clear Frame
      ctx.clearRect(0, 0, baseWidth, baseHeight);

      // 2. Base Silhouette Wordmark in solid Soft Black (#101010)
      // Solid opacity ensures source-atop yields 100% pure, vibrant Warm Ivory fill
      ctx.save();
      ctx.font = fontString;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) {
        // @ts-ignore
        ctx.letterSpacing = "-0.03em";
      }

      // Draw the solid silhouette in Soft Black (#101010)
      ctx.fillStyle = "#101010";
      ctx.fillText("CODESPACE", baseWidth / 2, baseHeight / 2 + 6);

      // 3. Composite Liquid Waves: source-atop ensures waves ONLY draw over silhouette letters
      ctx.globalCompositeOperation = "source-atop";

      // A. Back Wave (Luminous Cream crest #FFF8EE)
      ctx.beginPath();
      ctx.fillStyle = "#FFF8EE"; // Luminous crest highlight
      ctx.moveTo(0, baseHeight);
      for (let x = 0; x <= baseWidth; x += 4) {
        const y =
          waterline -
          Math.sin(0.012 * x + phase * 0.85 + 2.0) *
            Math.sin(0.007 * x + phase * 0.85) *
            amplitude *
            0.85;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(baseWidth, baseHeight);
      ctx.lineTo(0, baseHeight);
      ctx.closePath();
      ctx.fill();

      // B. Foreground Wave (Pure Solid Warm Ivory #E6D5BD)
      ctx.beginPath();
      ctx.fillStyle = "#E6D5BD"; // Pure solid Warm Ivory text fill
      ctx.moveTo(0, baseHeight);
      for (let x = 0; x <= baseWidth; x += 3) {
        // Compound sinusoidal equation from NeoLeaf architecture
        const y =
          waterline -
          Math.sin(0.015 * x + phase) *
            Math.sin(0.008 * x + phase) *
            Math.sin(0.032 * x + phase) *
            amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(baseWidth, baseHeight);
      ctx.lineTo(0, baseHeight);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Increment wave oscillation phase
      phase += 0.038;

      // 4. Trigger Exit Transition when 100% reached and destination page is ready
      if (currentProgress >= 99.5 && isReadyRef.current && !exitTriggered) {
        exitTriggered = true;
        setIsExiting(true);

        // Flash solid Warm Ivory text at 100%
        ctx.save();
        ctx.font = fontString;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#E6D5BD";
        ctx.fillText("CODESPACE", baseWidth / 2, baseHeight / 2 + 6);
        ctx.restore();

        // Sequence exit transition
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 750);

        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        animationFrameId = requestAnimationFrame(render);
      });
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoComplete, duration, onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex select-none flex-col items-center justify-center bg-[#D5360C] text-[#E6D5BD] transition-opacity duration-700 bg-grain-orange ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading workspace..."
      role="status"
    >
      {/* Center Stage: Wordmark & Live Liquid Wave */}
      <div className="relative w-full max-w-[85%] sm:max-w-[80%] md:max-w-[760px] lg:max-w-[960px] flex flex-col items-center">
        {/* Top Minimalist Editorial Indicator */}
        <div
          className={`flex items-center gap-2 mb-4 sm:mb-6 font-mono text-[10px] tracking-[0.28em] uppercase transition-opacity duration-300 ${
            isExiting ? "opacity-0" : "opacity-75"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#101010] animate-pulse" />
          <span className="text-[#E6D5BD] font-medium">SOVEREIGN WORKSPACE // INITIALIZING</span>
        </div>

        {/* Wordmark Container with NeoLeaf Camera Punch Zoom-through */}
        <div
          ref={wordmarkBoxRef}
          className={`relative aspect-[1000/220] w-full flex items-center justify-center transition-all duration-700 ease-out ${
            isExiting
              ? "scale-[2.4] opacity-0 blur-xs"
              : "scale-100 opacity-100"
          }`}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Bottom Right Counter matching NeoLeaf layout */}
        <div
          className={`w-full flex items-center justify-end mt-2 sm:mt-3 font-mono text-xs sm:text-sm font-medium tracking-wider transition-opacity duration-300 ${
            isExiting ? "opacity-0" : "opacity-85"
          }`}
        >
          <span className="text-[#E6D5BD]/75">loading... </span>
          <span
            className="inline-block font-bold text-[#E6D5BD] text-right font-mono"
            style={{ width: "3ch" }}
          >
            {progress}
          </span>
          <span className="text-[#101010] font-bold ml-0.5">%</span>
        </div>
      </div>
    </div>
  );
}
