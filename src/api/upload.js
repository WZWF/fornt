import request from "@/utils/request";

export function rmImg(data) {
    return request({
        url: '/upload/removeImage',
        method: 'delete',
        params: data
    })
}

export function deleteImgForRemove(data) {
    return request({
        url: '/upload/deleteImgByBatch',
        method: 'delete',
        params: data
    })
}