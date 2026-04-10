import { drizzleAdapter } from "better-auth/adapters/drizzle";
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
      role: {
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
    // before: createAuthMiddleware(async (ctx) => {
    //   // 1. Check IP address
    //   const ip =
    //     ctx.request.headers.get("x-forwarded-for")?.split(",")[0] ||
    //     ctx.request.headers.get("x-real-ip") ||
    //     "unknown";

    //   if (ip !== "unknown" && (await checkIsBlocked("IP", ip))) {
    //     throw new Error("Access denied: Your IP address has been blacklisted.");
    //   }

    //   // 2. Check Email/Phone for sign-in and sign-up
    //   if (ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/sign-up")) {
    //     const body = ctx.body as any;
    //     const email = body?.email;
    //     const phone = body?.phoneNumber;

    //     if (email && (await checkIsBlocked("EMAIL", email))) {
    //       throw new Error("Access denied: This email address is blacklisted.");
    //     }

    //     if (phone && (await checkIsBlocked("PHONE", phone))) {
    //       throw new Error("Access denied: This phone number is blacklisted.");
    //     }
    //   }
    // }),
  },
  databaseHooks: {},
  advanced: {
    database: {
      generateId: false,
    },
  },
  logger: {
    level: "debug",
  },
});
