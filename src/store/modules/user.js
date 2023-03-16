import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setId, getId, removeId } from '@/utils/auth'

const getDefaultState = () => {
    return {
        token: '',
        name: '',
        avatar: '',
        id: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ID: (state, id) => {
        state.id = id
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { obj } = response
                localStorage.setItem('token', obj.token)
                localStorage.setItem('ID', obj.id)
                commit('SET_TOKEN', obj.token)
                commit('SET_ID', obj.id)
                setToken(obj.token)
                setId(obj.id)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    setHead({commit}, head) {
        commit('SET_AVATAR', head);
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { obj } = response

                if (!obj) {
                    return reject('Verification failed, please Login again.')
                }

                const { name, head } = obj

                commit('SET_NAME', name)
                commit('SET_AVATAR', head)
                resolve(obj)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                removeId()
                //resetRouter()
                localStorage.removeItem('token')
                localStorage.removeItem('ID')
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}