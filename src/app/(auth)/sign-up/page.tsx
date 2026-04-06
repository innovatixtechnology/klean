import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm mode="sign-up" />
    </Suspense>
  );
}
