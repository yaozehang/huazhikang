// 
import axios from 'axios'
import {prefix} from './config'

// 

// 获取姓名下拉框，并且可远程查询
export function getUserInfoById(data) {
  const url = `${prefix}/user/selectByUserId.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据权限获取子菜单
export function getSideMenu(data) {
  const url = `${prefix}/user/getInsideMenu.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 新增用户
export function addUser(data) {
  const url = `${prefix}/user/insert.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}  

// 新增公司
export function addCompany(data) {
  const url = `${prefix}/partition/superAdminAddZone.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}  
// 修改普通用户
export function editUser(data) {
  const url = `${prefix}/user/update.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 
// 通过id获取普通用户信息
export function getCommonUser(data) {
  const url = `${prefix}/user/selectByUserId.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 
// 通过id获取普通用户当前的权限
export function getMenuByUserId(data) {
  const url = `${prefix}/user/getMenuByUserId.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 

// 获取权限树状图
export function getAuthorityData() {
  const url = `${prefix}/user/allMenu.do`

  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 
// 用户名重复
export function nameRepeat() {
  const url = `${prefix}/user/username.do`

  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 
// 用户列表查询
export function getAllList(data) {
  const url = `${prefix}/user/select.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 
// 登录记录列表查询
export function getLoginList(data) {
  const url = `${prefix}/loginRecord.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
} 
