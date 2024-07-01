import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

import $ from 'jquery' // Import jQuery
// Make jQuery available globally
app.config.globalProperties.$ = $

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import 'toastr/build/toastr.min.css'
import toastr from 'toastr'

// Initialize Toastr
window.toastr = toastr
