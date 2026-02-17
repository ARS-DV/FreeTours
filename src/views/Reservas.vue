<script setup>
import { ref } from "vue";
import { rutaApi } from '@/main';

const datosUsuario = JSON.parse(localStorage.getItem('sesion'));

const arrayReservas = ref([]);

async function listarReservas() {
      const clienteEmail = datosUsuario.email;
    fetch(rutaApi+'reservas?cliente_id'+clienteEmail, {
    method: 'GET',
})
.then(response => response.json())
.then(data => ((arrayReservas.value = data), console.log("Rutas:", data)))
.catch(error => console.error('Error:', error));
}
listarReservas();
</script>

<template>

    <h2>¡Bienvenid@ a sus reservas, {{ datosUsuario.nombre }}!</h2>
    
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Localidad</th>
        <th scope="col">Fecha y hora</th>
        <th scope="col">Latitud y Longitud</th>
        <th scope="col">Nombre y email guia</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reserva in arrayReservas" :key="reserva.id">
        <td>{{ reserva.titulo }}</td>
        <td>{{ reserva.localidad }}</td>
        <td>{{ reserva.fecha }} - {{ reserva.hora }}</td>
        <td>{{ reserva.latitud }} , {{ reserva.longitud }}</td>
        <td>{{ reserva.guia_nombre }}, {{ reserva.guia_email }}</td>
      </tr>
    </tbody>
  </table>
</template>
