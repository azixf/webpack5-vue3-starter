import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import Router from '@/router'

console.log(process.env)

const store = createPinia()
const app = createApp(App)
app.use(store)
app.use(Router)
app.mount('#app')
