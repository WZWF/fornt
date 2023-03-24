import request from "@/utils/request";

export function getSearchResult(text, data) {
    return request({
        url: '/search/' + text,
        method: 'get',
        params: data
    })
}

export function getMovieListByName(name) {
    return request({
        url: '/search/name/' + name,
        method: 'get',
    })
}