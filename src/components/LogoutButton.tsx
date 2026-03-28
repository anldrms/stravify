"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-400 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-white transition-all shadow-lg hover:shadow-orange-500/20"
    >
      <LogOut className="w-4 h-4" />
      {text}
    </button>
  );
}
