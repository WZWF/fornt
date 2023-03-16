import request from "@/utils/request";

export function getSearchResult(text, data) {
    return request({
        url: '/search/' + text,
        method: 'get',
        params: data
    })
}