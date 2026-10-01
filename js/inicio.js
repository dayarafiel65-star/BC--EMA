/* ============================================================
   ÑEMONES BASQUET CLUB — página de inicio
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const campos = {
    "rival-nombre": PROXIMO_PARTIDO.rival,
    "pp-fecha": PROXIMO_PARTIDO.fecha,
    "pp-hora": PROXIMO_PARTIDO.hora,
    "pp-pabellon": PROXIMO_PARTIDO.pabellon,
    "pp-competicion": PROXIMO_PARTIDO.competicion,
  };

  Object.entries(campos).forEach(([id, valor]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  });
});
