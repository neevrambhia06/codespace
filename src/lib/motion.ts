import {
  animate,
  createTimeline,
  createDraggable,
  createSpring,
  createScope,
  onScroll,
  stagger,
} from "animejs";
import { createDrawable, createMotionPath, morphTo } from "animejs/svg";

export {
  animate,
  createTimeline,
  createDraggable,
  createSpring,
  createScope,
  onScroll,
  stagger,
  createDrawable,
  createMotionPath,
  morphTo,
};

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Universal anime wrapper supporting both v3 and v4 paradigms
 */
export const anime = Object.assign(
  function anime(params: Record<string, any>) {
    if (prefersReducedMotion()) return null;
    const { targets, ...rest } = params;
    return animate(targets, rest as any);
  },
  {
    timeline: (params?: Record<string, any>) => createTimeline(params as any),
    stagger,
    animate,
    createDraggable,
    createSpring,
    createScope,
    onScroll,
    createDrawable,
    createMotionPath,
    morphTo,
  }
);

/**
 * Smoothly count up a number from 0 to target value using anime.js
 */
export function animateCounter(
  element: HTMLElement | null,
  targetValue: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  } = {}
) {
  if (!element) return;
  const { duration = 1200, prefix = "", suffix = "", decimals = 0 } = options;

  if (prefersReducedMotion()) {
    element.textContent = `${prefix}${targetValue.toFixed(decimals)}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  return animate(obj, {
    val: targetValue,
    duration,
    ease: "outExpo",
    onUpdate: () => {
      const formatted =
        decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toString();
      element.textContent = `${prefix}${formatted}${suffix}`;
    },
  });
}

/**
 * Attaches a one-time scroll reveal animation to an element using IntersectionObserver & anime.js
 */
export function observeAndAnimate(
  element: HTMLElement | null,
  animationCallback: () => void,
  threshold = 0.15
) {
  if (!element || typeof window === "undefined") return () => {};

  if (prefersReducedMotion()) {
    animationCallback();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animationCallback();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);
  return () => observer.disconnect();
}
