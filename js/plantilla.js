/* ============================================================
   ÑEMONES BASQUET CLUB — página de plantilla
   ============================================================ */

const STATS_JUGADOR = [
  ["min", "Minutos"],
  ["pts", "Puntos"],
  ["reb", "Rebotes"],
  ["ast", "Asistencias"],
  ["rob", "Robos"],
  ["tap", "Tapones"],
  ["mates", "Mates"],
  ["mm", "+/-"],
  ["per", "Pérdidas"],
  ["tc", "Tiros de campo", "%"],
  ["t3", "Triples", "%"],
  ["tl", "Tiros libres", "%"],
];

function insigniasHTML(j) {
  const mvp = j.mvp ? `<span class="badge mvp">👑 MVP</span>` : "";
  const ins = j.insignia ? `<span class="badge">${escaparHTML(j.insignia)}</span>` : "";
  return mvp + ins;
}

function statHTML(stats, [clave, etiqueta, sufijo = ""]) {
  const valor = stats?.[clave];
  if (valor === undefined) return "";
  let clase = "stat-num";
  let texto = `${valor}${sufijo}`;
  if (clave === "mm") {
    clase += valor >= 0 ? " pos" : " neg";
    if (valor > 0) texto = `+${valor}`;
  }
  return `<div><span class="${clase}">${escaparHTML(texto)}</span><span class="stat-label">${etiqueta}</span></div>`;
}

function fichaModalHTML(jugador, index) {
  const hazanas = jugador.hazanas?.length
    ? `<ul class="hazanas">${jugador.hazanas.map((h) => `<li>${escaparHTML(h)}</li>`).join("")}</ul>`
    : "";
  const hazana = jugador.hazana
    ? `<p class="hazana"><span class="hazana-label">🏆 Hazaña</span>${escaparHTML(jugador.hazana)}</p>`
    : "";

  return `
    <div class="modal-avatar">${avatarJugadorSVG(jugador, index)}</div>
    <div class="modal-info">
      <p class="kicker">${escaparHTML(jugador.posicion)} · ${escaparHTML(jugador.altura)}</p>
      <p class="badges">${insigniasHTML(jugador)}</p>
      <h2 id="modal-jugador-titulo">${escaparHTML(jugador.nombre)}</h2>
      <p class="modal-bio">${escaparHTML(jugador.bio)}</p>
      ${hazanas}
      <div class="stats-grid">${STATS_JUGADOR.map((s) => statHTML(jugador.stats, s)).join("")}</div>
      ${hazana}
      <p class="modal-note">Medias por partido esta temporada (40 min por partido).</p>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const roster = document.getElementById("roster");
  const overlay = document.getElementById("modal-jugador");
  const cuerpo = document.getElementById("modal-jugador-body");
  const btnCerrar = document.getElementById("modal-jugador-close");
  if (!roster) return;

  const ordenada = [...PLANTILLA].sort((a, b) => a.numero - b.numero);

  roster.innerHTML = ordenada
    .map(
      (j, i) => `
      <button type="button" class="player" data-index="${i}" aria-haspopup="dialog">
        <span class="player-avatar">${avatarJugadorSVG(j, i)}</span>
        <span class="num">${j.numero}</span>
        <span class="name">${escaparHTML(j.nombre)}</span>
        <span class="badges">${insigniasHTML(j)}</span>
        <span class="pos">${escaparHTML(j.posicion)} · ${escaparHTML(j.altura)}</span>
        <span class="stat">${escaparHTML(j.dato)}</span>
      </button>`
    )
    .join("");

  if (!overlay || !cuerpo) return;
  const modal = crearPanelModal(overlay, { alAbrir: () => btnCerrar?.focus() });

  roster.addEventListener("click", (e) => {
    const btn = e.target.closest(".player");
    if (!btn) return;
    const i = Number(btn.dataset.index);
    cuerpo.innerHTML = fichaModalHTML(ordenada[i], i);
    modal.abrir();
  });
  btnCerrar?.addEventListener("click", modal.cerrar);
});
