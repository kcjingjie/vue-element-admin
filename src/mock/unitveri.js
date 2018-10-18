import Mock from 'mockjs'
import { param2Obj } from '@/utils'

var data = [
  {
    uid: 'aaaa',
    type: 0,
    imgs: ['http://pduap7v7q.bkt.clouddn.com/20180610200801_548_0.jpg',
      'http://pduap7v7q.bkt.clouddn.com/20180610200801_548_1.jpg'],
    options: ['张三_01', '李四_02', '王五_03'],
    values: ['李四_02'], // in/out value
    status: [0] // 0 for unmodified, 1 for modified, -1 for unable to verify
  },
  {
    uid: 'bbbb',
    type: 0,
    imgs: ['http://pduap7v7q.bkt.clouddn.com/20180610200801_548_0.jpg',
      'http://pduap7v7q.bkt.clouddn.com/20180610200801_548_1.jpg'],
    options: ['张三_01', '李四_02', '王五_03'],
    values: ['李四_02'], // in/out value
    status: [0] // 0 for unmodified, 1 for modified, -1 for unable to verify
  },
  {
    uid: 'cccc',
    type: 1,
    imgs: ['http://pduap7v7q.bkt.clouddn.com/20180610200801_548_question1.jpg'],
    options: ['A', 'B', 'C', 'D'],
    values: ['A', 'B'], // in/out value
    status: [0] // 0 for unmodified, 1 for modified, -1 for unable to verify
  },
  {
    uid: 'dddd',
    type: 2,
    imgs: ['http://pduap7v7q.bkt.clouddn.com/20180610200801_548_Score7.jpg'],
    options: ['7'],
    values: ['7'], // in/out value
    status: [0] // 0 for unmodified, 1 for modified, -1 for unable to verify
  },
  {
    uid: 'eeee',
    type: 2,
    imgs: ['http://pduap7v7q.bkt.clouddn.com/20180610200801_548_Score6.jpg'],
    options: ['7'],
    values: ['7'], // in/out value
    status: [0] // 0 for unmodified, 1 for modified, -1 for unable to verify
  },
  {
    uid: 'ffff',
    type: 2,
    imgs: ['http://pduap7v7q.bkt.clouddn.com/20180610200801_548_Score5.jpg'],
    options: ['8'],
    values: ['8'], // in/out value
    status: [0] // 0 for unmodified, 1 for modified, -1 for unable to verify
  }
]

export default {
  getVeriUnits: config => {
    const { examid, token } = param2Obj(config.url)
    return {
      total: data.length,
      items: data
    }
  },
  updateVeriUnits: (data) => {
    return 'success'
  }
}
