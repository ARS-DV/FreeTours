<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
//variables de referencia
const arrayGuiasDisponibles = ref([]);
const arrayRutas = ref([]);
const idRutaEditar = ref(null);
const mensajeExito = ref("");
const filtroId = ref("");

function obtenerRutasFiltradas() {
  //primero si el filtro esta vacio
  if (!filtroId.value || filtroId.value === "") {
    return arrayRutas.value;
  }
  //si no se busca por el filtro
  return arrayRutas.value.filter((ruta) =>
    String(ruta.id).includes(filtroId.value),
  );
}

//creacion de la fecha
const fechaActual = new Date();
const año = fechaActual.getFullYear();
// Le sumamos 1 al mes porque en JavaScript enero es 0, y aseguramos que tenga 2 cifras (ej: 05)
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
// Aseguramos que el día tenga 2 cifras
const dia = String(fechaActual.getDate()).padStart(2, "0");
const hoy = año + "-" + mes + "-" + dia;

//funcion para la alerta
function mostrarAlerta(mensaje) {
  mensajeExito.value = mensaje;
  setTimeout(() => {
    mensajeExito.value = "";
  }, 3000);
}

//redireccion a crearuta
function crearRuta() {
  router.push("/crearruta");
}

//funcion para editar a los guias
async function editarRuta(ruta) {
  //inicializamos las varaibles necesaria
  idRutaEditar.value = ruta.id;
  arrayGuiasDisponibles.value = [];
  const fecha = ruta.fecha;
  //busqueda de asignaciones por fecha
  fetch(rutaApi + "asignaciones?fecha=" + fecha, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      //guardamos los datos de los guias libres
      let guiasLibres = data;
      //hacemos un if
      if (ruta.guia_id) {
        //usamos un find para buscar si el guia 
        const noEstaDisponible = guiasLibres.find((g) => g.id == ruta.guia_id);
        if (!noEstaDisponible) {
          guiasLibres.push({
            id: ruta.guia_id,
            nombre: ruta.guia_nombre,
            email: ruta.guia_email,
          });
        }
      }
      arrayGuiasDisponibles.value = guiasLibres; //data para el select
    })
    .catch((error) => console.error("Error:", error));
}

//funcion para guardar los cambios de edicion
async function guardarEdicion(ruta) {
  const updateGuia = {
    ruta_id: ruta.id,
    guia_id: ruta.guia_id,
  };
  fetch(rutaApi + "asignaciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateGuia),
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarAlerta("El id del guia ha sido actualizado"); //mensaje de alerta
      idRutaEditar.value = null; //bandera a null para quitar boton
      listarRutas();
    })
    .catch((error) => console.error("Error:", error));
}
//funcion para listar las rutas
async function listarRutas() {
  let rutasGuardadas = [];
  fetch(rutaApi + "rutas", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      rutasGuardadas = data;
      return fetch(rutaApi + "valoraciones", { method: "GET" });//hacemos otro fectch
    })
    .then((response) => response.json())
    .then((data) => {
      //recorremos las rutas
      rutasGuardadas.forEach((ruta) => {
        //usamos un filter para buscar todas las valoracioens con la misma id de ruta
        const valoracionesRuta = data.filter((val) => Number(val.ruta_id) == Number(ruta.id));
        //si hay alguna reseña
        if (valoracionesRuta.length > 0) {
          //usamos un reduce para contar el todal de puntuacion
          const suma = valoracionesRuta.reduce(
            (acc, val) => acc + Number(val.puntuacion),
            0,
          );
          //aqui finalmente hacemos la media con un toFixed para redondear a 1 decimal
          ruta.mediaValoracion = (suma / valoracionesRuta.length).toFixed(1);
        } else {
          ruta.mediaValoracion = "No encontrada";
        }
      });
      //guardamos los valores
      arrayRutas.value = rutasGuardadas;
    })
    .catch((error) => console.error("Error:", error));
}

async function eliminarRuta(id) {
  //confirmacion para borrar la ruta
    if (!confirm("¿Esta seguro/a de borrar esta ruta?")) {
        return; //y si se da a cancelar detiene la accion
    }
  fetch(rutaApi + 'rutas?id='+id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarAlerta("Ruta eliminada correctamente");
      listarRutas();
    })
    .catch((error) => console.error("Error:", error));
}

listarRutas();
</script>

<template>
  <div
    v-if="mensajeExito"
    class="toast-flotante alert alert-success d-flex align-items-center shadow"
    role="alert"
  >
    <i class="bi bi-check-circle-fill fs-4 me-3"></i>
    <div class="fw-bold">{{ mensajeExito }}</div>
  </div>

  <div class="container-fluid px-4 my-5">
    <div
      class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2"
    >
      <h2 class="fw-bold text-dark m-0">
        <i class="bi bi-map text-primary me-2"></i>Gestión de Rutas
      </h2>
      <button
        @click.prevent="crearRuta"
        class="btn btn-primary fw-bold"
      >
        <i class="bi bi-plus-circle me-1"></i> Añadir Ruta
      </button>
    </div>

    <div class="row mb-3">
      <div class="col-12 col-md-4">
        <div class="input-group">
          <span class="input-group-text bg-white"
            ><i class="bi bi-search"></i
          ></span>
          <input
            type="text"
            class="form-control"
            placeholder="Filtrar rutas por Id"
            v-model="filtroId"
          />
        </div>
      </div>
    </div>

    <div class="card rounded-4 overflow-hidden">
      <div class="table-responsive">
        <table
          class="table table-custom-striped mb-0 align-middle text-center"
          style="font-size: 0.9rem"
        >
          <thead class="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Foto</th>
              <th scope="col" class="text-start">Título / Localidad</th>
              <th scope="col">Fecha / Hora</th>
              <th scope="col">Valoración</th>
              <th scope="col">Guía Asignado</th>
              <th scope="col">Asistentes</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="ruta in obtenerRutasFiltradas()" :key="ruta.id">
              <th scope="row" class="fs-6">{{ ruta.id }}</th>

              <td>
                <img
                  :src="ruta.foto"
                  class="rounded"
                  style="width: 60px; height: 60px; object-fit: cover"
                  alt="Foto ruta"
                  @error="
                    $event.target.src =
                      'https://placehold.co/100x100?text=Sin+Foto'
                  "
                />
              </td>

              <td class="text-start">
                <div class="fw-bold text-dark">{{ ruta.titulo }}</div>
                <div class="small">
                  <i class="bi bi-geo-alt-fill me-1"></i>{{ ruta.localidad }}
                </div>
              </td>

              <td>
                <div class="fw-medium">{{ ruta.fecha }}</div>
                <div class="small">{{ ruta.hora }}</div>
              </td>

              <td>
                <span
                  v-if="ruta.mediaValoracion !== 'No encontrada'"
                  class="badge bg-warning text-dark px-2 py-1 fs-6"
                >
                  <i class="bi bi-star-fill me-1"></i>
                  {{ ruta.mediaValoracion }}
                </span>
                <span v-else class="small fw-bold">Sin reseñas</span>
              </td>

              <td v-if="idRutaEditar !== ruta.id">
                <span
                  v-if="ruta.guia_id"
                  class="text-black px-2 py-1"
                >
                  ID: {{ ruta.guia_id }} - {{ ruta.guia_nombre }}
                </span>
                <span v-else class="text-danger small fw-bold"
                  ><i class="bi bi-exclamation-circle me-1"></i> Sin guía</span
                >
              </td>
              <td v-else>
                <select
                  v-model="ruta.guia_id"
                  class="form-select form-select-sm shadow-sm"
                >
                  <option
                    v-for="guia in arrayGuiasDisponibles"
                    :key="guia.id"
                    :value="guia.id"
                  >
                    {{ guia.id }} - {{ guia.nombre }}
                  </option>
                </select>
              </td>

              <td>
                <span class="fw-bold fs-6">{{ ruta.asistentes }}</span>
                <i
                  v-if="ruta.fecha == hoy && ruta.asistentes < 10"
                  class="bi bi-exclamation-triangle-fill text-warning ms-2 fs-5"
                ></i>
              </td>

              <td v-if="idRutaEditar !== ruta.id">
                <div class="d-flex justify-content-center gap-2">
                  <button
                    @click.prevent="editarRuta(ruta)"
                    class="btn btn-sm btn-outline-primary fw-bold"
                    title="Asignar Guía"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    @click.prevent="eliminarRuta(ruta.id)"
                    class="btn btn-sm btn-outline-danger fw-bold"
                    title="Eliminar Ruta"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
              <td v-else>
                <div class="d-flex justify-content-center gap-2">
                  <button
                    @click.prevent="guardarEdicion(ruta)"
                    class="btn btn-sm btn-success fw-bold"
                  >
                    <i class="bi bi-check-circle-fill"></i> Guardar
                  </button>
                  <button
                    @click.prevent="idRutaEditar = null"
                    class="btn btn-sm btn-secondary fw-bold"
                  >
                    <i class="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="obtenerRutasFiltradas().length == 0">
              <td colspan="8" class="text-center py-5">
                <i class="bi bi-inbox fs-1 d-block mb-2 text-muted"></i>
                No se encontraron rutas
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-flotante {
  position: fixed;
  z-index: 1055;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 350px;
  border-radius: 5px;
}

.table-custom-striped > tbody > tr:nth-of-type(odd) > * {
  background-color: rgba(0, 168, 181, 0.05);
}

.table-custom-striped > tbody > tr:hover > * {
  background-color: rgba(68, 73, 80, 0.1);
}
</style>
