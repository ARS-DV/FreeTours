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


function accionPlay() {
  if (!medio.paused && !medio.ended) {
    medio.pause();
    play.value = "\u25BA"; //\u25BA
  } else {
    medio.play();
    play.value = "||";
  }
}
function accionReiniciar() {
  //Usar propiedad .currentTime
  medio.currentTime = 0;
  //Reproducir el vídeo
  medio.play();
  //Cambiar el valor del botón a ||
  play.value = "||";
}
function accionRetrasar() {
  //Usar propiedad .curentTime
  //Contemplar que no existen valores negativos
  if (medio.duration <= 5) {
    medio.currentTime = 0;
  } else {
    medio.currentTime -= 5;
  }
}
function accionAdelantar() {
  //Contemplar que no existen valores mayores a medio.duration
  if (medio.currentTime <= medio.duration) {
    medio.currentTime += 5;
  } else {
    medio.currentTime = medio.duration;
  }
}
function accionSilenciar() {
  if (medio.muted == false) {
    medio.muted = true;
    silenciar.value = "escuchar";
  } else {
    medio.muted = false;
    silenciar.value = "silenciar";
  }
  //Utilizar medio.muted = true; o medio.muted = false;
}
function accionMasVolumen() {
  if (medio.volume <= 1) {
    medio.volume += 0.1;
  }
  //Contemplar que el valor máximo de volumen es 1
}
function accionMenosVolumen() {
  //Contemplar que el valor mínimo de volumen es 0
  if (medio.volume <= 1 && medio.volume >= 0) {
    medio.volume -= 0.1;
  }
}

function iniciar() {
  medio = document.getElementById("medio");
  play = document.getElementById("play");
  reiniciar = document.getElementById("reiniciar");
  retrasar = document.getElementById("retrasar");
  adelantar = document.getElementById("adelantar");
  silenciar = document.getElementById("silenciar");

  play.addEventListener("click", accionPlay);
  reiniciar.addEventListener("click", accionReiniciar);
  retrasar.addEventListener("click", accionRetrasar);
  adelantar.addEventListener("click", accionAdelantar);
  silenciar.addEventListener("click", accionSilenciar);
  menosVolumen.addEventListener("click", accionMenosVolumen);
  masVolumen.addEventListener("click", accionMasVolumen);
  }

window.addEventListener("load", iniciar, false);


// Call carousel manually
$('#myCarouselCustom').carousel();

// Go to the previous item
$("#prevBtn").click(function(){
    $("#myCarouselCustom").carousel("prev");
});
// Go to the previous item
$("#nextBtn").click(function(){
    $("#myCarouselCustom").carousel("next");
});

</script>

<template>

  <div id="myCarouselCustom" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#myCarouselCustom" data-slide-to="0" class="active"></li>
        <li data-target="#myCarouselCustom" data-slide-to="1"></li>
        <li data-target="#myCarouselCustom" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
        <div class="item active">
            <img src="#" alt="">
            <div class="carousel-caption">
                <h3>First Slide</h3>
                <p>This is the first image slide</p>
            </div>
        </div>
  
        <div class="item">
            <img src="#" alt="">
            <div class="carousel-caption">
                <h3>Second Slide</h3>
                <p>This is the second image slide</p>
            </div>
        </div>
        
        <div class="item">
            <img src="#" alt="">
            <div class="carousel-caption">
                <h3>Third Slide</h3>
                <p>This is the third image slide</p>
            </div>
        </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
<!-- Custom Controls -->
<a href="javascript:void(0);" id="prevBtn">Prev Slide</a>
<a href="javascript:void(0);" id="nextBtn">Next Slide</a>




<!-- VIDEO -->
  <section class="video">
    <h3>Recomendaciones de nuestro canal</h3>
            <video id="medio" width="720" height="400">
      <source :src="'homeVideo.mp4'" type="video/mp4" />
     <source :src="'homeVideo.ogg'" type="video/ogg" />
    </video>
    <nav>
      <input type="button" id="reiniciar" value="reiniciar" />
      <input type="button" id="retrasar" value="&laquo;" />
      <input type="button" id="play" value="&#9658;" />
      <input type="button" id="adelantar" value="&raquo;" />
      <input type="button" id="silenciar" value="silenciar" />
      <label>Volumen</label>
      <input type="button" id="menosVolumen" value="-" />
      <input type="button" id="masVolumen" value="+" />
    </nav>
        </section>


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
.main-video {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
}
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