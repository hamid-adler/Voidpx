// ---------- Theme Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent = document.body.classList.contains("light") ? "LIGHT" : "DARK";
});

// ---------- Side Menu ----------
const menu = document.querySelector(".menu");
const sideMenu = document.querySelector(".side__menu");
const closeBtn = document.querySelector(".close__btn");

menu.addEventListener("click", () => sideMenu.classList.add("active"));
closeBtn.addEventListener("click", () => sideMenu.classList.remove("active"));

// ---------- Images & Pagination ----------
const boxs = document.querySelectorAll('.box');
let images = [];
const imagesPerPage = boxs.length;
let currentPage = 1;
let currentFilteredImages = [];

const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showPage() {
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const pageImages = currentFilteredImages.slice(startIndex, endIndex);

  boxs.forEach(box => box.innerHTML = "");

  pageImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    boxs[index].appendChild(img);
  });

  pageNumber.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = endIndex >= currentFilteredImages.length;
}

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
    images = data.map(name => 'assets/image/' + name);
    currentFilteredImages = [...images];
    showPage();
  })
  .catch(err => console.error('Failed to load images.json', err));

// ---------- Two-Stage Search ----------
const searchInput = document.querySelector('#search input');
const searchBtn = document.querySelector('.search__button');

function showFilteredImages(query) {
  currentFilteredImages = images.filter(img => img.toLowerCase().includes(query));
  currentPage = 1;
  showPage();
}

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  if (query === "") return;
  showFilteredImages(query);
}

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSearch();
  }
});

searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() === "") {
    currentFilteredImages = [...images];
    currentPage = 1;
    showPage();
  }
});