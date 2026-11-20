import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
  // UI Preferences
  sidebarCollapsed: boolean;
  compactMode: boolean;
  
  // Local Filters
  projectFilter: 'all' | 'active' | 'archived';
  taskFilter: 'all' | 'pending' | 'completed';
  
  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleCompactMode: () => void;
  setProjectFilter: (filter: 'all' | 'active' | 'archived') => void;
  setTaskFilter: (filter: 'all' | 'pending' | 'completed') => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      compactMode: false,
      projectFilter: 'all',
      taskFilter: 'all',

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleCompactMode: () =>
        set((state) => ({ compactMode: !state.compactMode })),
      setProjectFilter: (filter) => set({ projectFilter: filter }),
      setTaskFilter: (filter) => set({ taskFilter: filter }),
    }),
    {
      name: 'workspace-storage', // name of the item in the storage (must be unique)
      // localStorage is used by default
    }
  )
);
