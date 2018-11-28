export function getDate() {
  let data = {}
  let d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()
  data = {
    year: year,
    month: month < 10 ? '0' + month : month,
    date: date < 10 ? '0' + date : date
  }
  return data
}
export function getYesterday() {
  let data = {}
  let myDate = new Date()
  let year = myDate.getFullYear()
  let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
  let date = (myDate.getDate() - 1) < 10 ? '0' + (myDate.getDate() - 1) : (myDate.getDate() - 1)
   data = {
  year: year,
  month: month,
  date: date
}
  return data
  }