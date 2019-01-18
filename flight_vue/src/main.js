// import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import filters from './filter/filters'
import directives from './directive/directive'
import VueAwesomeSwiper from 'vue-awesome-swiper'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter, VueAwesomeSwiper)
const router = new VueRouter({
	routes,
	mode: routerMode,
	// mode: 'history',
	// hashbang:false,
	// history:true,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition ||0}
		}
	}
})

// export default {
// 	components: {
// 	 'remote-js': {
// 	  render(createElement) {
// 		return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
// 	  },
// 	  props: {
// 		src: { type: String, required: true },
// 	  },
// 	},
// 	},
//   }

new Vue({
	router,
	store,
	filters,
}).$mount('#app')

