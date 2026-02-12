<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayUsuarios = ref([]);
const idUsuarioEditado = ref(null);


async function eliminarUsuario(id) {
fetch(rutaApi+'usuarios?id='+id, {
    method: 'DELETE',
    
})
.then(response => response.json())
.then(data => {console.log('Respuesta:', data)
listarUsuarios()
})
.catch(error => console.error('Error:', error));
}


function editarUsuario(id) {
  idUsuarioEditado.value = id;
  
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
        <td v-if="idUsuarioEditado !== usuario.id">{{ usuario.rol }}</td>
        <td v-else>
          <input v-model="usuario.rol" class="form-control"></input>
        </td>

        <td v-if="idUsuarioEditado !== usuario.id">
          <button @click.prevent="editarUsuario(usuario.id)">Editar</button>
          <button @click.prevent="eliminarUsuario(usuario.id)">Eliminar</button>
        </td>
        <td v-else>
          <button @click.prevent="guardarEdicion(usuario.id, usuario.rol)">Guardar</button>
          <button @click.prevent="eliminarUsuario(usuario.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
