"use client";

import { signIn } from "next-auth/react";
import { Activity } from "lucide-react";

export default function LoginButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => signIn("strava")}
      className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-orange-600 to-rose-600 px-10 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_10px_rgba(234,88,12,0.4)] cursor-pointer text-lg"
    >
      <span className="mr-3">
        <Activity className="w-6 h-6 group-hover:animate-pulse" />
      </span>
      {text}
    </button>
  );
}
