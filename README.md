# MediPOS (Medical Point of Sale)

MediPOS adalah aplikasi kasir (Point of Sale) sederhana berbasis web yang dirancang untuk memudahkan apotek dalam mencatat transaksi pembelian obat. Aplikasi ini dibuat untuk memenuhi tugas mata kuliah Rancang Bangun Perangkat Lunak (RBPL).

## Tim Pengembang (Kelompok 7)

- **Zahra Ramadhani** (Git Coordinator, Testing, & Docs) - Setup struktur repositori, menyusun dokumentasi, membuat _unit test_ perhitungan, serta mengelola _Review & Merge_ Pull Request.
- **Fatcku** (Frontend Structure & Layout) - Mengembangkan struktur `index.html`, menyusun _form input_ dan tabel _output_ transaksi, serta mengatur _styling_ CSS dasar.
- **Farras** (JavaScript Logic) - Mengelola data _dummy_ obat, merancang logika perhitungan total harga, sistem diskon khusus (potongan 10% untuk transaksi > Rp100.000), dan validasi _input_.
- **Jovita** (DOM Manipulation & Fitur Interaktif) - Menghubungkan logika dengan UI untuk menampilkan hasil ke tabel, memperbarui total pembayaran, membuat fitur hapus transaksi, dan fungsi _reset form_.

## Fitur Utama

- **Manajemen Transaksi:** _Input_ nama pembeli, pilihan obat, dan jumlah pembelian dengan validasi otomatis.
- **Kalkulator Cerdas:** Perhitungan total harga dan penerapan diskon bersyarat secara instan.
- **Tabel Dinamis:** Riwayat transaksi yang bisa ditambahkan, diperbarui, dan dihapus (_delete_ transaksi) langsung dari antarmuka kasir.

## Cara Menjalankan Aplikasi

1. Lakukan `git clone` repositori ini ke komputer lokal Anda.
2. Buka folder proyek menggunakan _Code Editor_ (contoh: Visual Studio Code).
3. Buka file `src/index.html` menggunakan browser bawaan atau ekstensi _Live Server_ di VS Code.
