# Distrilink SAP — Sales Distribution Monitoring Dashboard

Aplikasi web dashboard monitoring operasional sales lapangan (*canvasser*) berbasis Next.js App Router, Tailwind CSS, dan Shadcn UI. Platform ini dirancang untuk membantu supervisor menganalisis efektivitas rute kunjungan outlet harian, akumulasi nilai order (*taking order*), serta deteksi risiko stok kosong (*Out of Stock* / OOS) secara terpusat.

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

## 🔑 Kredensial Pengujian (Demo Account)

Aplikasi terintegrasi dengan endpoint autentikasi DummyJSON (`https://dummyjson.com/auth/login`):

| Parameter | Nilai Uji Coba | Keterangan |
| :--- | :--- | :--- |
| **Username** | `emilys` | Akun supervisor demo |
| **Password** | `emilyspass` | Kredensial valid DummyJSON |

> *Catatan: Sistem memvalidasi status respons HTTP dan memicu pesan kesalahan kontekstual jika kredensial salah atau koneksi internet bermasalah.*

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
cd distrilink-sap-dashboard

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

---

## ✨ Fitur Utama

1. **Autentikasi & Route Guarding**
* Halaman login split-screen enterprise modern yang responsif di seluruh breakpoint perangkat.
* Sesi supervisor tersimpan di `localStorage` (`auth_user`).
* Root redirect otomatis (`/`) menuju `/dashboard` (jika terautentikasi) atau `/login` (jika belum login).
* Layout-level route guard di `/dashboard` untuk mengeliminasi *flickering* tampilan sebelum verifikasi selesai.


2. **Ringkasan Metrik Operasional (Summary Cards)**
* Perhitungan otomatis total realisasi kunjungan harian.
* Rata-rata persentase efektivitas rute tim sales.
* Akumulasi nominal pesanan (*gross order value*) dalam format Rupiah terstandarisasi.


3. **Visualisasi Data Performa (Bar Chart)**
* Grafik batang interaktif menggunakan Recharts untuk membandingkan efektivitas kunjungan antar salesman.
* Pewarnaan bar kontekstual (Biru untuk performa optimal $\ge 80\%$, Amber untuk yang memerlukan evaluasi $< 70\%$).
* Custom hover tooltip menyajikan rincian target vs realisasi visit serta wilayah penugasan.


4. **Tabel Data Interaktif & Filter Multi-Kriteria**
* Real-time search query berdasarkan nama salesman.
* Filter dropdown dinamis berdasarkan wilayah/area kerja.
* Indikator visual progres rasio kunjungan (*progress bar* mini) dan *pill badge* peringatan untuk item pesanan berstatus OOS.


---

## 📌 Asumsi & Batasan Sistem

1. **Format Mock Data:** Dataset performa sales diasumsikan merupakan agregasi harian per individu salesman yang mencakup metrik rute, realisasi, total pesanan, dan kuantitas OOS.
2. **Penyimpanan Sesi:** Sesi login disimpan pada `localStorage` browser demi kompatibilitas penuh dengan arsitektur SPA dan endpoint pengujian publik DummyJSON.
3. **Konektivitas:** Diperlukan akses internet aktif saat melakukan proses login untuk verifikasi kredensial ke API DummyJSON.
