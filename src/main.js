// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import the router we just created
import router from './router'

const app = createApp(App)

// Tell Vue to use the router
app.use(router)

// Mount the app
app.mount('#app')