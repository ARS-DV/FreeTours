<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
const idRutaEditar = ref(null);

//funcion para rederigir a crear rutas
function crearRuta() {
 router.push('/crearruta')
  
}

//funcion para obtener el id de la ruta a editar
function editarRuta(id) {
  idRutaEditar.value = id;
  
}
//funcion para guardar la edicion de la ruta 
async function guardarEdicion(ruta) {
  //variable para guardar los datos de la id a modificar y del guia
  const updateGuia = {
   ruta_id: ruta.id,   
    guia_id: ruta.guia_id 
  };
fetch(rutaApi+'asignaciones', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateGuia)
})
.then(response => response.json())
.then(data => {
  
  console.log('Respuesta:', data)
  idRutaEditar.value = null; //valor para quitar el input
  listarRutas();
  
}).catch(error => console.error('Error:', error));
}
//funcion para listar rutas
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

//funcion para eliminar rutas con el parametro de id
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
        <!--si la id de la ruta a editar es nulo, se saca el ID o mensaje -->
        <td v-if="idRutaEditar !== ruta.id">{{ ruta.guia_id || 'Guía no asginado'}}</td>
        <!--metemos el input -->
        <td v-else>
          <input v-model="ruta.guia_id" class="form-control"></input>
        </td>
        <td>{{ ruta.guia_nombre }}</td>
        <td>{{ ruta.guia_email }}</td>
        <td>{{ ruta.asistentes }}</td>

         <!--para que aparezcan los botones -->
        <td v-if="idRutaEditar !== ruta.id">
          <button @click.prevent="editarRuta(ruta.id)">Editar</button>
          <button @click.prevent="eliminarRuta(ruta.id)">Eliminar</button>
        </td>
        <td v-else>
          <button @click.prevent="guardarEdicion(ruta)">Guardar</button>
          <button @click.prevent="eliminarRuta(ruta.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button @click.prevent="crearRuta">Añadir ruta</button>
</template>
