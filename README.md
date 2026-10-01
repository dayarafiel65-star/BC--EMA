# Ñemones Basquet Club

Web del equipo hecha con HTML, CSS y JavaScript puro (sin frameworks ni build step).

## Estructura

```
├── index.html          Inicio: hero, próximo partido, accesos rápidos
├── plantilla.html      Plantilla del equipo con ficha/estadísticas en modal
├── tienda.html         Tienda con cesta (carrito en localStorage)
├── reservas.html       Mapa de asientos y formulario de reserva
├── favicon.svg         Escudo del club
├── css/styles.css      Estilos de todo el sitio
└── js/
    ├── data.js         Datos: jugadores, productos, próximo partido, secciones del pabellón
    ├── utils.js        Utilidades compartidas: formato €, escape HTML, localStorage seguro, modales
    ├── ilustraciones.js  Avatares de jugadores e iconos de productos (SVG inline)
    ├── nav.js          Menú móvil y año del footer
    ├── inicio.js       Rellena la tarjeta del próximo partido
    ├── plantilla.js    Renderiza las fichas de jugadores y el modal de estadísticas
    ├── tienda.js       Catálogo, cesta y checkout de demo
    └── reservas.js     Mapa de asientos, selección y confirmación
```

Orden de carga de scripts en cada página: `data.js` → `utils.js` → (`ilustraciones.js`) → `nav.js` → script de la página.

## Ver el proyecto en local (VS Code)

1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server** (Ritwick Dey) si no la tienes.
3. Clic derecho sobre `index.html` → **Open with Live Server**.

No hace falta Node, ni `npm install`, ni build: es HTML/CSS/JS servido tal cual.

## Subir a GitHub

```bash
cd BC--EMA
git init
git add .
git commit -m "Primera versión de la web de Ñemones BC"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/BC--EMA.git
git push -u origin main
```

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) → **Add New Project**.
2. Importa el repositorio `BC--EMA` de GitHub.
3. Framework Preset: **Other** (no hay build, es HTML estático).
4. Deja el *Build Command* y el *Output Directory* vacíos y pulsa **Deploy**.

Cada `git push` a `main` volverá a desplegar la web automáticamente.

## Qué es "de demo" y qué es real

- El carrito de la tienda y las reservas de asientos se guardan en `localStorage`, así que persisten al recargar pero solo en tu propio navegador — no hay base de datos ni backend.
- Los datos del equipo (jugadores, partido, productos) están en `js/data.js`: edítalos ahí para personalizarlos.
- El botón "Finalizar pedido" y el formulario de reserva no cobran ni envían nada de verdad; son solo la interacción front-end.

## Próximos pasos posibles

- Sustituir `localStorage` por una API real (por ejemplo con Vercel Serverless Functions) si en algún momento quieres reservas compartidas entre usuarios.
- Añadir imágenes reales de jugadores y productos en una carpeta `assets/`.
