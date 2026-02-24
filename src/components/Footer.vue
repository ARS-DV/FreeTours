<template>
  <footer class="fondo-footer border-top py-4 mt-auto">
    <div
      class="container d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div
        class="d-flex gap-4 mb-3 mb-md-0"
        role="navigation"
        aria-label="Redes sociales"
      >
        <a
          href="#"
          class="icono-naranja"
          aria-label="Síguenos en Facebook"
        >
          <i class="bi bi-facebook fs-4"></i>
        </a>

        <a
          href="#"
          class="icono-naranja"
          aria-label="Síguenos en Instagram"
        >
          <i class="bi bi-instagram fs-4"></i>
        </a>

        <a
          href="#"
          class="icono-naranja"
          aria-label="Síguenos en X (Twitter)"
        >
          <i class="bi bi-twitter-x fs-4"></i>
        </a>
      </div>

      <div fw-medium text-center text-md-end>
        &copy; 2025 Free Tours. Todos los derechos reservados.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.fondo-footer {
  background-color: #00a8b5;
}
.icono-naranja {
  color: white; 
}

.icono-naranja:hover {
  color: #ff8c42;
  transform: translateY(-3px);
}

</style>
