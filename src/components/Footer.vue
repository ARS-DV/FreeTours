<script>
  import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, mdbRipple } from 'mdb-vue-ui-kit';

  export default {
    components: {
      MDBFooter,
      MDBContainer,
      MDBRow,
      MDBCol,
      MDBIcon
    },
    directives: {
      mdbRipple
    }
  };
</script>
<template>
  <MDBFooter text="center">
      <!-- Grid container -->
      <MDBContainer class="pt-4">
        <!-- Section: Social media -->
        <section class="mb-4">
          <!-- Facebook -->
          <a
            class="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            v-mdb-ripple="{ color: 'dark' }"
            ><MDBIcon iconStyle="fab" icon="facebook-f"></MDBIcon
          ></a>
          <!-- Twitter -->
          <a
            class="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            v-mdb-ripple="{ color: 'dark' }"
            ><MDBIcon iconStyle="fab" icon="twitter"></MDBIcon
          ></a>
          <!-- Instagram -->
          <a
            class="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            v-mdb-ripple="{ color: 'dark' }"
            ><MDBIcon iconStyle="fab" icon="instagram"></MDBIcon
          ></a>
        </section>
        <!-- Section: Social media -->
      </MDBContainer>
      <!-- Grid container -->
      <!-- Copyright -->
      <div
        class="text-center text-body p-3"
        style="background-color: rgba(0, 0, 0, 0.05)"
      >
        © 2020 Copyright:
        <a class="text-body" href="https://mdbootstrap.com/"
          >MDBootstrap.com</a
        >
      </div>
      <!-- Copyright -->
    </MDBFooter>
  </template>
  
