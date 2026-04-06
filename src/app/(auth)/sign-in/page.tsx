import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm mode="sign-in" />
    </Suspense>
  );
}
