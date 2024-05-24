// Pustaka dan fungsi pendukung
const formatNum = require('@stdlib/string-format'); //formatNum: Sebuah fungsi dari pustaka @stdlib/string-format(library dari node.js) untuk memformat angka dengan presisi tertentu.

// printPageRank: Mencetak nilai PageRank untuk iterasi (t) dan daftar PageRank (pageRankArr) yang diberikan.
function printPageRank(t, pageRankArr) {
  let roundNum = pageRankArr.map((num) => formatNum('%.4f', num)) //map mengiterasi dan menerapkan ke setiap elemen, hingga 4 desimal
  console.log('pageRank at t=', formatNum("%3d", t), roundNum);
}

// Ini adalah fungsi utama yang menghitung PageRank. Ini membutuhkan dua argumen(connectiveMatrix, totalIteration)
function pageRank(connectiveMatrix, totalIteration) {
  let initPageRank = Array.from(
    // {length: connectiveMatrix[0].length}, a
    new Array(connectiveMatrix[0].length),
     () => 1/connectiveMatrix[0].length);
// console.log(initPageRank);

// inisialisasi 
let currentPageRank = Array.from(initPageRank); // Membuat array dengan panjang yang sama dengan jumlah halaman
let nextPageRank = Array.from(initPageRank); //Membuat salinan dari array initPageRank menggunakan Array.from(). Ini digunakan untuk menyimpan nilai PageRank dari setiap halaman pada iterasi berikutnya
let numOfPages = initPageRank.length; //Mengambil panjang array initPageRank, yang merepresentasikan jumlah halaman dalam graf, dan menyimpannya dalam variabel numOfPages.
let L_pi_arr = connectiveMatrix.map( // Pada setiap array, metode reduce() digunakan untuk menjumlahkan semua elemen di dalamnya, menghasilkan jumlah tautan keluar dari setiap halaman. Hasilnya disimpan dalam array L_pi_arr.
    arr => arr.reduce((acc, curr) => acc + curr, 0));
let isIncoming; //Variabel ini kemungkinan akan digunakan nanti dalam iterasi untuk menentukan apakah tautan masuk ada dari satu halaman ke halaman lainnya.

// Perulangan Iterasi 
for (let t = 0; t < totalIteration; t++) {  // totaliteration = jumlah iterasi yang akan di lakukan algoritma
printPageRank(t, nextPageRank);
nextPageRank = new Array(numOfPages).fill(0); //numofpages = menyimpan jumlah halamn web yang sedang di proses 
for (let pi = 0; pi < numOfPages; pi++) {   
      for (let pj = 0; pj < numOfPages; pj++) {
        isIncoming = connectiveMatrix[pj][pi];    // connectiveMatrix adalah representasi matematis dari struktur tautan antar halaman web.
         connectiveMatrix[pj, pi]                                 
        if (isIncoming === 1) {
          nextPageRank[pi] += currentPageRank[pj] / L_pi_arr[pj];
        }
      }
    }
    currentPageRank = [...nextPageRank];
  }
}


pageRank([[0, 0, 0, 1], [1, 0, 1, 0], [1, 0, 0, 0], [1, 1, 1, 0]], 30);