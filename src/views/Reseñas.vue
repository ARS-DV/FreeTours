<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";

//sacar la ide de la ruta importando sus valores
const rutaId = router.currentRoute.value.params.id;
const datosUsuario = JSON.parse(localStorage.getItem("sesion"));
//variables que recogen datos de ref
const formValoracion = ref({
  estrellas: 0,
  comentario: "",
});
const error = ref("");
const mensajeExito = ref("");
const enviando = ref(false); //bandera

//funcion para marcar las estrellas
function marcarEstrellas(numeroSeleccionado) {
  formValoracion.value.estrellas = numeroSeleccionado;
}

//funcion para la clase estrella
function obtenerClaseEstrella(numeroEstrella) {
  if (numeroEstrella <= formValoracion.value.estrellas) {
    return "bi-star-fill text-warning"; //para estrellas doradas
  } else {
    return "bi-star text-secondary opacity-50"; //las otras
  }
}

async function enviarValoracion() {
  error.value = "";

  //validar que minimo debe ser una estrella
  if (formValoracion.value.estrellas == 0) {
    error.value = "Debe seleccionar al menos 1 estrella";
    return;
  }

  enviando.value = true;
  //variable para guardar los datos
  const nuevaValoracion = {
    user_id: datosUsuario.id,
    ruta_id: rutaId,
    estrellas: formValoracion.value.estrellas,
    comentario: formValoracion.value.comentario,
  };

  fetch(rutaApi + "valoraciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaValoracion),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Error en la solicitud: " + response.status);
      return response.json();
    })
    .then((data) => {
      // protegemos de que no reseñe dos veces la misma ruta
      if (data.status == "error") {
        error.value = data.message;
        enviando.value = false;
      } else {
        mensajeExito.value = "¡Gracias por su valoración!";
        setTimeout(() => {
          router.push("/misreservas");
        }, 1000);
      }
    })
    .catch((err) => {
      console.error("Error al crear la valoración:", err);
      error.value = "Hubo un problema de conexión.";
      enviando.value = false;
    });
}
</script>
<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="card rounded-4 p-4 p-md-5 w-100" style="max-width: 600px">
      <div
        class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3"
      >
        <h3 class="fw-bold text-dark m-0">
          <i class="bi bi-star-fill text-warning me-2"></i>Valorar Experiencia
        </h3>
        <button
          @click="router.push('/misreservas')"
          class="btn btn-outline-secondary rounded-pill fw-bold btn-sm px-3"
          aria-label="Volver al historial"
        >
          <i class="bi bi-arrow-left me-1"></i> Volver
        </button>
      </div>

      <div
        v-if="error"
        class="alert alert-danger d-flex align-items-cente rounded-3 fade-in"
      >
        <i class="bi bi-exclamation-triangle-fill fs-5 me-2"></i>
        <div class="fw-bold">{{ error }}</div>
      </div>

      <div
        v-if="mensajeExito"
        class="alert alert-success d-flex align-items-center rounded-3 fade-in"
      >
        <i class="bi bi-check-circle-fill fs-5 me-2"></i>
        <div class="fw-bold">{{ mensajeExito }}</div>
      </div>

      <form @submit.prevent="enviarValoracion" novalidate>
        <p class="text-center mb-4 fs-5">
          ¿Qué te pareció la ruta? Selecciona tu valoración:
        </p>

        <div
          class="d-flex justify-content-center gap-2 mb-4"
          aria-label="Calificación por estrellas"
        >
          <button
            v-for="n in 5"
            :key="n"
            type="button"
            class="btn btn-link p-0 text-decoration-none star-btn"
            @click="marcarEstrellas(n)"
            :aria-label="'Valorar con ' + n + ' estrellas'"
          >
            <i class="fs-1 bi" :class="obtenerClaseEstrella(n)"></i>
          </button>
        </div>

        <div class="mb-4">
          <label for="inputComentario" class="form-label fw-bold"
            >Cuéntanos más
            <span class="text-muted fw-normal">(Opcional)</span></label
          >
          <textarea
            id="inputComentario"
            v-model="formValoracion.comentario"
            class="form-control bg-light rounded-3"
            rows="4"
            placeholder="¿Qué fue lo que más te gustó? ¿Algo que mejorarías?"
          ></textarea>
        </div>

        <hr class="text-muted my-4" />

        <div class="d-grid">
          <button
            type="submit"
            class="btn btn-warning btn-lg fw-bold rounded-pill shadow-sm text-dark d-flex justify-content-center align-items-center"
          >
            <span
              v-if="enviando"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            <i v-else class="bi bi-send-fill me-2"></i>
            {{ "Publicar Valoración" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.star-btn:hover i {
  transform: scale(1.2);
  opacity: 1;
}

.star-btn:focus-visible {
  outline: 2px solid #ffc107;
  border-radius: 50%;
}
.star-btn:focus {
  box-shadow: none;
}
</style>
