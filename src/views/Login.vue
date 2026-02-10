<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";


//emit para dar aviso de la sesion Inciada
const emit = defineEmits(["sesionIniciada"]);
//variables para formulario y errores
const form = ref({ usuario: '', password: '' });
const error = ref('');

async function iniciarSesion() {
   const loginData = {
    email: form.value.usuario,
    contraseña: form.value.password,
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
        emit('sesionIniciada',data.user)
        router.push("/")
    } else {
        console.log('Error de login:', data.message);
    }
})

}
  
</script>
<template>
    <!--Formulario para iniciar la sesion-->
    <form> 
        <label>Email</label>
        <input v-model="form.usuario" type="text" />
        <label>Password</label>
        <input v-model="form.password"  type="password" />
        <p v-if="error">{{ error }}</p>
        <button @click.prevent="iniciarSesion">Login</button> 
    </form>
</template>