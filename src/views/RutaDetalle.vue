<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
//import y variables necesarias para el mapa
import L from "leaflet";
import "leaflet/dist/leaflet.css";
let map, marker;
let mapIniciado = false;

//guardar id de la ruta
const idRuta = router.currentRoute.value.params.id;
const ruta = ref(null);
const infoValoracion = ref(null);

const datosSesion = JSON.parse(localStorage.getItem("sesion"));
const hayusuario = ref(datosSesion !== null);

//funcion para el mapa
async function iniciarMapa(lat, lon, titulo) {
  map = L.map("map").setView([lat, lon], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  marker = L.marker([lat, lon])
    .addTo(map)
    .bindPopup(`<b>${titulo}</b><br>Punto de encuentro`)
    .openPopup();
}
//funcion para dibujar el mapa
async function comprobarCajaMapa(lat, lon, titulo) {
  if (mapIniciado) return;
  const cajaHtml = document.getElementById("map");
  if (cajaHtml) {
    iniciarMapa(lat, lon, titulo);
    mapIniciado = true;
  } else {
    setTimeout(() => {
      comprobarCajaMapa(lat, lon, titulo);
    }, 50);
  }
}

async function cargarRuta() {
  fetch(rutaApi + "rutas?id=" + idRuta, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      ruta.value = data;
      //insertamos la latitud, longitud y titulo de la ruta
      comprobarCajaMapa(
        Number(data.latitud),
        Number(data.longitud),
        data.titulo,
      );
    })
    .catch((error) => console.error("Error al cargar la ruta:", error));
}
//funcion para las valoraciones
async function cargarValoraciones() {
  fetch(rutaApi + "valoraciones?ruta_id=" + idRuta, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        let suma = 0;
        for (let i = 0; i < data.length; i++) {
          suma += Number(data[i].puntuacion);
        }
        const notaMedia = (suma / data.length).toFixed(1);
        infoValoracion.value = { nota: notaMedia, total: data.length };
      }
    })
    .catch((error) => console.error("Error al cargar valoraciones:", error));
}

//rederigir a la reserva
function irAReservar() {
  router.push("/crearreserva/" + ruta.value.id);
}
//funcion para volver a la ciudad
function volverCiudad() {
    router.push('/ciudadview/' + ruta.value.localidad);
}
//cargamos las funciones
cargarRuta();
cargarValoraciones();
</script>

<template>
  <main class="container my-5" v-if="ruta">
    <div class="mb-3">
            <button @click="volverCiudad" class="btn btn-outline-secondary rounded-pill fw-bold px-3" aria-label="Volver a las rutas de la ciudad">
                <i class="bi bi-arrow-left me-1" aria-hidden="true"></i> Volver a {{ ruta.localidad }}
            </button>
        </div>
    <header class="bg-light p-4 text-center rounded-4 mb-4 border">
      <h1 class="fw-bolder text-dark" id="tituloRuta">{{ ruta.titulo }}</h1>
      <p class="fs-5 mb-0">
        <i class="bi bi-geo-alt-fill text-danger me-1" aria-hidden="true"></i>
        {{ ruta.localidad }}
        <span class="mx-2" aria-hidden="true">|</span>
        <i
          class="bi bi-calendar-event text-primary me-1"
          aria-hidden="true"
        ></i>
        {{ ruta.fecha }}
        <span class="mx-2" aria-hidden="true">|</span>
        <i class="bi bi-clock text-warning me-1" aria-hidden="true"></i>
        {{ ruta.hora }}
      </p>
    </header>

    <section class="row g-4">
      <div class="col-12 col-lg-6">
        <img
          :src="ruta.foto"
          class="img-fluid rounded-4 w-100"
          style="object-fit: cover; max-height: 500px"
          :alt="'Fotografía descriptiva de ' + ruta.titulo"
          @error="
            $event.target.src = 'https://placehold.co/600x400?text=Sin+Foto'
          "
        />
      </div>

      <div class="col-12 col-lg-6 d-flex flex-column">
        <h2 class="h3 fw-bold border-bottom pb-2">Descripción de la ruta</h2>
        <p class="fs-5 mb-4">{{ ruta.descripcion }}</p>

        <article class="bg-light p-3 rounded-4 mb-4 border shadow-sm">
          <strong class="d-block mb-2 fs-5">
            <i class="bi bi-map-fill text-primary me-2" aria-hidden="true"></i
            >Punto de encuentro:
          </strong>
          <p class="font-monospace small mb-2">
            <span aria-label="Latitud">Lat: {{ ruta.latitud }}</span> |
            <span aria-label="Longitud">Long: {{ ruta.longitud }}</span>
          </p>

          <div
            id="map"
            style="height: 250px; border-radius: 8px; z-index: 1"
            role="region"
            aria-label="Mapa interactivo con el punto de encuentro"
          ></div>
        </article>

        <article
          class="py-3 px-4 bg-white border rounded-3 mb-4 shadow-sm text-center"
        >
          <span v-if="infoValoracion" class="fs-5 fw-bold">
            <i class="bi bi-star-fill text-warning me-1" aria-hidden="true"></i>
            Valoración:
            <span class="text-warning fs-4">{{ infoValoracion.nota }}</span>
            <span class="text-muted fw-normal ms-2"
              >({{ infoValoracion.total }} opiniones)</span
            >
          </span>
          <span v-else class="fs-5 text-muted fw-bold">
            <i class="bi bi-star-fill text-warning me-1" aria-hidden="true"></i>
            Sin valoraciones aún
          </span>
        </article>

        <div
          v-if="hayusuario"
          class="mt-auto bg-white p-4 border rounded-4 text-center"
        >
          <p class="fs-5 mb-3">
            Precio: <strong class="text-success">Gratis</strong>
          </p>
          <button
            @click="irAReservar"
            class="btn btn-success btn-lg w-100 fw-bold"
          >
            Reservar Plaza
          </button>
        </div>

        <div
          v-else
          class="mt-auto alert alert-secondary text-center rounded-4  border-0"
          role="alert"
        >
          <p class="fs-5 mb-3 fw-medium">Inicia sesión para reservar plaza.</p>
          <div class="d-flex justify-content-center gap-2">
            <button
              @click="router.push('/login')"
              class="btn btn-primary px-4 fw-bold"
            >
              Log in
            </button>
            <button
              @click="router.push('/registro')"
              class="btn btn-info text-white px-4 fw-bold"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div
    v-else
    class="container my-5 d-flex justify-content-center align-items-center"
    style="min-height: 50vh"
  >
    <div class="text-center">
      <div
        class="spinner-border text-info"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="visually-hidden">Cargando detalles de la ruta...</span>
      </div>
    </div>
  </div>
</template>
