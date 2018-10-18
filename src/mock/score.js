import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 70

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 1; i <= count; i++) {
  var tid = i % 6 + 1
  List.push(Mock.mock({
    id: '@increment',
    class: {
      id: tid,
      name: tid + '班'
    },
    classranking: '@integer(1,6)',
    graderanking: '@integer(1,6)',
    studentid: '@integer(1000, 2000)',
    score: '@integer(80, 100)',
    studentname: '@cname'
  }))
}

export default {
  getList: config => {
    const { importance, subject, title, page = 1, limit = 20, sort, classes} = param2Obj(config.url)
    var class_array = classes.split('#')

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (subject && item.subject !== subject) return false
      if (title && item.title.indexOf(title) < 0) return false
      var class_matching = false
      for (var i = 0; i < class_array.length; i++) {
        if (item.class.id == class_array[i]) {
          class_matching = true
        }
      }
      if (!class_matching) {
        return false
      }
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
  getScore: (config) => {
    const { id } = param2Obj(config.url)
    for (const score of List) {
      if (score.id === +id) {
        return score
      }
    }
  },
  createScore: () => ({
    data: 'success'
  }),
  updateScore: () => ({
    data: 'success'
  })
}
