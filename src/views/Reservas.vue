<script setup>
import { ref, nextTick } from "vue";
import { rutaApi } from '@/main';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const datosUsuario = JSON.parse(localStorage.getItem('sesion'));
const arrayReservas = ref([]);

//logica de los avisos
const mensajeExito = ref("");

async function mostrarAlerta(mensaje) {
  mensajeExito.value = mensaje;
  setTimeout(() => {
    mensajeExito.value = "";
  }, 3000);
}

//funcion para reserva
async function listarReservas() {
    const clienteEmail = datosUsuario.email;
    fetch(rutaApi+'reservas?email='+clienteEmail, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        arrayReservas.value = data;
        console.log("Rutas:", data);
    })
    .catch(error => console.error('Error:', error));
}

async function eliminarReserva(id) {
    //confirmacion para borrar la ruta
    if (!confirm("¿Estás seguro/a de cancelar esta reserva? Esto no se puede deshacer")) {
        return; //y si se da a cancelar detiene la accion
    }

    const reservaId = id;

    fetch(rutaApi+`reservas?id=`+reservaId, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        //aviso
        mostrarAlerta("La reserva ha sido cancelada, hasta la próxima :C");
        listarReservas();
        console.log('Respuesta:', data);
    })
    .catch(error => console.error('Error:', error))
}

//modal mapa
const mostrarModalMapa = ref(false);
const reservaActiva = ref(null);
let map = null;
let marker = null;

async function abrirMapa(reserva) {
    reservaActiva.value = reserva;
    mostrarModalMapa.value = true; //abrir el modal de HTML

    // timeout para que le de tiempo a cargar
    setTimeout(function() {
        const lat = reserva.ruta_latitud; 
        const lng = reserva.ruta_longitud;

        if (!map) {
            // creacion del mapa dentro del div
            map = L.map('mapa-reserva').setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            marker = L.marker([lat, lng]).addTo(map);
        } else {
            // si ya existia actualizamos coordenadas
            map.setView([lat, lng], 15);
            marker.setLatLng([lat, lng]);
            
            //evitamos que salgan recuadros grises
            map.invalidateSize(); 
        }
    }, 200); 
}

function cerrarMapa() {
    mostrarModalMapa.value = false;
}

listarReservas();
</script>

<template>
  <div class="container my-5">
    
    <div v-if="mensajeExito" class="toast-flotante alert alert-success d-flex align-items-center shadow-lg fade-in" role="alert">
      <i class="bi bi-check-circle-fill fs-4 me-3"></i>
      <div class="fw-bold">{{ mensajeExito }}</div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
      <h2 class="fw-bold text-dark m-0">
        <i class="bi bi-calendar-check text-naranja me-2"></i>Mis Próximas Reservas
      </h2>
    </div>
    
    <p class=" mb-4">¡Bienvenid@, <strong>{{ datosUsuario.nombre }}</strong>! Aquí tienes tus próximas aventuras</p>

    <div class="card rounded-4 overflow-hidden">
      <div class="table-responsive">
        <table class="table table-custom mb-0 align-middle text-center">
          <thead class="cabecera-azul">
            <tr>
              <th scope="col" class="py-3">Título</th>
              <th scope="col" class="py-3">Localización</th>
              <th scope="col" class="py-3">Fecha y hora</th>
              <th scope="col" class="py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in arrayReservas" :key="reserva.reserva_id">
              <td class="fw-bold text-start">{{ reserva.ruta_titulo }}</td>
              
              <td>
                <button 
                  @click="abrirMapa(reserva)" 
                  class="btn btn-sm border-0 fw-bold text-dark "
                  :aria-label="'Ver localización de ' + reserva.ruta_titulo"
                >
                  <i class="bi bi-geo-alt-fill text-danger me-1"></i> Ver localización
                </button>
              </td>

              <td class="fw-medium">
                <i class="bi bi-calendar-event me-1"></i> {{ reserva.ruta_fecha }} - {{ reserva.ruta_hora }}
              </td>
              <td>
                <button @click.prevent="eliminarReserva(reserva.reserva_id)" class="btn btn-sm btn-outline-danger fw-bold rounded-pill px-3">
                  <i class="bi bi-x-circle-fill me-1"></i> Cancelar
                </button>
              </td>
            </tr>

            <tr v-if="arrayReservas.length === 0">
              <td colspan="4" class="text-center py-5">
                <i class="bi bi-calendar-x fs-1 d-block mb-2 text-muted"></i>
                <span class=" fw-medium text-muted">No tienes reservas próximas.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="mostrarModalMapa" class="modal-overlay d-flex justify-content-center align-items-center">
      <div class="card border-0 rounded-4 shadow-lg p-3" style="max-width: 600px; width: 95%;">
        
        <div class="d-flex justify-content-between align-items-center mb-3 px-2">
          <h5 class="fw-bold m-0 text-dark">
            <i class="bi bi-pin-map-fill text-naranja me-2"></i>
            {{ reservaActiva?.ruta_titulo }}
          </h5>
          <button @click="cerrarMapa" class="btn-close" aria-label="Cerrar mapa"></button>
        </div>

        <div id="mapa-reserva" class="w-100 rounded-3 border" style="height: 350px; z-index: 1;"></div>

        <div class="mt-3 text-center">
          <button @click="cerrarMapa" class="btn btn-secondary rounded-pill px-4 fw-bold">Cerrar</button>
        </div>
        
      </div>
    </div>

  </div>
</template>

<style scoped>
.toast-flotante {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1060;
  min-width: 350px;
  border-radius: 8px;
}


.table-custom tbody tr:hover td {
  background-color: #f8f9fa ;
}

.text-naranja{
  color: #FF8C42 ;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1050;
}
.cabecera-azul, .cabecera-azul th {
  background-color: #00A8B5; 
  color: #ffffff;
}
</style>