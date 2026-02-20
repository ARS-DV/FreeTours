<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
const rutaSeleccionada = ref(null);
const asistentesReales = ref(0);

//obtenemos los datos del guia a través del LocalStorage
const datosGuia = JSON.parse(localStorage.getItem("sesion"));

const fecha = new Date();
const año = fecha.getFullYear()
const mes = String(fecha.getMonth()+1).padStart(2, '0')
const dia = String(fecha.getDate()).padStart(2, '0')

const fechaCompleta = año+"-"+mes+"-"+dia;
console.log(fechaCompleta)
async function listarRutasAsignadas() {
  //guardamos el id del guia
  const guiaId = datosGuia.id;
  //hacemos fetch con asignaciones
  fetch(rutaApi+`asignaciones?guia_id=`+guiaId, {
    method: 'GET',
})
.then(response => response.json())
.then(data => {
  console.log("Rutas:", data),
  arrayRutas.value = data
})
.catch(error => console.error('Error:', error));
}

async function abrirModal(ruta) {
    rutaSeleccionada.value = ruta; 
    asistentesReales.value = 0
}

function guardarAsistencia() {
    // 1. Validamos que haya una ruta seleccionada
    if (!rutaSeleccionada.value) return;

    const idRuta = rutaSeleccionada.value.ruta_id;
    const numeroFinal = asistentesReales.value;

    // 2. Preparamos el paquete de datos
    const datosEnvio = {
        asistentes_reales: numeroFinal
    };

    // 3. Hacemos el Fetch al método PUT de tu rutas.php
    fetch(rutaApi + `rutas?id=${idRuta}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEnvio)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("¡Asistencia guardada correctamente!");
            listarRutasAsignadas()
            // (Opcional) Puedes llamar a listarRutasAsignadas() aquí si quieres que la tabla se recargue
        } else {
            alert("Hubo un error: " + data.message);
        }
    })
    .catch(error => console.error("Error en la petición:", error));
}


listarRutasAsignadas();
</script>

<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Localidad</th>
        <th scope="col">Fecha</th>
        <th scope="col">Hora</th>
        <th scope="col">Latitud</th>
        <th scope="col">Longitud</th>
        <th scope="col">Asistentes</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ruta in arrayRutas" :key="ruta.id">
        <td>{{ ruta.ruta_titulo }}</td>
        <td>{{ ruta.ruta_localidad }}</td>
        <td>{{ ruta.ruta_fecha }}</td>
        <td>{{ ruta.ruta_hora }}</td>
        <td>{{ ruta.ruta_latitud }}</td>
        <td>{{ ruta.ruta_longitud }}</td>
        <td>{{ ruta.reservas.reduce((acc,reserva)=> acc+reserva.num_personas,0) }}</td>
        <td v-if="fechaCompleta == ruta.ruta_fecha">
          <button
            type="button"
            data-bs-toggle="modal"
              data-bs-target="#modalPasarLista"
            class="btn btn-lista"
            @click="abrirModal(ruta)"
          >
            <i class="bi bi-people icon-bold"></i> Pasar lista
          </button>
        </td>
        <td v-else>
          <p>Accion aun no realizable</p>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="modalPasarLista" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          
          <div class="modal-header">
            <h5 class="modal-title" v-if="rutaSeleccionada">Pasar lista: {{ rutaSeleccionada.ruta_titulo }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <label class="form-label">Total de personas presentes:</label>
            <input 
                type="number" 
                class="form-control" 
                v-model="asistentesReales"
                min="0"
                @input="validarNumero"
            >
            <div class="form-text text-muted">
                (El número no puede ser negativo)
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="guardarAsistencia">Guardar</button>
          </div>

        </div>
      </div>
    </div>
    </div>
</template>

<style scoped>
.btn-lista{
  background-color: #FF8C42;
  font-weight: bold;
}
.icon-bold {
    -webkit-text-stroke: 0.5px; 
}
.table-hover tbody tr:hover td {
    background-color: #ffcccc ; 
}
.table{
  margin-top: 1.5em;
  width: 90%;
}
</style>
