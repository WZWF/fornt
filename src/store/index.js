import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    state: {
        title: ''
    },
    mutations: {
        setTitle(state, str) {
            state.title = str
        }
    },
    getters
})


export default store