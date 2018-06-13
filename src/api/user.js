import request from '@/utils/request' 

export function Users(){
    return request({
        url: '/api/test/Users',
        method: 'get'
      })
}
