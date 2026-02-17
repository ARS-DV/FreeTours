<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayUsuarios = ref([]);
const idUsuarioEditado = ref(null);
//funcion para obtener el id del usuario a editar
function editarUsuario(id) {
  idUsuarioEditado.value = id;
  
}
//funcion para guardar el rol editado
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


//funcion para listar a los usuarios
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

//funcion para eliminar a los usuarios
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
        <!-- vif para cambiar a input si se da editar -->
        <td v-if="idUsuarioEditado !== usuario.id">{{ usuario.rol }}</td>
        <td v-else>
          <input v-model="usuario.rol" class="form-control"></input>
        </td>
        <!-- botones de accion -->
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
