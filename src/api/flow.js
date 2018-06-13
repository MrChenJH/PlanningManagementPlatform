import request from '@/utils/request'

export function AddFlows(node) {
    return request({
      url: '/api/test/AddFlowNode',
      method: 'post',
      data: node
    })
  } 


  export function FlowsData(node) {
    return request({
      url: '/api/test/FlowsData',
      method: 'get'
    })
  }

  export function UpdateFlowNode(node) {
    return request({
      url: '/api/test/updateFlowNode',
      method: 'post',
      data: node
    })
  }
  