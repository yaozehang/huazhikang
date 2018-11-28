import axios from 'axios'
import {prefix} from './config'

// 获取所有护具类型
export function getAllProcetType(data) {
  const url = `${prefix}/protype/queryprotypebyid.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// .catch((error) => {
//     console.log(error)
//   })