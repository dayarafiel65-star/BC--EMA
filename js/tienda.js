/* ============================================================
   ÑEMONES BASQUET CLUB — página de tienda
   Carrito guardado en localStorage bajo la clave "nemones_carrito"
   con la forma { idProducto: cantidad }.
   ============================================================ */

const CARRITO_KEY = "nemones_carrito";
const PRODUCTOS_POR_ID = new Map(PRODUCTOS.map((p) => [p.id, p]));

function leerCarrito() {
  const guardado = leerJSON(CARRITO_KEY, {});
  const carrito = {};
  Object.entries(guardado).forEach(([id, qty]) => {
    const cantidad = Math.floor(Number(qty));
    if (PRODUCTOS_POR_ID.has(id) && cantidad > 0) carrito[id] = cantidad;
  });
  return carrito;
}

function actualizarCarrito(modificar) {
  const carrito = leerCarrito();
  modificar(carrito);
  Object.keys(carrito).forEach((id) => {
    if (carrito[id] <= 0) delete carrito[id];
  });
  guardarJSON(CARRITO_KEY, carrito);
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  actualizarCarrito((carrito) => {
    carrito[id] = (carrito[id] || 0) + delta;
  });
}

function eliminarDelCarrito(id) {
  actualizarCarrito((carrito) => {
    delete carrito[id];
  });
}

function totalCarrito(carrito) {
  return Object.entries(carrito).reduce(
    (sum, [id, qty]) => sum + PRODUCTOS_POR_ID.get(id).precio * qty,
    0
  );
}

function renderCatalogo() {
  const grid = document.getElementById("shopgrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTOS.map(
    (p) => `
    <article class="product">
      <div class="swatch">${iconoProductoSVG(p)}</div>
      <h3>${escaparHTML(p.nombre)}</h3>
      <p class="detalle">${escaparHTML(p.detalle)}</p>
      <span class="price">${formatoEuro(p.precio)}</span>
      <button type="button" class="btn solid" data-add="${escaparHTML(p.id)}">Añadir a la cesta</button>
    </article>`
  ).join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    cambiarCantidad(btn.dataset.add, 1);
    avisarAnadido(btn);
  });
}

function avisarAnadido(btn) {
  const textoOriginal = "Añadir a la cesta";
  btn.textContent = "¡Añadido!";
  clearTimeout(btn._timer);
  btn._timer = setTimeout(() => {
    btn.textContent = textoOriginal;
  }, 1200);
}

function renderCarrito() {
  const lista = document.getElementById("cartitems");
  const totalEl = document.getElementById("carttotal");
  const countEl = document.getElementById("cartcount");
  const checkout = document.getElementById("checkout");
  if (!lista || !totalEl) return;

  const carrito = leerCarrito();
  const entradas = Object.entries(carrito);
  const cantidadTotal = entradas.reduce((s, [, qty]) => s + qty, 0);
  if (countEl) countEl.textContent = cantidadTotal;
  if (checkout) checkout.disabled = entradas.length === 0;

  if (entradas.length === 0) {
    lista.innerHTML = `<p class="cartempty">Tu cesta está vacía todavía.</p>`;
  } else {
    lista.innerHTML = entradas
      .map(([id, qty]) => {
        const p = PRODUCTOS_POR_ID.get(id);
        const idSeguro = escaparHTML(id);
        const nombre = escaparHTML(p.nombre);
        return `
        <div class="cartitem">
          <div>
            <div>${nombre}</div>
            <div class="qty">
              <button type="button" aria-label="Quitar uno de ${nombre}" data-delta="-1" data-id="${idSeguro}">−</button>
              <span aria-label="Cantidad">${qty}</span>
              <button type="button" aria-label="Añadir uno de ${nombre}" data-delta="1" data-id="${idSeguro}">+</button>
              · ${formatoEuro(p.precio * qty)}
            </div>
          </div>
          <button type="button" aria-label="Eliminar ${nombre} de la cesta" data-quitar="${idSeguro}">Eliminar</button>
        </div>`;
      })
      .join("");
  }

  totalEl.textContent = formatoEuro(totalCarrito(carrito));
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
  renderCarrito();

  const lista = document.getElementById("cartitems");
  lista?.addEventListener("click", (e) => {
    const btnDelta = e.target.closest("[data-delta]");
    if (btnDelta) cambiarCantidad(btnDelta.dataset.id, Number(btnDelta.dataset.delta));
    const btnQuitar = e.target.closest("[data-quitar]");
    if (btnQuitar) eliminarDelCarrito(btnQuitar.dataset.quitar);
  });

  const abrir = document.getElementById("cartopen");
  const cerrar = document.getElementById("cartclose");
  const panel = document.getElementById("cartpanel");
  const msg = document.getElementById("checkout-msg");
  if (!panel) return;

  const modal = crearPanelModal(panel, {
    alAbrir: () => {
      abrir?.setAttribute("aria-expanded", "true");
      cerrar?.focus();
    },
    alCerrar: () => {
      abrir?.setAttribute("aria-expanded", "false");
      msg?.classList.remove("show");
    },
  });
  abrir?.addEventListener("click", modal.abrir);
  cerrar?.addEventListener("click", modal.cerrar);

  document.getElementById("checkout")?.addEventListener("click", () => {
    if (Object.keys(leerCarrito()).length === 0) return;
    guardarJSON(CARRITO_KEY, {});
    renderCarrito();
    if (msg) {
      msg.textContent = "¡Gracias por tu pedido! Esto es una demo: no se ha realizado ningún cobro real.";
      msg.classList.add("show");
    }
  });
});
