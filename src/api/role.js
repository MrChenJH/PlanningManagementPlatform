import request from '@/utils/request'


export function office(){
    return request({
        url: '/api/test/Office',
        method: 'get'
      })
}



export function addRole(role){
    return request({
        url: '/api/test/AddRole',
        method: 'post',
        data: role
      })
}

export function RoleS(){
    return request({
        url: '/api/test/RoleS',
        method: 'get'
      })
}