<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";

//aviso para la sesionIniciada
const emit = defineEmits(["sesionIniciada"]);
//Lugar donde se guarada los datos del formulario
const form = ref({ usuario: '', password: '' });
const error = ref('');
//funcion para que agarre los valores del formulario
async function iniciarSesion() {
   const loginData = {
    email: form.value.usuario,
    contraseña: form.value.password,
};

//hacemos un fetch a la api
fetch(rutaApi+'usuarios?login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        emit('sesionIniciada', data.user);
        console.log('Login exitoso:', data.user);
        if(data.user.rol=="admin"){
            router.push('/homeadmin')
        }else{
        router.push('/')
        }
    } else {
        console.log('Error de login:', data.message);
    }
})

}
  
</script>
<template>
    <form> 
        <label>Usuario</label>
        <input v-model="form.usuario" type="text" />
        <label>Contraseña</label>
        <input v-model="form.password"  type="password" />
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>
        <button @click.prevent="iniciarSesion">Iniciar sesión</button> 
    </form>
</template>