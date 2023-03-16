import request from "@/utils/request";

export function getMovieDetail(id) {
    return request({
        url: '/movie/detail/' + id,
        method: 'get'
    })
}

export function getMovies(data) {
    return request({
        url: '/movie/movies',
        method: 'get',
        params: data
    })
}

export function getMovieRecomendeDetail(id) {
    return request({
        url: '/movieRecommend/movie/' + id,
        method: 'get'
    })
}

export function getMovieComments(data) {
    return request({
        url: '/movie/comments',
        method: 'get',
        data
    })
}

export function listAllPoster() {
    return request({
        url: "/home/getCarousels",
        method: "get"
    })
}