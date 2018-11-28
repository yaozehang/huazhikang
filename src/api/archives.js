import axios from 'axios'
import {prefix} from './config'
import getUserInfo from 'common/js/user.js'
import qs from 'qs'


//获取同步数据
export function getTreeData(data) {
  const url = `${prefix}/occuHealthRecordsManage/queryRecordTree.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//根据年份获取历史模板下拉
export function getTemplate(data) {
  const url = `${prefix}/occuRecords/getYearList.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 实现同步
export function dataSynchro(data) {
  const url = `${prefix}/occuRecords/synchronizedRecord.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//获取默认列表 分页
export function getAllList(data) {
  const url = `${prefix}/occuHealthRecordsManage/selfQuery.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 根据id查询文件列表
export function getFileList(data) {
  const url = `${prefix}/folder/queryList.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//判断文件夹名字
export function floderIsReapeat(data) {
  const url = `${prefix}/folder/checkNameIsRepetition.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//根据文件夹id查询文件和文件夹
export function getFileListById(data) {
  const url = `${prefix}/folder/queryFolderAndFile.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

//新建文件夹
export function creatFloder(data) {
  const url = `${prefix}/folder/addFolder.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//文件搜索列表 data
export function getsearchList(data) {
  const url = `${prefix}/folder/searchFile.do`

  return axios.post(url,data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//从上一级上传文件 fileUpload  没有使用
//获取右侧历史列表 
export function getHistoryLIst() {
  const url = `${prefix}/history/queryUploadHistory.do`
  let data = {
    userId: getUserInfo().userId
  }
  return axios.post(url,qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//清除历史记录全部
export function delHistoryLIst() {
  const url = `${prefix}/history/clean.do`
    let data = {
    userId: getUserInfo().userId
  }
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
// 删除单个历史记录
export function delHistoryItem(data) {
  const url = `${prefix}/history/deleteHistoryById.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//删除文件夹/文件
export function delFloder(data) {
  const url = `${prefix}/folder/deleltFolderById.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//删除文件
export function delFile(data) {
  const url = `${prefix}/occuHealthRecordsManage/delete.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//重命名文件夹
export function renameFloder(data) {
  const url = `${prefix}/folder/updateFolderName.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

//重命名文件
export function renameFile(data) {
  const url = `${prefix}/folder/addFolder.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

//根据类型查询档案列表     data 档案列表集合
export function getFileByType(data) {
  const url = `${prefix}/occuHealthRecordsManage/listRecords.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

//22个表格中的普通档案编写
export function FillEdit(data) {
  const url = `${prefix}/recordsEdit/edit.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

//22个表格中的特殊档案编写 2-5
export function FillEditTwo(data) {
  const url = `${prefix}/recordsEdit/editSpecialTwo.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//22个表格中的特殊档案编写 4-1 
export function FillEditOne(data) {
  const url = `${prefix}/recordsEdit/editSpecialOne.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//刪除檔案自查的小类型
export function delTypeTwo(data) {
  const url = `${prefix}/occuHealthRecordsManage/deteleSmallType.do`

  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//刪除檔案自查的大類型
export function delTypeOne(data) {
  const url = `${prefix}/occuHealthRecordsManage/deteleBigType.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//新增檔案自查的大類型
export function addBigType(data) {
  const url = `${prefix}/occuHealthRecordsManage/addBigType.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//新增檔案自查的小類型
export function addSmallType(data) {
  const url = `${prefix}/occuHealthRecordsManage/addSmallType.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案类型管理 删除
export function delOther(data) {
  const url = `${prefix}/otherRecordsType/detele.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案类型管理 新增
export function addOtherType(data) {
  const url = `${prefix}/otherRecordsType/insert.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案类型管理 编辑
export function editOtherType(data) {
  const url = `${prefix}/otherRecordsType/update.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案类型管理 查询列表
export function getOtherList(data) {
  const url = `${prefix}/otherRecordsType/select.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案列表 查询列表
export function getListType(data) {
  const url = `${prefix}/otherRecords/select.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案列表 删除
export function listDel(data) {
  const url = `${prefix}/otherRecords/detele.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
//其他档案列表 获取下拉列表
export function getSelsectlist(data) {
  const url = `${prefix}/therRecordsType/allInsType.do`
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

