"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/stores/session";
import type { User } from "@/db/schema";

interface IProps {
  initialSession: User | null;
  children: React.ReactNode;
}

export function SessionHydrator({ initialSession, children }: IProps) {
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession, setSession]);

  return children;
}