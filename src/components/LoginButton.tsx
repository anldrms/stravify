"use client";

import { signIn } from "next-auth/react";
import { Activity } from "lucide-react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("strava")}
      className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-orange-600 px-8 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-[0_0_40px_8px_rgba(234,88,12,0.5)] cursor-pointer"
    >
      <span className="mr-2">
        <Activity className="w-5 h-5 group-hover:animate-pulse" />
      </span>
      Strava ile Bağlan
    </button>
  );
}
