import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-final-modal/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { createVfm } from 'vue-final-modal'

const app = createApp(App)

app
	.use(router)
	.use(createVfm())
	.mount('#app')
