import axios from 'axios'
import {prefix} from 'api/config'
import qs from 'qs'
import getUserInfo from 'common/js/user'

// 获取培训柱状图折线图
export function getExamData() {
  const url = `${prefix}/dataPlate/getTrainingForTheTestData.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}


// 获取公司的所有员工姓名下
export function getAllUser() {
  const url = `${prefix}/dataPlate/getHealPersonal.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url,qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取危害因素柱状图
export function getHarmBarData() {
  const url = `${prefix}/dataPlate/getHarmData.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取体检记录数据
export function getTestData() {
  const url = `${prefix}/dataPlate/getMedicalData.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取巡检任务雷达图
export function getTaskData() {
  const url = `${prefix}/dataPlate/getTaskStatus.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取健康卡散点图
export function getHealthData(data) {
  const url = `${prefix}/dataPlate/getTrainingForTheTestData.do`
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取任务执行情况
export function getDangerData() {
  const url = `${prefix}/dataPlate/getWorkAndHiddenData.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取档案管理
export function getFileData() {
  const url = `${prefix}/dataPlate/getTrainingForTheTestData.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}