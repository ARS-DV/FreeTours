let medio, play, reiniciar, retrasar, adelantar, silenciar, menosVolumen, masVolumen;
export function accionPlay() {
  if (!medio.paused && !medio.ended) {
    medio.pause();
    play.value = "\u25BA"; //\u25BA
  } else {
    medio.play();
    play.value = "||";
  }
}
export function accionReiniciar() {
  //Usar propiedad .currentTime
  medio.currentTime = 0;
  //Reproducir el vídeo
  medio.play();
  //Cambiar el valor del botón a ||
  play.value = "||";
}
export function accionRetrasar() {
  //Usar propiedad .curentTime
  //Contemplar que no existen valores negativos
  if (medio.duration <= 5) {
    medio.currentTime = 0;
  } else {
    medio.currentTime -= 5;
  }
}
export function accionAdelantar() {
  //Contemplar que no existen valores mayores a medio.duration
  if (medio.currentTime <= medio.duration) {
    medio.currentTime += 5;
  } else {
    medio.currentTime = medio.duration;
  }
}
export function accionSilenciar() {
  if (medio.muted == false) {
    medio.muted = true;
    silenciar.value = "escuchar";
  } else {
    medio.muted = false;
    silenciar.value = "silenciar";
  }
  //Utilizar medio.muted = true; o medio.muted = false;
}
export function accionMasVolumen() {
  if (medio.volume <= 1) {
    medio.volume += 0.1;
  }
  //Contemplar que el valor máximo de volumen es 1
}
export function accionMenosVolumen() {
  //Contemplar que el valor mínimo de volumen es 0
  if (medio.volume <= 1 && medio.volume >= 0) {
    medio.volume -= 0.1;
  }
}

export function iniciar() {
  medio = document.getElementById("medio");
  play = document.getElementById("play");
  reiniciar = document.getElementById("reiniciar");
  retrasar = document.getElementById("retrasar");
  adelantar = document.getElementById("adelantar");
  silenciar = document.getElementById("silenciar");
  menosVolumen = document.getElementById("menosVolumen");
  masVolumen = document.getElementById("masVolumen");

  play.addEventListener("click", accionPlay);
  reiniciar.addEventListener("click", accionReiniciar);
  retrasar.addEventListener("click", accionRetrasar);
  adelantar.addEventListener("click", accionAdelantar);
  silenciar.addEventListener("click", accionSilenciar);
  menosVolumen.addEventListener("click", accionMenosVolumen);
  masVolumen.addEventListener("click", accionMasVolumen);
  }
