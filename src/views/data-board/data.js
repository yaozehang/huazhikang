export const barOne = {
  xLabel: ['噪声','粉尘', '铅化合物', '一氧化碳'],
  yData: [30,80,90,100]
}
export const healthData = {
    xLabel: [2014,2015,2016,2017,2018],
    data: [[60,90,50,40,70],[80,70,30,80,60],[60,20,90,40,70]],
}
export const year ={
  yearList: [1480,1670,1790],   //年份饼图数据
  lengendData:['2016体检人数', '2017体检人数', '2018体检人数'], //年份饼图数据
}
export const radarData ={
   one: [70,30,80,60,40,90],
   two: [50,80,60,30,20,80],
  three: [40,50,70,50,30,70],
  four: [60,70,40,20, 60,50],
  max: [100,100,100,100,100]
}
export const rateData ={
  titlename:['2016','2017','2018'],
  sData: [80,90,60]
}
export const lineOne = {
  data:{
    one: [20,30,80,60,40,90,70,30,80,60,80,60],
    two: [50,80,60,30,20,60,40,60,20,50,90,40],
    three: [40,50,70,50,30,70,60,50,50,80,70,50],
  },
  xLabel: ['1月','2月', '3月', '4月','5月','6月','7月', '8月', '9月','10月','11月','12月'],
  sData: ['第一车间', '第二车间','第三车间']
}
export const examTwo = {
  xLabel:['2018-09-02第一车间', '2018-09-03第二车间', '2018-09-04第三车间','2018-09-05第四车间'],
  sData:{
    one:[354,266,456, 590],
    two:[258,395, 565,690],
    three:[34,86,66, 50],
  }
}
export const examOne = {
 one:[11,8,10,9],
 two:[9,10,8,11],
}
export const personList =[
{
	name: '张三三',
	id: 1
},
{
	name: '李三三',
	id: 2
},{
	name: '吴三三',
	id: 3
}
]
export const newsList = [
{
  type:1,  //任务
  status: 1,  //已完成
  title: '动力车间日常巡',
},
{
  type:2, //隐患,
  status: 0,   //正在进行
  title: '动力车间日常巡',
},{
  type: 1 ,
  status: 1,
  title: '隐患排查',
},{
  type: 2,
  status: 0,
  title: '动力车间日常巡',
},{
  type: 1,
  status: 0,
  title: '隐患排查',
},{
  type:2,
  status: 1,
  title: '动力车间日常巡',
}
]
export const lawList =[
{
  title: '建设项目职业卫生“三同时”档案',
  info: '建设项目职业卫生“三同时”审查登记表',
  ExistNum: 15,//已有数量
  DueNum: 1,  //应有数量
  typeNum: 1,  //类型数量
},
{
  title: '职业卫生管理档案',
  info: '职业病防治法律、行政法规、规章、标准、文',
  ExistNum: 26,//已有数量
  DueNum: 13,  //应有数量
  typeNum: 13,  //类型数量
},{
  title: '职业卫生宣传培训档案',
  info: '用人单位职业卫生培训计划',
  ExistNum: 10,//已有数量
  DueNum: 4,  //应有数量
  typeNum: 4,  //类型数量
},{
  title: '职业病危害因素监测与检测评价档案',
  info: '职业病危害因素检测点分布示意图',
  ExistNum: 15,//已有数量
  DueNum: 9,  //应有数量
  typeNum: 9,  //类型数量
},{
  title: '职用人单位职业健康监护管理档案',
  info: '职业健康检查机构资质证书',
  ExistNum: 16,//已有数量
  DueNum: 8,  //应有数量
  typeNum: 8,  //类型数量
},{
  title: '劳动者个人职业健康监护档案',
  info: '工作场所职业病危害因素检测结果',
  ExistNum: 10,//已有数量
  DueNum: 6,  //应有数量
  typeNum: 6,  //类型数量
},{
  title: '其他档案管理',
  info: '测其他档案管理',
  ExistNum: 6,//已有数量
  DueNum: 3,  //应有数量
  typeNum: 3,  //类型数量
}
]