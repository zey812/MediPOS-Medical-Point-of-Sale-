const dataObat = [
    { id: 1, nama: "Paracetamol", harga: 15000, stok: 50 },
    { id: 2, nama: "Amoxicillin", harga: 25000, stok: 30 },
    { id: 3, nama: "Vitamin C", harga: 10000, stok: 100 },
    { id: 4, nama: "OBH", harga: 20000, stok: 20 }, 
];
let keranjang = [];

const btnTambah = document.getElementById("btnTambah");
const inputNama = document.getElementById("namaPembeli");
const selectObat = document.getElementById("pilihObat");
const inputJumlah = document.getElementById("jumlahBeli");
const displayNama = document.getElementById("displayNamaPembeli");

btnTambah.addEventListener("click", function() {
    if (inputNama.value === "" || selectObat.value === "" || inputJumlah.value === "" || inputJumlah.value <= 0) {
        // Panggil modal peringatan dari Bootstrap
        const peringatanModal = new bootstrap.Modal(document.getElementById('modalPeringatan'));
        peringatanModal.show();
        return; 
    }
    
    console.log("Validasi berhasil! Input sudah terisi.");
});