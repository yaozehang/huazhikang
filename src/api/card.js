import axios from 'axios'
import {prefix} from './config'


// 获取姓名下拉框，并且可快读查询
export function getUserList(data) {
  const url = `${prefix}/user/listUserByName.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据userId获取健康信息卡数据
export function getHealthCardData(data) {
  const url =  `${prefix}/healthCard/query.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
