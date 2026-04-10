import {
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
import type { auth } from "./auth";
export const { signIn, signUp, signOut, useSession, getSession, accountInfo } =
  createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()],
    fetchOptions: {
      onError(e) {
        if (e.error.status === 429) {
          toast.error("Too many requests. Please try again later.");
        }
      }
    },
  });
