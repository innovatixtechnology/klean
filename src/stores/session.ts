import { create } from "zustand";
import type { User } from "@/db/schema";

interface SessionState {
  session: User | null;
  setSession: (user: User | null) => void;
  clearSession: () => void;

}

export const useSessionStore = create<SessionState>()(
  (
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),

    })
  )
)