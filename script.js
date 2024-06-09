function showCustomAlert(message) {
    var alertBox = document.getElementById("customAlert");
    var messageBox = document.getElementById("customAlertMessage");

    // Atur pesan yang akan ditampilkan
    messageBox.textContent = message;

        // Tambahkan class "show" untuk menampilkan alert
        alertBox.classList.add("show");

        // Klik tombol close
        var closeBtn = document.querySelector(".btnclose");
        closeBtn.addEventListener("click", function() {
            alertBox.classList.remove("show");
        });

        // Hilangkan alert setelah 3 detik
        setTimeout(function() {
            alertBox.classList.remove("show");
        }, 3000);
    }

function tampilkanMovies() {
    var movies = JSON.parse(localStorage.getItem("movies")) || [];
    var contOke = document.querySelector(".done-read .cont-oke");
    var contNotOke = document.querySelector(".no-read .cont-not-oke"); 
    var adaOke = false;
    var adaNotOke = false;

    contOke.innerHTML = "";
    contNotOke.innerHTML = ""; 

    if (movies.length === 0) {
        contOke.innerHTML = "<p class='empty-message'>Yahh, masih kosong:<</p>";
        contNotOke.innerHTML = "<p class='empty-message'>Yahh, masih kosong:<</p>";
    } else {
        movies.forEach(function (movie) {
            var divOk = document.createElement("div");
            var divInfo = document.createElement("div");
            var img = document.createElement("img");
            var h5 = document.createElement("h5");
            var p1 = document.createElement("p");
            var p2 = document.createElement("p");
            var button = document.createElement("button");
            var btnHapus = document.createElement("button");

            divInfo.classList.add("info");
            img.src = "/assets/ppfilm.jpg";
            img.alt = "";
            h5.textContent = movie.judul;
            p1.textContent = "Sutradara: " + movie.sutradara;
            p2.textContent = "Rilis: " + movie.rilis;
            button.type = "button";
            btnHapus.type = "button";

            button.classList.add("btnselese");
            btnHapus.classList.add("btnhapus");
            btnHapus.textContent = "Hapus";
            btnHapus.setAttribute('data-id', movie.id);

            divInfo.appendChild(h5);
            divInfo.appendChild(p1);
            divInfo.appendChild(p2);
            divInfo.appendChild(button);
            divInfo.appendChild(btnHapus);

            divOk.appendChild(img);
            divOk.appendChild(divInfo);

            if (movie.status) {
                divOk.classList.add("ok");
                button.textContent = "Tandai Belum Selesai"; 
                adaOke = true; 
            } else {
                divOk.classList.add("not-oke");
                button.textContent = "Tandai Selesai"; 
                adaNotOke = true;
            }

            if (movie.status) {
                contOke.appendChild(divOk);
            } else {
                contNotOke.appendChild(divOk);
            }

            btnHapus.addEventListener('click', hapusMovie);
            button.addEventListener('click', function() {
                movie.status = !movie.status;
                localStorage.setItem("movies", JSON.stringify(movies));
                tampilkanMovies(); 
            });
        });

        if (!adaOke && !adaNotOke) {
            contOke.innerHTML = "<p class='empty-message'>Yahh, masih kosong:<</p>";
            contNotOke.innerHTML = "<p class='empty-message'>Yahh, masih kosong:<</p>";
        } else if (!adaOke) {
            contOke.innerHTML = "<p class='empty-message'>Yahh, masih kosong:<</p>";
        } else if (!adaNotOke) {
            contNotOke.innerHTML = "<p class='empty-message'>Yahh, masih kosong:<</p>";
        }
    }
}

function tambahMovie() {
    var judul = document.getElementById("judul").value.trim();
    var sutradara = document.getElementById("sutradara").value.trim();
    var tahun = document.getElementById("tahun").value;
    var sudahSelesai = document.getElementById("sudah-selesai").checked;
    var status = sudahSelesai ? true : false;
    var id = 1 + Date.now();

    if (judul === "" || sutradara === "" || tahun === "") {
        showCustomAlert("Harap lengkapi semua data sebelum menambahkan film baru!");
        return; 
    }
    // Validasi panjang judul
    if (judul === "" || judul.length > 19) { 
        showCustomAlert("Judul film harus diisi dan maksimal 19 karakter!");
        return; 
    }
    // Validasi panjang sutradara
    if (sutradara === "" || sutradara.length > 12) { // menambahkan kondisi sutradara.length > 12
        showCustomAlert("Nama sutradara harus diisi dan maksimal 12 karakter!");
        return; 
    }
    
    
    var movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push({
        id: id,
        judul: judul,
        sutradara: sutradara,
        rilis: tahun,
        status: status,
    });
    
    localStorage.setItem("movies", JSON.stringify(movies));
    tampilkanMovies();
    showCustomAlert("Data telah berhasil ditambahkan!")

    document.getElementById("judul").value = "";
    document.getElementById("sutradara").value = "";
    document.getElementById("tahun").value = "";
    document.getElementById("sudah-selesai").checked = false;
    document.getElementById("belum-selesai").checked = false;
}

function hapusMovie() {
    var idFilm = this.getAttribute("data-id");
    var movies = JSON.parse(localStorage.getItem("movies")) || [];
    var index = movies.findIndex(function(movie) {
        return movie.id == idFilm;
    });

    if (index !== -1) {
        movies.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(movies));
        tampilkanMovies();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    tampilkanMovies();
});
