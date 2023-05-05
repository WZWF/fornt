import request from "@/utils/request";

export function visit() {
    return request({
        url: '/home/visit',
        method: 'get',
    })
}