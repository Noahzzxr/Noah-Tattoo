document.documentElement.classList.add("aos-ready");
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

// Loader
window.addEventListener("load", () => {
  const loader = qs("#loader");
  setTimeout(() => loader.classList.add("hidden"), 550);
});

// Navbar scroll
const nav = qs("#nav");
const onScroll = () => {
  if (window.scrollY > 18) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Smooth scroll (respeita altura da navbar)
const NAV_OFFSET = 84;
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = qs(id);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    qsa(".menu a").forEach(x => x.classList.remove("active"));
    const inMenu = qsa(`.menu a[href="${id}"]`)[0];
    if (inMenu) inMenu.classList.add("active");
  });
});

// Mobile menu
const mobile = qs("#mobile");
const hamburger = qs("#hamburger");
const closeMobile = qs("#closeMobile");
const mobileOverlay = qs("#mobileOverlay");

const openMobile = () => { mobile.classList.add("open"); mobile.setAttribute("aria-hidden","false"); };
const hideMobile = () => { mobile.classList.remove("open"); mobile.setAttribute("aria-hidden","true"); };

hamburger?.addEventListener("click", openMobile);
closeMobile?.addEventListener("click", hideMobile);
mobileOverlay?.addEventListener("click", hideMobile);
qsa("[data-close]").forEach(a => a.addEventListener("click", hideMobile));

// AOS
AOS.init({
  duration: 650,
  easing: "ease-out-cubic",
  once: true,
  offset: 70
});

// Hero parallax leve
const heroBg = qs("#heroBg");
let ticking = false;

function parallaxTick(){
  const y = window.scrollY || 0;
  if (heroBg) heroBg.style.transform = `translate3d(0, ${y * 0.08}px, 0) scale(1.04)`;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking){
    requestAnimationFrame(parallaxTick);
    ticking = true;
  }
}, { passive: true });
parallaxTick();

// Lightbox (portfolio)
const lightbox = qs("#lightbox");
const lbImg = qs("#lbImg");
const lbOverlay = qs("#lbOverlay");
const lbClose = qs("#lbClose");

function openLightbox(src){
  lbImg.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lbImg.src = "";
  document.body.style.overflow = "";
}

qsa(".shot[data-img]").forEach(el => {
  el.addEventListener("click", () => openLightbox(el.dataset.img));
});

lbOverlay.addEventListener("click", closeLightbox);
lbClose.addEventListener("click", closeLightbox);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

// Footer year
qs("#year").textContent = new Date().getFullYear();
