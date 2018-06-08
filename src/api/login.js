import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/test/Login',
    method: 'get',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/test/UserRoles',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/test/logout',
    method: 'get',
    params: { token }
  })
}
