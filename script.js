// === Navigation Toggle ===
const nav = document.querySelector(".nav");
const burger = document.createElement("button");
burger.className = "burger";
burger.setAttribute("aria-label", "Toggle navigation");
burger.innerHTML = "<span></span><span></span><span></span>";
nav.parentNode.insertBefore(burger, nav);

function toggleMenu() {
  nav.classList.toggle("open");
  burger.classList.toggle("open");
}

burger.addEventListener("click", toggleMenu);

// Close menu when link clicked (mobile UX)
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") toggleMenu();
});

// === Smooth Scrolling ===
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetID = link.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetID);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// === Project Filtering ===
function filterProjects(category) {
  const projects = document.querySelectorAll(".project-card");
  projects.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.style.display = match ? "block" : "none";
  });
}

// Example filter buttons (optional):
// document.getElementById('filter-all').addEventListener('click', () => filterProjects('all'));

// === Lightbox Modal ===
const modal = document.createElement("div");
modal.className = "lightbox";
modal.innerHTML =
  '<span class="close" aria-label="Close">&times;</span><img class="lightbox-img" alt="Expanded project image" />';
document.body.appendChild(modal);

const modalImg = modal.querySelector(".lightbox-img");
const closeBtn = modal.querySelector(".close");

function openLightbox(src, alt) {
  modalImg.src = src;
  modalImg.alt = alt;
  modal.style.display = "flex";
}

function closeLightbox() {
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeLightbox);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeLightbox();
});

document.querySelectorAll("#projects img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

// === Contact Form Validation ===
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let valid = true;
    let errMsg = "";

    if (!name) {
      valid = false;
      errMsg = "Please enter your name.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      valid = false;
      errMsg = "Please enter a valid email.";
    } else if (message.length < 10) {
      valid = false;
      errMsg = "Message should be at least 10 characters.";
    }

    if (!valid) {
      e.preventDefault();
      alert(errMsg);
    }
  });
}

// === Accessibility Helpers ===
// trap focus inside modal when open
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex" && e.key === "Escape") {
    closeLightbox();
  }
});
