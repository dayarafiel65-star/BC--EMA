/* ============================================================
   ÑEMONES BASQUET CLUB — utilidades compartidas
   ============================================================ */

const FORMATO_EURO = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

function formatoEuro(cantidad) {
  return FORMATO_EURO.format(cantidad);
}

const ENTIDADES_HTML = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => ENTIDADES_HTML[c]);
}

function leerJSON(clave, porDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado === null ? porDefecto : JSON.parse(guardado) ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

function guardarJSON(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* localStorage no disponible (modo privado, cuota llena…): la demo sigue en memoria */
  }
}

/* Panel modal accesible: Escape y clic fuera cierran, el foco vuelve al botón que lo abrió. */
function crearPanelModal(overlay, { alAbrir, alCerrar } = {}) {
  let disparador = null;

  function abrir() {
    disparador = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    alAbrir?.();
  }

  function cerrar() {
    if (!overlay.classList.contains("open")) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    alCerrar?.();
    disparador?.focus?.();
  }

  overlay.setAttribute("aria-hidden", "true");
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrar();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });

  return { abrir, cerrar };
}
