/* ============================================================
   ÑEMONES BASQUET CLUB — página de reservas
   Los asientos ocupados y las reservas confirmadas se guardan
   en localStorage para que la demo se sienta persistente.
   ============================================================ */

const OCUPADOS_KEY = "nemones_ocupados";
const RESERVAS_KEY = "nemones_reservas";
const PROB_OCUPADO_INICIAL = 0.18;
const SECCIONES_POR_ID = new Map(SECCIONES_RESERVAS.map((s) => [s.id, s]));

let seleccionados = new Set();

function idAsiento(seccionId, fila, asiento) {
  return `${seccionId}-f${fila}-a${asiento}`;
}

function parsearAsiento(id) {
  const [, seccionId, fila, asiento] = id.match(/^(.+)-f(\d+)-a(\d+)$/) || [];
  return { seccion: SECCIONES_POR_ID.get(seccionId), fila: Number(fila), asiento: Number(asiento) };
}

function precioAsiento(id) {
  return parsearAsiento(id).seccion?.precio || 0;
}

function totalAsientos(ids) {
  return ids.reduce((sum, id) => sum + precioAsiento(id), 0);
}

function leerOcupados() {
  const guardado = leerJSON(OCUPADOS_KEY, null);
  if (Array.isArray(guardado)) return new Set(guardado);

  // Primera visita: simulamos algo de ocupación ya existente en el pabellón.
  const inicial = new Set();
  SECCIONES_RESERVAS.forEach((sec) => {
    for (let f = 1; f <= sec.filas; f++) {
      for (let a = 1; a <= sec.asientosPorFila; a++) {
        if (Math.random() < PROB_OCUPADO_INICIAL) inicial.add(idAsiento(sec.id, f, a));
      }
    }
  });
  guardarJSON(OCUPADOS_KEY, [...inicial]);
  return inicial;
}

function renderMapa() {
  const cont = document.getElementById("mapa-asientos");
  if (!cont) return;
  const ocupados = leerOcupados();

  cont.innerHTML = SECCIONES_RESERVAS.map((sec) => {
    const nombre = escaparHTML(sec.nombre);
    const filasHtml = Array.from({ length: sec.filas }, (_, fi) => {
      const fila = fi + 1;
      const asientosHtml = Array.from({ length: sec.asientosPorFila }, (_, ai) => {
        const asiento = ai + 1;
        const id = idAsiento(sec.id, fila, asiento);
        const ocupado = ocupados.has(id);
        const sel = seleccionados.has(id);
        return `<button type="button" class="asiento${sel ? " selected" : ""}" data-id="${escaparHTML(id)}"
          aria-pressed="${sel}" ${ocupado ? "disabled" : ""}
          aria-label="${nombre}, fila ${fila}, asiento ${asiento}${ocupado ? ", ocupado" : ""}"></button>`;
      }).join("");
      return `<div class="fila">${asientosHtml}</div>`;
    }).join("");

    return `
      <div class="seccion-bloque">
        <h3><span>${nombre}</span><span class="preciotag">${formatoEuro(sec.precio)}</span></h3>
        <div class="filas">${filasHtml}</div>
      </div>`;
  }).join("");
}

function alternarAsiento(btn) {
  const id = btn.dataset.id;
  const seleccionado = !seleccionados.has(id);
  if (seleccionado) seleccionados.add(id);
  else seleccionados.delete(id);
  btn.classList.toggle("selected", seleccionado);
  btn.setAttribute("aria-pressed", String(seleccionado));
  document.getElementById("confirm-msg")?.classList.remove("show");
  renderResumen();
}

function ordenarAsientos(a, b) {
  const pa = parsearAsiento(a);
  const pb = parsearAsiento(b);
  const sa = SECCIONES_RESERVAS.indexOf(pa.seccion);
  const sb = SECCIONES_RESERVAS.indexOf(pb.seccion);
  return sa - sb || pa.fila - pb.fila || pa.asiento - pb.asiento;
}

function renderResumen() {
  const lista = document.getElementById("resumen-lista");
  const totalEl = document.getElementById("resumen-total");
  const confirmBtn = document.getElementById("confirmar-reserva");
  if (!lista || !totalEl) return;

  const items = [...seleccionados].sort(ordenarAsientos);
  if (items.length === 0) {
    lista.innerHTML = `<li class="vacio">Todavía no has elegido ningún asiento.</li>`;
  } else {
    lista.innerHTML = items
      .map((id) => {
        const { seccion, fila, asiento } = parsearAsiento(id);
        return `<li><span>${escaparHTML(seccion?.nombre ?? id)} · fila ${fila}, asiento ${asiento}</span><span>${formatoEuro(precioAsiento(id))}</span></li>`;
      })
      .join("");
  }

  totalEl.textContent = formatoEuro(totalAsientos(items));
  if (confirmBtn) confirmBtn.disabled = items.length === 0;
}

function confirmarReserva(e) {
  e.preventDefault();
  const form = e.currentTarget;
  if (seleccionados.size === 0 || !form.reportValidity()) return;

  const nombre = form.elements.nombre.value.trim();
  const email = form.elements.email.value.trim();
  if (!nombre) {
    form.elements.nombre.focus();
    return;
  }

  const asientos = [...seleccionados].sort(ordenarAsientos);
  const ocupados = leerOcupados();
  const yaOcupados = asientos.filter((id) => ocupados.has(id));
  if (yaOcupados.length > 0) {
    yaOcupados.forEach((id) => seleccionados.delete(id));
    renderMapa();
    renderResumen();
    return;
  }

  asientos.forEach((id) => ocupados.add(id));
  guardarJSON(OCUPADOS_KEY, [...ocupados]);

  const reservas = leerJSON(RESERVAS_KEY, []);
  reservas.push({ nombre, email, asientos, total: totalAsientos(asientos), fecha: new Date().toISOString() });
  guardarJSON(RESERVAS_KEY, reservas);

  seleccionados = new Set();
  renderMapa();
  renderResumen();
  form.reset();

  const msg = document.getElementById("confirm-msg");
  if (msg) {
    const n = asientos.length;
    msg.textContent = `Reserva confirmada para ${nombre}: ${n} ${n === 1 ? "asiento" : "asientos"} (${formatoEuro(totalAsientos(asientos))}). Te esperamos en el ${PROXIMO_PARTIDO.pabellon}.`;
    msg.classList.add("show");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const infoEl = document.getElementById("info-partido");
  if (infoEl) {
    const { rival, fecha, hora, pabellon } = PROXIMO_PARTIDO;
    infoEl.textContent = `Ñemones BC vs ${rival} · ${fecha} · ${hora} · ${pabellon}`;
  }

  renderMapa();
  renderResumen();

  document.getElementById("mapa-asientos")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".asiento");
    if (btn && !btn.disabled) alternarAsiento(btn);
  });
  document.getElementById("res-form")?.addEventListener("submit", confirmarReserva);
});
