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
    //avisamos que los campos no esten vacios
    if (!form.value.usuario || !form.value.password) {
       error.value = "Debe rellenar todos los campos";
       return;
   }
   // avisamos que el gmail tenga un @
   if (!form.value.usuario.includes('@')) {
       error.value = "Su correo electrónico no es válido";
       return;
   }
   const loginData = {
    email: form.value.usuario,
    contraseña: form.value.password,
};

//hacemos un fetch a la api para buscar al usuario
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
        //diferenciamos si es admin,guia o cliente
        if(data.user.rol=="admin"){
            router.push('/homeadmin')
        }else if(data.user.rol=="guia"){
            router.push('/homeguia')
        }else{
        router.push('/')
        }
    } else {
        error.value="Usuario no encontrado"
        console.log('Error de login:', data.message);
    }
})

}
  
</script>
<template>
    <div class="formu">
    <form> 
        <div class="form-row">
            <div class="form-group">
        <label>Usuario</label>
        <input v-model="form.usuario" type="text" />
        </div>
        <div class="form-group">
        <label>Contraseña</label>
        <input v-model="form.password"  type="password" />
        </div>
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>

        <button @click.prevent="iniciarSesion">Iniciar sesión</button> 
   </div>
   </form>
   </div>
</template>

<style scoped>
.formu{
    height: 25%;
    background-color: #FF8C42;
}
</style>