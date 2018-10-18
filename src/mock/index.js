import Mock from 'mockjs'
import loginAPI from './login'
import examAPI from './exam'
import scoreAPI from './score'
import unitVeriAPI from './unitveri'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 考试相关
Mock.mock(/\/exam\/list/, 'get', examAPI.getList)
Mock.mock(/\/exam\/detail/, 'get', examAPI.getExam)
Mock.mock(/\/exam\/pv/, 'get', examAPI.getPv)
Mock.mock(/\/exam\/create/, 'post', examAPI.createExam)
Mock.mock(/\/exam\/update/, 'post', examAPI.updateExam)

// 成绩相关
Mock.mock(/\/score\/list/, 'get', scoreAPI.getList)
Mock.mock(/\/score\/detail/, 'get', scoreAPI.getScore)
Mock.mock(/\/score\/pv/, 'get', scoreAPI.getPv)
Mock.mock(/\/score\/create/, 'post', scoreAPI.createScore)
Mock.mock(/\/score\/update/, 'post', scoreAPI.updateScore)

// 校对相关
Mock.mock(/\/veri\/getunits/, 'get', unitVeriAPI.getVeriUnits)
Mock.mock(/\/veri\/updateunits/, 'post', unitVeriAPI.updateVeriUnits)

export default Mock
