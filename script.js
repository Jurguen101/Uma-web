/* ============================================================
   UMAMUSUME: PRETTY DERBY — lógica del sitio
   0. Pantalla de carga
   1. Animaciones de aparición al hacer scroll
   2. Menú móvil
   3. Datos de personajes
   4. Retratos (.jpg / .png con respaldo a iniciales)
   5. Rejilla y filtros
   ============================================================ */

/* ============================================================
   1. ANIMACIONES DE APARICIÓN AL HACER SCROLL
   Cada elemento con clase .revelar recibe .revelado la primera
   vez que entra en pantalla; después deja de observarse.
   ============================================================ */
const elementosRevelar = document.querySelectorAll('.revelar');
if ('IntersectionObserver' in window && elementosRevelar.length){
  const observadorRevelado = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting){
        entrada.target.classList.add('revelado');
        observadorRevelado.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elementosRevelar.forEach(el => observadorRevelado.observe(el));
} else {
  // Sin soporte de IntersectionObserver: mostrar todo directamente
  elementosRevelar.forEach(el => el.classList.add('revelado'));
}


/* ============================================================
   2. MENÚ MÓVIL
   ============================================================ */
const menuBoton  = document.getElementById('menuBoton');
const navegacion = document.getElementById('navegacion');
const consultaMovil = window.matchMedia('(max-width:920px)');

function ajustarMenu(){
  navegacion.hidden = consultaMovil.matches;
  menuBoton.setAttribute('aria-expanded','false');
}
ajustarMenu();
window.addEventListener('resize', ajustarMenu);

menuBoton.addEventListener('click', () => {
  const abierto = navegacion.hidden === false;
  navegacion.hidden = abierto;
  menuBoton.setAttribute('aria-expanded', String(!abierto));
});
navegacion.addEventListener('click', e => {
  if (e.target.tagName === 'A' && consultaMovil.matches){
    navegacion.hidden = true;
    menuBoton.setAttribute('aria-expanded','false');
  }
});


/* ============================================================
   2. DATOS DE PERSONAJES
   Formato: [nombre, estilo, descripción]
   Estilos: Escapista / Puntera / Rezagada / Finalista
   Añade, borra o reescribe libremente: la página se genera sola.
   ============================================================ */
const UMAMUSUME = [
  ["Special Week","Late Surger","Llegó del campo con una promesa: ser la mejor de Japón."],
  ["Silence Suzuka","Front Runner","Sale primera y nadie la alcanza. Corre en su propio silencio."],
  ["Tokai Teio","Pace Chaser","Volvió de dos lesiones graves sin perder su paso ligero."],
  ["Maruzensky","Front Runner","Velocidad desbordante y aire de hermana mayor."],
  ["Fuji Kiseki","Pace Chaser","Elegante y teatral. Carrera corta, brillo enorme."],
  ["Oguri Cap","Late Surger","De pista rural a ídolo nacional. Y come sin parar."],
  ["Gold Ship","End Closer","Imprevisible dentro y fuera de la pista. Nadie sabe qué hará."],
  ["Vodka","Pace Chaser","Ganó el Derby frente a los chicos. Directa y sin adornos."],
  ["Daiwa Scarlet","Pace Chaser","Orgullosa y competitiva. Rival eterna de Vodka."],
  ["Taiki Shuttle","Pace Chaser","Velocista alegre que también triunfó en Francia."],
  ["Grass Wonder","End Closer","Serena por fuera, feroz en la recta final."],
  ["Hishi Amazon","Late Surger","Fuerza pura y carácter de luchadora."],
  ["Mejiro McQueen","Pace Chaser","Modales de dama, fondo de acero en distancias largas."],
  ["El Condor Pasa","Pace Chaser","Ambición internacional. Casi conquista el Arco de Triunfo."],
  ["T.M. Opera O","Late Surger","Rey de una temporada perfecta. Y lo sabe."],
  ["Narita Brian","Late Surger","Triple Corona, Loba solitaria y silencio concentrado."],
  ["Symboli Rudolf","Pace Chaser","La emperatriz invicta. Autoridad y ejemplo del colegio."],
  ["Air Groove","Pace Chaser","Orgullo indomable. Venció a los machos en el Tenno Sho."],
  ["Agnes Digital","Late Surger","Se adapta a cualquier pista. Curiosa y enamoradiza."],
  ["Seiun Sky","Front Runner","Bromista astuta que engaña al rival marcando el ritmo."],
  ["Tamamo Cross","Late Surger","Vino de abajo y remontó hasta lo más alto."],
  ["Fine Motion","Pace Chaser","Sangre extranjera y porte de princesa distraída."],
  ["Biwa Hayahide","Pace Chaser","Analítica y metódica. Calcula cada carrera."],
  ["Mayano Top Gun","Late Surger","Enérgica, ruidosa y con un motor enorme."],
  ["Manhattan Cafe","End Closer","Melancólica y nocturna. Aparece al final como una sombra."],
  ["Mihono Bourbon","Front Runner","Entrenada como una máquina. Busca aprender a sentir."],
  ["Mejiro Ryan","Late Surger","Obsesionada con el músculo y el entrenamiento duro."],
  ["Hishi Akebono","Front Runner","Grande y risueña. Potencia pura en distancias cortas."],
  ["Yukino Bijin","Pace Chaser","Amable y hogareña. Cuida de todas."],
  ["Rice Shower","End Closer","Tímida y tenaz. Frustró sueños de Triple Corona ajenos."],
  ["Ines Fujin","Front Runner","Escandalosa y enérgica. Lidera desde el primer metro."],
  ["Agnes Tachyon","Late Surger","Científica insomne. Talento enorme, cuerpo frágil."],
  ["Admire Vega","Late Surger","Reservada y perfeccionista, de linaje ilustre."],
  ["Inari One","Pace Chaser","Corazón sencillo y trabajo constante."],
  ["Winning Ticket","Late Surger","Impulsiva y llorona, pero nunca se rinde."],
  ["Air Shakur","Late Surger","Fría y afilada. Rival declarada de Opera O."],
  ["Eishin Flash","Late Surger","Mide todo al milímetro, desde los ingredientes para hornear hasta el cuidado de su cola."],
  ["Curren Chan","Pace Chaser","Es tranquila, disciplinada, muy sociable y consciente de su propio encanto o 'monada' (cuteness)."],
  ["Kawakami Princess","Late Surger","Salvaje y libre. Princesa de montaña."],
  ["Gold City","Pace Chaser","Una belleza como ésta sólo aparecerá una vez cada cien años."],
  ["Sakura Bakushin O","Front Runner","Solo entiende una cosa: correr recto y rápido."],
  ["King Halo","Late Surger","Linaje de reyes y un orgullo que a veces le pesa."],
  ["Matikanefukukitaru","Late Surger","Supersticiosa. Carga amuletos para atraer la suerte."],
  ["Nishino Flower","Pace Chaser","Pequeña, dulce y sorprendentemente veloz."],
  ["Haru Urara","Pace Chaser","Nunca ganó una carrera y aun así es la favorita del público."],
  ["Bamboo Memory","Pace Chaser","Constante y discreta. Trabaja sin hacer ruido."],
  ["Biko Pegasus","Late Surger","Extrovertida y presumida, siempre buscando el foco."],
  ["Marvelous Sunday","Late Surger","Paciente. Esperó su momento durante años."],
  ["Matikane Tannhauser","Late Surger","Habla como la heroína de una novela de fantasía."],
  ["Nice Nature","End Closer","Reina del tercer puesto, con humor y mucho cariño."],
  ["Mejiro Dober","Pace Chaser","Rígida y responsable. Heredera muy exigente consigo misma."],
  ["Narita Taishin","End Closer","Perezosa fuera de la pista, explosiva en los últimos metros."],
  ["Sweep Tosho","Late Surger","Alegre y expresiva. Disfruta cada carrera."],
  ["Super Creek","End Closer","Serena y maternal, con un fondo inagotable."],
  ["Smart Falcon","Front Runner","Ídolo de la pista. Brilla bajo los focos."],
  ["Zenno Rob Roy","Late Surger","Disciplinada y estudiosa. Floreció tarde."],
  ["Tosen Jordan","Late Surger","Despreocupada y capaz de récords inesperados."],
  ["Nakayama Festa","Late Surger","Irregular y orgullosa. Casi gana en Francia."],
  ["Meisho Doto","Late Surger","Insegura pero incansable. Persigue a Opera O sin descanso."],
  ["Mejiro Ardan","Pace Chaser","Amable y algo torpe, con un corazón de oro."],
  ["Yaeno Muteki","Pace Chaser","Fuerte y directa. Se lanza siempre de frente."],
  ["Tsurumaru Tsuyoshi","Late Surger","Bromista incansable que anima a todo el equipo."],
  ["Mejiro Palmer","Front Runner","Caótica y divertida. Se escapa cuando nadie lo espera."],
  ["Daitaku Helios","Front Runner","Ruidosa y chispeante. Compañera de travesuras."],
  ["Twin Turbo","Front Runner","Arranca a todo gas y confía en llegar entera."],
  ["Satono Diamond","Late Surger","Educada y firme. La joya de su generación."],
  ["Kitasan Black","Front Runner","Optimista y cantarina. Lidera con pura energía."],
  ["Sakura Chiyono O","Pace Chaser","Veterana enérgica con espíritu competitivo."],
  ["Sirius Symboli","Late Surger","Aire misterioso. Probó suerte en Europa."],
  ["Mejiro Bright","End Closer","Tímida y aplicada. Resistente en las distancias largas."],
  ["Mejiro Ramonu","Pace Chaser","Artista invicta con vocación de escenario."],
  ["Katsuragi Ace","Pace Chaser","Franca y práctica, con acento de Kansai."],
  ["Hokko Tarumae","Pace Chaser","Especialista en arena. Terca y muy trabajadora."],
  ["Sakura Laurel","Late Surger","Volvió de una lesión grave sin perder la sonrisa."],
  ["Narita Top Road","Late Surger","Honesta y esforzada. Siempre en la pelea."],
  ["Yamanin Zephyr","Pace Chaser","Velocista seria y algo solitaria."],
  ["Sounds of Earth","Late Surger","Segunda una y otra vez, y no deja de intentarlo."],
  ["Symboli Kris S","Pace Chaser","Sobria y elegante, con una presencia imponente."],
  ["Tanino Gimlet","Late Surger","Ruda y motera. padre de Vodka en la vida real."],
  ["Daiichi Ruby","Late Surger","Coqueta y sociable. Le pierde la moda."],
  ["Aston Machan","Pace Chaser","Descarada y moderna. Velocidad con actitud."],
  ["Satono Crown","Late Surger","Reservada y viajera. Ganó fuera de Japón."],
  ["Shinko Windy","Front Runner","Traviesa y curiosa. Problemas garantizados."],
  ["Sakura Chitose O","Late Surger","Dulce y algo dispersa, con un final muy potente."],
  ["Duramente","Late Surger","Genio explosivo y talento difícil de domar."],
  ["Neo Universe","End Closer","Soñadora con la mirada puesta en el cielo."],
  ["Cesario","Late Surger","Conquistó América siendo muy joven."],
  ["Copano Rickey","Late Surger","Persistente. Ganó grandes premios por sorpresa."],
  ["Hishi Miracle","End Closer","Constancia silenciosa y remontadas muy largas."],
  ["Vivlos","Late Surger","Triunfó en Dubái. Serena y segura de sí misma."],
  ["Jungle Pocket","Late Surger","Impetuosa y libre, como su nombre."],
  ["Curren Bouquet","Late Surger","Delicada por fuera, competitiva por dentro."],
  ["Air Messiah","Late Surger","Tranquila y observadora. Habla poco, ve todo."],
  ["Tap Dance City","Late Surger","Le encanta bailar. Explotó ya en la madurez."],
  ["Transcend","Front Runner","Reina de la arena. Estuvo a punto de ganar en Dubái."],
  ["Seeking the Pearl","Pace Chaser","Primera japonesa en ganar un gran premio europeo."],
  ["Still in Love","Pace Chaser","Triple Corona femenina con paso firme."],
  ["Gentildonna","Late Surger","Elegante fuera, implacable en la recta."],
  ["Buena Vista","End Closer","Remontadas espectaculares y una mala suerte célebre."],
  ["Orfevre","Late Surger","Genio indomable. Dos veces segunda en el Arco."],
  ["Loves Only You","Late Surger","Ganó en varios continentes sin despeinarse."],
  ["Daring Tact","End Closer","Triple Corona invicta. Tranquila y muy segura."],
  ["Tosen Homareboshi","Late Surger","Ambiciosa y directa. Busca su sitio entre las grandes."],
  ["Nishino Daisy","Late Surger","Enérgica y algo despistada, pero nunca se cansa."],
  ["Meisho Bowler","Pace Chaser","Alegre y habladora. El alma del vestuario."],
  ["Bubble Gum Fellow","End Closer","Dulce y risueña, con un cierre sorprendente."],
  ["Mr. C.B.","Late Surger","Excéntrica y misteriosa. Sigue sus propias reglas."],
  ["Ikuno Dictus","Late Surger","Seria y protectora con las más jóvenes."],
  ["Nakayama Nasuno","Pace Chaser","Pequeña y valiente. No se achica ante nadie."],
  ["Hokuto Vega","Front Runner","Decidida y luminosa. Va siempre hacia delante."],
  ["Meiji Hikari","Late Surger","Veterana legendaria de paso firme y calmado."]
];



/* ============================================================
   3. RETRATOS
   Guarda las fotos en la carpeta RUTA_FOTOS con el nombre en
   minúsculas y guiones. Se prueban las extensiones de EXT_FOTOS
   en orden: si no existe el .jpg se intenta el .png, y si tampoco,
   la tarjeta muestra las iniciales sobre color.
     "Gold Ship"  ->  img/personajes/gold-ship.jpg  o  .png
     "T.M. Opera O" -> img/personajes/t-m-opera-o.jpg  o  .png
   Tamaño recomendado: 300x300 px, recortadas a la cara.
   ============================================================ */
const RUTA_FOTOS = 'img/personajes/';
const EXT_FOTOS  = ['.jpg', '.png', '.jpeg', '.webp'];

function slug(nombre){
  return nombre.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-|-$/g,'');
}

/* Se llama desde el onerror de cada <img>: prueba la siguiente
   extensión de la lista y, si se agotan, oculta la imagen. */
function siguienteFormato(img){
  const i = Number(img.dataset.ext) + 1;
  if (i < EXT_FOTOS.length){
    img.dataset.ext = i;
    img.src = RUTA_FOTOS + img.dataset.slug + EXT_FOTOS[i];
  } else {
    img.hidden = true;
  }
}

/* Tono de rosa distinto por personaje, derivado del nombre */
function tono(nombre){
  let n = 0;
  for (const c of nombre) n = (n + c.charCodeAt(0)) % 360;
  const hue = 320 + (n % 45) - 25;
  return `hsl(${hue} ${62 + (n % 18)}% ${58 + (n % 10)}%)`;
}

function iniciales(nombre){
  return nombre.split(/[\s.]+/).filter(Boolean).slice(0,2)
    .map(p => p[0].toUpperCase()).join('');
}


/* ============================================================
   4. REJILLA Y FILTROS
   ============================================================ */
const rejilla   = document.getElementById('rejillaPersonajes');
const busqueda  = document.getElementById('busqueda');
const filtro    = document.getElementById('filtroEstilo');
const contador  = document.getElementById('contador');
const sinResult = document.getElementById('sinResultados');

const LISTA = [...new Map(UMAMUSUME.map(u => [u[0], u])).values()];

function pintarPersonajes(){
  const texto  = busqueda.value.trim().toLowerCase();
  const estilo = filtro.value;

  const visibles = LISTA.filter(([nombre, est, desc]) =>
    (nombre.toLowerCase().includes(texto) || desc.toLowerCase().includes(texto)) &&
    (!estilo || est === estilo)
  );

  rejilla.innerHTML = visibles.map(([nombre, est, desc]) => {
    const s = slug(nombre);
    return `
    <li class="personaje" style="--color-personaje:${tono(nombre)}" tabindex="0"
        aria-label="${nombre}. Estilo ${est}. ${desc}">
      <div class="personaje__foto">
        <span class="personaje__iniciales" aria-hidden="true">${iniciales(nombre)}</span>
        <img src="${RUTA_FOTOS}${s}${EXT_FOTOS[0]}" alt="Retrato de ${nombre}"
             loading="lazy" data-slug="${s}" data-ext="0"
             onerror="siguienteFormato(this)">
        <span class="etiqueta personaje__etiqueta">${est}</span>
      </div>
      <div class="personaje__cinta"><h3>${nombre}</h3></div>
      <p class="personaje__descripcion">${desc}</p>
    </li>`;
  }).join('');

  contador.textContent = `${visibles.length} de ${LISTA.length}`;
  sinResult.hidden = visibles.length !== 0;
}

busqueda.addEventListener('input', pintarPersonajes);
filtro.addEventListener('change', pintarPersonajes);
pintarPersonajes();

/* ------------------------------------------------------------
   PANTALLA DE CARGA
   Se muestra siempre al abrir o refrescar la página. Cumple tres
   funciones a la vez:
   1) Muestra un gif elegido al azar de la lista GIFS_CARGA.
   2) Da tiempo (mínimo TIEMPO_MINIMO_MS) a que la página termine
      de asentarse; la barra se desliza mientras tanto y, en
      cuanto todo está listo, se detiene y se rellena entera.
   3) El toque para cerrarla es la interacción que los navegadores
      exigen antes de permitir sonido automático, así que en ese
      mismo gesto arranca también la música.
   Pon tus gifs en img/ con estos nombres (o cambia la lista) —
   si alguno no existe, esa imagen simplemente se oculta y queda
   el círculo rosa liso.
   ------------------------------------------------------------ */
const GIFS_CARGA = [
  'img/carga-1.gif',
  'img/carga-2.gif',
  'img/carga-3.gif',
  'img/carga-4.gif',
  'img/carga-5.gif',
  'img/carga-6.gif',
  'img/carga-7.gif',
  'img/carga-8.gif',
  'img/carga-9.gif',
  'img/carga-10.gif'
];

const pantallaCarga = document.getElementById('pantallaCarga');
const textoCarga    = document.getElementById('textoCarga');
const gifCarga      = document.getElementById('gifCarga');
const barraCarga    = document.getElementById('barraCarga');
const TIEMPO_MINIMO_MS = 1400;

if (gifCarga && GIFS_CARGA.length){
  const elegido = GIFS_CARGA[Math.floor(Math.random() * GIFS_CARGA.length)];
  gifCarga.src = elegido;
}

const inicioCarga = Date.now();
let listaParaCerrar = false;

function marcarListo(){
  const transcurrido = Date.now() - inicioCarga;
  const espera = Math.max(0, TIEMPO_MINIMO_MS - transcurrido);
  setTimeout(() => {
    listaParaCerrar = true;
    if (barraCarga) barraCarga.classList.add('completa');
    textoCarga.textContent = 'Toca para entrar';
  }, espera);
}

function cerrarPantallaCarga(){
  if (!listaParaCerrar) return;
  pantallaCarga.hidden = true;
  audio.play().catch(() => {});
}

if (pantallaCarga){
  pantallaCarga.addEventListener('click', cerrarPantallaCarga);
  pantallaCarga.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') cerrarPantallaCarga();
  });
  window.addEventListener('load', marcarListo);
  // Por si la carga ya terminó antes de engancharse el listener
  if (document.readyState === 'complete') marcarListo();
}