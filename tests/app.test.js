// File: tests/app.test.js

/**
 * UNIT TEST SEDERHANA - MEDIPOS
 * Menguji logika perhitungan diskon dan total harga
 * Aturan Bisnis: Diskon 10% jika subtotal > Rp 100.000
 */

// 1. Kita ekstrak/simulasikan logika buatan Farras menjadi fungsi murni
function hitungDiskon(subtotal) {
  if (subtotal > 100000) {
    return subtotal * 0.1; // Diskon 10%
  }
  return 0; // Tidak ada diskon
}

function hitungTotalAkhir(subtotal) {
  return subtotal - hitungDiskon(subtotal);
}

// 2. Skenario Pengujian (Test Cases)
console.log("=== MEMULAI UNIT TESTING MEDIPOS ===");

// TEST 1: Belanja di BAWAH 100.000 (Seharusnya tidak dapat diskon)
let subtotal1 = 50000;
let expectedTotal1 = 50000; // 50.000 - 0
if (hitungTotalAkhir(subtotal1) === expectedTotal1) {
  console.log("✅ TEST 1 PASSED: Belanja Rp 50.000 tidak mendapat diskon.");
} else {
  console.error("❌ TEST 1 FAILED: Hasil tidak sesuai!");
}

// TEST 2: Belanja TEPAT 100.000 (Seharusnya tidak dapat diskon)
let subtotal2 = 100000;
let expectedTotal2 = 100000; // 100.000 - 0
if (hitungTotalAkhir(subtotal2) === expectedTotal2) {
  console.log("✅ TEST 2 PASSED: Belanja Rp 100.000 tidak mendapat diskon.");
} else {
  console.error("❌ TEST 2 FAILED: Hasil tidak sesuai!");
}

// TEST 3: Belanja di ATAS 100.000 (Seharusnya dapat diskon 10%)
let subtotal3 = 150000;
let expectedTotal3 = 135000; // 150.000 - 15.000 (diskon 10%)
if (hitungTotalAkhir(subtotal3) === expectedTotal3) {
  console.log("✅ TEST 3 PASSED: Belanja Rp 150.000 mendapat diskon 10%.");
} else {
  console.error("❌ TEST 3 FAILED: Hasil tidak sesuai!");
}

console.log("=== TESTING SELESAI ===");
