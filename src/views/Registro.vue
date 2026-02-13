<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";

const emit = defineEmits(["sesionIniciada"]);
const form = ref({ nombre: '', email: '',password: '' });
const error = ref('');

async function registrarUsuario() {

    //avisamos que los campos no esten vacios
    if (!form.value.nombre || !form.value.email || !form.value.password) {
       error.value = "Debe rellenar todos los campos";
       return;
   }

   //guardamos el nombre asgurandonos que no tenga espacio por nombres compuestos
   const caracteresNombre = form.value.nombre.split('');
   //comprobamos que el usuario no tenga
    for (let i = 0; i < caracteresNombre.length; i++) {
        if (caracteresNombre[i] >= '0' && caracteresNombre[i] <= '9') {
            error.value = "El nombre no puede tener numeros";
            return;
        }
    }
   // avisamos que el gmail tenga un @
   if (!form.value.email.includes('@')) {
       error.value = "Su correo electrónico no es válido";
       return;
   }

   //comprobamos que la contraseña tenga un mínimo de 7 caracters
   if (form.value.password.length < 7) {
        error.value = "La contraseña debe tener minimo 7 caracteres";
        return;
    }

   const registroData = {
    nombre: form.value.nombre,
    email: form.value.email,
    contraseña: form.value.password,
};

fetch(rutaApi+'usuarios', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(registroData)
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        const nuevoUsuario = {}
        emit('sesionIniciada', data.user);
        router.push('/')
    } else {
        console.log('Error de login:', data.message);
    }
})

}
</script>
<template>
  <form>
    <label>Nombre</label>
    <input v-model="form.nombre" type="text" />
    <label>Email</label>
    <input v-model="form.email" type="text" />
    <label>Contraseña</label>
    <input v-model="form.password" type="password" />
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    <button @click.prevent="registrarUsuario">Crear cuenta</button>
  </form>
</template>
