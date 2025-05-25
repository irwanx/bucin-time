"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900 max-w-screen-md">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Tak Ditemukan Hasil
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Laman yang Anda cari tidak dapat ditemukan. Cobalah mencari
          menggunakan kata kunci lain, atau gunakan menu navigasi di atas untuk
          menemukan postingan yang Anda inginkan.
        </p>
        <Button onClick={() => router.back()}>
          Kembali ke Halaman Sebelumnya
        </Button>
      </div>
    </div>
  );
}
