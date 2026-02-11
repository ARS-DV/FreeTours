<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayUsuarios = ref([]);


async function eliminarUsuario() {

}

async function editarUsuario(id,rol) {
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
  
  console.log('Respuesta:', data)})
  
.catch(error => console.error('Error:', error));
}

async function listarUsuarios() {
  fetch(rutaApi + "usuarios", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      ((arrayUsuarios.value = data), console.log("Usuarios:", data));
    })
    .catch((error) => console.error("Error:", error));
}
listarUsuarios();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Email</th>
        <th scope="col">Contraseña</th>
        <th scope="col">Rol</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="usuario in arrayUsuarios" :key="usuario.id">
        <td>{{ usuario.id }}</td>
        <td>{{ usuario.nombre }}</td>
        <td>{{ usuario.email }}</td>
        <td>{{ usuario.contraseña }}</td>
        <td v-if="!editarUsuario">{{ usuario.rol }}</td>
        <input v-else="editarUsuario" v-model="usuario.rol" ></input>
        <td v-if="!editarUsuario">
          <button @click.prevent="editarUsuario">Editar</button
          ><button @click.prevent="eliminarUsuario">Eliminar</button>
        </td>
        <td v-else="editarUsuario">
          <button @click.prevent="editarUsuario(usuario.id,usuario.rol)">Guardar</button
          ><button @click.prevent="eliminarUsuario">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
