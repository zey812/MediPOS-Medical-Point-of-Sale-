\# Alur Aplikasi MediPOS

\## Deskripsi

MediPOS adalah aplikasi kasir apotek berbasis web yang memudahkan proses transaksi penjualan obat secara cepat, akurat, dan efisien. Aplikasi ini dirancang untuk kasir apotek dalam mengelola transaksi harian.

\## Teknologi yang Digunakan
\- HTML5
\- CSS3
\- Bootstrap 5.3
\- JavaScript (Vanilla)
\- Bootstrap Icons

\## Struktur Folder
MediPOS/
├── docs/         → dokumentasi proyek
├── src/          → kode sumber aplikasi
│   ├── index.html
│   ├── script.js
│   └── style.css
├── tests/        → file pengujian
└── README.md     → dokumentasi umum

\## Alur Penggunaan Aplikasi
\### 1. Melihat Katalog Obat
\- Halaman utama menampilkan 4 kartu obat yang tersedia
\- Setiap kartu menampilkan nama obat, harga, dan stok
\- Stok akan otomatis terupdate setiap transaksi

\### 2. Mengisi Form Transaksi
\- Input nama pembeli (wajib diisi)
\- Pilih obat dari dropdown katalog
\- Dropdown otomatis disabled jika stok habis
\- Input jumlah pembelian (wajib lebih dari 0)

\### 3. Validasi Input
\- Nama pembeli tidak boleh kosong
\- Obat wajib dipilih dari dropdown
\- Jumlah tidak boleh 0 atau negatif
\- Jumlah tidak boleh melebihi stok tersedia
\- Jika validasi gagal, muncul peringatan

\### 4. Memasukkan ke Keranjang
\- Klik tombol "Masukkan Keranjang"
\- Item tampil di tabel transaksi
\- Jika obat yang sama ditambahkan lagi, 
&nbsp; jumlah otomatis digabung (merge)
\- Stok di kartu obat otomatis berkurang
\- Input nama pembeli terkunci setelah 
&nbsp; item pertama masuk

\### 5. Kalkulasi Otomatis
\- Subtotal dihitung otomatis per item
\- Diskon 10% diterapkan otomatis jika 
&nbsp; total belanja diatas Rp 100.000
\- Total pembayaran terupdate real-time

\### 6. Menghapus Item
\- Klik tombol "Hapus" di baris item
\- Item terhapus dari keranjang
\- Stok otomatis dikembalikan
\- Jika keranjang kosong, nama pembeli 
&nbsp; bisa diubah kembali

\### 7. Reset Transaksi
\- Klik tombol "Reset Transaksi"
\- Semua item di keranjang dihapus
\- Semua stok dikembalikan ke kondisi awal
\- Semua form direset ke kondisi awal

\### 8. Proses Pembayaran
\- Pilih metode pembayaran (Tunai/Non Tunai)
\- Klik tombol "Proses Pembayaran"
\- Jika keranjang kosong, transaksi tidak bisa diproses
\- Jika metode pembayaran belum dipilih, 
&nbsp; transaksi tidak bisa diproses

\### 9. Modal Sukses
\- Setelah pembayaran berhasil, modal sukses muncul
\- Modal menampilkan:
&nbsp; \* Nama pembeli
&nbsp; \* Metode pembayaran
&nbsp; \* Total yang harus dibayar
\- Setelah modal ditutup, semua form otomatis direset

\## Edge Case yang Ditangani
\- Stok habis → dropdown otomatis disabled
\- Qty melebihi stok → muncul peringatan
\- Keranjang kosong → tombol checkout disabled
\- Input tidak lengkap → tidak bisa tambah item
\- Metode pembayaran kosong → tidak bisa checkout
