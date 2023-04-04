import request from "@/utils/request";

export function getMovieScoreByUid(mid, uid) {
    return request({
        url: '/movie/score/' + mid + '?uid=' + uid,
        method: 'get',
    })
}

export function ratingMovie(mid, uid, score) {
    return request({
        url: '/movie/rate/' + mid,
        method: 'get',
        params: {uid, score}
    })
}