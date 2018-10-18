import request from '@/utils/request'

export function fetchExamList(query) {
  return request({
    url: '/exam/list',
    method: 'get',
    params: query
  })
}

export function fetchExam(id) {
  return request({
    url: '/exam/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/exam/pv',
    method: 'get',
    params: { pv }
  })
}

export function createExam(data) {
  return request({
    url: '/exam/create',
    method: 'post',
    data
  })
}

export function updateExam(data) {
  return request({
    url: '/exam/update',
    method: 'post',
    data
  })
}
