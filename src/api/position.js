import axios from 'axios'
import {prefix} from './config.js'
import getUserInfo from 'common/js/user'
import qs from 'qs'


//switch/update.do  请求参数：comId公司id,type类型   isopen
export function setSwitch(data) {
  const url = `${prefix}/switch/update.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

//查询/设置开关状态 
export function getSwitch(data) {
  const url = `${prefix}/switch/query.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取部门岗位树形图数据
export function getTreeData() {
  const url = `${prefix}/partition/query.do`

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查询部门岗位
export function getPositionList(data) {
  const url = `${prefix}/workPlan/selectLowerPartition.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据部门ID查询职务
export function getJobsById(data) {
  const url = `${prefix}/queryJobsByPartitionId.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查询所有的职务   之前是get请求没参数
export function getAllJobs() {
  const url = `${prefix}/jobs/allJobs.do`
  let data ={
    comId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查询待调岗列表
export function getPlanTodoList(data) {
  const url = `${prefix}/planTranPos.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}


// 根据部门ID查询可调岗位
export function getPosCanBeTran(data) {
  const url = `${prefix}/couldTranPos.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 历年阳性结果查询
export function getPositiveResult(data) {
  const url = `${prefix}/yeasPositiveResult.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 体检结果查询
export function getCheckResult(data) {
  const url = `${prefix}/checkConclusion.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 确认调岗列表查询
export function getConfirmList(data) {
  const url = `${prefix}/confirmTp/page.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 预允许调岗
export function passPlan(data) {
  const url = `${prefix}/confirmTp/batchTranPos.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 不允许调岗
export function rejectPlan(data) {
  const url = `${prefix}/confirmTp/noTranPos.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据条件查询调岗记录
export function getHistoryList(data) {
  const url = `${prefix}/tranPos/record.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 调岗记录详情

export function getHistoryDetail(data) {
  const url = `${prefix}/tranPos/recordDetail.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}