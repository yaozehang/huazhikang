import axios from 'axios'
import {prefix} from './config'
import getUserInfo from 'common/js/user.js'

// 获取
// 根据userId和menuId获取权限
export function getPermissionById(data) {
  let userId = getUserInfo().userId
  let obj = {}
  Object.assign(obj, data, {
    userId: userId
  })
  const url = `${prefix}/user/getAuthorityByUserAndMenu.do`
  return axios.get(url, {params: obj}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}