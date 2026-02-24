<script setup>
import { ref } from "vue";
import { rutaApi } from "@/main";
const arrayUsuarios = ref([]);
const idUsuarioEditado = ref(null); //bandera para editar a los usuarios
const mensajeExito = ref("");

// Función para mostrar alertas amigables que desaparecen solas (Usabilidad)
function mostrarAlerta(mensaje) {
 mensajeExito.value = mensaje;
  setTimeout(() => {
    mensajeExito.value = ""; // Se limpia a los 3 segundos
  }, 3000);
}

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
  mostrarAlerta("¡El rol del usuario ha sido actualizado correctamente!");
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
.then(data => {
  mostrarAlerta("¡El usuario ha sido borrado correctamente!");
  console.log('Respuesta:', data)
listarUsuarios()
})
.catch(error => console.error('Error:', error));
}
//funcion para ocultar la contraseña
function ocultarContraseña(password) {
  let contraseñaNueva = '';
  //se recorre la contraseña y se cambia por un *
  for (let i = 0; i < password.length; i++) {
    contraseñaNueva += '*';
  }
  return contraseñaNueva;
}
listarUsuarios();
</script>

<template>
  <!-- ALERTA -->
    <div 
      v-if="mensajeExito" 
      class="toast-flotante alert alert-success d-flex align-items-center" 
      role="alert"
    >
      <i class="bi bi-check-circle-fill fs-4 me-3"></i>
      <div class="fw-bold">{{ mensajeExito }}</div>
    </div>

    <!-- TABLA -->
  <div class="container my-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
      <h2 class="fw-bold text-dark m-0">
        <i class="bi bi-people-fill text-primary me-2"></i>Gestión de Usuarios
      </h2>
    </div>
    

    <div class="card rounded-4 overflow-hidden">
      
      <div class="table-responsive">
        <table class="table table-custom-striped mb-0 align-middle text-center">
          
          <thead class="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col" class="text-start">Nombre</th>
              <th scope="col" class="text-start">Email</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Rol</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="usuario in arrayUsuarios" :key="usuario.id">
              <!-- para estructurar de manera clara las tablas -->
              <th scope="row">{{ usuario.id }}</th>
              
              <td class="text-start fw-bold">{{ usuario.nombre }}</td>
              <td class="text-start">{{ usuario.email }}</td>
              
              <td class="text-start">{{ ocultarContraseña(usuario.contraseña) }}</td>

              <td v-if="idUsuarioEditado !== usuario.id">
                <span class="badge bg-secondary px-3 py-2">
                  {{ usuario.rol }}
                </span>
              </td>
              
              <td v-else>
                <!-- aria-label para que los iconos sean comprensibles -->
                <select v-model="usuario.rol" class="form-select form-select-sm" :aria-label="'Editar rol de ' + usuario.nombre">
                  <option value="admin">admin</option>
                  <option value="guia">guia</option>
                  <option value="cliente">cliente</option>
                </select>
              </td>

              <td v-if="idUsuarioEditado !== usuario.id">
                <div class="d-flex justify-content-center gap-2">
                  <button 
                    @click.prevent="editarUsuario(usuario.id)" 
                    class="btn btn-sm btn-outline-primary fw-bold"
                    :aria-label="'Editar a ' + usuario.nombre"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button 
                    @click.prevent="eliminarUsuario(usuario.id)" 
                    class="btn btn-sm btn-outline-danger fw-bold"
                    :aria-label="'Eliminar a ' + usuario.nombre"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
              
              <td v-else>
                <div class="d-flex justify-content-center gap-2">
                  <button 
                    @click.prevent="guardarEdicion(usuario.id, usuario.rol)" 
                    class="btn btn-sm btn-success fw-bold"
                    :aria-label="'Guardar cambios de ' + usuario.nombre"
                  >
                    <i class="bi bi-check-circle-fill"></i> Guardar
                  </button>
                  <button 
                    @click.prevent="idUsuarioEditado=null" 
                    class="btn btn-sm btn-secondary fw-bold"
                    :aria-label="'Cancelar edición de ' + usuario.nombre"
                  >
                    <i class="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
            <!-- Tabla para avisar si no hay usuarios aparezca algo orientativo -->
            <tr v-if="arrayUsuarios.length === 0">
              <td colspan="6" class="text-center py-5">
                <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                Cargando usuarios o no hay registros disponibles.
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.toast-flotante {
  position: fixed;
  z-index: 1055;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 350px;
  border-radius: 5px;
}
.table-custom-striped > tbody > tr:nth-of-type(odd) > * {
  background-color: rgb(0, 168, 181,0.1) ;
}

.table-custom-striped > tbody > tr:hover > * {
  background-color: rgba(68, 73, 80, 0.2) ;
}

</style>
