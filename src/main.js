//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
export const rutaApi = "http://localhost:8003/freetours/api.php/"
//export const rutaApi = "http://localhost/Server_FreeTours/api.php/"
createApp(App).use(router).mount('#app')

