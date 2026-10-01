/* ============================================================
   ÑEMONES BASQUET CLUB — datos del sitio
   Edita aquí jugadores, productos, partido y secciones.
   ============================================================ */

const PROXIMO_PARTIDO = {
  rival: "CB Atlético Ribera",
  fecha: "Sábado 17 de octubre",
  hora: "19:30",
  pabellon: "Pabellón Ñemón",
  competicion: "Liga Regional · Jornada 4",
};

/* stats: medias por partido. mm = +/-, per = pérdidas, tc/t3/tl = porcentajes de tiro. */
const PLANTILLA = [
  { numero: 4, nombre: "Hugo Ferrán", posicion: "Base", altura: "1,82 m", dato: "6,8 asistencias por partido", bio: "Director de juego desde la cantera. Lee la defensa antes que nadie.", stats: { min: 31, pts: 11.2, reb: 3.1, ast: 6.8, rob: 2.1, tap: 0.1, mates: 0, mm: 7, per: 2.4, tc: 44, t3: 36, tl: 84 }, hazana: "14 asistencias ante el líder la temporada pasada.", insignia: "Capitán" },
  { numero: 5, nombre: "Álex Montoro", posicion: "Escolta", altura: "1,90 m", dato: "41% en triples", bio: "Tirador puro. Si recibe solo en la esquina, es canasta.", stats: { min: 27, pts: 13.5, reb: 2.9, ast: 2.2, rob: 1.0, tap: 0.2, mates: 0.1, mm: 4, per: 1.3, tc: 46, t3: 41, tl: 88 }, hazana: "8 triples en una sola parte." },
  { numero: 7, nombre: "Marcos Ibarra", posicion: "Alero", altura: "1,96 m", dato: "Máximo anotador del equipo", bio: "Anotador versátil que castiga al contraataque y desde media distancia.", stats: { min: 33, pts: 18.4, reb: 5.6, ast: 2.9, rob: 1.4, tap: 0.6, mates: 1.2, mm: 9, per: 2.1, tc: 49, t3: 35, tl: 79 }, hazana: "Canasta ganadora sobre la bocina en la final de copa.", mvp: true, hazanas: ["MVP de la temporada 25/26", "Récord del club: 38 puntos en un partido"] },
  { numero: 8, nombre: "Iker Salvatierra", posicion: "Base", altura: "1,79 m", dato: "2,4 robos por partido", bio: "Defensor incansable, presiona toda la pista los 40 minutos si hace falta.", stats: { min: 18, pts: 5.1, reb: 1.9, ast: 3.4, rob: 2.4, tap: 0, mates: 0, mm: 2, per: 1.5, tc: 39, t3: 31, tl: 72 }, hazana: "6 robos en el último cuarto ante Ribera.", insignia: "Defensor" },
  { numero: 9, nombre: "Daniel Quirós", posicion: "Escolta", altura: "1,88 m", dato: "Especialista defensivo", bio: "Siempre emparejado con el mejor exterior rival.", stats: { min: 20, pts: 6.3, reb: 2.4, ast: 1.6, rob: 1.3, tap: 0.3, mates: 0, mm: 1, per: 0.9, tc: 42, t3: 33, tl: 75 }, hazana: "Dejó en 4 puntos al máximo anotador de la liga." },
  { numero: 10, nombre: "Rubén Escalona", posicion: "Alero", altura: "1,98 m", dato: "Sexto hombre del año", bio: "Sale del banquillo para cambiar el ritmo de cualquier partido.", stats: { min: 22, pts: 10.7, reb: 4.2, ast: 1.8, rob: 0.9, tap: 0.4, mates: 0.8, mm: 3, per: 1.4, tc: 47, t3: 37, tl: 81 }, hazana: "Parcial personal de 12-0 en tres minutos.", insignia: "Sexto hombre" },
  { numero: 11, nombre: "Óscar Bermejo", posicion: "Ala-pívot", altura: "2,03 m", dato: "Doble-doble habitual", bio: "Trabajador en la zona, abre el campo con su tiro exterior.", stats: { min: 28, pts: 12.1, reb: 8.3, ast: 1.5, rob: 0.7, tap: 0.9, mates: 0.6, mm: 5, per: 1.6, tc: 51, t3: 34, tl: 70 }, hazana: "11 dobles-dobles consecutivos." },
  { numero: 12, nombre: "Javi Lucena", posicion: "Alero", altura: "1,94 m", dato: "Mejor porcentaje en tiros libres", bio: "Fiable en los finales apretados: no falla desde la línea.", stats: { min: 15, pts: 5.8, reb: 2.6, ast: 1.1, rob: 0.6, tap: 0.2, mates: 0.2, mm: 0, per: 0.8, tc: 43, t3: 35, tl: 91 }, hazana: "24 tiros libres seguidos sin fallo." },
  { numero: 13, nombre: "Pablo Arrieta", posicion: "Ala-pívot", altura: "2,01 m", dato: "Rookie de la temporada", bio: "Llegado del juvenil, ya pelea por minutos importantes.", stats: { min: 12, pts: 4.4, reb: 3.7, ast: 0.5, rob: 0.4, tap: 0.6, mates: 0.4, mm: -1, per: 0.9, tc: 48, t3: 25, tl: 64 }, hazana: "Debut con 10 puntos y 8 rebotes.", insignia: "Rookie" },
  { numero: 14, nombre: "Sergio Valcárcel", posicion: "Pívot", altura: "2,08 m", dato: "Líder en tapones", bio: "Protector del aro. Cada tiro en la zona pasa por sus manos.", stats: { min: 26, pts: 9.8, reb: 9.1, ast: 1.0, rob: 0.5, tap: 2.3, mates: 1.5, mm: 6, per: 1.7, tc: 58, t3: 0, tl: 62 }, hazana: "7 tapones en la semifinal de copa.", insignia: "Muro" },
  { numero: 15, nombre: "Nico Tarancón", posicion: "Escolta", altura: "1,87 m", dato: "Energía desde el banquillo", bio: "Velocidad pura en transición, contagia intensidad.", stats: { min: 14, pts: 5.2, reb: 1.7, ast: 1.4, rob: 1.1, tap: 0.1, mates: 0.1, mm: -2, per: 1.2, tc: 40, t3: 32, tl: 77 }, hazana: "Mate en contraataque que dio la vuelta a las redes." },
  { numero: 20, nombre: "Adrián Pozuelo", posicion: "Pívot", altura: "2,05 m", dato: "Rebotes ofensivos", bio: "Segunda oportunidad garantizada: nadie le gana la posición.", stats: { min: 16, pts: 5.9, reb: 6.0, ast: 0.6, rob: 0.3, tap: 0.8, mates: 0.7, mm: 1, per: 1.0, tc: 55, t3: 0, tl: 58 }, hazana: "9 rebotes ofensivos en un partido." },
  { numero: 23, nombre: "Lucas Medrano", posicion: "Alero", altura: "1,97 m", dato: "Defensa y triple", bio: "El clásico 3&D: defiende al mejor y castiga desde fuera.", stats: { min: 21, pts: 7.6, reb: 3.8, ast: 1.2, rob: 1.2, tap: 0.5, mates: 0.3, mm: 4, per: 0.7, tc: 44, t3: 39, tl: 76 }, hazana: "5 triples sin fallo en el derbi." },
  { numero: 33, nombre: "Toni Garrido", posicion: "Pívot", altura: "2,10 m", dato: "Veterano del vestuario", bio: "Once temporadas en el club. La memoria viva del Pabellón Ñemón.", stats: { min: 11, pts: 3.9, reb: 4.1, ast: 0.8, rob: 0.2, tap: 0.7, mates: 0.2, mm: 2, per: 0.6, tc: 52, t3: 0, tl: 68 }, hazana: "Jugador con más partidos en la historia del club.", insignia: "Leyenda", hazanas: ["300 partidos con el club", "Campeón de liga regional 2019"] },
];

const PRODUCTOS = [
  { id: "camiseta-local", nombre: "Camiseta oficial local", detalle: "Amarilla con ribetes grana. Tejido técnico transpirable.", precio: 45, icono: "camiseta", color: "#f4a100" },
  { id: "camiseta-visitante", nombre: "Camiseta oficial visitante", detalle: "Grana con detalles amarillos.", precio: 45, icono: "camiseta", color: "#c1121f" },
  { id: "pantalon", nombre: "Pantalón de juego", detalle: "A juego con la equipación local.", precio: 30, icono: "pantalon", color: "#f4a100" },
  { id: "sudadera", nombre: "Sudadera con capucha", detalle: "Algodón grueso con escudo bordado.", precio: 39.9, icono: "sudadera", color: "#c1121f" },
  { id: "gorra", nombre: "Gorra Ñemones", detalle: "Ajustable, talla única.", precio: 18, icono: "gorra", color: "#f4a100" },
  { id: "balon", nombre: "Balón oficial", detalle: "Talla 7, apto interior y exterior.", precio: 29.5, icono: "balon", color: "#e8890b" },
  { id: "bufanda", nombre: "Bufanda de grada", detalle: "Para animar desde la general.", precio: 15, icono: "bufanda", color: "#c1121f" },
  { id: "calcetines", nombre: "Calcetines técnicos", detalle: "Pack de dos pares.", precio: 9.9, icono: "calcetines", color: "#f4a100" },
  { id: "munequeras", nombre: "Muñequeras", detalle: "Pareja con escudo bordado.", precio: 8, icono: "munequera", color: "#c1121f" },
  { id: "mochila", nombre: "Mochila de equipo", detalle: "Compartimento para zapatillas.", precio: 34, icono: "mochila", color: "#3c5a80" },
  { id: "botella", nombre: "Botella deportiva", detalle: "750 ml, sin BPA.", precio: 12, icono: "botella", color: "#f4a100" },
  { id: "taza", nombre: "Taza del club", detalle: "Cerámica, 350 ml.", precio: 10, icono: "taza", color: "#f4a100" },
  { id: "poster", nombre: "Póster de la plantilla", detalle: "Temporada 26/27, 50 × 70 cm.", precio: 7.5, icono: "poster", color: "#c1121f" },
  { id: "llavero", nombre: "Llavero aro roto", detalle: "Homenaje al mate que rompió la canasta.", precio: 5, icono: "llavero", color: "#f4a100" },
];

const SECCIONES_RESERVAS = [
  { id: "pista", nombre: "Pista", precio: 25, filas: 2, asientosPorFila: 14 },
  { id: "preferente", nombre: "Preferente", precio: 15, filas: 4, asientosPorFila: 16 },
  { id: "general", nombre: "General", precio: 8, filas: 5, asientosPorFila: 18 },
];
