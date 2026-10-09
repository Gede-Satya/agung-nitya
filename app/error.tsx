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
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-canvas px-6 text-center">
      <p className="type-eyebrow text-muted">Halaman perlu dimuat ulang</p>
      <h1 className="type-h2 max-w-xl text-ink">
        Terjadi kendala saat menampilkan halaman.
      </h1>
      <button
        type="button"
        onClick={() => retry()}
        className="inline-flex min-h-11 items-center rounded-full bg-blue px-7 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
      >
        Coba lagi
      </button>
    </main>
  );
}
