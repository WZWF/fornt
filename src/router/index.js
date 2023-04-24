import Vue from 'vue'
import Layout from "@/components/layout/Layout"
import Me from "@/views/user/index"
import Router from 'vue-router'
import { getToken } from "@/utils/auth"
import store from '@/store'

Vue.use(Router)

export const routes = [

    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/index")
    },

    {
        path: '/register',
        name: 'register',
        component: () => import("@/views/register/index")
    },

    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import("@/views/home/index")
            },
            {
                path: '/al',
                component: () => import("@/views/forum/articleList")
            },
            {
                path: '/a/:id',
                component: () => import("@/views/forum/articleDetail")
            },
            {
                path: '/articleDetail/:id',
                component: () => import("@/views/forum/articleDetail")
            },
            {
                path: '/movies',
                component: () => import("@/views/movie/all/index")
            },
            {
                name: 'movie',
                path: '/movie/:id',
                component: () => import("@/views/movie/index"),
            },
            {
                name: 'search',
                path: '/search/:text',
                component: () => import("@/views/search/index"),
            },
            {
                path: '/publish',
                component: () => import('@/views/movie/publish/publish.vue')
            },
            {
                path: '/addPost',
                name: 'addPost',
                component: () => import("@/views/forum/aPost")
            },
            {
                path: '/recomend',
                component: () => import("@/views/recomend/index")
            },
            {
                path: '/forum',
                component: () => import("@/views/forum/articleList")
            },
            {
                path: '/me',
                component: Me,
                children: [
                    {
                        path: 'setting',
                        component: () => import("@/views/user/setting")
                    },
                ]
            },
            {
                path: '/user/:id',
                component: () => import("@/views/user/userCenter")
            }
        ]
    }

];

const createRouter = () => new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.BASE_URL,
    routes
});

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    next()
                }
            }
        }
    } else {
        next()
    }
})

// const createRouter = () => new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: routes
//   })

//   const router = createRouter()

//   // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
//   export function resetRouter() {
//     const newRouter = createRouter()
//     router.matcher = newRouter.matcher // reset router
//   }

export default router
