const dataObat = [
    { id: 1, nama: "Paracetamol", harga: 15000, stok: 50 },
    { id: 2, nama: "Amoxicillin", harga: 25000, stok: 30 },
    { id: 3, nama: "Vitamin C", harga: 10000, stok: 100 },
    { id: 4, nama: "OBH Sirup", harga: 20000, stok: 20 },
];

let keranjang = [];

const btnTambah = document.getElementById("btnTambah");
const btnSelesai = document.getElementById("btnSelesai");
const btnReset = document.getElementById("btnReset");

const inputNama = document.getElementById("namaPembeli");
const selectObat = document.getElementById("pilihObat");
const inputJumlah = document.getElementById("jumlahBeli");

const displayNama = document.getElementById("displayNamaPembeli");
const tbodyTransaksi = document.getElementById("tabelTransaksi");

const textSubtotal = document.getElementById("textSubtotal");
const textTotal = document.getElementById("textTotal");
const textDiskon = document.getElementById("textDiskon");

const metodePembayaran = document.getElementById("metodePembayaran");

const modalNama = document.getElementById("modalNama");
const modalMetode = document.getElementById("modalMetode");
const modalTotal = document.getElementById("modalTotal");

const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

/* ===========================
   INIT STATE
=========================== */
btnSelesai.disabled = true;
renderDropdownObat();
renderCardStok();
renderKeranjang();

/* ===========================
   RENDER DROPDOWN OBAT
=========================== */
function renderDropdownObat() {
    selectObat.innerHTML = `<option value="">-- Pilih Obat --</option>`;

    dataObat.forEach(obat => {
        selectObat.innerHTML += `
            <option value="${obat.nama}" ${obat.stok === 0 ? "disabled" : ""}>
                ${obat.nama} (Stok: ${obat.stok})
            </option>
        `;
    });
}

/* ===========================
   RENDER STOK DI CARD (FIX)
=========================== */
function renderCardStok() {
    dataObat.forEach(obat => {
        const stokElement = document.getElementById(`stok-${obat.id}`);
        if (stokElement) {
            stokElement.innerText = obat.stok; // FIX: jangan tulis "Stok:"
        }
    });
}

/* ===========================
   TAMBAH KE KERANJANG
=========================== */
btnTambah.addEventListener("click", function () {

    if (
        inputNama.value.trim() === "" ||
        selectObat.value === "" ||
        inputJumlah.value === "" ||
        inputJumlah.value <= 0
    ) {
        alert("Lengkapi data terlebih dahulu!");
        return;
    }

    displayNama.innerText = inputNama.value;
    inputNama.disabled = true;

    const obatPilihan = dataObat.find(obat => obat.nama === selectObat.value);
    const jumlah = parseInt(inputJumlah.value);

    if (jumlah > obatPilihan.stok) {
        alert("Stok tidak mencukupi!");
        return;
    }

    obatPilihan.stok -= jumlah;

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

    renderDropdownObat();
    renderCardStok();
    renderKeranjang();
});

/* ===========================
   RENDER TABEL
=========================== */
function renderKeranjang() {
    tbodyTransaksi.innerHTML = "";

    if (keranjang.length === 0) {
        tbodyTransaksi.innerHTML = `
            <tr>
                <td colspan="5" class="text-muted py-5 text-center">
                    Keranjang belanja masih kosong
                </td>
            </tr>
        `;
    }

    let subtotalSeluruh = 0;

    keranjang.forEach((item, index) => {
        subtotalSeluruh += item.subtotal;

        tbodyTransaksi.innerHTML += `
            <tr>
                <td class="text-start">${item.nama}</td>
                <td>${formatRupiah(item.harga)}</td>
                <td>${item.jumlah}</td>
                <td>${formatRupiah(item.subtotal)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="hapusItem(${index})">
                        Hapus
                    </button>
                </td>
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

    btnSelesai.disabled = keranjang.length === 0;
}

/* ===========================
   HAPUS ITEM
=========================== */
function hapusItem(index) {

    const item = keranjang[index];
    const obat = dataObat.find(o => o.nama === item.nama);

    obat.stok += item.jumlah;

    keranjang.splice(index, 1);

    renderDropdownObat();
    renderCardStok();
    renderKeranjang();

    if (keranjang.length === 0) {
        inputNama.disabled = false;
        displayNama.innerText = "Belum ada pelanggan";
    }
}

/* ===========================
   RESET TRANSAKSI
=========================== */
function resetTransaksi() {

    keranjang.forEach(item => {
        const obat = dataObat.find(o => o.nama === item.nama);
        obat.stok += item.jumlah;
    });

    keranjang = [];

    renderDropdownObat();
    renderCardStok();
    renderKeranjang();

    inputNama.disabled = false;
    inputNama.value = "";
    inputJumlah.value = "";
    selectObat.value = "";
    metodePembayaran.value = "";

    displayNama.innerText = "Belum ada pelanggan";
}

/* Event Reset */
btnReset.addEventListener("click", resetTransaksi);

/* ===========================
   PROSES PEMBAYARAN (FINAL FIX)
=========================== */
btnSelesai.addEventListener("click", function () {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    if (metodePembayaran.value === "") {
        alert("Silakan pilih metode pembayaran!");
        return;
    }

    // Hitung ulang total
    let subtotal = keranjang.reduce((acc, item) => acc + item.subtotal, 0);
    let diskon = subtotal > 100000 ? subtotal * 0.1 : 0;
    let totalAkhir = subtotal - diskon;

    // Isi modal
    modalNama.innerText = inputNama.value;
    modalMetode.innerText = metodePembayaran.value;
    modalTotal.innerText = formatRupiah(totalAkhir);

    const modalSukses = new bootstrap.Modal(
        document.getElementById("modalSukses")
    );
    modalSukses.show();

    // Setelah sukses → bersihkan transaksi (stok tetap berkurang)
    keranjang = [];

    renderDropdownObat();
    renderCardStok();
    renderKeranjang();

    inputNama.disabled = false;
    inputNama.value = "";
    metodePembayaran.value = "";
    displayNama.innerText = "Belum ada pelanggan";
});