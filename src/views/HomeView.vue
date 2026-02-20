<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
import {
  iniciar,
} from "@/assets/videoFunciones.js";
const arrayRutas = ref([]);
const errorImg = ref({});


function marcarErrorImagen(ciudadNombre) {
  errorImg.value[ciudadNombre] = true;
}

function destinosNoRepetidos(rutas) {
  const ciudades = []; //variable para guardar las ciudades
  rutas.forEach((ruta) => {
    //se comrpueba si la ciudad está ya en nuestro array
    const existe = ciudades.find((c) => c.nombre === ruta.localidad);
    //si no es asi, insertamos la ciudad
    if (!existe) {
      ciudades.push({
        nombre: ruta.localidad,
        foto: ruta.foto, //metemos foto por el enlace en la base de datos
      });
    }
  });

  arrayRutas.value = ciudades;
}

function verRuta(id) {
  router.push(`/ruta/${id}`);
}

function listarRutas() {
  fetch(rutaApi + "rutas", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      destinosNoRepetidos(data);
    })
    .catch((error) => console.error("Error al cargar rutas:", error));
}

listarRutas();
onMounted(() => {
  iniciar();
});
</script>

<template>



  <div class="container mb-5">
    <section class="mb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-dark m-0">Destinos Populares</h2>
      </div>

      <div class="d-flex flex-nowrap overflow-auto gap-4 py-2 custom-scrollbar">
        <div
          v-for="ciudad in arrayRutas"
          :key="ciudad.nombre"
          class="text-center"
          style="min-width: 100px; cursor: pointer; margin: 5px"
          @click="router.push(`/ciudadview/${ciudad.nombre}`)"
        >
          <img
            v-if="!errorImg[ciudad.nombre]"
            :src="ciudad.foto"
            @error="marcarErrorImagen(ciudad.nombre)"
            class="rounded-circle shadow-sm mb-2"
            style="width: 100px; height: 100px; object-fit: cover"
            alt="Foto ciudad"
          />

          <div
            v-else
            class="rounded-circle shadow-sm d-flex align-items-center justify-content-center bg-info text-white mb-2 mx-auto"
            style="
              width: 80px;
              height: 80px;
              font-size: 1.5rem;
              font-weight: bold;
            "
          ></div>

          <p style="text-decoration: underline">{{ ciudad.nombre }}</p>
        </div>
      </div>
    </section>
  </div>
  <!-- VIDEO -->
    <h3 class="d-flex justify-content-center align-items-center">Recomendaciones de nuestro canal</h3>
  <section class="video d-flex justify-content-center align-items-center flex-column">

    <video id="medio" width="720" height="400">
      <source :src="'homeVideo.mp4'" type="video/mp4" />
      <source :src="'homeVideo.ogg'" type="video/ogg" />
    </video>
    <nav>
      <input type="button" id="reiniciar" value="reiniciar" />
      <input type="button" id="retrasar" value="&laquo;" />
      <input type="button" id="play" value="&#9658;" />
      <input type="button" id="adelantar" value="&raquo;" />
      <input type="button" id="silenciar" value="silenciar" />
      <label>Volumen</label>
      <input type="button" id="menosVolumen" value="-" />
      <input type="button" id="masVolumen" value="+" />
    </nav>
  </section>

  <!-- Preguntas frecuentes -->
   <h3>Preguntas frecuentes</h3>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          <strong>¿Qué es FreeTours España?</strong>
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          Somos la plataforma de referencia para descubrir España a través de
          los ojos de guías locales expertos. Conectamos a viajeros curiosos con
          apasionados de la historia y la cultura en las principales ciudades
          del país. Nuestro objetivo es democratizar el turismo, ofreciendo
          experiencias de alta calidad accesibles para todos, sin barreras de
          entrada.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          <strong>¿Qué es un "free tour"?</strong>
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          Un "free tour" es una visita guiada de <strong>libre pago</strong>. A
          diferencia de los tours tradicionales con una tarifa fija por
          adelantado, aquí tú eres quien valora la experiencia una vez
          finalizada. Esto garantiza que nuestros guías se esfuercen al máximo
          en cada recorrido para ofrecerte una experiencia divertida, educativa
          e inolvidable.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingThree">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree"
          aria-expanded="false"
          aria-controls="flush-collapseThree"
        >
          <strong>¿Cuánto cuesta un tour?</strong>
        </button>
      </h2>
      <div
        id="flush-collapseThree"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingThree"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          ¡Reservar tu plaza es totalmente gratis! Al final del recorrido, tú
          decides cuánto entregar al guía basándote en tu satisfacción y
          presupuesto.
          <br /><br />
          Aunque no hay un precio fijo, la aportación media habitual en España
          suele oscilar entre los <strong>10€ y 15€ por persona</strong>. Estas
          aportaciones permiten a nuestros guías locales seguir dedicándose
          profesionalmente a enseñarte los secretos de su ciudad.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-video {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
}
.accordion-button:not(.collapsed) {
  color: #1e272e;
  background-color: transparent;
  box-shadow: none;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(0, 0, 0, 0.125);
}

.accordion-button:not(.collapsed) {
  font-weight: bold;
}

.card-hover {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.bg-info {
  background-color: #00a8b5;
}

.video{
margin-bottom: 5vh;
}
</style>
