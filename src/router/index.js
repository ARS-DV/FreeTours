import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Registro from '@/views/Registro.vue'
import HomeAdmin from '@/views/HomeAdmin.vue'
import Usuarios from '@/views/Usuarios.vue'
import RutasAdmin from '@/views/RutasAdmin.vue'

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
      path: '/homeadmin',
      name: 'homeadmin',
      component: HomeAdmin,
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
  ],
})

export default router

// route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
