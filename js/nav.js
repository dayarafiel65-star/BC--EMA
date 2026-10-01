/* ============================================================
   ÑEMONES BASQUET CLUB — navegación compartida
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".navtoggle");
  const links = document.querySelector(".navlinks");

  if (toggle && links) {
    const setAbierto = (abierto) => {
      links.classList.toggle("open", abierto);
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    };

    toggle.addEventListener("click", () => setAbierto(!links.classList.contains("open")));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("open")) {
        setAbierto(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => {
      if (e.matches) setAbierto(false);
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
