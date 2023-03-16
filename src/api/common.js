import request from "@/utils/request";

export function getId() {
    return request({
        url: '/common/getId',
        method: 'get'
    })
}

export function getCategory() {
    return request({
        url: '/common/getType',
        method: 'get'
    })
}