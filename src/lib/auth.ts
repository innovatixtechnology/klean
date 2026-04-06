import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      console.log(user, url);
    },
    autoSignIn: true,
  },
  socialProviders: {},
  rateLimit: {
    enabled: true,
    max: 10,
    window: 60 * 5,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  plugins: [
    nextCookies(),
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    debugLogs: false,
  }),
  account: {
    encryptOAuthTokens: true,
    storeAccountCookie: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
      allowDifferentEmails: false,
    },
    fields: {
      accountId: "id",
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
      image: {
        type: "string",
        required: false,
      },
    },
    fields: {
      name: "firstName",
      emailVerified: "isVerified",
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        // Add welcome email or other post-signup logic here
        console.log("New user signed up:", ctx.path);
      }
    }),
  },
  databaseHooks: {},
  advanced: {
    database: {
      generateId: false,
    },
  },
});
