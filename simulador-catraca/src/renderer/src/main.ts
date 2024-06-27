import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueQrcodeReader } from 'vue-qrcode-reader'

createApp(App).use(VueQrcodeReader).mount('#app')
