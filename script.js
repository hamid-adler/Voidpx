const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleBtn.textContent = "DARK";
  } else {
    toggleBtn.textContent = "LIGHT";
  }
});

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    pageNumber.textContent = currentPage;
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  pageNumber.textContent = currentPage;
});