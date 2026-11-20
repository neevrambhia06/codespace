import { useState, useEffect } from 'react';


/**
 * A hook to safely read from the persisted Zustand store without causing
 * hydration mismatch errors during Next.js SSR.
 * 
 * Usage:
 * const sidebarCollapsed = useStoreHydration(useWorkspaceStore, (state) => state.sidebarCollapsed);
 */
export function useStoreHydration<T, F>(
  store: (callback: (state: T) => void) => unknown,
  callback: (state: T) => F
) {
  const result = store(callback) as F;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  return isHydrated ? result : undefined;
}
