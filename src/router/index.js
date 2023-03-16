import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/layout/Layout"
import Me from "@/views/me/index"

Vue.use(VueRouter);

const routes = [

    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/index")
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/register/index")
    },

    //公共布局下的路由
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import("@/views/home/index")
            },
            {
                path: 'movies',
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
                component: () => import("@/views/forum/addPost")
            },
            {
                path: '/recomend',
                component: () => import("@/views/recomend/index")
            },
            {
                path: '/forum',
                component: () => import("@/views/forum/index")
            },
            {
                path: '/me',
                component: Me,
                children: [
                    {
                        path: 'setting',
                        component: () => import("@/views/me/setting")
                    },
                ]
            },
        ]
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
