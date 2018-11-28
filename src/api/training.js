import axios from 'axios'
import {prefix} from './config'
import qs from 'qs'
import getUserInfo from 'common/js/user'

// 根据培训单位 查询 培训主题   pId 
export function getThemeListByZone() {
  const url = `${prefix}/train/exam/selectThemeByZone.do`
  let data ={
    pId: getUserInfo().partitionId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 主题管理分页查询
export function getThemeList(data) {
  const url = `${prefix}/train/theme/select.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
  	console.log(error)
  })
}

// 分页查询题库
export function getQuestionList(data) {
  const url = `${prefix}/train/questions/page.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
  	console.log(error)
  })
}

// 获取所有主题list
export function getAllTheme() {
  const url = `${prefix}/train/theme/all.do`
  let data ={
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
  	return Promise.resolve(res.data)
  }).catch((error) => {
  	console.log(error)
  })
}

// 根据id获取编辑试题的内容
export function getQueDetailById(data) {
  const url = `${prefix}/train/questions/selectByQueId.do`

  return axios.get(url, {params: data}).then((res) => {
  	return Promise.resolve(res.data)
  }).catch((error) => {
  	console.log(error)
  })
}

// 获取所有的组卷列表 分页
export function getPaperList(data) {
  const url = `${prefix}/train/papers/page.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据组卷ID查询组卷内容
export function getPaperDataById(data) {
  const url = `${prefix}/train/papers/selectByPaperId.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据组卷id查询相关资料
export function getPaperDetailById(data) {
  const url = `${prefix}/train/papers/allDocs.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 删除相关资料
export function delDetailById(data) {
  const url = `${prefix}/train/papers/deleteDocs.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据主题ID列表查询对应的题库
export function getQuestionById(data) {
  const url = `${prefix}/train/questions/selectByThemeIdList.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 培训考试分页查询
export function getExamList(data) {
  const url = `${prefix}/train/exam/page.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据主题id查询组卷
export function getPaperByThemeId(data) {
  const url = `${prefix}/train/exam/selectPaperByThemeId.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 改变考试的状态
export function changePaperStatus(data) {
  const url = `${prefix}/train/exam/updateExamState.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 考试列表分页查询
export function getAnalysisList(data) {
  const url = `${prefix}/train/analysis/list.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查看错题
export function getErrorList(data) {
  const url = `${prefix}/train/analysis/errQue.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查看考生
export function getExamineeList(data) {
  const url = `${prefix}/train/analysis/examinee.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 考生错题详情
export function getErrorDetail(data) {
  const url = `${prefix}/train/analysis/errQueDetail.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}