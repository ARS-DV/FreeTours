<script setup>
import { RouterLink } from "vue-router";
import router from "@/router";
import NavBar from "./NavBar.vue";



const props = defineProps({
  usuario: Object
});
const emit = defineEmits(["sesionCerrada"]);

function Logout() {
    emit('sesionCerrada');
}
</script>

<template>
  <header class="header">
    <div class="brand-container">
      <RouterLink to="/" class="logo-link">
        <img src="@/assets/logo.png" alt="FreeTours Logo" class="header-logo">
        <h1 class="header-title">FreeTours </h1>
      </RouterLink>
    </div>
   

        <NavBar :datos="props.usuario" @logout="Logout" />
  </header>
</template>

<style scoped>
/* Paleta: Negro Carbón (#1E272E) */
.header {
  background-color: #00A8B5;
  width: 100%;
}

.brand-container {
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.03);
}

.header-logo {
  height: 70px;
  width: auto;
}

.header-title {
  color: black;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
}


</style>
