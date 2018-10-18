import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    classes: [
      { id: 1, name: '1班' },
      { id: 2, name: '2班' },
      { id: 3, name: '3班' },
      { id: 4, name: '4班' },
      { id: 5, name: '5班' },
      { id: 6, name: '6班' }
    ],
    name: '管理员'
  },
  teacher: {
    roles: ['teacher'],
    token: 'teacher',
    classes: [
      { id: 1, name: '1班' },
      { id: 2, name: '2班' }
    ],
    name: '教师'
  },
  verifier: {
    roles: ['verifier'],
    token: 'verifier',
    classes: [],
    name: '校对员'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
