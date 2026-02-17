<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";
//referencias a los elementos
const form = ref({ titulo: '', localidad: '', descripcion:'',foto:'',fecha:'',hora:'',latitud:'',longitud:'',guia_id:'' });

async function guardarRuta() {
    //declaramos una variable que guarde toda la informacion de la ruta
    const rutaData = {
    titulo: form.value.titulo,
    localidad: form.value.localidad,
    descripcion: form.value.descripcion,
    foto: form.value.foto,
    fecha: form.value.fecha,
    hora: form.value.hora,
    latitud: form.value.latitud,
    longitud: form.value.longitud,
    guia_id: form.value.guia_id //esto es opcional
};


//fetch para meter los datos de la nueva ruta
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
        <input v-model="form.titulo" type="text" required/>
        <label>Localidad</label>
        <input v-model="form.localidad" type="text" required/>
        <label>Descripción</label>
        <input v-model="form.descripcion" type="text" required/>
        <label>Foto</label>
        <input v-model="form.foto" type="text" required/>
        <label>Fecha</label>
        <input v-model="form.fecha" type="date" required/>
        <label>Hora</label>
        <input v-model="form.hora" type="text" required/>
        <label>Latitud</label>
        <input v-model="form.latitud" type="number" required/>
        <label>Longitud</label>
        <input v-model="form.longitud" type="number" required/>
        <label>Id Guia</label>
        <input v-model="form.guia_id" type="number" />

        
        <button @click.prevent="guardarRuta">Guardar ruta</button> 
    </form>
</template>