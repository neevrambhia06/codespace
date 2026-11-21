"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useTransition,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { NeoLeafLoader } from "@/components/ui/NeoLeafLoader";

interface TransitionContextType {
  /** Navigate with full NeoLeaf preloader animation (preloads destination in background) */
  navigateWithTransition: (targetUrl: string) => void;
  /** Whether a transition or site preloader is currently active */
  isActive: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isActive: false,
});

export const usePageTransition = () => useContext(TransitionContext);

function normalizePath(path: string): string {
  return path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 1. Initial Site Preloader state (only once on initial site visit per session)
  const [isPreloading, setIsPreloading] = useState<boolean>(false);

  // 2. Route Transition state (Landing <-> Workspace spaces)
  const [transitionTarget, setTransitionTarget] = useState<string | null>(null);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const isNavigatingRef = useRef<boolean>(false);
  const [, startTransition] = useTransition();

  // Site Preloading: runs once on cold initial load of the website
  useEffect(() => {
    try {
      const hasPreloaded = sessionStorage.getItem("codespace_site_preloaded");
      if (!hasPreloaded) {
        setIsPreloading(true);
      }
    } catch {
      setIsPreloading(false);
    }
  }, []);

  const handlePreloadComplete = useCallback(() => {
    setIsPreloading(false);
    try {
      sessionStorage.setItem("codespace_site_preloaded", "true");
    } catch {}
  }, []);

  // Detect when background navigation has arrived at destination and mounted
  useEffect(() => {
    if (!transitionTarget) return;

    const normCurrent = normalizePath(pathname);
    const normTarget = normalizePath(transitionTarget);

    // If destination matches current pathname, the new page is mounted in DOM
    if (
      normCurrent === normTarget ||
      (normTarget !== "/" && normCurrent.startsWith(normTarget))
    ) {
      // Small 50ms tick to ensure React finishes DOM paint behind loader
      const timer = setTimeout(() => {
        setIsPageReady(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, transitionTarget]);

  // Watchdog safety: ensure isPageReady triggers after at most 3.2s even if network is slow
  useEffect(() => {
    if (!transitionTarget || isPageReady) return;

    const timeout = setTimeout(() => {
      setIsPageReady(true);
    }, 3200);

    return () => clearTimeout(timeout);
  }, [transitionTarget, isPageReady]);

  // Triggered when switching Landing <-> Dashboard / any other space
  const navigateWithTransition = useCallback(
    (targetUrl: string) => {
      const normCurrent = normalizePath(pathname);
      const normTarget = normalizePath(targetUrl);

      // If already on destination or currently transitioning, do nothing
      if (normCurrent === normTarget || isNavigatingRef.current) return;

      isNavigatingRef.current = true;
      setIsPageReady(false);
      setTransitionTarget(targetUrl);

      // IMMEDIATELY kick off prefetch and navigation in background behind the loader
      try {
        router.prefetch(targetUrl);
      } catch {}

      startTransition(() => {
        router.push(targetUrl);
      });
    },
    [pathname, router]
  );

  const handleTransitionComplete = useCallback(() => {
    setTransitionTarget(null);
    setIsPageReady(false);
    isNavigatingRef.current = false;
  }, []);

  const isActive = isPreloading || transitionTarget !== null;

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isActive }}>
      {/* 1. Site Preloader: plays completely on initial site visit */}
      {isPreloading && (
        <NeoLeafLoader
          duration={1900}
          autoComplete={true}
          isReady={true}
          onComplete={handlePreloadComplete}
        />
      )}

      {/* 2. Route Transition: plays while destination loads in background, zooms out instantly to new page */}
      {transitionTarget !== null && (
        <NeoLeafLoader
          key={transitionTarget}
          duration={1750}
          autoComplete={true}
          isReady={isPageReady}
          onComplete={handleTransitionComplete}
        />
      )}

      {children}
    </TransitionContext.Provider>
  );
}
