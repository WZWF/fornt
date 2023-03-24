import request from "@/utils/request";

export function getArticleList(data) {
    return request({
        url: '/forum/articleList',
        method: 'get',
        params: data
    })
}

export function getArticleDetail(id) {
    return request({
        url: '/forum/detail/' + id,
        method: 'get',
    })
}

export function getUserLike(eid, uid) {
    return request({
        url: '/forum/userLike',
        method: 'get',
        params: { eid, uid },
    })
}

export function likeArticle(aid, uid, authorId) {
    return request({
        url: '/forum/likeArticle',
        method: 'get',
        params: { aid, uid, authorId }
    })
}

export function postComment(data) {
    return request({
        url: '/forum/comment',
        method: 'post',
        data
    })
}

export function loadCommentList(aid, data) {
    return request({
        url: '/forum/comments/' + aid,
        method: 'get',
        params: data
    })
}

export function likeComment(data) {
    return request({
        url: '/forum/likeComment',
        method: 'get',
        params: data
    })
}