import axios from 'axios'
import qs from 'qs'

export function $ajaxGet(url, data) {
  return axios.get(url, {params: data}).then((res) => {
  	// 判断后台session是否过期,如果过期则跳转至登录页
    if (res.data.status && res.data.status === '1000') {
      alert('长时间未操作系统，请重新登录')
      window.location.href = 'login.html'
    } else {
      return Promise.resolve(res.data)
    }
  })
}

export function $ajaxPost(url, data) {
  return axios.post(url, qs.stringify(data)).then((res) => {
    // 判断后台session是否过期,如果过期则跳转至登录页
    if (res.data.status && res.data.status === '1000') {
      alert('长时间未操作系统，请重新登录')
      window.location.href = 'login.html'
    } else {
      return Promise.resolve(res.data)
    }
  })
}