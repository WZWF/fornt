import Cookies from 'js-cookie'

const TokenKey = 'movie_token'
const id = 'movie_user_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getId() {
  return Cookies.get(id)
}

export function setId(userId) {
  return Cookies.set(id, userId)
}

export function removeId() {
  return Cookies.remove(id)
}