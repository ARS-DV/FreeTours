<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";

const emit = defineEmits(["sesionIniciada"]);
const form = ref({ nombre: '', email: '',password: '' });
const error = ref('');

async function registrarUsuario() {

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
