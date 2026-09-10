# Distrilink SAP — Sales Distribution Monitoring Dashboard

Aplikasi web dashboard monitoring operasional sales lapangan (*canvasser*) berbasis Next.js App Router, Tailwind CSS, dan Shadcn UI. Platform ini dirancang untuk membantu supervisor menganalisis efektivitas rute kunjungan outlet harian, akumulasi nilai order (*taking order*), serta deteksi risiko stok kosong (*Out of Stock* / OOS) secara terpusat.

---

## 🌐 Live Demo

Aplikasi sudah dideploy dan dapat diakses langsung tanpa setup lokal:
🔗 **[distrilink-blush.vercel.app](https://distrilink-blush.vercel.app)**

---

## 🔑 Kredensial Pengujian (Demo Account)

Aplikasi terintegrasi dengan endpoint autentikasi DummyJSON (`https://dummyjson.com/auth/login`):

| Parameter | Nilai Uji Coba | Keterangan |
| :--- | :--- | :--- |
| **Username** | `emilys` | Akun supervisor demo |
| **Password** | `emilyspass` | Kredensial valid DummyJSON |

> *Catatan: Sistem memvalidasi status respons HTTP dan memicu pesan kesalahan kontekstual jika kredensial salah atau koneksi internet bermasalah.*

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Authentication Source:** DummyJSON Auth API

---

## 🛠️ Keputusan & Pendekatan Teknis

- **Pemisahan Server & Client Component (App Router):** Halaman root dashboard memakai Server Component untuk membaca dataset awal, sedangkan interaktivitas (filter/search, Recharts, dan auth guard) diisolasi ke Client Component (`'use client'`) agar ukuran bundle JavaScript di browser tetap ramping.
- **Client-Side Auth Guard di Layout:** DummyJSON API mengembalikan token berbasis client (`localStorage`), bukan *HttpOnly session cookie*. Karena Next.js Edge Middleware tidak punya akses ke `localStorage`, proteksi rute diimplementasikan pada `DashboardLayout` dan `LoginPage` dengan *loading fallback* untuk mencegah kebocoran tampilan (*flicker*).
- **Shadcn UI & Tailwind CSS:** Dipilih untuk menangani tampilan dashboard dengan kepadatan data tinggi (*high data density*). Primitif Radix UI memastikan aksesibilitas keyboard dan struktur DOM yang bersih, sementara Tailwind memudahkan kontrol kontras visual (status badge pastel, border lembut) tanpa overhead runtime.
- **Visualisasi dengan Recharts:** Memanfaatkan `<ResponsiveContainer>` dan pembatasan lebar batang (`maxBarSize`) agar visualisasi perbandingan efektivitas sales tetap proporsional dan tidak *overflow* di berbagai ukuran layar (mobile, tablet, desktop).

---

## ⚙️ Panduan Menjalankan Project Secara Lokal

Ikuti langkah-langkah berikut untuk menginstal dependensi dan menjalankan aplikasi di lingkungan lokal:

### 1. Prasyarat Sistem
Pastikan perangkat kamu sudah terpasang:
- **Node.js**: Versi `18.17.0` atau yang lebih baru (disarankan Node LTS).
- **Package Manager**: `npm` (bawaan Node.js), `pnpm`, atau `yarn`.
- **Git** untuk *cloning* repositori.

### 2. Clone Repositori
Buka terminal dan unduh repositori proyek:
```bash
git clone https://github.com/shynag/Sheptiyan-Agung-Rizmawan_Frontend_TestCase.git
cd Sheptiyan-Agung-Rizmawan_Frontend_TestCase

```

### 3. Instalasi Dependensi

Jalankan salah satu perintah berikut untuk menginstal seluruh package yang dibutuhkan:

Menggunakan **npm**:

```bash
npm install

```

Menggunakan **pnpm**:

```bash
pnpm install

```

Menggunakan **yarn**:

```bash
yarn install

```

### 4. Menjalankan Server Development Lokal

Setelah proses instalasi dependensi selesai, jalankan server pengujian:

```bash
npm run dev
# atau pnpm dev / yarn dev

```

Buka browser dan akses alamat lokal:

```text
http://localhost:3000

```

*Aplikasi akan otomatis mengarahkan (redirect) ke halaman `/login` jika belum ada sesi supervisor yang aktif.*

### 5. Pengujian Build & Linting (Opsional)

Untuk memverifikasi kebersihan tipe TypeScript dan kesiapan produksi sebelum dinilai:

```bash
# Cek linting kode
npm run lint

# Jalankan build produksi
npm run build

# Menjalankan build produksi secara lokal
npm run start

```