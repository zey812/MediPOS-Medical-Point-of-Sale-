const dataObat = [
    { id: 1, nama: "Paracetamol", harga: 15000, stok: 50 },
    { id: 2, nama: "Amoxicillin", harga: 25000, stok: 30 },
    { id: 3, nama: "Vitamin C", harga: 10000, stok: 100 },
    { id: 4, nama: "OBH Sirup", harga: 20000, stok: 20 }, 
];
let keranjang = [];

const btnTambah = document.getElementById("btnTambah");
const inputNama = document.getElementById("namaPembeli");
const selectObat = document.getElementById("pilihObat");
const inputJumlah = document.getElementById("jumlahBeli");
const displayNama = document.getElementById("displayNamaPembeli");
const tbodyTransaksi = document.getElementById("tabelTransaksi");
const textSubtotal = document.getElementById("textSubtotal");
const textTotal = document.getElementById("textTotal");
const textDiskon = document.getElementById("textDiskon");

const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

btnTambah.addEventListener("click", function() {
    if (inputNama.value === "" || selectObat.value === "" || inputJumlah.value === "" || inputJumlah.value <= 0) {
        const peringatanModal = new bootstrap.Modal(document.getElementById('modalPeringatan'));
        peringatanModal.show();
        return; 
    }
    
    displayNama.innerText = inputNama.value;
    inputNama.disabled = true; 

    const obatPilihan = dataObat.find(obat => obat.nama === selectObat.value);
    const jumlah = parseInt(inputJumlah.value);

    const itemSudahAda = keranjang.find(item => item.nama === obatPilihan.nama);

    if (itemSudahAda) {
        itemSudahAda.jumlah += jumlah;
        itemSudahAda.subtotal = itemSudahAda.jumlah * itemSudahAda.harga;
    } else {
        keranjang.push({
            nama: obatPilihan.nama, 
            harga: obatPilihan.harga, 
            jumlah: jumlah, 
            subtotal: obatPilihan.harga * jumlah
        });
    }

    selectObat.value = ""; 
    inputJumlah.value = "";
    renderKeranjang();
});

function renderKeranjang() {
    tbodyTransaksi.innerHTML = ""; 
    let subtotalSeluruh = 0;
    
    keranjang.forEach((item) => {
        subtotalSeluruh += item.subtotal;
        tbodyTransaksi.innerHTML += `
            <tr>
                <td class="text-start fw-medium">${item.nama}</td>
                <td>${formatRupiah(item.harga)}</td>
                <td>${item.jumlah}</td>
                <td class="fw-bold">${formatRupiah(item.subtotal)}</td>
                <td><button class="btn btn-sm btn-outline-success disabled"><i class="bi bi-check"></i></button></td>
            </tr>
        `;
    });

    let diskon = 0;
    if (subtotalSeluruh > 100000) {
        diskon = subtotalSeluruh * 0.1; 
    }

    let totalAkhir = subtotalSeluruh - diskon;

    textSubtotal.innerText = formatRupiah(subtotalSeluruh);
    textDiskon.innerText = "- " + formatRupiah(diskon);
    textTotal.innerText = formatRupiah(totalAkhir);
}