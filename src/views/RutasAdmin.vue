<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
const idRutaEditar = ref(null);


function editarRuta(id) {
  idRutaEditar.value = id;
  
}

async function guardarEdicion(id,rol) {
const updatedRole = {
    rol: rol
};
fetch(rutaApi+'usuarios?id='+id, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedRole)
})
.then(response => response.json())
.then(data => {
  
  console.log('Respuesta:', data)
  idUsuarioEditado.value = null;
  listarUsuarios();
  
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
        <td>{{ ruta.guia_id }}</td>
        <td>{{ ruta.guia_nombre }}</td>
        <td>{{ ruta.guia_email }}</td>
        <td>{{ ruta.asistentes }}</td>
        <td v-if="idRutaEditar !== ruta.id">{{ ruta.rol }}</td>
        <td v-else>
          <input v-model="ruta.rol" class="form-control"></input>
        </td>

        <td v-if="idRutaEditar !== ruta.id">
          <button @click.prevent="editarRuta(ruta.id)">Editar</button>
          <button @click.prevent="eliminarUsuario(ruta.id)">Eliminar</button>
        </td>
        <td v-else>
          <button @click.prevent="guardarEdicion(ruta.id, ruta.rol)">Guardar</button>
          <button @click.prevent="eliminarUsuario(ruta.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
