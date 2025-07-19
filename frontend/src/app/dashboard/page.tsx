"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function DashboardPage() {
  const { user, isAuthenticated } = useKindeAuth();
  const [resume, setResume] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;

    axios.post(`${BACKEND_URL}/users`, {
      id: user.id,
      email: user.email,
      username: user.email?.split("@")[0] || user.id,
    });

    axios
      .get(`${BACKEND_URL}/resumes/by-user/${user.id}`)
      .then((res) => {
        if (res.data) {
          setResume(res.data.content.text);
          setSlug(res.data.publicSlug);
        }
      })
      .catch(() => { });
  }, [user]);

  const saveResume = async () => {
    if (!user) return;
    setStatus("Saving...");
    try {
      await axios.post(`${BACKEND_URL}/resumes`, {
        userId: user.id,
        content: JSON.stringify({ text: resume }),
        slug,
      });
      setStatus("Formatted & Saved!");
    } catch (e) {
      console.error("Save failed", e);
      setStatus("Save failed");
    }
  };

  const donate = async (amount: number) => {
    const res = await axios.post(`${BACKEND_URL}/payments/create-checkout-session`, { amount });
    window.location.href = res.data.url;
  };


  if (!isAuthenticated) return <p>Redirecting...</p>;

  return (
    <>

      <header className="w-full border-b bg-white dark:bg-zinc-900 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-stone-200">ProfilePop</h1>
          <div className="text-sm">
            <Button className="bg-red-500 text-stone-100">
              <LogoutLink>LogOut</LogoutLink>
            </Button>
          </div>
        </div>
      </header>



      <div className="max-w-6xl mx-auto mt-10 flex gap-6 px-4">
  {/* Left: Resume Form */}
  <main className="flex-1 space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border shadow-sm">
    <h2 className="text-2xl font-bold tracking-tight text-stone-100">
      Welcome, {user?.given_name}
    </h2>

    <div className="space-y-4">
      <Input
        className="bg-white dark:bg-zinc-800 text-black dark:text-white"
        placeholder="Choose a public slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <Textarea
        className="bg-white dark:bg-zinc-800 text-black dark:text-white"
        placeholder="Paste your resume text..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={12}
      />

      <Button onClick={saveResume} className="w-full bg-slate-400">
        Save
      </Button>

      {status && (
        <p className="text-sm text-center text-gray-700 dark:text-stone-300">
          {status}
        </p>
      )}

      {slug && (
        <p className="text-sm text-center text-stone-100">
          Public page:{" "}
          <a
            href={`/u/${slug}`}
            className="text-blue-600 dark:text-blue-400 underline"
          >
            /u/{slug}
          </a>
        </p>
      )}
    </div>
  </main>

  {/* Right: Donate Box */}
  <aside className="w-64 p-4 bg-white dark:bg-zinc-800 border rounded-lg shadow-sm h-fit">
    <p className="text-sm text-gray-700 dark:text-stone-300 mb-2">
      Support the creator
    </p>
    <Button
      onClick={() => donate(500)}
      variant="destructive"
      className="bg-lime-600 w-full"
    >
      Donate $5
    </Button>
  </aside>
</div>
    </>
  );
}
