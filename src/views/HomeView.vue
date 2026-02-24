<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
import { iniciar } from "@/assets/videoFunciones.js";
const arrayRutas = ref([]);
const rutasPopulares = ref([]);
const errorImg = ref({});

//funcion por si da error la imagen
function marcarErrorImagen(ciudadNombre) {
  errorImg.value[ciudadNombre] = true;
}
//nav a la ruta
function verDetalle(id) {
  router.push("/rutadetalle/" + id);
}
//nav a la ciudad
function irACiudad(nombreCiudad) {
  router.push("/ciudadview/" + nombreCiudad);
}

//mostramos las 6 primera rutas
function procesarRutasPopulares(rutas) {
  rutasPopulares.value = rutas.slice(0, 6);
}

async function destinosNoRepetidos(rutas) {
  const ciudades = [];
  rutas.forEach((ruta) => {
    //se comrpueba si la ciudad está ya en nuestro array
    const existe = ciudades.find((ciudad) => ciudad.nombre === ruta.localidad);
    //si no es asi, insertamos la ciudad
    if (!existe) {
      ciudades.push({
        nombre: ruta.localidad,
        foto: ruta.foto, //metemos foto por el enlace en la base de datos
      });
    }
  });

  arrayRutas.value = ciudades; //añadimos las rutas al array
}

async function listarRutas() {
  let rutasGuardadas = []; //variables para guardar las rutas

  fetch(rutaApi + "rutas", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      rutasGuardadas = data; //guardamos la info de las rutas
      return fetch(rutaApi + "valoraciones", { method: "GET" }); //hacemos otro fetch para obtener las valoraciones
    })
    .then((response) => response.json())
    .then((valoraciones) => {
      //bucle para recorrer las rutas
      rutasGuardadas.forEach((ruta) => {
        //filtramos para comparar las id
        const valoracionesRuta = valoraciones.filter(
          (val) => Number(val.ruta_id) == Number(ruta.id),
        );

        if (valoracionesRuta.length > 0) {
          // sumamos las valoraciones de la ruta
          const sumaEstrellas = valoracionesRuta.reduce(
            (acc, val) => acc + Number(val.puntuacion),
            0,
          );
          //y luego hacemos la media con la longitud
          ruta.mediaValoracion = (
            sumaEstrellas / valoracionesRuta.length
          ).toFixed(1);
        } else {
          //si no aparace como nueva
          ruta.mediaValoracion = "Nueva";
        }
      });
      //ejecutamos a la funciones
      destinosNoRepetidos(rutasGuardadas);
      procesarRutasPopulares(rutasGuardadas);
    })
    .catch((error) =>
      console.error("Error al cargar rutas y valoraciones:", error),
    );
}

listarRutas();
//usamos onMounted porque sino, no hay forma de arracancar el video
onMounted(() => {
  iniciar();
});
</script>

<template>
  <!--cabecera -->
  <header
  
    class="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white mb-5"
  >
    <div class="hero-overlay" aria-hidden="true"></div>
    <div class="hero-content z-2 px-3">
      <h1 class="display-3 fw-bolder">Descubre España paso a paso</h1>
      <p class="fs-3 fw-semibold">
        Los mejores free tours guiados por expertos locales
      </p>
    </div>
  </header>

  <main class="container mb-5">
    <!-- destinos disponbles -->
    <section class="mb-5" aria-labelledby="titulo-destinos">
      <div
        class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2"
      >
        <h2 id="titulo-destinos" class="fw-bold text-dark m-0">
          <i class="bi bi-geo-alt-fill text-danger me-2" aria-hidden="true"></i
          >Destinos disponibles
        </h2>
      </div>

      <div class="d-flex flex-nowrap overflow-auto gap-4 py-3 px-2">
        <!-- aria label para los lectores de pantalla -->
        <div
          v-for="ciudad in arrayRutas"
          :key="ciudad.nombre"
          class="text-center destino"
          style="min-width: 110px; cursor: pointer"
          role="button"
          :aria-label="'Ver destinos disponibles en ' + ciudad.nombre"
          @click="irACiudad(ciudad.nombre)"
        >
          <img
            v-if="!errorImg[ciudad.nombre]"
            :src="ciudad.foto"
            @error="marcarErrorImagen(ciudad.nombre)"
            class="rounded-circle mb-2 img-destino"
            style="width: 100px; height: 100px; object-fit: cover"
            :alt="'Fotografía de ' + ciudad.nombre"
          />

          <div
            v-else
            class="rounded-circle d-flex align-items-center justify-content-center bg-info text-white mb-2 mx-auto img-destino"
            style="
              width: 100px;
              height: 100px;
              font-size: 2rem;"
            aria-hidden="true"
          >
          </div>

          <p class="fw-bold text-dark m-0">{{ ciudad.nombre }}</p>
        </div>
      </div>
    </section>
    <!-- actividades recomendadas -->
    <section class="mb-5" aria-labelledby="titulo-actividades">
      <div
        class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2"
      >
        <h2 id="titulo-actividades" class="fw-bold text-dark m-0">
          <i class="bi bi-star-fill text-warning me-2" aria-hidden="true"></i
          >Actividades recomendadas
        </h2>
      </div>

      <div class="row g-4">
        <div
          v-for="ruta in rutasPopulares"
          :key="ruta.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <article
            class="card h-100 card-hover border rounded-4 overflow-hidden"
            role="button"
            tabindex="0"
            :aria-label="'Ver detalles de la ruta: ' + ruta.titulo"
            @click="verDetalle(ruta.id)"
          >
            <img
              :src="ruta.foto"
              class="card-img-top"
              style="height: 220px; object-fit: cover"
              :alt="'Imagen de la ruta ' + ruta.titulo"
              @error="
                $event.target.src = 'https://placehold.co/600x400?text=Sin+Foto'
              "
            />
            <div class="card-body d-flex flex-column">
              <div class="mb-2">
                <span
                  class="badge bg-info text-white px-3 py-2 rounded-pill"
                  >{{ ruta.localidad }}</span
                >
              </div>
              <h3 class="card-title h5 fw-bold text-dark mt-2">
                {{ ruta.titulo }}
              </h3>

              <p
                class="card-text small mt-auto pt-3 border-top d-flex align-items-center flex-wrap"
              >
                <span title="Fecha"
                  ><i
                    class="bi bi-calendar-event text-primary me-1"
                    aria-hidden="true"
                  ></i>
                  {{ ruta.fecha }}</span>
                <span class="mx-2 text-muted" aria-hidden="true">|</span>

                <span title="Hora"
                  ><i
                    class="bi bi-clock text-warning me-1"
                    aria-hidden="true"
                  ></i>
                  {{ ruta.hora }}</span
                >
                <span class="mx-2" aria-hidden="true">|</span>

                <span title="Valoración media" class="fw-bold text-dark">
                  <i
                    class="bi bi-star-fill text-warning me-1"
                    aria-hidden="true"
                  ></i>
                  {{ ruta.mediaValoracion }}
                </span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
<!-- video -->
    <section
      class="mb-5 bg-light p-4 p-md-5 rounded-4 shadow-sm text-center border"
      aria-labelledby="titulo-video"
    >
      <h2 id="titulo-video" class="h3 fw-bold mb-4 text-dark">
        <i
          class="bi bi-play-circle-fill text-danger me-2"
          aria-hidden="true"
        ></i
        >Recomendaciones de nuestro canal
      </h2>

      <video
        id="medio"
        class="w-100 rounded-3 shadow mb-3 bg-dark"
        style="max-width: 720px; height: auto"
        aria-label="Vídeo promocional"
      >
        <source :src="'homeVideo.mp4'" type="video/mp4" />
        <source :src="'homeVideo.ogg'" type="video/ogg" />
      </video>

      <nav
        class="d-flex justify-content-center flex-wrap gap-2 mt-2"
        aria-label="Controles de vídeo"
      >
        <input
          type="button"
          id="reiniciar"
          class="btn btn-outline-secondary fw-bold"
          value="Reiniciar"
          aria-label="Reiniciar vídeo"
        />
        <input
          type="button"
          id="retrasar"
          class="btn btn-outline-dark fw-bold"
          value="&laquo; 5s"
          aria-label="Retroceder 5 segundos"
        />
        <input
          type="button"
          id="play"
          class="btn btn-primary fw-bold px-4"
          value="&#9658; Play"
          aria-label="Reproducir o pausar"
        />
        <input
          type="button"
          id="adelantar"
          class="btn btn-outline-dark fw-bold"
          value="5s &raquo;"
          aria-label="Avanzar 5 segundos"
        />
        <input
          type="button"
          id="silenciar"
          class="btn btn-outline-secondary fw-bold"
          value="Silenciar"
          aria-label="Silenciar audio"
        />

        <div
          class="d-flex align-items-center ms-md-3 mt-2 mt-md-0 bg-white border rounded px-3 py-1 shadow-sm"
        >
          <label class="me-2 fw-bold small mb-0" aria-hidden="true"
            >Volumen:</label
          >
          <input
            type="button"
            id="menosVolumen"
            class="btn btn-sm btn-light fw-bold border"
            value="-"
            aria-label="Bajar volumen"
          />
          <input
            type="button"
            id="masVolumen"
            class="btn btn-sm btn-light fw-bold border ms-1"
            value="+"
            aria-label="Subir volumen"
          />
        </div>
      </nav>
    </section>

    <section class="mb-5" aria-labelledby="titulo-faq">
      <div class="d-flex justify-content-center align-items-center mb-4">
        <h2 id="titulo-faq" class="fw-bold text-dark m-0">
          <i
            class="bi bi-question-circle-fill text-info me-2"
            aria-hidden="true"
          ></i
          >Preguntas Frecuentes
        </h2>
      </div>

      <div
        class="accordion accordion-flush shadow-sm border rounded-4 overflow-hidden"
        id="accordionFlushExample"
      >
        <article class="accordion-item">
          <h3 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed py-3 fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <strong>¿Qué es FreeTours España?</strong>
            </button>
          </h3>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body text-secondary fs-6 lh-lg">
              Somos la plataforma de referencia para descubrir España a través
              de los ojos de guías locales expertos. Conectamos a viajeros
              curiosos con apasionados de la historia y la cultura en las
              principales ciudades del país. Nuestro objetivo es democratizar el
              turismo, ofreciendo experiencias de alta calidad accesibles para
              todos, sin barreras de entrada.
            </div>
          </div>
        </article>

        <article class="accordion-item">
          <h3 class="accordion-header" id="flush-headingTwo">
            <button
              class="accordion-button collapsed py-3 fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              <strong>¿Qué es un "free tour"?</strong>
            </button>
          </h3>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body text-secondary fs-6 lh-lg">
              Un "free tour" es una visita guiada de
              <strong>libre pago</strong>. A diferencia de los tours
              tradicionales con una tarifa fija por adelantado, aquí tú eres
              quien valora la experiencia una vez finalizada. Esto garantiza que
              nuestros guías se esfuercen al máximo en cada recorrido para
              ofrecerte una experiencia divertida, educativa e inolvidable.
            </div>
          </div>
        </article>

        <article class="accordion-item">
          <h3 class="accordion-header" id="flush-headingThree">
            <button
              class="accordion-button collapsed py-3 fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              <strong>¿Cuánto cuesta un tour?</strong>
            </button>
          </h3>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body text-secondary fs-6 lh-lg">
              ¡Reservar tu plaza es totalmente gratis! Al final del recorrido,
              tú decides cuánto entregar al guía basándote en tu satisfacción y
              presupuesto.
              <br /><br />
              Aunque no hay un precio fijo, la aportación media habitual en
              España suele oscilar entre los
              <strong>10€ y 15€ por persona</strong>.
              Estas aportaciones permiten a nuestros guías locales seguir
              dedicándose profesionalmente a enseñarte los secretos de su
              ciudad.
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 50vh;
  min-height: 400px;
  background: url("https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop")
    center/cover no-repeat;
  margin-top: -1.5rem;
}

/* capa negra semitrasparente*/
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1;
}

.destino:hover {
  transform: translateY(-5px);
}

.card-hover {
  cursor: pointer;
}
.card-hover:hover {
  transform: translateY(-8px);
}

.bg-info {
  background-color: #00a8b5;
}

.accordion-button:not(.collapsed) {
  color: #00a8b5;
  background-color: #f8f9fa;
  box-shadow: none;
  font-weight: bold;
}

.accordion-item {
  border: none;
  border-bottom: 1px solid #dee2e6;
}
</style>
