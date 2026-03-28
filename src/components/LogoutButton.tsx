"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-white transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Çıkış Yap
    </button>
  );
}
