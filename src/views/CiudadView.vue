<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";

const ciudadActual = router.currentRoute.value.params.nombre; //para obtener los valores de la ruta actual
const rutasFiltradas = ref([]);

async function cargarRutas() {
  let rutasGuardadas = [];

  //1º fetch de la ruta
  fetch(rutaApi + "rutas", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      //filtro para buscar las rutas de la ciudad actual
      rutasGuardadas = data.filter((ruta) => ruta.localidad == ciudadActual);

      //2º fetch para valoraciones
      return fetch(rutaApi + "valoraciones", { method: "GET" });
    })
    .then((response) => response.json())
    .then((data) => {
      //bucle para calcular la nota media
      rutasGuardadas.forEach((ruta) => {
        const valoracionesRuta = data.filter(
          (val) => Number(val.ruta_id) == Number(ruta.id),
        );
        if (valoracionesRuta.length > 0) {
          const sumaEstrellas = valoracionesRuta.reduce(
            (acc, val) => acc + Number(val.puntuacion),
            0,
          );
          ruta.mediaValoracion = (
            sumaEstrellas / valoracionesRuta.length
          ).toFixed(1);
        } else {
          ruta.mediaValoracion = "Nuevo";
        }
      });

      rutasFiltradas.value = rutasGuardadas; //guardamos los datos de la rutas filtradas
    })
    .catch((error) =>
      console.error("Error al cargar rutas y valoraciones:", error),
    );
}
//funcion para ir a la ruta en sí
async function verDetalle(id) {
  router.push("/rutadetalle/" + id);
}

// Ejecutamos la función
cargarRutas();
</script>

<template>
  <div class="container my-5">
    <div class="d-flex align-items-center mb-4 gap-3">
      <!-- aria label para los lectores de pantalla -->
      <button
        @click="router.push('/')"
        class="btn btn-outline-secondary fw-bold"
        aria-label="Volver a la página anterior"
      >
      <!-- aria hidden para que el lector ignores iconos contextuales -->
        <i class="bi bi-arrow-left" aria-hidden="true"></i> Volver
      </button>
      <h1 class="fw-bold m-0 text-dark">Rutas en {{ ciudadActual }}</h1>
    </div>

    <div class="row g-4" v-if="rutasFiltradas.length > 0">
      <div
        v-for="ruta in rutasFiltradas"
        :key="ruta.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <article
          class="card h-100 card-hover"
          role="button"
          tabindex="0"
          :aria-label="'Ver detalles de la ruta: ' + ruta.titulo"
          @click="verDetalle(ruta.id)"
        >

          <img
            :src="ruta.foto"
            class="card-img-top"
            style="height: 200px; object-fit: cover"
            :alt="'Fotografía de la ruta ' + ruta.titulo"
            @error="
              $event.target.src = 'https://placehold.co/600x400?text=Sin+Foto'
            "
          />

          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold text-dark mb-2">{{ ruta.titulo }}</h5>

            <p class="small mb-3">
              {{ ruta.descripcion }}
            </p>

            <p class="card-text small mb-2 d-flex align-items-center flex-wrap">
              <span title="Fecha"
                ><i class="bi bi-calendar-event me-1" aria-hidden="true"></i>
                {{ ruta.fecha }}</span
              >
              <span class="mx-2" aria-hidden="true">|</span>
              <span title="Hora"
                ><i class="bi bi-clock me-1" aria-hidden="true"></i>
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

            <p class="mt-auto mb-0 fw-bold text-success">
              <i class="bi bi-tag-fill me-1" aria-hidden="true"></i> ¡Precio
              libre!
            </p>
          </div>
        </article>
      </div>
    </div>

    <div v-else class="text-center mt-5 p-5 bg-light rounded">
      <i class="bi bi-emoji-frown fs-1 mb-3" aria-hidden="true"></i>
      <h3 class="fw-bold text-dark">Lo lamentamos</h3>
      <p class="fs-5">
        Aún no tenemos actividades disponibles en {{ ciudadActual }}.
      </p>
      <button
        @click="router.push('/')"
        class="btn btn-primary mt-3 px-4 py-2 fw-bold"
      >
        Ver otros destinos
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-hover {
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-5px);
}
</style>
