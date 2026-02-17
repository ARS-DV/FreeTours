<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
//obtenemos los datos del guia a través del LocalStorage
const datosGuia = JSON.parse(localStorage.getItem('sesion'));


async function listarRutasAsignadas() {
  //guardamos el id del guia
  const guiaId = datosGuia.id;
  //hacemos fetch con asignaciones
  fetch(rutaApi + "asignaciones?guia_id="+guiaId, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      //array para guardar rutas
      arrayRutas.value = [];

      //recorremos las rutas con un foreach
      data.forEach(datos => {
          //contador
          let total = 0;
          // declaramos el array vacio para evitar fallos y luego si hay datos se meten
          const listaReservas = []; 
        if(datos.reserva){
          listaReservas=datos.reserva
        }
          
          listaReservas.forEach(reserva => {
              total = total + reserva.num_personas;
          });

          //hacemos un push de los datos
          arrayRutas.value.push({
              id: datos.ruta_id,
              titulo: datos.ruta_titulo,
              localidad: datos.ruta_localidad,
              fecha: datos.ruta_fecha,
              hora: datos.ruta_hora,
              latitud: datos.ruta_latitud,
              longitud: datos.ruta_longitud,
              asistentes: total 
          });
      });

  }).catch((error) => console.error("Error:", error));
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
        <td>{{ ruta.titulo }}</td>
        <td>{{ ruta.localidad }}</td>
        <td>{{ ruta.fecha }}</td>
        <td>{{ ruta.hora }}</td>
        <td>{{ ruta.latitud }}</td>
        <td>{{ ruta.longitud }}</td>
        <td>{{ ruta.asistentes }}</td>

      </tr>
    </tbody>
  </table>
</template>
