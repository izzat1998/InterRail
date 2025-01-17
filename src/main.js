import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import AOS from 'aos'
import 'aos/dist/aos.css'
import i18n from './i18n'
import store from "./state/store.js";
import axios from "axios";
import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from "click-outside-vue3"
import VueApexCharts from "vue3-apexcharts";
import FloatingVue, {VTooltip} from 'floating-vue'
import Maska from 'maska';


import VueFeather from 'vue-feather';
import Particles from "particles.vue3";

import '@/assets/scss/config/default/app.scss';
import '@vueform/slider/themes/default.css';
import 'floating-vue/dist/style.css'
import '../src/assets/css/custom.css'
import '../src/assets/css/skelton.scss'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faAngleDown, faArrowUpRightFromSquare,
    faFileExcel, faFileZipper,
    faFolder, faPenToSquare,
    faPrint, faTrain,
    faTrash
} from '@fortawesome/free-solid-svg-icons'

axios.defaults.baseURL = process.env.VUE_APP_ORDER_URL
axios.interceptors.request.use(config => {
    if (config.method === 'get' && store.state.user.role !== 'admin') {
        config.params = {
            ...config.params,
            'manager': store.state.user.id
        };
    }
    return config;
});

FloatingVue.options.themes.tooltip.delay.show = 0
FloatingVue.options.themes.tooltip.delay.hide = 10
FloatingVue.options.instantMove = true


library.add(
    faFileExcel, faPenToSquare,
    faTrash, faFileZipper,
    faFolder, faPrint,
    faTrain, faAngleDown,
    faArrowUpRightFromSquare
)

AOS.init({
    easing: 'ease-out-back', duration: 1000
})

createApp(App)
    .use(store)
    .use(router)
    .use(VueApexCharts)
    .use(BootstrapVue3)
    .component(VueFeather.type, VueFeather)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Maska)
    .use(Particles)
    .use(i18n)
    .use(FloatingVue)
    .directive('tooltip', VTooltip)
    .use(vClickOutside).mount('#app')