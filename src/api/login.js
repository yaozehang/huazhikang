import axios from 'axios'
import {prefix} from './config'
import getUserInfo from 'common/js/user.js'
import qs from 'qs'

// 登录接口
export function login(data) {
	//alert(prefix);
  const url = `${prefix}/login.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
		alert(Promise.resolve(res.data))
  }).catch((error) => {
    console.log(error)
  })
}
// logOff.do  注销
export function loginOut(data) {
  const url = `${prefix}/logOff.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 模块菜单
export function getSubmenuList(data) {
  const url = `${prefix}/user/getInsideMenu.do`

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(_formatMenulist(res.data))
  }).catch((error) => {
    console.log(error)
  })
}

function _formatMenulist(data) {
  let ret = []
  data.forEach((item, idx) => {
    ret.push({
      id: item.menuid,
      name: item.menuname,
      path: item.url
    })
  })
  return ret
}
//获取二级菜单
export function getSpecialmenuList(data){
  const url = `${prefix}/user/getRecordMenu.do`

  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
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