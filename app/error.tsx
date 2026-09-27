"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-deep-canvas px-6 text-center">
      <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
        Sistem perlu dimuat ulang
      </span>
      <h2 className="max-w-xl font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-tight tracking-tight text-ivory-text">
        Terjadi kesalahan saat menampilkan halaman.
      </h2>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-full bg-healthcare-blue px-7 py-3 text-sm font-medium text-pure-white transition-colors hover:bg-[#6d8aff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue"
      >
        Coba lagi
      </button>
    </div>
  );
}
