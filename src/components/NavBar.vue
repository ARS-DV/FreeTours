<script setup>

const props = defineProps({
    datos: Object,
});

</script>

<template>
    <nav class="navbar">
        

        <div class="navbar-collapse">
            <ul>
                <li class="nav-item">
                    <RouterLink to="#">Rutas</RouterLink>
                </li>
               <li class="nav-item">
                <RouterLink to="#">Reservas</RouterLink>
               </li>
               

            </ul>
            
        </div>
    </nav>

</template>