<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
//obtenemos los datos del guia a través del LocalStorage
const datosGuia = JSON.parse(localStorage.getItem("sesion"));

async function listarRutasAsignadas() {
  //guardamos el id del guia
  const guiaId = datosGuia.id;
  //hacemos fetch con asignaciones
  fetch(rutaApi+`asignaciones?guia_id=`+guiaId, {
    method: 'GET',
})
.then(response => response.json())
.then(data => {
      ((arrayRutas.value = data), console.log("Rutas:", data));
    })
.catch(error => console.error('Error:', error));
}
listarRutasAsignadas();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Localidad</th>
        <th scope="col">Fecha</th>
        <th scope="col">Hora</th>
        <th scope="col">Latitud</th>
        <th scope="col">Longitud</th>
        <th scope="col">Asistentes</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ruta in arrayRutas" :key="ruta.id">
        <td>{{ ruta.ruta_titulo }}</td>
        <td>{{ ruta.ruta_localidad }}</td>
        <td>{{ ruta.ruta_fecha }}</td>
        <td>{{ ruta.ruta_hora }}</td>
        <td>{{ ruta.ruta_latitud }}</td>
        <td>{{ ruta.ruta_longitud }}</td>
        <td>{{ ruta.reservas.num_personas || '0' }}</td>
        <td>
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-primary"
            data-mdb-modal-init
            data-mdb-target="#staticBackdrop2"
          >
            Pasar lista
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  
</template>
