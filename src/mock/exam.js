import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100
for (let i = 1; i <= count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    createTimeStamp: +Mock.Random.date('T'),
    author: '@cname',
    scaner: '@cname',
    title: '第' + i + '次测试',
    'subject|1': ['语文', '数学', '英语'],
    'status|1': ['待扫描', '扫描中', '已扫描', '校对中', '已校对']
  }))
}

export default {
  getList: config => {
    const { subject, title, page = 1, limit = 20, sort, status, token } = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (subject && item.subject !== subject) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (status && status.indexOf(item.status) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getExam: (config) => {
    const { id } = param2Obj(config.url)
    for (const exam of List) {
      if (exam.id === +id) {
        return exam
      }
    }
  },
  createExam: () => ({
    data: 'success'
  }),
  updateExam: () => ({
    data: 'success'
  })
}
