import request from '@/utils/request'

export function getVeriUnits(query) {
  return request({
    url: '/veri/getunits',
    method: 'get',
    params: query
  })
}

export function updateVeriUnits(data) {
  return request({
    url: '/veri/updateunits',
    method: 'post',
    data
  })
}
