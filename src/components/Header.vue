<script setup>
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
   <div class="bg-dark text-white py-3 text-center">
            <h1>FreeTours</h1>
        </div>

        <NavBar :datos="props.usuario" @logout="Logout" />
  </header>
</template>

<style scoped></style>
