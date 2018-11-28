import axios from 'axios'

//获取分区
export function getDepart() {
  const url = 'web/partition/query.do'
  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//获取护具类型
export function getTypelist() {
  const url = 'web/protype/queryprotype.do'
  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//获取护具名称  通过产品类型查询护具名称列表depart/queryproductbytypename.do

//根据部门 护具类型 查询护具名称  
