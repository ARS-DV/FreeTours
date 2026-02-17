<script setup>
import {ref} from "vue"
import router from "@/router";
//utilizamos el props para que sepa el objeto usuario tiene de propiedad admin
const props = defineProps({
  datos: Object,
});
</script>

<template>
<p>Bienvenido </p>
</template>