import service from "@/utils/request";
import { getId } from "../utils/auth";

export function findById(id) {
    return service({
        url: '/user/userInfo/' + id,
        method: 'get'
    })
}

export function findByName(data) {
    return service({
        url: '/user/findByName',
        method: 'post',
        data
    })
}

export function login(data) {
    return service({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function logout() {
    return service({
        url: '/user/logout',
        method: 'get'
    })
}

export function getInfo(id) {
    return service({
        url: '/user/userInfo/' + id,
        method: 'get',
        headers: {
            Authentication: window.localStorage.getItem('token'),
        },
    })
}

export function register(data) {
    return service({
        url: '/user/register',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return service({
        url: '/user/info/' + getId(),
        method: 'put',
        data: data
    })
}

export function updateEmail(data) {
    return service({
        url:'/user/resetEmail/' + getId(),
        method: 'post',
        data
    })
}

export function sendActivationEmail() {
    return service({
        url:'/user/sendActivationEmail/' + getId(),
        method: 'get',
    })
}

export function updatePass(data) {
    return service({
        url:'/user/resetPass/' + getId(),
        method: 'post',
        data
    })
}