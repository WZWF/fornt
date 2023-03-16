import request from "@/utils/request";

export function getTypes(id) {
    return request({
        url: '/movie/allType',
        method: 'get'
    })
}