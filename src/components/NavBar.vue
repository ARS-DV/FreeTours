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
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/rutas">Rutas</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/reservas">Reservas</RouterLink>
        </li>
      </ul>
      <div>
        <div v-if="!datos">
          <RouterLink to="/login">
            Login
          </RouterLink>

          <RouterLink to="/registro">
            Registro
          </RouterLink>
        </div>

        <div v-else-if="datos.rol == 'admin'">
          <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/usuarios">Usuarios</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/rutasadmin">Rutas Admin</RouterLink>
        </li>
      </ul>
          <p>{{ datos.nombre }}</p>
          <button @click="enviarLogout" class="btn btn-danger btn-sm">
              Salir
              </button>
        </div>

        <div v-else>
          <p>{{ datos.nombre }}</p>
          <button @click="enviarLogout" class="btn btn-danger btn-sm">
              Salir
              </button>
        </div>
      </div>
    </div>
  </nav>
</template>
