import request from '@/utils/request'

export function fetchScoreList(query) {
  return request({
    url: '/score/list',
    method: 'get',
    params: query
  })
}

export function fetchScore(id) {
  return request({
    url: '/score/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/score/pv',
    method: 'get',
    params: { pv }
  })
}

export function createScore(data) {
  return request({
    url: '/score/create',
    method: 'post',
    data
  })
}

export function updateScore(data) {
  return request({
    url: '/excore/update',
    method: 'post',
    data
  })
}
