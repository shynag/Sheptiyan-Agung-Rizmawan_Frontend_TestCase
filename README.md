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

## 🛠️ Alasan Pemilihan Pendekatan Teknis

Beberapa pertimbangan arsitektur yang diterapkan dalam pengerjaan proyek ini:

1. **Hybrid Rendering Strategy (Server & Client Separation)**
   - **Keputusan:** Halaman root dashboard memanfaatkan Server Component untuk parsing dataset awal, sementara interaktivitas (pencarian, rendering SVG Recharts, dan auth guard) diisolasi ke dalam Client Component (`'use client'`).
   - **Alasan:** Meminimalkan ukuran bundle JavaScript di sisi browser sembari menjaga komponen interaktif tetap modular dan reaktif.

2. **Client-Side Auth Guard vs Server Middleware**
   - **Keputusan:** Menggunakan `DashboardLayout` dan `LoginPage` berbasis `useEffect` + `localStorage` guard, bukan Next.js Edge Middleware.
   - **Alasan:** API autentikasi publik (DummyJSON) mengembalikan token yang hanya bisa disimpan di `localStorage` pada *client context* (bukan *HttpOnly session cookie*). Karena Server Middleware Next.js tidak memiliki akses ke `localStorage`, validasi sesi di sisi client dengan penanganan status loading (*flicker prevention*) adalah solusi paling pragmatis dan reliabel tanpa over-engineering backend proxy.

3. **Shadcn UI & Tailwind CSS untuk Kebutuhan Enterprise**
   - **Keputusan:** Memakai kombinasi Shadcn UI (Radix primitives) dan Tailwind CSS dengan tema Light Mode konsisten.
   - **Alasan:** Dashboard operasional sales menuntut keterbacaan data yang padat (*high data density*). Radix UI menjamin aksesibilitas keyboard dan struktur DOM yang bersih, sementara Tailwind mempermudah kontrol kontras visual (badge pastel untuk status, border tipis, dan hirarki tipografi) tanpa runtime overhead CSS-in-JS.

4. **Visualisasi Data dengan Recharts**
   - **Keputusan:** Menggunakan Recharts untuk chart perbandingan efektivitas sales.
   - **Alasan:** Sifatnya yang deklaratif mempermudah integrasi dengan state React. Penggunaan `<ResponsiveContainer>` dan konfigurasi `maxBarSize` memastikan grafik tetap proporsional di berbagai resolusi layar (laptop, monitor ultra-wide, hingga tablet).

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