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
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        Halaman perlu dimuat ulang
      </p>
      <h1 className="font-heading type-h2 max-w-xl text-ink">
        Terjadi kendala saat menampilkan halaman.
      </h1>
      <button
        type="button"
        onClick={() => retry()}
        className="inline-flex min-h-11 items-center justify-center rounded-control bg-accent px-7 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Coba lagi
      </button>
    </main>
  );
}
