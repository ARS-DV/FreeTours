import { createRouter, createWebHistory } from 'vue-router'
import HomeAdmin from '../AdministradorViews/HomeAdmin.vue'
import Rutas from '../AdministradorViews/Rutas.vue'
import Usuarios from '../AdministradorViews/Usuarios.vue'
import Footer from '../components/Foorter.vue'
import Header from '../components/Header.vue'
import NavBar from '../components/NavBar.vue'
import HomeGuia from '../GuiaViews/HomeGuia.vue'
import CiudadView from '../RutasView/CiudadView.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Reservas from '../views/Reservas.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'homeadmin',
      component: HomeAdmin,
    },
     {
      path: '',
      name: 'rutas',
      component: Rutas,
    },
     {
      path: '',
      name: 'usarios',
      component: Usuarios,
    },
     {
      path: '',
      name: 'footer',
      component: Footer,
    },
     {
      path: '',
      name: 'header',
      component: Header,
    },
     {
      path: '',
      name: 'navbar',
      component: NavBar,
    },
     {
      path: '',
      name: 'homeguia',
      component: HomeGuia,
    },
     {
      path: '',
      name: 'ciudadview',
      component: CiudadView,
    },
     {
      path: '',
      name: 'home',
      component: Home,
    },
     {
      path: '',
      name: 'login',
      component: Login,
    },
     {
      path: '',
      name: 'registro',
      component: Registro,
    },
     {
      path: '',
      name: 'reservas',
      component: Reservas,
    },
  ],
})

export default router

// route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
