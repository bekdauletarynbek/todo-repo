import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/assets/style.css'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'


import VueVirtualScroller from 'vue3-virtual-scroller'


const app = createApp(App)
installElementPlus(app)
app.use(VueVirtualScroller)
app.use(store).use(router).mount('#app')
