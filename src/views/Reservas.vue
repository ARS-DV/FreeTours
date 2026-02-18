<script setup>
import { ref } from "vue";
import { rutaApi } from '@/main';

const datosUsuario = JSON.parse(localStorage.getItem('sesion'));

const arrayReservas = ref([]);

async function listarReservas() {
      const clienteEmail = datosUsuario.email;
    fetch(rutaApi+'reservas?email='+clienteEmail, {
    method: 'GET',
})
.then(response => response.json())
.then(data => ((arrayReservas.value = data), console.log("Rutas:", data)))
.catch(error => console.error('Error:', error));
}

async function eliminarReserva(id) {
  const reservaId = id; // ID de la reserva a eliminar

fetch(rutaApi+`reservas?id=`+reservaId, {
    method: 'DELETE',
})
.then(response => response.json())
.then(data => {
  listarReservas();
  console.log('Respuesta:', data)})
.catch(error => console.error('Error:', error))
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
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reserva in arrayReservas" :key="reserva.id">
        <td>{{ reserva.ruta_titulo }}</td>
        <td>{{ reserva.ruta_localidad }}</td>
        <td>{{ reserva.ruta_fecha }} - {{ reserva.ruta_hora }}</td>
        <td>{{ reserva.ruta_latitud }} , {{ reserva.ruta_longitud }}</td>
        <td>
          <button @click.prevent="eliminarReserva(reserva.reserva_id)">Cancelar reserva</button>
        </td>
        
      </tr>
    </tbody>
  </table>
</template>
