# 💌 Bucin Time - React & Next.js

![GitHub stars](https://img.shields.io/github/stars/irwanx/bucin-time?style=social)
![GitHub forks](https://img.shields.io/github/forks/irwanx/bucin-time?style=social)
![Last commit](https://img.shields.io/github/last-commit/irwanx/bucin-time)
![License](https://img.shields.io/github/license/irwanx/bucin-time)
![Views](https://visitor-badge.laobi.icu/badge?page_id=irwanx.bucin-time)

Proyek ini adalah aplikasi kartu ucapan romantis berbasis web yang dibuat menggunakan **Next.js**, **React**, **Tailwind CSS**, dan **TypeScript**. Cocok untuk mengirim ucapan cinta, ulang tahun, atau pesan manis secara online.

---


## ✨ Fitur Utama

- 💖 Latar belakang animasi yang memanjakan mata
- ✍️ Ucapan romantis yang dapat dikustomisasi sesuai momen
- ⚛️ Komponen modular berbasis React
- ⚡ Routing cepat dan fleksibel dengan Next.js App Router
- 🎨 Desain modern dan responsif menggunakan Tailwind CSS
- 📱 Tampilan optimal di semua ukuran layar (mobile-friendly)

---

## 🛠️ Teknologi yang Digunakan

- [Next.js (App Router)](https://nextjs.org/) – Framework React untuk routing dan rendering modern
- [React](https://reactjs.org/) – Library UI berbasis komponen
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework untuk desain yang cepat dan responsif
- [TypeScript](https://www.typescriptlang.org/) – Superset JavaScript yang mendukung type checking
- [pnpm](https://pnpm.io/) – Manajer paket modern yang cepat dan efisien
- [LUMINAI](https://luminai.my.id) – Layanan AI lokal Indonesia untuk menghasilkan ucapan otomatis berdasarkan prompt

---

## 🚀 Cara Menjalankan Proyek

### 1. Prasyarat

Pastikan Anda telah menginstal:

- **Node.js** versi ≥ 18
- **pnpm** (direkomendasikan)

Untuk menginstal `pnpm`:

```bash
npm install -g pnpm
```

### 2. Kloning Repository

```bash
git clone https://github.com/namapengguna/bucin-time.git
cd bucin-time
```

### 3. Menginstal Dependensi

```bash
pnpm install
```

### 4. Menjalankan Aplikasi

```bash
pnpm dev
```
Aplikasi akan berjalan di: http://localhost:3000

---
## ✏️ Cara Mengubah Gaya Pesan Ucapan

Aplikasi ini menghasilkan ucapan romantis secara dinamis menggunakan prompt yang ditulis di file `actions/luminai.ts`.

### 🔧 Langkah-langkah:

1. Buka file: `actions/luminai.ts`
2. Cari bagian kode di sekitar **baris 14–19**:
   Di sinilah prompt (instruksi) untuk membuat ucapan ditulis.
3. Ubah isi dari properti `content` sesuai gaya ucapan yang kamu inginkan:
   - Bisa formal, lucu, puitis, gombal, dsb.
   - Bisa pakai bahasa Indonesia, campur Inggris, atau bebas.

### 📝 Contoh Prompt:

```ts
const requestData = {
  content: `Bikinin ucapan ${waktu} yang super duper manis, romantis, dan bikin melting untuk ayangku ${userName} dong 😍💖. Buat dalam beberapa kalimat pendek, masing-masing berdiri sendiri, biar vibes-nya kerasa satu-satu 🥹💕. Tambahin emoji yang bikin hati klepek-klepek di setiap kalimat 😘✨. Balas dalam bentuk array berisi string kalimat pendek ['kalimat1', 'kalimat2', 'kalimat3', ...] tanpa tambahan teks lain, isi array minimal 6 kalimat.`,
  user: userName,
  prompt:
    "Balas dalam bentuk array berisi string kalimat pendek ['kalimat1','kalimat2','kalimat3',...] tanpa tambahan teks lain. Boleh campur bahasa Indonesia dan Inggris, yang penting romantis dan nggak kaku. Jangan ada kalimat sama atau terlalu panjang.",
};
```
---

## 📁 Struktur Proyek

```bash
app/                    # Routing dan halaman utama
components/             # Komponen UI modular
actions/                # Server Actions / API
public/                 # Aset statis seperti gambar & lagu
tailwind.config.ts      # Konfigurasi Tailwind CSS
tsconfig.json           # Konfigurasi TypeScript
```
---

## 🤝 Kontribusi

Kontribusi sangat dialu-alukan! Silakan fork, buat pull request, atau tambahkan fitur/tema baru sesuai kreativitas Anda.
---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE), yang berarti bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan pribadi maupun komersial.

---

## ❤️ Penutup

Proyek ini dibuat dengan sepenuh hati untuk membantu siapa saja mengekspresikan perasaan melalui teknologi. Kirim cinta, rayakan hari-hari spesial, atau cukup buat seseorang tersenyum — cukup dengan satu halaman web sederhana.

Semoga setiap baris kode ini bisa menyampaikan rasa yang tak bisa diucapkan. 💌