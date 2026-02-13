<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";
const form = ref({ titulo: '', localidad: '', descripcion:'',foto:'',fecha:'',hora:'',latitud:'',longitud:'',guia_id:'' });

async function guardarRuta() {
    const rutaData = {
    titulo: form.value.titulo,
    localidad: form.value.localidad,
    descripcion: form.value.descripcion,
    foto: form.value.foto,
    fecha: form.value.fecha,
    hora: form.value.hora,
    latitud: form.value.latitud,
    longitud: form.value.longitud,
    guia_id: form.value.guia_id // ID del guía (opcional)
};



fetch(rutaApi+'rutas', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(rutaData)
})
.then(response => response.json())
.then(data => {
console.log('Respuesta:', data)
router.push('/rutasadmin')
})
.catch(error => console.error('Error:', error));
}
</script>

<template>
    <form> 
        <label>Titulo</label>
        <input v-model="form.titulo" type="text" />
        <label>Localidad</label>
        <input v-model="form.localidad" type="text" />
        <label>Descripción</label>
        <input v-model="form.descripcion" type="text" />
        <label>Foto</label>
        <input v-model="form.foto" type="text" />
        <label>Fecha</label>
        <input v-model="form.fecha" type="date" />
        <label>Hora</label>
        <input v-model="form.hora" type="text" />
        <label>Latitud</label>
        <input v-model="form.latitud" type="number" />
        <label>Longitud</label>
        <input v-model="form.longitud" type="number" />
        <label>Id Guia</label>
        <input v-model="form.guia_id" type="number" />

        
        <button @click.prevent="guardarRuta">Guardar ruta</button> 
    </form>
</template>