<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  datos: Object,
});

const emit = defineEmits(['logout']);

function enviarLogout() {
  emit('logout');
}
</script>

<template>
  <nav class="navbar navbar-expand p-0">
    
    <div class="container-fluid d-flex justify-content-end align-items-center">
      
      <ul class="navbar-nav d-flex flex-row gap-4 me-4">
        
        <li class="nav-item">
          <RouterLink to="/rutas" class="nav-link custom-link">Rutas</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/reservas" class="nav-link custom-link">Reservas</RouterLink>
        </li>

        <template v-if="datos && datos.rol == 'admin'">
          <li class="nav-item">
            <RouterLink to="/usuarios" class="nav-link custom-link">Usuarios</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/rutasadmin" class="nav-link custom-link">Gestión Rutas</RouterLink>
          </li>
        </template>

        <template v-if="datos && datos.rol == 'guia'">
          <li class="nav-item">
            <RouterLink to="/homeguia" class="nav-link custom-link">Mis Rutas</RouterLink>
          </li>
        </template>
      </ul>


      <div class="d-flex align-items-center gap-2">
        
        <div v-if="!datos" class="d-flex gap-2">
          <RouterLink to="/login" class="btn btn-outline-dark fw-bold">
            Login
          </RouterLink>
          <RouterLink to="/registro" class="btn btn-dark text-white fw-bold">
            Registro
          </RouterLink>
        </div>

        <div v-else class="d-flex align-items-center gap-3">
          <p class="fw-bold text-dark">Hola, {{ datos.nombre }}</p>
          
          <button @click="enviarLogout" class="btn btn-danger btn-sm fw-bold">
            Salir <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>

      </div>

    </div>
  </nav>
</template>

<style scoped>
.custom-link {
  color: #1E272E; 
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0;
}

.custom-link:hover {
  color: white 
}

.navbar {
  background-color: transparent; 
}

.btn {
  padding: 0.4rem 1.2rem;
  border-radius: 5px;
}
</style>