<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
const idRutaEditar = ref(null);

function crearRuta() {
 router.push('/crearruta')
  
}
function editarRuta(id) {
  idRutaEditar.value = id;
  
}

async function guardarEdicion(id,guia_id) {
const updateGuia = {
    guia_id: guia_id
};
fetch(rutaApi+'usuarios?id='+id, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateGuia)
})
.then(response => response.json())
.then(data => {
  
  console.log('Respuesta:', data)
  idRutaEditar.value = null;
  listarRutas();
  
}).catch(error => console.error('Error:', error));
}

async function listarRutas() {
  fetch(rutaApi + "rutas", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      ((arrayRutas.value = data), console.log("Rutas:", data));
    })
    .catch((error) => console.error("Error:", error));
}
async function eliminarRuta(id) {
  const rutaId = id;

fetch(rutaApi+`rutas?id=${rutaId}`, {
    method: 'DELETE',
})
.then(response => response.json())
.then(data => {
  listarRutas();
  console.log('Respuesta:', data)})
.catch(error => console.error('Error:', error));
}

listarRutas();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Titulo</th>
        <th scope="col">Localidad</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Foto</th>
        <th scope="col">Fecha</th>
        <th scope="col">Hora</th>
        <th scope="col">Latitud</th>
        <th scope="col">Longitud</th>
        <th scope="col">Guia_id</th>
        <th scope="col">Nombre guia</th>
        <th scope="col">Email guia</th>
        <th scope="col">Asistentes</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ruta in arrayRutas" :key="ruta.id">
        <td>{{ ruta.id }}</td>
        <td>{{ ruta.titulo }}</td>
        <td>{{ ruta.localidad }}</td>
        <td>{{ ruta.descripcion }}</td>
        <td>{{ ruta.foto }}</td>
        <td>{{ ruta.fecha }}</td>
        <td>{{ ruta.hora }}</td>
        <td>{{ ruta.latitud }}</td>
        <td>{{ ruta.longitud }}</td>
        <td v-if="idRutaEditar !== ruta.id">{{ ruta.guia_id }}</td>
        <td v-else>
          <input v-model="ruta.guia_id" class="form-control"></input>
        </td>
        <td>{{ ruta.guia_nombre }}</td>
        <td>{{ ruta.guia_email }}</td>
        <td>{{ ruta.asistentes }}</td>

        <td v-if="idRutaEditar !== ruta.id">
          <button @click.prevent="editarRuta(ruta.id)">Editar</button>
          <button @click.prevent="eliminarRuta(ruta.id)">Eliminar</button>
        </td>
        <td v-else>
          <button @click.prevent="guardarEdicion(ruta.id, ruta.guia_id)">Guardar</button>
          <button @click.prevent="eliminarRuta(ruta.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button @click.prevent="crearRuta">Añadir ruta</button>
</template>
