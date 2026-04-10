import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

interface IProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: IProps) {
  const session = await auth.api.getSession()

  if (!session?.user?.email) {
    return redirect("/sign-in")
  }

  return (
    <>
      {children}
    </>
  )
}