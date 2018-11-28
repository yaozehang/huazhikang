import axios from 'axios'
import {prefix} from 'api/config'

export function getAllHarmList(data) {
  const url = `${prefix}/selectsysparm.do`

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 查询统计分析表格
export function getAnalysisList(data) {
  const url = `${prefix}/Statistics.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

export function getReportData(data) {
  const url = `${prefix}/groupreport.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
