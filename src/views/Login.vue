<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";

const emit = defineEmits(["sesionIniciada"]);
const form = ref({ usuario: '', password: '' });
const error = ref('');

async function iniciarSesion() {

  const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === form.value.usuario && u.password === form.value.password
    );
   const loginData = {
    email: ,
    contraseña: 
};

fetch(rutaApi+'usuarios.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        console.log('Login exitoso:', data.user);
    } else {
        console.log('Error de login:', data.message);
    }
})

}
  
</script>
<template>
    <form> 
        <label>Nombre</label>
        <input v-model="form.usuario" type="text" />
        <label>Contraseña</label>
        <input v-model="form.password"  type="password" />
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>
        <button @click.prevent="iniciarSesion">Iniciar sesión</button> 
    </form>
</template>