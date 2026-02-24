import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Registro from '@/views/Registro.vue'
import Usuarios from '@/views/Usuarios.vue'
import RutasAdmin from '@/views/RutasAdmin.vue'
import CrearRuta from '@/views/CrearRuta.vue'
import Asiganciones from '@/views/Asiganciones.vue'
import Reservas from '@/views/Reservas.vue'
import HomeView from '@/views/HomeView.vue'
import CiudadView from '@/views/CiudadView.vue'
import Rutas from '@/views/Rutas.vue'
import RutaDetalle from '@/views/RutaDetalle.vue'
import MisReservas from '@/views/MisReservas.vue'
import Reseñas from '@/views/Reseñas.vue'
import CrearReserva from '@/views/CrearReserva.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
     {
      path: '/login',
      name: 'login',
      component: Login,
    },
     {
      path: '/registro',
      name: 'registro',
      component: Registro,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios,
    },
    {
      path: '/rutasadmin',
      name: 'rutasadmin',
      component: RutasAdmin,
    },
    {
      path: '/crearruta',
      name: 'crearruta',
      component: CrearRuta,
    },
    {
      path: '/asignaciones',
      name: 'asignaciones',
      component: Asiganciones,
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: Reservas,
    },
     {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ciudadview/:nombre', 
      name: 'ciudadview',
      component: CiudadView
    },
     {
      path: '/rutas',
      name: 'rutas',
      component: Rutas,
    },
     {
      path: '/rutadetalle/:id', 
      name: 'rutadetalle',
      component: RutaDetalle,
    },
    {
      path: '/misreservas', 
      name: 'misreservas',
      component: MisReservas,
    },
    {
      path: '/valoracion/:id', 
      name: 'valoracion',
      component: Reseñas,
    },
    {
      path: '/crearreserva/:id', 
      name: 'crearreserva',
      component: CrearReserva,
    },
  ],
})

router.beforeEach((to, from, next) => {
  
  //preguntamos las rutas
  if (to.path == '/usuarios' || to.path == '/rutasadmin' || to.path == '/crearruta') {
    
    const datosSesion = JSON.parse(localStorage.getItem('sesion'));
    
    if (datosSesion && datosSesion.rol === 'admin') {
      next(); //puede entrar
    } else {
      alert("Acceso denegado pilluelo/a");
      next('/'); //vuelve a home
    }
  } else {
    next(); //si es cualquier otra puede entrar
  }

  if (to.path == '/asignaciones') {
    
    const datosSesion = JSON.parse(localStorage.getItem('sesion'));
    
    if (datosSesion && datosSesion.rol == 'guia') {
      next(); //puede entrar
    } else {
      alert("Acceso denegado pilluelo/a");
      next('/'); //vuelve a home
    }
  } else {
    next(); //si es cualquier otra puede entrar
  }
});
export default router

// route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
