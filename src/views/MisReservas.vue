<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from '@/main';

const datosUsuario = JSON.parse(localStorage.getItem('sesion'));
const arrayHistorial = ref([]);

// 
function convertirFechaFija(fechaString) {
    
    const partes = fechaString.split('-');
    if (partes.length == 3) {
        return new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
    }
    return new Date(fechaString);
}

//
async function listarHistorial() {
    const clienteEmail = datosUsuario.email;
    
    fetch(rutaApi + 'reservas?email=' + clienteEmail, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        const hoy = new Date();
        
        //filtro de las rutas
        arrayHistorial.value = data.filter(reserva => {
            const fechaRuta = convertirFechaFija(reserva.ruta_fecha);
            return fechaRuta < hoy; 
        });
    })
    .catch(error => console.error('Error:', error));
}

function irAValorar(idRuta) {
    router.push(`/valoracion/${idRuta}`);
}

listarHistorial();
</script>

<template>
  <div class="container my-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
      <h2 class="fw-bold text-dark m-0">
        <i class="bi bi-clock-history text-secondary me-2"></i>Historial de Rutas
      </h2>
    </div>
    
    <p class="mb-4">Aquí aparecen las rutas que ya has realizado. ¡Comentanos que tal tu aventura!</p>

    <div class="card border rounded-4 overflow-hidden">
      <div class="table-responsive">
        <table class="table table-custom mb-0 align-middle text-center">
          
          <thead class="cabecera-azul">
            <tr>
              <th scope="col" class="py-3">Título</th>
              <th scope="col" class="py-3">Localidad</th>
              <th scope="col" class="py-3">Fecha realizada</th>
              <th scope="col" class="py-3">Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="reserva in arrayHistorial" :key="reserva.reserva_id">
              <td class="fw-bold text-start">{{ reserva.ruta_titulo }}</td>
              <td>
                <span class="text-dark">
                  <i class="bi bi-geo-alt-fill text-danger me-1"></i> {{ reserva.ruta_localidad }}
                </span>
              </td>
              <td class="fw-medium">
                <i class="bi bi-calendar-check me-1"></i> {{ reserva.ruta_fecha }}
              </td>
              
              <td v-if="!reserva.valoracion">
                <button 
                  @click.prevent="irAValorar(reserva.ruta_id)" 
                  class="btn btn-sm btn-outline-warning fw-bold rounded-pill px-3 shadow-sm"
                >
                  <i class="bi bi-star-fill me-1"></i> Valorar Ruta
                </button>
              </td>
              <td v-else>
                <span class="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm fs-6">
                  <i class="bi bi-star-fill"></i> Valorada ({{ reserva.valoracion }}/5)
                </span>
              </td>

            </tr>

            <tr v-if="arrayHistorial.length === 0">
              <td colspan="4" class="text-center py-5">
                <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                <span class="fw-medium">No tienes rutas pasadas en tu historial.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.cabecera-azul, .cabecera-azul th {
  background-color: #00A8B5;
  color: #ffffff;
}

.table-custom tbody tr:hover td {
  background-color: #f8f9fa ;
}
</style>