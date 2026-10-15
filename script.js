// CONFIGURAZIONE: inserisci qui i tuoi contatti prima di pubblicare.
const SITE_CONFIG = {
  email: "crstudio.studio.web@gmail.com",
  whatsapp: "",
  instagram: "cristian.mondino_"
};

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
const progress = document.getElementById("progress");
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
}
addEventListener("scroll", updateProgress, {passive:true}); updateProgress();
document.getElementById("year").textContent = new Date().getFullYear();

const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), {threshold:.12});
  items.forEach(item => observer.observe(item));
} else items.forEach(item => item.classList.add("visible"));

const form = document.getElementById("contactForm");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const business = String(data.get("business") || "").trim();
  const service = String(data.get("service") || "").trim();
  const message = String(data.get("message") || "").trim();
  const feedback = document.getElementById("feedback");
  const body = `Ciao CR Studio,\n\nmi chiamo ${name}.\nAttività/progetto: ${business || "Da definire"}\nServizio: ${service}\n\nLa mia idea:\n${message}\n\nGrazie!`;
  const waText = `Ciao! Sono ${name}.${business ? " Progetto/attività: " + business + "." : ""} Mi interessa: ${service}. ${message}`;
  if (SITE_CONFIG.whatsapp.trim()) {
    window.open("https://wa.me/" + SITE_CONFIG.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(waText), "_blank", "noopener,noreferrer");
    feedback.textContent = "Messaggio preparato in WhatsApp: controllalo e invialo.";
  } else if (SITE_CONFIG.email.trim()) {
    window.location.href = "mailto:" + SITE_CONFIG.email.trim() + "?subject=" + encodeURIComponent("Richiesta sito web — " + name) + "&body=" + encodeURIComponent(body);
    feedback.textContent = "Si è aperta la tua app email con il messaggio già preparato.";
  } else {
    feedback.textContent = "Prima di pubblicare, inserisci email o WhatsApp nella configurazione in cima a script.js.";
  }
});
