<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
const arrayRutas = ref([]);
async function listarRutas() {
  fetch(rutaApi + "rutas", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      ((arrayRutas.value = data), console.log("Rutas:", data));
    })
    .catch((error) => console.error("Error:", error));
}

listarRutas();
</script>

<template>

 


  <div class="accordion accordion-flush" id="accordionFlushExample">
    
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          <strong>¿Qué es FreeTours España?</strong>
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          Somos la plataforma de referencia para descubrir España a través de los ojos de guías locales expertos. Conectamos a viajeros curiosos con apasionados de la historia y la cultura en las principales ciudades del país. Nuestro objetivo es democratizar el turismo, ofreciendo experiencias de alta calidad accesibles para todos, sin barreras de entrada.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          <strong>¿Qué es un "free tour"?</strong>
        </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          Un "free tour" es una visita guiada de <strong>libre pago</strong>. A diferencia de los tours tradicionales con una tarifa fija por adelantado, aquí tú eres quien valora la experiencia una vez finalizada. Esto garantiza que nuestros guías se esfuercen al máximo en cada recorrido para ofrecerte una experiencia divertida, educativa e inolvidable.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          <strong>¿Cuánto cuesta un tour?</strong>
        </button>
      </h2>
      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          ¡Reservar tu plaza es totalmente gratis! Al final del recorrido, tú decides cuánto entregar al guía basándote en tu satisfacción y presupuesto. 
          <br><br>
          Aunque no hay un precio fijo, la aportación media habitual en España suele oscilar entre los <strong>10€ y 15€ por persona</strong>. Estas aportaciones permiten a nuestros guías locales seguir dedicándose profesionalmente a enseñarte los secretos de su ciudad.
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.accordion-button:not(.collapsed) {
    color: #1E272E; 
    background-color: transparent; 
    box-shadow: none; 
}


.accordion-button:focus {
    box-shadow: none;
    border-color: rgba(0,0,0,.125); 
}

.accordion-button:not(.collapsed) {
    font-weight: bold;
}

.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-5px); 
  box-shadow: 0 10px 20px rgba(0,0,0,0.15) ;
}


.bg-info {
    background-color: #00A8B5 ; 
}

</style>