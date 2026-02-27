// =====================================
// VOIDPX | Final script.js with JSON images
// =====================================

// ---------- Theme Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent = document.body.classList.contains("light") ? "LIGHT" : "DARK";
});

// ---------- Side Menu ----------
const hamburger = document.querySelector(".menu");
const sideMenu = document.querySelector(".side__menu");
const closeBtn = document.querySelector(".close__btn");

hamburger.addEventListener("click", () => sideMenu.classList.add("active"));
closeBtn.addEventListener("click", () => sideMenu.classList.remove("active"));

// ---------- Images & Pagination ----------
const boxs = document.querySelectorAll('.box');
let images = []; // all image paths will be loaded from JSON
const imagesPerPage = boxs.length;
let currentPage = 1;
let currentFilteredImages = []; // current array used for pagination and search

const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Function to display current page images
function showPage() {
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const pageImages = currentFilteredImages.slice(startIndex, endIndex);

  boxs.forEach(box => box.innerHTML = ""); // clear boxes

  pageImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    boxs[index].appendChild(img);
  });

  pageNumber.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = endIndex >= currentFilteredImages.length;
}

// Pagination buttons
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showPage();
  }
});
nextBtn.addEventListener("click", () => {
  if ((currentPage * imagesPerPage) < currentFilteredImages.length) {
    currentPage++;
    showPage();
  }
});

// ---------- Load images from JSON ----------
fetch('assets/image/images.json')
  .then(res => res.json())
  .then(data => {
    // map names to full paths
    images = data.map(name => 'assets/image/' + name);
    currentFilteredImages = [...images]; // initialize filtered array
    showPage();
  })
  .catch(err => console.error('Failed to load images.json', err));

// ---------- Two-Stage Search ----------
const searchInput = document.querySelector('#search input');
const searchBtn = document.querySelector('.search__button');

// Function to filter images based on query
function showFilteredImages(query) {
  currentFilteredImages = images.filter(img => img.toLowerCase().includes(query));
  currentPage = 1;
  showPage();
}

// Active search only on Enter or button click
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  if (query === "") return; // do nothing if input is empty
  showFilteredImages(query);
}

// Button click triggers search
searchBtn.addEventListener('click', handleSearch);

// Enter key triggers search
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
});

// If input is cleared → reset images immediately
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === "") {
    currentFilteredImages = [...images];
    currentPage = 1;
    showPage();
  }
});
