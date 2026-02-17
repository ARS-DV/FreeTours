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
      <RouterLink to="/homeview" class="logo-link">
        <img src="@/assets/logo.png" alt="FreeTours Logo" class="header-logo">
        <h1 class="header-title">FreeTours </h1>
      </RouterLink>
    </div>
   

        <NavBar :datos="props.usuario" @logout="Logout" />
  </header>
</template>

<style scoped>
.header {
  background-color: #00A8B5; 
  width: 100%;
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 0 2rem; 
}


.brand-container {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.header-logo {
  height: 60px; 
  width: auto;
}

.header-title {
  color: black; 
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
}


.nav-container {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
