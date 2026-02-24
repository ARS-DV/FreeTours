<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";

const arrayRutas = ref([]);
const datosGuia = JSON.parse(localStorage.getItem("sesion"));

//variables con ref
const rutaSeleccionada = ref(null);
const numeroAsistentes = ref(0);
const mensajeExito = ref("");
const enviando = ref(false);

//creacion de la fecha
const fechaActual = new Date();
const año = fechaActual.getFullYear();
// Le sumamos 1 al mes porque en JavaScript enero es 0, y aseguramos que tenga 2 cifras (ej: 05)
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
// Aseguramos que el día tenga 2 cifras
const dia = String(fechaActual.getDate()).padStart(2, "0");
const hoy = año + "-" + mes + "-" + dia;

// mostrar alerta
function mostrarAlerta(mensaje) {
  mensajeExito.value = mensaje;
  setTimeout(() => {
    mensajeExito.value = "";
  }, 3000);
}

async function listarRutasAsignadas() {
  const guiaId = datosGuia.id;
  fetch(rutaApi + `asignaciones?guia_id=` + guiaId, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
      arrayRutas.value = data;
  })
  .catch(error => console.error('Error:', error));
}

// funcion para el modal
function prepararModal(ruta) {
  rutaSeleccionada.value = ruta;
  // Si ya había asistentes registrados, los ponemos por defecto, sino 0
  numeroAsistentes.value = ruta.reservas?.num_personas || 0;
}

//funcion para modificar el el nº de asistentes de la ruta
function pasarLista(ruta) {
  mostrarAlerta(`¡Has pasado lista para: ${ruta.ruta_titulo}!`);
}

listarRutasAsignadas();
</script>

<template>
  <div 
    v-if="mensajeExito" 
    class="toast-flotante alert alert-success d-flex align-items-center shadow" 
    role="alert"
  >
    <i class="bi bi-check-circle-fill fs-4 me-3"></i>
    <div class="fw-bold">{{ mensajeExito }}</div>
  </div>

  <div class="container-fluid px-4 my-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
      <h2 class="fw-bold text-dark m-0">
        <i class="bi bi-calendar-check text-primary me-2"></i>Mis Rutas Asignadas
      </h2>
    </div>

    <div class="card rounded-4 overflow-hidden shadow-sm">
      <div class="table-responsive">
        <table class="table table-custom-striped mb-0 align-middle text-center">
          <thead class="table-dark">
            <tr>
              <th scope="col" class="text-start">Título de la Ruta</th>
              <th scope="col">Localidad</th>
              <th scope="col">Fecha y Hora</th>
              <th scope="col">Ubicación (Lat / Long)</th>
              <th scope="col">Reservas actuales</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ruta in arrayRutas" :key="ruta.id">
              <td class="text-start fw-bold text-dark">{{ ruta.ruta_titulo }}</td>
              <td><i class="bi bi-geo-alt-fill text-muted me-1"></i>{{ ruta.ruta_localidad }}</td>
              
              <td>
                <span class="d-block fw-medium">{{ ruta.ruta_fecha }}</span>
                <span class="text-muted small">{{ ruta.ruta_hora }}</span>
              </td>
              
              <td class="text-muted small font-monospace">
                {{ ruta.ruta_latitud }}<br>{{ ruta.ruta_longitud }}
              </td>
              
              <td>
                <span class="badge bg-info text-white fs-6">
                  {{ ruta.reservas?.num_personas || '0' }}
                </span>
              </td>
              
              <td>
                <button
                  type="button"
                  class="btn fw-bold shadow-sm"
                  :class="ruta.ruta_fecha === hoy ? 'btn-primary' : 'btn-outline-secondary'"
                  :disabled="ruta.ruta_fecha !== hoy"
                  @click="pasarLista(ruta)"
                  :title="ruta.ruta_fecha !== hoy ? 'Solo puedes pasar lista el día de la ruta' : 'Pasar lista ahora'"
                >
                  <i class="bi bi-clipboard-check me-1"></i> Pasar lista
                </button>
              </td>
            </tr>

            <tr v-if="arrayRutas.length === 0">
              <td colspan="6" class="text-center py-5 text-muted">
                <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                Aún no tienes rutas asignadas.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-flotante {
  position: fixed;
  z-index: 1055;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 350px;
  border-radius: 5px;
}

.table-custom-striped > tbody > tr:nth-of-type(odd) > * {
  background-color: rgba(0, 168, 181, 0.05); 
}

.table-custom-striped > tbody > tr:hover > * {
  background-color: rgba(68, 73, 80, 0.1);
}


.text-primary {
  color: #00A8B5 ;
}
.bg-primary, .btn-primary {
  background-color: #00A8B5 ;
  border-color: #00A8B5 ;
}
.btn-primary:hover {
  background-color: #008f99;
}
</style>