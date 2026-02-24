<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";

//aviso para la sesionIniciada
const emit = defineEmits(["sesionIniciada"]);
//Lugar donde se guarada los datos del formulario
const form = ref({ usuario: '', password: '' });
const error = ref('');
//funcion para que agarre los valores del formulario
async function iniciarSesion() {
  error.value = ''; //limpiador
    //avisamos que los campos no esten vacios
    if (!form.value.usuario || !form.value.password) {
       error.value = "Debe rellenar todos los campos";
       return;
   }
   // avisamos que el gmail tenga un @
   if (!form.value.usuario.includes('@')) {
       error.value = "Su correo electrónico no es válido";
       return;
   }
   //variable que guarda los valores del formulario una vez esten validados
   const loginData = {
    email: form.value.usuario,
    contraseña: form.value.password,
};

//hacemos un fetch a la api para buscar al usuario
fetch(rutaApi+'usuarios?login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
})
.then(response => response.json())
.then(data => {

    if (data.status === 'success') {
        emit('sesionIniciada', data.user);
        console.log('Login exitoso:', data.user);
        //diferenciamos si es admin,guia o cliente
        router.push('/')
        
    } else {
        error.value="Usuario no encontrado"
        console.log('Error de login:', data.message);
    }
})

}
  
</script>
<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100 py-5">
    
    <div class="card rounded-4 overflow-hidden" style="max-width: 900px;">
      <div class="row g-0 align-items-stretch">
        <!-- imagen sin alt por ser decorativa -->
        <div class="col-md-6 d-none d-md-block">
          <img 
            src="https://img.freepik.com/foto-gratis/pareja-turistas-sonrientes-tomando-selfie-mientras-llevaba-mochilas_23-2148619870.jpg?semt=ais_user_personalization&w=740&q=80" 
            alt="" 
            class="img-fluid h-100 w-100" 
          >
        </div>

        <div class="col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
          
          <div class="text-center mb-4">
            <h2 class="fw-bold text-dark">¡Bienvenido/a!</h2>
            <p>Inicia sesión para comenzar tu aventura</p>
          </div>

          <div v-if="error" class="alert alert-danger d-flex align-items-center">
            <i class="bi bi-exclamation-triangle me-2"></i>
            <div>{{ error }}</div>
          </div>

          <!-- ponemos el submit en el form para que pueda enviarse por enter -->
          <form @submit.prevent="iniciarSesion"> 
            <!-- for e id iguales para los lectores de patanlla -->
            <div class="mb-3">
              <label for="inputUsuario" class="form-label fw-bold text-dark">Correo Electrónico</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <!-- aria para que los asistentes de tecnologia sepan que es obligatorio -->
                <input 
                  id="inputUsuario"
                  v-model="form.usuario" 
                  type="email" 
                  class="form-control" 
                  placeholder="ejemplo@correo.com"
                  required
                  aria-required="true"
                >
              </div>
            </div>

            <div class="mb-4">
              <label for="inputPassword" class="form-label fw-bold text-dark">Contraseña</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input 
                  id="inputPassword"
                  v-model="form.password" 
                  type="password" 
                  class="form-control" 
                  placeholder="••••••••"
                  required
                  aria-required="true"
                >
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 fw-bold">
              Iniciar Sesión
            </button>
            
          </form>
          <div class="text-center mt-2">
              <span class="text-muted">¿Aun no tienes una cuenta?</span>
              <RouterLink to="/registro" class="text-primary fw-bold text-decoration-none ms-1">Registrate</RouterLink>
            </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
