import axios from 'axios'
import {prefix} from './config'

//超级管理员分区
export function getSuperZone() {
  const url = `${prefix}/partition/superAdminSelectZone.do`

  return axios.post(url).then((res) => {
    return Promise.resolve(res.data.data)
  })
}    
// partition/selectSubPartByPId.do   根据分区id查询所有子集分区菜单   pId
export function getZoneList(data) {
  const url = `${prefix}/partition/selectSubPartByPId.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 分区迁移
export function zoneTransfer(data) {
  const url = `${prefix}/partition/changePartition.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 根据 用户查询 分区权限 树状图    comPId, userId 
export function getZoneListByAuthority(data) {
  const url = `${prefix}/partition/selectZoneByAuthority.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 模糊查询工种
export function getWorklist(data) {
  const url = `${prefix}/selectJobslist.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 模糊查询危害因素
export function getHarmlist(data) {
  const url = `${prefix}/selectsysparm.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取主题   
export function getThemelist(data) {
  const url = `${prefix}/selecttrainthemeall.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//获取护具  protype/queryprotypelist.do   换成 protype/queryprotypebyid.do
export function getProtectlist(data) {
  const url = `${prefix}/protype/queryprotypebyid.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//新增工种
export function addWorkType(data) {
  const url = `${prefix}/addjobs.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

//修改工种
export function editWorkType(data) {
  const url = `${prefix}/updateJobs.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}
//查询工种列表
export function getWorkTypelist(data) {
  const url = `${prefix}/jobslist.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 工种名字是否重复 暂时没有使用
export function getRepeat(data) {
  const url = `${prefix}/jobsVerify.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增分区
export function addZone(data) {
  const url = `${prefix}/addpartition.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 修改分区
export function editZone(data) {
  const url = `${prefix}/updatepartition.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}   
// 获取分区列表
export function getList(data) {
  const url = `${prefix}/partitionlist.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  })
}   