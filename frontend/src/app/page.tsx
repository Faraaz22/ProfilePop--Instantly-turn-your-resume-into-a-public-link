"use client";

import { useEffect } from "react";
import { useRouter } from "next/compat/router"; // ✅ correct for latest compat mode
import { useKindeAuth, LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const { isAuthenticated, user } = useKindeAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isAuthenticated && router) {
  //     router.push("/dashboard");
  //   }
  // }, [isAuthenticated, router]);

  console.log("Auth state", { isAuthenticated, user });

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center bg-white dark:bg-zinc-900 border border-border rounded-xl p-8 shadow-md">
        <h1 className="text-4xl font-bold text-primary text-white">ProfilePop</h1>

        {!isAuthenticated ? (
          <div className="space-y-4 w-full">
  <Button
    asChild
    variant="default"
    className="w-full text-base py-6 font-semibold tracking-wide bg-slate-300"
  >
    <LoginLink>Login</LoginLink>
  </Button>

  <Button
    asChild
    variant="outline"
    className="w-full text-base py-6 font-semibold tracking-wide bg-slate-300 border-gray-300 dark:border-gray-700"
  >
    <RegisterLink>Sign Up</RegisterLink>
  </Button>
</div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Welcome, <span className="font-medium">{user?.given_name}</span>
            </p>
            <Link
              href="/dashboard"
              className="inline-block text-blue-600 dark:text-blue-400 underline hover:opacity-80"
            >
              Go to Dashboard
            </Link>
            <Button asChild className="w-full bg-red-600" variant="destructive">
              <LogoutLink >Logout</LogoutLink>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
