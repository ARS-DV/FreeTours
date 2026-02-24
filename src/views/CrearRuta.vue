<script setup>
import {ref, onMounted} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//referencias a los elementos
const form = ref({ titulo: '', localidad: '', descripcion:'',foto:'',fecha:'',hora:'',latitud:'',longitud:'',guia_id:'' });
//variables para el mapa
let map, marker;
const error = ref('');

function iniciarMapa() {
    //se inicia el mapa centrado en mitad de España por defecto
    map = L.map('mapa-crear').setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    //evento para que al hacer click en este se guarden los datos
    map.on('click', function(e) {
        //se redonde a 6
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        
        //rellenamos el formulario de vue
        form.value.latitud = lat;
        form.value.longitud = lng;

        //marcador visual para saber donde hacer clic
        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
    });
}

onMounted(() => {
    iniciarMapa();
});
async function guardarRuta() {
    //guardamos cadenas con los nombres de datos de nuestro form
    const obligatorios = ['titulo', 'localidad', 'descripcion', 'fecha', 'hora', 'latitud', 'longitud'];
    //some lo recorre para ver si hay algun campo vacio
    const camposVacios = obligatorios.some(datos => !form.value[datos]);

    //si es asi, error
    if (camposVacios) {
        error.value = "Por favor, rellena todos los campos obligatorios (todos menos guia)";
        return;
    }

    //declaramos una variable que guarde toda la informacion de la ruta
    const rutaData = {
    titulo: form.value.titulo,
    localidad: form.value.localidad,
    descripcion: form.value.descripcion,
    foto: form.value.foto,
    fecha: form.value.fecha,
    hora: form.value.hora,
    latitud: form.value.latitud,
    longitud: form.value.longitud,
    guia_id: form.value.guia_id //esto es opcional
};


//fetch para meter los datos de la nueva ruta
fetch(rutaApi+'rutas', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(rutaData)
})
.then(response => response.json())
.then(data => {
console.log('Respuesta:', data)
router.push('/rutasadmin')
})
.catch(error => 
error.value = "Hubo un problema al conectar con el servidor",
console.error('Error:', error));
}
</script>

<template>
  <div class="container my-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2">
      <h2 class="fw-bold text-dark">
        <i class="bi bi-map text-naranja me-2"></i>Crear una nueva ruta
      </h2>
      <button class="btn btn-outline-secondary fw-bold rounded-pill" @click="router.push('/rutasadmin')">
        <i class="bi bi-arrow-left me-1"></i> Volver
      </button>
    </div>
<div v-if="error" class="alert alert-danger d-flex align-items-center rounded-3 fade-in">
      <i class="bi bi-exclamation-triangle-fill fs-5 me-2"></i>
      <div class="fw-bold">{{ error }}</div>
    </div>
    <div class="card rounded-4 overflow-hidden p-4 p-md-5">
      
      <form @submit.prevent="guardarRuta" novalidate>
        <div class="row g-5">
          
          <div class="col-12 col-lg-6">
            <h4 class="fw-bold mb-4 text-secondary border-bottom pb-2">Datos de la ruta</h4>
            <!-- mismo for e id para los lectores de pantalla -->
            <div class="mb-3">
              <label for="inputTitulo" class="form-label fw-bold">Título de la Ruta</label>
              <input id="inputTitulo" v-model="form.titulo" type="text" class="form-control bg-light" placeholder="Titulo ruta" required aria-required="true"/>
              <!-- aria required para que los lectores de pantalla sepan que es obligatorio -->
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="inputLocalidad" class="form-label fw-bold">Localidad</label>
                <input id="inputLocalidad" v-model="form.localidad" type="text" class="form-control bg-light" placeholder="Localidad" required aria-required="true"/>
              </div>
              <div class="col-md-6 mb-3">
                <label for="inputGuia" class="form-label fw-bold">ID del Guía <span class="text-muted fw-normal">(Opcional)</span></label>
                <input id="inputGuia" v-model="form.guia_id" type="number" class="form-control bg-light" placeholder="Ej. 12"/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="inputFecha" class="form-label fw-bold">Fecha</label>
                <input id="inputFecha" v-model="form.fecha" type="date" class="form-control bg-light" required aria-required="true"/>
              </div>
              <div class="col-md-6 mb-3">
                <label for="inputHora" class="form-label fw-bold">Hora</label>
                <input id="inputHora" v-model="form.hora" type="time" class="form-control bg-light" required aria-required="true"/>
              </div>
            </div>

            <div class="mb-3">
              <label for="inputFoto" class="form-label fw-bold">URL de la Foto</label>
              <input id="inputFoto" v-model="form.foto" type="url" class="form-control bg-light" placeholder="https://ejemplo.com/foto.png" required aria-required="true"/>
            </div>

            <div class="mb-4">
              <label for="inputDesc" class="form-label fw-bold">Descripción</label>
              <textarea id="inputDesc" v-model="form.descripcion" class="form-control bg-light" rows="4" placeholder="Breve descripción de la ruta" required aria-required="true"></textarea>
            </div>
          </div>

          <div class="col-12 col-lg-6 d-flex flex-column">
            <h4 class="fw-bold mb-2 text-secondary border-bottom pb-2">Punto de Encuentro</h4>
            
              <p class="mb-0 small mb-4"><strong>Haga clic</strong> en el lugar exacto donde comenzará el tour. Las coordenadas se rellenarán automáticamente</p>

            <div id="mapa-crear" class="w-100 rounded-4 shadow-sm border mb-4" style="height: 350px; z-index: 1;"></div>

            <div class="row mt-auto">
              <div class="col-6">
                <label for="inputLat" class="form-label fw-bold">Latitud</label>
                <input id="inputLat" v-model="form.latitud" type="text" class="form-control text-center" placeholder="Clic en el mapa"/>
              </div>
              <div class="col-6">
                <label for="inputLng" class="form-label fw-bold">Longitud</label>
                <input id="inputLng" v-model="form.longitud" type="text" class="form-control text-center" placeholder="Clic en el mapa"/>
              </div>
            </div>

          </div>
        </div>

        <hr class="my-4">
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary btn-lg px-5 fw-bold rounded-pill">
            <i class="bi bi-save me-2"></i> Guardar ruta
          </button>
        </div>

      </form>

    </div>
  </div>
</template>

<style scoped>

.btn-primary {
  background-color: #FF8C42;
  border-color: #FF8C42;
}
.btn-primary:hover {
  background-color: #e57d3b;
  border-color: #e57d3b;
}
.text-naranja {
  color: #FF8C42;
}

</style>