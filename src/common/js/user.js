export default function getUserInfo() {
  return JSON.parse(decodeURIComponent(sessionStorage.getItem('userInfo')))
}

