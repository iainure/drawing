import 'bootstrap'
import '@/assets/scss/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { config } from 'dotenv'
config()

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
