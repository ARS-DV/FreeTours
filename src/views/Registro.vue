f<script setup>
import {ref} from "vue"
import router from "@/router";
import {rutaApi} from "@/main";

const emit = defineEmits(["sesionIniciada"]);
// donde guaradamos la referencias de los datos
const form = ref({ nombre: '', email: '',password: '' });
//para guardar los errores
const error = ref('');

async function registrarUsuario() {
    error.value = ''; //limpiador

    //avisamos que los campos no esten vacios
    if (!form.value.nombre || !form.value.email || !form.value.password) {
       error.value = "Debe rellenar todos los campos";
       return;
   }

   //guardamos el nombre asgurandonos que no tenga espacio por nombres compuestos
   const caracteresNombre = form.value.nombre.split('');
   //comprobamos que el usuario no ponga numeros en su nombre
    for (let i = 0; i < caracteresNombre.length; i++) {
        if (caracteresNombre[i] >= '0' && caracteresNombre[i] <= '9') {
            error.value = "El nombre no puede tener numeros";
            return;
        }
    }
   // avisamos que el gmail tenga un @
   if (!form.value.email.includes('@')) {
       error.value = "Su correo electrónico no es válido";
       return;
   }

   //comprobamos que la contraseña tenga un mínimo de 7 caracters
   if (form.value.password.length < 7) {
        error.value = "La contraseña debe tener minimo 7 caracteres";
        return;
    }

    //variable para guardar los datos del formualrio
   const registroData = {
    nombre: form.value.nombre,
    email: form.value.email,
    contraseña: form.value.password,
};
//fetch para la ruta de usuarios
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
        error.value = "No se realizo el registro exitosamente"
        console.log('Error de login:', data.message);
    }
})

}
</script>
<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
     <!-- uso responsivo con card -->
    <div class="card border rounded-4 overflow-hidden w-100" style="max-width: 900px;">
      <div class="row align-items-stretch">
        
        <div class="col-md-6 d-none d-md-block">
            <!-- Sin alt por ser decorativa -->
          <img 
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop" 
            alt=""  
            class="img-fluid h-100 w-100"
          >
        </div>

        <div class="col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
          
          <div class="text-center mb-4">
            <h2 class="fw-bold text-dark">Únete a nosotros</h2>
            <p>Crea tu cuenta para reservar nuestros free tours increibles</p>
          </div>

          <div v-if="error" class="alert alert-danger d-flex align-items-center rounded-3 shadow-sm">
            <i class="bi bi-exclamation-triangle me-2"></i>
            <div>{{ error }}</div>
          </div>

          <form @submit.prevent="registrarUsuario"> 
            
            <div class="mb-3">
                <!-- usar el atributo id y for para conectar label e input -->
              <label for="inputNombre" class="form-label fw-bold text-dark">Nombre Completo</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-person"></i></span>
                <input 
                  id="inputNombre"
                  v-model="form.nombre" 
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Tu nombre"
                  required
                  aria-required="true"
                >
                <!-- uso del aria para lectores de pantalla -->
              </div>
            </div>

            <div class="mb-3">
                <!-- usar el atributo id y for para conectar label e input -->
              <label for="inputEmail" class="form-label fw-bold text-dark">Correo Electrónico</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <input 
                  id="inputEmail"
                  v-model="form.email" 
                  type="email" 
                  class="form-control form-control-lg" 
                  placeholder="ejemplo@correo.com"
                  required
                  aria-required="true"
                >
                 <!-- uso del aria para lectores de pantalla -->
              </div>
            </div>

            <div class="mb-4">
                <!-- usar el atributo id y for para conectar label e input -->
              <label for="inputPassword" class="form-label fw-bold text-dark">Contraseña</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input 
                  id="inputPassword"
                  v-model="form.password" 
                  type="password" 
                  class="form-control form-control-lg" 
                  placeholder="Minimo 7 caracteres"
                  required
                  aria-required="true"
                >
                 <!-- uso del aria para lectores de pantalla -->
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 fw-bold">
              Crear Cuenta
            </button>
            <!-- flexibilidad de navegacion -->
            <div class="text-center mt-2">
              <span class="text-muted">¿Ya tienes cuenta?</span>
              <RouterLink to="/login" class="text-primary fw-bold text-decoration-none ms-1">Inicia sesión</RouterLink>
            </div>

          </form>
          
        </div>
      </div>
    </div>
  </div>
</template>
