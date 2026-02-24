<script setup>
import { ref } from 'vue';
import router from '@/router';
import { rutaApi } from '@/main';
//guardamos ls datos e id de la ruta
const idRuta = router.currentRoute.value.params.id;
const ruta = ref(null);
//variables con datos de 
const datosSesion = JSON.parse(localStorage.getItem('sesion'));
let emailUsuario = '';
if (datosSesion !== null) {
    emailUsuario = datosSesion.email; //metemos el email del cliente por defecto
}
const numPersonas = ref(1);
const emailReserva = ref(emailUsuario);

//variables para avisos
const enviando = ref(false);
const error = ref('');


async function cargarRuta() {
    fetch(rutaApi + "rutas?id=" + idRuta, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            ruta.value = data; 
        })
        .catch(err => console.error('Error al cargar la ruta:', err));
}

async function confirmarReserva() {
    error.value = '';
//verificaciones
    if (!emailReserva.value || emailReserva.value.trim() === '') {
        error.value = "Introduzca un email valido";
        return;
    }
    if (numPersonas.value < 1 || numPersonas.value > 8) {
        error.value = "Solo se puede reservar para 8 personas como máximo";
        return;
    }
//guardamos los datos del form
    enviando.value = true;
    const reservaData = {
        email: emailReserva.value, 
        ruta_id: idRuta, 
        num_personas: numPersonas.value 
    };

    fetch(rutaApi + "reservas", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(reservaData) 
    })
    .then(response => response.json()) 
    .then(data => { 
        if (data.status == 'success') {
            alert("¡Reserva confirmada! Te esperamos allí :)");
            router.push('/reservas'); 
        } else {
            error.value = "Hubo un problema: " + data.message;
            enviando.value = false;
        }
    })
    .catch(err => {
        console.error('Error al reservar:', err);
        enviando.value = false;
    }); 
}
//llamamos a la variable
cargarRuta();
</script>

<template>
  <main class="container my-5" v-if="ruta">
    
    <nav aria-label="Ruta de navegación" class="mb-4 d-flex justify-content-center">
      <ol class="breadcrumb bg-light px-4 py-2 rounded-pill border">
        <li class="breadcrumb-item">
            <a href="#" @click.prevent="router.push('/')" class="text-success fw-medium">Inicio</a>
        </li>
        <li class="breadcrumb-item">
            <a href="#" @click.prevent="router.push('/ciudadview/' + ruta.localidad)" class="text-success fw-medium">{{ ruta.localidad }}</a>
        </li>
        <li class="breadcrumb-item">
            <a href="#" @click.prevent="router.push('/rutadetalle/' + ruta.id)" class="text-success fw-medium">{{ ruta.titulo }}</a>
        </li>
        <li class="breadcrumb-item active fw-bold text-dark" aria-current="page">Reservar Plaza</li>
      </ol>
    </nav>

    <div class="card border rounded-4 p-4 p-md-5 mx-auto" style="max-width: 600px;">
      
      <div class="text-center border-bottom pb-3 mb-4">
        <h1 class="fw-bold text-dark m-0 fs-3">
          <i class="bi bi-ticket-perforated-fill text-success me-2" aria-hidden="true"></i>Confirmar Reserva
        </h1>
      </div>

      <div v-if="error" class="alert alert-danger d-flex align-items-center rounded-3" role="alert">
        <i class="bi bi-exclamation-triangle-fill fs-5 me-2" aria-hidden="true"></i>
        <div class="fw-bold">{{ error }}</div>
      </div>

      <div class="text-center mb-4">
        <p class="fs-5 mb-2">Estás a un paso de reservar tu plaza para:</p>
        <h2 class="fw-bold text-dark h4 mb-3">{{ ruta.titulo }}</h2>
        
        <div class="border rounded-3 py-2 px-3 mb-2 d-inline-block">
            <span class="fw-bold text-primary"><i class="bi bi-calendar-event me-1" aria-hidden="true"></i> {{ ruta.fecha }}</span>
            <span class="mx-3" aria-hidden="true">|</span>
            <span class="fw-bold text-warning"><i class="bi bi-clock me-1" aria-hidden="true"></i> {{ ruta.hora }}</span>
        </div>
      </div>

      <form @submit.prevent="confirmarReserva" novalidate>
        
        <div class="mb-4">
            <label for="inputEmail" class="form-label fw-bold">Email de contacto</label>
            <input 
                id="inputEmail"
                type="email" 
                class="form-control form-control-lg" 
                v-model="emailReserva" 
                placeholder="tuemail@ejemplo.com"
            >
            <div id="ayudaEmail" class="form-text mt-1">A este correo se asociará la reserva</div>
        </div>
        
        <div class="mb-5">
            <label for="inputPersonas" class="form-label fw-bold">¿Cuántas personas vais?</label>
            <input 
                id="inputPersonas"
                type="number" 
                class="form-control form-control-lg text-center fw-bold text-primary" 
                v-model="numPersonas" 
                min="1" 
                max="8"
            >
            <div id="ayudaPersonas" class="form-text mt-2 text-danger fw-medium">
                <i class="bi bi-info-circle me-1" aria-hidden="true"></i> Máximo 8 personas por reserva
            </div>
        </div>

        <hr class="text-muted my-4">

        <div class="d-grid gap-2">
            <button 
                type="submit" 
                class="btn btn-success btn-lg fw-bold rounded-pill shadow-sm d-flex justify-content-center align-items-center"
                :disabled="enviando"
            >
                <span v-if="enviando" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <i v-else class="bi bi-check-circle-fill me-2" aria-hidden="true"></i>
                Confirmar Asistencia
            </button>
        </div>

      </form>
    </div>
  </main>

</template>

