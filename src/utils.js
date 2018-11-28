const utils = {
  getDate: function(split) {
    if (split == null) {
      split = '-'
    }
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    let date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    return year + split + month + split + date
  },
  getMyDay: function(myDate){
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    let date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    return year + '-' + month + '-' + date
  },
  getDay: function() {
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    let date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    return year + '-' + month + '-' + date
  },
  getTime: function() {
    let myDate = new Date()
    let hour = myDate.getHours()
    let min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
    return hour + '  :  ' + min
  },
  getYesterday: function() {
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    let date = (myDate.getDate() - 1) < 10 ? '0' + (myDate.getDate() - 1) : (myDate.getDate() - 1)
    return year + '-' + month + '-' + date
  },
  getMonth: function() {
    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() < 10 ? '0' + myDate.getMonth() : myDate.getMonth()
    if (month === 0) {
      month = 12
      year = year - 1
      return year + '-' + month
    }
    return year + '-' + month
  },
  formatGradeOptions: function() {
    let options = []
    gradeList.forEach((item, idx) => {
      let o = {}
      o['label'] = item
      o['value'] = (idx + 1).toString()
      options.push(o)
    })
    return options
  },
  addclass: function(i) {
    let  arr = ['conclusions-1','conclusions-2','conclusions-3','conclusions-4','conclusions-5']
    if(i==1){
       return 'conclusions-1'
    }else if(i==2){
      return 'conclusions-2'
    }
    else if(i==3){
      return 'conclusions-3'
    }
    else if(i==4){
      return 'conclusions-4'
    }
    else if(i==5){
      return 'conclusions-5'
    }
  },
  unique5(array) { 
    var r = []
    for(var i = 0, l = array.length; i < l; i++) { 
     for(var j = i + 1; j < l; j++) 
      if (array[i] === array[j]) j = ++i
        r.push(array[i])
     } 
     return r
    },
   uniqueF(oldArr){
    var allArr = []
    for(var i=0;i<oldArr.length;i++){
    　　var flag = true
    　　for(var j=0;j<allArr.length;j++){
    　　　　if(oldArr[i].id == allArr[j].id){
    　　　　　　flag = false
    　　　　}
    　　}
    　　if(flag){
    　　  allArr.push(oldArr[i])
    　　}
    }
    return allArr
  },
  //获取元素style数据
  getStyle: function (obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return document.defaultView.getComputedStyle(obj, null)[attr];
    }
  },
   duplicate(origin){
      if(typeof origin != "object"){
          return origin//如果不是引用类型就直接返回。
      }
        //调用对象原型链上面的tostring方法判断数据主体是对象还是数组
      let toString = Object.prototype.toString,
          obj_array = "[object Array]",
          target = (toString.call(origin) == obj_array ? [] : {});//判断当前源主体是对象还是数组并赋值     
      for(let prop in origin){
          if(target.indexOf(origin[prop]) == -1){
              target.push(origin[prop])
          }
      }
      return target
  },
  objKey(obj, keys){
    var n = keys.length 
    var key = []
    while(n--){
        key.push(obj[keys[n]])
    }
    return key.join('|')
  },
//去重操作
 uniqeByKeys(array,keys){
    var arr = []
    var hash = {}
    for (var i = 0, j = array.length; i < j; i++) {
        var k = objKey(array[i], keys)
        if (!(k in hash)) {
            hash[k] = true
            arr.push(array[i])
        }
    }
    return arr 
}

}
// alert(arr.unique3())
export default utils