
import { createApp } from 'vue'
import App from './App.vue'
import comp from './components/comp.vue'

const app = createApp(App)
app.component('comp', comp)
app.mount('#app')
