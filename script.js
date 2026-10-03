const produk = [
    {
        nama: "Wardah Lightening Whip Facial Foam",
        kategori: "skincare",
        harga: 28000,
        gambar: "WardahLighteningWhipFacialFoam.jpg"
    },

    {
        nama: "Wardah UV Shield Aqua Fresh Essence",
        kategori: "skincare",
        harga: 65000,
        gambar: "WardahUV.jpg"
    },

    {
        nama: "Wardah Lightening Day Cream",
        kategori: "skincare",
        harga: 42000,
        gambar: "WardahDayCream.jpg"
    },

    {
        nama: "Wardah Lightening Face Toner",
        kategori: "skincare",
        harga: 35000,
        gambar: "WardahToner.jpg"
    },

    {
        nama: "Wardah Lightening Serum",
        kategori: "skincare",
        harga: 85000,
        gambar: "WardahSerum.jpg"
    },

    {
        nama: "Wardah BB Cream",
        kategori: "makeup",
        harga: 45000,
        gambar: "WardahBBCream.jpg"
    }
];

let jumlahKeranjang = 0;
let kategoriAktif = "semua";

function tampilkanProduk(data) {

    const productList =
        document.getElementById("productList");

    const jumlahProduk =
        document.getElementById("jumlahProduk");

    const produkKosong =
        document.getElementById("produkKosong");

    if (!productList) {
        return;
    }

    productList.innerHTML = "";

    if (jumlahProduk) {
        jumlahProduk.textContent =
            "Menampilkan " + data.length + " produk";
    }

    if (data.length === 0) {

        if (produkKosong) {
            produkKosong.style.display = "block";
        }

        return;

    } else {

        if (produkKosong) {
            produkKosong.style.display = "none";
        }
    }

    data.forEach(function(item) {

        const article =
            document.createElement("article");

        article.className = "product-card";


        article.innerHTML = `
            <img
                src="${item.gambar}"
                alt="${item.nama}"
            >

            <p class="kategori">
                ${item.kategori}
            </p>

            <h3>
                ${item.nama}
            </h3>

            <p class="harga">
                Rp ${item.harga.toLocaleString("id-ID")}
            </p>

            <div class="product-buttons">

                <button
                    type="button"
                    class="beli"
                    data-product="${item.nama}">
                    Beli Sekarang
                </button>

                <button
                    type="button"
                    class="favorite"
                    aria-label="Tambah favorit"
                    title="Tambah favorit">
                    ♡
                </button>

            </div>
        `;


        /* Tombol Beli */

        const tombolBeli =
            article.querySelector(".beli");

        tombolBeli.addEventListener(
            "click",
            function() {

                beliProduk(item.nama);

            }
        );


        /* Tombol Favorit */

        const tombolFavorit =
            article.querySelector(".favorite");

        tombolFavorit.addEventListener(
            "click",
            function() {

                favoriteProduk(tombolFavorit);

            }
        );


        productList.appendChild(article);

    });
}


/* =====================================
   BELI PRODUK
===================================== */

function beliProduk(nama) {

    jumlahKeranjang++;


    // Update angka keranjang
    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent =
            jumlahKeranjang;
    }


    // SweetAlert
    if (typeof Swal !== "undefined") {

        Swal.fire({

            title: "Berhasil! 💕",

            text:
                nama +
                " berhasil ditambahkan ke keranjang.",

            icon: "success",

            confirmButtonText: "Lanjut Belanja",

            confirmButtonColor: "#d63384"

        });

    } else {

        alert(
            nama +
            " berhasil ditambahkan ke keranjang."
        );

    }
}


/* =====================================
   FAVORITE
===================================== */

function favoriteProduk(button) {

    button.classList.toggle("active");


    if (button.classList.contains("active")) {

        button.textContent = "♥";

        button.setAttribute(
            "aria-label",
            "Hapus dari favorit"
        );

    } else {

        button.textContent = "♡";

        button.setAttribute(
            "aria-label",
            "Tambah favorit"
        );

    }
}


/* =====================================
   FILTER PRODUK
===================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            kategoriAktif =
                button.getAttribute("data-filter");


            // Ubah tombol aktif
            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove("active");

                }
            );


            button.classList.add("active");


            filterProduk();

        }
    );

});


/* =====================================
   SEARCH PRODUK
===================================== */

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            filterProduk();

        }
    );

}


/* =====================================
   FILTER + SEARCH
===================================== */

function filterProduk() {

    const keyword = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const hasil = produk.filter(function(item) {

        const sesuaiKategori =
            kategoriAktif === "semua" ||
            item.kategori === kategoriAktif;

        const sesuaiSearch =
            item.nama.toLowerCase().includes(keyword);

        return sesuaiKategori && sesuaiSearch;
    });

    tampilkanProduk(hasil);
}


/* =====================================
   KERANJANG
===================================== */

const cartButton =
    document.getElementById("cartButton");


if (cartButton) {

    cartButton.addEventListener(
        "click",
        function() {

            if (jumlahKeranjang === 0) {

                Swal.fire({

                    title: "Keranjang Kosong 🛒",

                    text:
                        "Silakan pilih produk terlebih dahulu.",

                    icon: "info",

                    confirmButtonText: "OK",

                    confirmButtonColor: "#d63384"

                });

            } else {

                Swal.fire({

                    title: "Keranjang Kamu 🛒",

                    text:
                        "Ada " +
                        jumlahKeranjang +
                        " produk di keranjang.",

                    icon: "success",

                    confirmButtonText: "OK",

                    confirmButtonColor: "#d63384"

                });

            }

        }
    );

}


/* =====================================
   FORM KONTAK
===================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nama =
                document
                    .getElementById("nama")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const pesan =
                document
                    .getElementById("pesan")
                    .value
                    .trim();


            // Validasi
            if (
                nama === "" ||
                email === "" ||
                pesan === ""
            ) {

                Swal.fire({

                    title: "Data Belum Lengkap",

                    text:
                        "Silakan isi semua bagian form.",

                    icon: "warning",

                    confirmButtonColor: "#d63384"

                });

                return;
            }


            // Pesan berhasil
            Swal.fire({

                title: "Pesan Terkirim! 💌",

                text:
                    "Terima kasih, " +
                    nama +
                    ". Pesan kamu berhasil dikirim.",

                icon: "success",

                confirmButtonText: "OK",

                confirmButtonColor: "#d63384"

            });


            // Reset form
            contactForm.reset();

        }
    );

}


/* =====================================
   JALANKAN PRODUK
===================================== */

tampilkanProduk(produk);