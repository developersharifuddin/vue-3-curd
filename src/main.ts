import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import $ from 'jquery' // Import jQuery
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Make jQuery available globally
app.config.globalProperties.$ = $

// Initialize Toastr
window.toastr = toastr

// Add all icons to the library
library.add(fas)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
