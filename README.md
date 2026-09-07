# DAT KOFFIE — Kasir (PWA)

Aplikasi kasir sederhana (Penjualan & Pengeluaran) yang terhubung ke Google
Sheet lewat Apps Script, bisa di-install sebagai aplikasi (PWA) di HP kasir.

## Isi folder
```
index.html      -> aplikasi utama (HTML+CSS+JS jadi satu file)
manifest.json   -> deskripsi PWA (nama, ikon, warna)
sw.js           -> service worker (bikin app bisa di-install & cache app shell)
icon-192.png    -> ikon app 192x192 (placeholder — ganti dgn logo asli klien)
icon-512.png    -> ikon app 512x512 (placeholder)
logo.png        -> logo yang tampil di header & login screen (placeholder)
```

⚠️ **Icon & logo saat ini masih placeholder** (lingkaran merah "DK"). Ganti
`icon-192.png`, `icon-512.png`, dan `logo.png` dengan logo asli DAT KOFFIE
(ukuran persegi, PNG transparan/latar solid) sebelum dipakai produksi.

## 1. Push ke GitHub

```bash
cd datkoffie-kasir
git init
git add .
git commit -m "Initial commit: DAT KOFFIE kasir PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## 2. Aktifkan GitHub Pages
1. Buka repo di GitHub → **Settings → Pages**.
2. Source: pilih branch `main`, folder `/ (root)`.
3. Save. Tunggu ±1 menit, URL app akan muncul di bagian atas halaman
   (formatnya `https://USERNAME.github.io/NAMA-REPO/`).
4. Buka URL itu dari HP kasir → browser akan menawarkan **"Tambahkan ke
   Layar Utama" / "Install App"**. Setelah di-install, app akan tampil
   seperti aplikasi native (tanpa address bar browser).

## 3. Update setelah ada perubahan
Setiap kali kamu edit `index.html`/CSS/JS lalu push ulang ke GitHub:
1. Naikkan angka versi di baris `CACHE_NAME` pada `sw.js` (mis. `v1` → `v2`).
   Ini penting — tanpa ini, HP kasir yang sudah install app bisa tetap
   memakai versi lama dari cache.
2. `git add . && git commit -m "update" && git push`
3. App yang sudah ter-install akan otomatis reload ke versi baru saat
   dibuka ulang dan ada koneksi internet (sudah ditangani listener
   `controllerchange` di `index.html`).

## 4. Konfigurasi yang wajib dicek/ganti
Semua ada di dalam `<script>` pada `index.html`, ditandai komentar `TODO`:
- `API_URL` — sudah diisi dengan Web App URL Apps Script DAT KOFFIE.
- `LOGIN_PASSWORD` — password masuk dashboard, ganti sesuai keinginan klien.
- `STORE_NAME` / `STORE_ADDRESS` — nama & alamat toko untuk kop struk.
- Nomor WA & IG di footer struk (`buildStrukText`).

## 5. Menjadikan ini template untuk klien lain
Struktur `index.html` sudah dipisah rapi jadi: **Tokens warna** (bagian
`:root { ... }` paling atas di `<style>`), **Config** (bagian atas
`<script>`), dan panel fitur (Penjualan, Pengeluaran). Untuk klien baru:
1. Copy seluruh folder ini.
2. Ganti isi `:root { --bg / --accent / --green / ... }` sesuai warna
   brand klien baru.
3. Ganti `API_URL`, `LOGIN_PASSWORD`, `STORE_NAME`, `STORE_ADDRESS`, logo,
   dan ikon.
4. Backend Apps Script (Code.gs) yang lama bisa dipakai lagi asal struktur
   sheet klien baru sama (kolom Settings: Produk/Harga di A-B, Worker di
   D, Bahan/Biaya di F-G, Pembayaran/Bank di I-J).

## Palet warna saat ini (dari signage & interior DAT KOFFIE)
| Token       | Hex       | Dipakai untuk                          |
|-------------|-----------|-----------------------------------------|
| `--bg`      | `#f7f3ea` | Latar halaman (broken white / cream)   |
| `--surface` | `#ffffff` | Kartu, panel, form (putih bersih)      |
| `--surface2`| `#f0e9da` | Kartu sekunder, item list               |
| `--accent`  | `#a6352b` | Tombol utama, header, highlight (merah)|
| `--green`   | `#3f6b3f` | Total/angka positif, konfirmasi (hijau)|
| `--red`     | `#b23a2e` | Error, tombol hapus                     |
| `--text`    | `#2b2118` | Teks utama                              |
| `--muted`   | `#8a7960` | Teks sekunder / placeholder             |
