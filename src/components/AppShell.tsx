import { auth } from "@/lib/auth";
import { SessionHydrator } from "./SessionHydrator";
import { headers } from "next/headers";

interface IProps {
  children: React.ReactNode
}

export default async function AppShell({ children }: Readonly<IProps>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <SessionHydrator initialSession={session?.user as any ?? null}>
      {children}
    </SessionHydrator>
  );
}