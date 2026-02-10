<script setup>
import router from "@/router";
import NavBar from './NavBar.vue';



const props= defineProps({
  usuario:Object
});

const emit = defineEmits(["sesionCerrada"]);


function cerrarSesion() {
  emit("sesionCerrada");
  router.push({name:"home"});
}
</script>


<template>
    <header class="bg-dark text-white  p-3">
      <div>
          <h2>FreeTour</h2>
      </div>
      <div>
        <NavBar/>
            <div>
                <div v-if="usuario">
                  <p>{{ usuario.name }}</p>
                  <button @click="cerrarSesion">Logout</button>
                </div>
                <div v-else>
                <button>
                  <RouterLink to="login">Login</RouterLink>
                </button>
                <button>
                  <RouterLink to="registro">Register</RouterLink>
                </button>
                </div>
            </div>
      </div>
  </header>
</template>
  
 
<style scoped>
*{
  background-color: bisque;
}
</style>