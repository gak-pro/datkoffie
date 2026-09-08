# DAT KOFFIE — Kasir (PWA)

Aplikasi kasir sederhana (Penjualan & Pengeluaran) yang terhubung ke Google
Sheet lewat Apps Script, bisa di-install sebagai aplikasi (PWA) di HP kasir.

## Isi folder
```
index.html      -> aplikasi utama (HTML+CSS+JS jadi satu file)
manifest.json   -> deskripsi PWA (nama, ikon, warna)
sw.js           -> service worker (bikin app bisa di-install & cache app shell)
icon-192.png    -> ikon app 192x192
icon-512.png    -> ikon app 512x512
logo.png        -> logo yang tampil di header & login screen
Code.gs         -> backend Apps Script (paste ke Extensions → Apps Script di spreadsheet)
```

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

## 6. Fitur Shift (penjaga yang sedang bertugas ikut tercatat)
Setiap transaksi Penjualan sekarang ikut mencatat siapa penjaga yang
sedang aktif (dipilih lewat badge "👤 Pilih Penjaga" di app) ke **kolom
Shift** yang baru di sheet Penjualan.

Struktur kolom Penjualan sekarang (lihat `Code.gs`):
```
A Tanggal | B Produk | C Jumlah | D Harga | E Diskon/Admin | F Total
| G Pembayaran | H Bank | I Pembeli | J Kode Invoice | K Shift | L Periode (auto)
```
Karena ada kolom **K Shift** yang baru disisipkan, tabel **Performance**
(Target/Customer) yang tadinya di kolom M/N ikut digeser ke **N/O**.
Ini sudah disesuaikan di `Code.gs` (`PERFORMANCE_COL_TARGET = 14`,
`PERFORMANCE_COL_CUSTOMER = 15`).

**Wajib:** buka Apps Script project (Extensions → Apps Script) dari
spreadsheet DAT KOFFIE, ganti/timpa seluruh isi `Code.gs` dengan file
`Code.gs` di folder ini, lalu **Deploy → Manage deployments → Edit →
New version** supaya perubahan aktif di URL exec yang sama (tidak perlu
ganti `API_URL` di `index.html`).

## 7. Tema warna & logo (update terbaru)
Warna disesuaikan agar senada dengan kartu menu fisik DAT KOFFIE: dasar
**putih bersih**, judul/tombol **merah** (`--accent`), dan aksen **hijau**
(`--green`) untuk kategori Pengeluaran & elemen positif. Ditambahkan pula
strip dekoratif kotak-kotak merah/putih (`.checker-strip`) di bawah header
dan di kartu login, meniru motif garis bawah menu & taplak meja.

Logo (`logo.png`) diganti jadi kotak hijau bergaris dengan teks
"DAT KOFFIE" merah — meniru logo asli di menu. Ikon app (`icon-192.png`,
`icon-512.png`) dibuat beda dari logo header: medali hijau "DK" dengan
bingkai kotak-kotak merah/putih, supaya tetap mudah dikenali walau
diperkecil jadi ikon HP.

⚠️ Ini semua masih hasil generate otomatis (bukan file desain asli dari
klien) — kalau DAT KOFFIE punya file logo resmi (vector/PNG transparan),
sebaiknya ganti `logo.png`, `icon-192.png`, `icon-512.png` dengan itu.

Setelah mengganti aset (logo/ikon/CSS) dan push ulang, ingat naikkan lagi
versi `CACHE_NAME` di `sw.js` (lihat bagian 3) — sudah dinaikkan ke `v2`
untuk update kali ini.

## Palet warna saat ini (persis nuansa kartu MENU fisik DAT KOFFIE)
| Token       | Hex       | Dipakai untuk                          |
|-------------|-----------|-----------------------------------------|
| `--bg`      | `#ffffff` | Latar halaman (putih bersih)           |
| `--surface` | `#ffffff` | Kartu, panel, form                      |
| `--surface2`| `#faf7f2` | Kartu sekunder, item list (broken white)|
| `--accent`  | `#c1272d` | Tombol utama, header, highlight (merah)|
| `--green`   | `#1f6d4c` | Total/angka positif, konfirmasi (hijau)|
| `--red`     | `#c1272d` | Error, tombol hapus                     |
| `--text`    | `#241a12` | Teks utama                              |
| `--muted`   | `#8c8072` | Teks sekunder / placeholder             |

