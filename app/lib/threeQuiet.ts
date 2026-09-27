"use client";

/* Modul ini hanya di-import dari komponen yang memuat three.js (mis.
   SceneCanvas / scene layers) supaya import `three` tidak ikut ke bundle
   dasar route. @react-three/fiber@9 masih membuat THREE.Clock di store internal,
   sedangkan three>=r183 menandai Clock sebagai deprecated (pengganti: THREE.Timer).
   Fiber belum menyediakan Clock kustom, jadi constructor Clock selalu terpanggil
   dan warning-nya tidak bisa dihindari dari sisi aplikasi. three mengekspor
   setConsoleFunction() sebagai redirection resmi pesan THREE.*, jadi kita pakai
   untuk menyaring satu pesan deprecation ini saja. Pesan lain tetap diteruskan
   ke console apa adanya. */
import { setConsoleFunction } from "three";

setConsoleFunction((type, message, ...rest) => {
  if (
    type === "warn" &&
    typeof message === "string" &&
    message.includes("Clock: This module has been deprecated")
  ) {
    return;
  }
  console[type === "error" ? "error" : type === "log" ? "log" : "warn"](
    message,
    ...rest,
  );
});
