import axios from 'axios'
import {prefix} from './config'
import getUserInfo from 'common/js/user'
import qs from 'qs'


// 下载APP二维码
export function getAppCode() {
  const url = `${prefix}/file/downloadApp.do`
  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 分区多选选择人员
export function getPersonList(data) {
  const url = `${prefix}/workPlan/selectPersonByPartitonIds.do`
  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取打印数据的数据
export function getPrintData(data) {
  const url = `${prefix}/workPlan/printPreview.do`
  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取隐患打印数据的数据
export function getPrintDangerData(data) {
  const url = `${prefix}/hiddenDanger/printPreview.do`
  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 根据模板类型（定期或者日常）获取标题列表
export function getTitleListById(data) {
  const url = `${prefix}/workPlan/getTemplateByType.do`
  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取未完成和逾期隐患数量  
export function getAllDangerNum() {
  const url = `${prefix}/hiddenDanger/queryTolNumber.do`
  let data = {
    comId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取隐患处理详情
export function getAllDangerResult(data) {
  const url = `${prefix}/hiddenDanger/queryResultById.do`
  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取隐患详情
export function getDangerDetail(data) {
  const url = `${prefix}/hiddenDanger/queryTolNumber.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 处理隐患
export function handelDanger(data) {
  const url = `${prefix}/hiddenDanger/publish.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取处理人员电话号码
export function getPersonNum(data) {
  const url = `${prefix}/hiddenDanger/queryPersonTel.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取所有巡检类型
export function getAllPolingType() {
  const url = `${prefix}/inspection/allInspectionType.do`
  let data = {
    comPId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据分页和类型查询巡检类型
export function getListByType(data) {
	const url = `${prefix}/inspection/selectInspectionType.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 分页查询巡检模板
export function getTemplateList(data) {
  const url = `${prefix}/inspection/pageInsTemp.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据id查询某一条模板
export function getTemplatebyId(data) {
  const url = `${prefix}/inspection/queryInsTempById.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据id删除某一条模板
export function removeTemplatebyId(data) {
  const url = `${prefix}/inspection/deteleInsTemp.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据权限获取分区列表
export function getPosList(data) {
  const url = `${prefix}/workPlan/selectLowerPartition.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取分区树形图数据(所有)
export function getTreeData() {
  const url = `${prefix}/partition/query.do`

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据权限获取分区树形图数据
export function getTreeDataById(data) {
  const url = `${prefix}/partition/selectByAuthority.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查询工作计划
export function getPlanList(data) {
  const url = `${prefix}/workPlan/query.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取公司所有标题
export function getAllTitle() {
  const url = `${prefix}/workPlan/selectTitleByComId.do`
  let data = {
    comId: getUserInfo().comPId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 根据类型查询标题
export function getTitleList(data) {
  const url = `${prefix}/workPlan/selectTitleByType.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据id删除工作计划
export function removePlan(data) {
  const url = `${prefix}/workPlan/delete.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据年份获取统计分析图数据
export function getAnlysisData(data) {
  const url = `${prefix}/workPlan/analysis.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取巡检计划查看列表以及筛选条件
export function getPolingPlanList(data) {
  const url = `${prefix}/workPlan/selectPlanCheckByDate.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 获取巡检计划查看任务详情
export function getPolingPlanDetail(data) {
  const url = `${prefix}/workPlan/getTemplateById.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 上报巡检计划查看任务为隐患
export function reportPlanDanger(data) {
  const url = `${prefix}/workPlan/pubishHarm.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 隐患排查查询
export function getDangerList(data) {
  const url = `${prefix}/hiddenDanger/page.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据分区id查询巡检人员名单
export function getPersonListById(data) {
  const url = `${prefix}/workPlan/selectPersonByPartitonId.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}