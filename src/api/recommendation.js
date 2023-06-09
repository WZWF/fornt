import request from "@/utils/request";
import { getId } from "@/utils/auth";

export function getOnlineData(data) {
    return request({
        url: '/movieRecommend/online/' + getId(),
        method: 'get',
        params: data
    })
}

export function getOnlineRandomData() {
    return request({
        url: '/movieRecommend/onlineRandom/' + getId(),
        method: 'get',
    })
}

export function getOfflineData(data) {
    return request({
        url: '/movieRecommend/offline/' + getId(),
        method: 'get',
        params: data
    })
}

export function getOfflineRandomData() {
    return request({
        url: '/movieRecommend/offlineRandom/' + getId(),
        method: 'get',
    })
}

export function getRatingMore(data) {
    return request({
        url: '/movieRecommend/ratingMore',
        method: 'get',
        params: data
    })
}

export function getNew(data) {
    return request({
        url: '/movieRecommend/new',
        method: 'get',
        params: data
    })
}

export function getHot(data) {
    return request({
        url: '/movieRecommend/hot',
        method: 'get',
        params: data
    })
}