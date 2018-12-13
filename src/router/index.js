import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";
import getUserInfo from "common/js/user";
Vue.use(VueRouter);
// const AddPersonalHealth = resolve =>  require([''],resolve)
const Wrap = resolve => require(["@/views/system/index/Wrap.vue"], resolve);
const HomePage = resolve => require(["@/views/homePage/HomePage.vue"], resolve);
// const Login = resolve => require(["@/views/login/login.vue"], resolve);
const Login = resolve => require(["@/views/login/loginNew.vue"], resolve);
const DataBoard = resolve =>
  require(["@/views/data-board/data-board.vue"], resolve); //数据看板
const PrintTask = resolve =>
  require(["@/views/system/poling/poling-plan/print-view.vue"], resolve); //打印任务
const PrintDanger = resolve =>
  require(["@/views/system/poling/danger/print-view.vue"], resolve); //打印隐患
const ImgDetail = resolve =>
  require(["@/views/system/poling/poling-plan/img-detail.vue"], resolve); //打印任务

const ZoneManagement = resolve =>
  require(["@/views/system/zone-management/ZoneManagement.vue"], resolve);
const AddZone = resolve =>
  require(["@/views/system/zone-management/AddZone.vue"], resolve);
const ZoneList = resolve =>
  require(["@/views/system/zone-management/ZoneList.vue"], resolve);
const WorkType = resolve =>
  require(["@/views/system/zone-management/WorkType.vue"], resolve);
const EditZone = resolve =>
  require(["@/views/system/zone-management/edit-zone.vue"], resolve);
const ZoneTransfer = resolve =>
  require([
    "@/views/system/zone-management/zone-transfer/zone-transfer.vue"
  ], resolve);

const UserOverview = resolve =>
  require([
    "@/views/system/user-management/user-overview/UserOverview.vue"
  ], resolve);
const AddUser = resolve =>
  require(["@/views/system/user-management/add-user/AddUser.vue"], resolve);
const UserList = resolve =>
  require(["@/views/system/user-management/user-list/UserList.vue"], resolve);
const EditUser = resolve =>
  require(["@/views/system/user-management/user-list/EditUser.vue"], resolve);
const EditSuperUser = resolve =>
  require([
    "@/views/system/user-management/user-list/edit-super-user.vue"
  ], resolve);
const LoginRecord = resolve =>
  require([
    "@/views/system/user-management/login-record/LoginRecord.vue"
  ], resolve);
// 职业监护档案
// 职业监护档案
const ArchivesManagementOverview = resolve =>
  require([
    "@/views/system/archives-management/archives-management-overview/ArchivesManagementOverview.vue"
  ], resolve);
const ArchivesOverview = resolve =>
  require([
    "@/views/system/archives-management/national-standard/ArchivesOverview.vue"
  ], resolve);
const SelfCheck = resolve =>
  require([
    "@/views/system/archives-management/national-standard/SelfCheck.vue"
  ], resolve);
const ArchivesEdit = resolve =>
  require([
    "@/views/system/archives-management/national-standard/ArchivesEdit.vue"
  ], resolve);
const DataSynchro = resolve =>
  require([
    "@/views/system/archives-management/national-standard/data-synchro/data-synchro.vue"
  ], resolve);
const OtherOverview = resolve =>
  require([
    "@/views/system/archives-management/other-standard/OtherOverview.vue"
  ], resolve);
const ArchivesListType = resolve =>
  require([
    "@/views/system/archives-management/other-standard/ArchivesListType.vue"
  ], resolve);
const ArchivesList = resolve =>
  require([
    "@/views/system/archives-management/other-standard/ArchivesList.vue"
  ], resolve);
const DataFile = resolve =>
  require([
    "@/views/system/archives-management/national-standard/uploade-file/data-file.vue"
  ], resolve);
const EditFile = resolve =>
  require([
    "@/views/system/archives-management/national-standard/uploade-file/edit-file.vue"
  ], resolve);
const EditFileType = resolve =>
  require([
    "@/views/system/archives-management/national-standard/edit-file-types/edit-file.vue"
  ], resolve);

// 项目管理
const ProjectManagement = resolve =>
  require(["@/views/system/project-management/ProjectManagement.vue"], resolve);
const AddProject = resolve =>
  require([
    "@/views/system/project-management/project-detailed/AddProject.vue"
  ], resolve);
const ProjectList = resolve =>
  require([
    "@/views/system/project-management/project-detailed/ProjectList.vue"
  ], resolve);
const EditProject = resolve =>
  require([
    "@/views/system/project-management/project-detailed/EditProject.vue"
  ], resolve);
const AddGroupProject = resolve =>
  require([
    "@/views/system/project-management/group-project/AddGroupProject.vue"
  ], resolve);
const GroupProjectList = resolve =>
  require([
    "@/views/system/project-management/group-project/GroupProjectList.vue"
  ], resolve);
const EditGroupProject = resolve =>
  require([
    "@/views/system/project-management/group-project/EditGroupProject.vue"
  ], resolve);
const AddHazardFactors = resolve =>
  require([
    "@/views/system/project-management/hazard-factors/AddHazardFactors.vue"
  ], resolve);
const HazardFactorsList = resolve =>
  require([
    "@/views/system/project-management/hazard-factors/HazardFactorsList.vue"
  ], resolve);
const EditHazardFactors = resolve =>
  require([
    "@/views/system/project-management/hazard-factors/EditHazardFactors.vue"
  ], resolve);
// 个人健康
const AddPersonalHealth = resolve =>
  require([
    "@/views/system/personal-health/add-personal-health/AddPersonalHealth.vue"
  ], resolve);
const PersonalHealthList = resolve =>
  require([
    "@/views/system/personal-health/personal-health-list/PersonalHealthList.vue"
  ], resolve);
const HealthDetail = resolve =>
  require([
    "@/views/system/personal-health/health-detail/HealthDetail.vue"
  ], resolve);
const HealthOverview = resolve =>
  require(["@/views/system/personal-health/HealthOverview.vue"], resolve);
// 健康提醒
const HealthReminder = resolve =>
  require(["@/views/system/health-reminder/HealthReminder.vue"], resolve);

// 调岗管理
const position = resolve =>
  require(["@/views/system/position/layout.vue"], resolve);
const positionPlan = resolve =>
  require(["@/views/system/position/plan/plan.vue"], resolve);
const positionConfirm = resolve =>
  require(["@/views/system/position/confirm/confirm.vue"], resolve);
const positionHistory = resolve =>
  require(["@/views/system/position/history/history.vue"], resolve);

// 考试培训
const examTraining = resolve =>
  require(["@/views/system/exam-training/layout.vue"], resolve);
const ThemeManage = resolve =>
  require([
    "@/views/system/exam-training/theme-manage/theme-manage.vue"
  ], resolve);
const QuestionBank = resolve =>
  require([
    "@/views/system/exam-training/question-bank/question-bank.vue"
  ], resolve);
const AnalysisExam = resolve =>
  require([
    "@/views/system/exam-training/analysis-exam/analysis-exam.vue"
  ], resolve);
const TestAssembly = resolve =>
  require([
    "@/views/system/exam-training/test-assembly/test-assembly.vue"
  ], resolve);
const TrainingExam = resolve =>
  require([
    "@/views/system/exam-training/training-exam/training-exam.vue"
  ], resolve);

// 生产巡检
const poling = resolve =>
  require(["@/views/system/poling/layout.vue"], resolve);
const polingTemplate = resolve =>
  require(["@/views/system/poling/template/template.vue"], resolve);
const polingPlan = resolve =>
  require(["@/views/system/poling/plan/plan.vue"], resolve);
const polingPlan1 = resolve =>
  require(["@/views/system/poling/poling-plan/poling-plan.vue"], resolve);
const polingDanger = resolve =>
  require(["@/views/system/poling/danger/danger.vue"], resolve);
const polingAnalysis = resolve =>
  require(["@/views/system/poling/analysis/analysis.vue"], resolve);
const polingType = resolve =>
  require(["@/views/system/poling/type/type.vue"], resolve);

// 健康信息卡
const healthCard = resolve =>
  require(["@/views/system/health-card/layout.vue"], resolve);
const healthCardOverview = resolve =>
  require(["@/views/system/health-card/card/card.vue"], resolve);

// 护具管理
const protectiveClothing = resolve =>
  require([
    "@/views/system/protective-clothing/protective-clothing.vue"
  ], resolve);
const enterStore = resolve =>
  require([
    "@/views/system/protective-clothing/enter-store/enter-store.vue"
  ], resolve);
const departGrant = resolve =>
  require([
    "@/views/system/protective-clothing/depart-grant/depart-grant.vue"
  ], resolve);
const personGrant = resolve =>
  require([
    "@/views/system/protective-clothing/person-grant/person-grant.vue"
  ], resolve);
const grantCycle = resolve =>
  require([
    "@/views/system/protective-clothing/grant-cycle/grant-cycle.vue"
  ], resolve);
const buyRemind = resolve =>
  require([
    "@/views/system/protective-clothing/buy-remind/buy-remind.vue"
  ], resolve);
const supplierManagement = resolve =>
  require([
    "@/views/system/protective-clothing/supplier-management/supplier-management.vue"
  ], resolve);

// 统计分析
const healthAnalysis = resolve =>
  require(["@/views/system/health-analysis/analysis.vue"], resolve);

// 日常危害因素监测管理
const dailyHarmOverview = resolve =>
  require(["@/views/system/daily-harm/layout.vue"], resolve);
const dailyHarm = resolve =>
  require(["@/views/system/daily-harm/daily-harm/daily-harm.vue"], resolve);

//新培训考试
const test = () => import("@/views/test/layout")
const testManage = () => import("@/views/test/manage");
const manageAdd = () => import("@/views/test/manage/add")
const testTheme = () => import("@/views/test/theme");
const themeAdd = () => import("@/views/test/theme/add");
const testExam = () => import("@/views/test/exam");
const question = () => import("@/views/test/theme/question");
const questionAdd = () => import("@/views/test/theme/question/add");
const examCreator = () => import("@/views/test/exam/creator")
const examCase = () => import("@/views/test/exam/case")

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/homePage",
    component: HomePage,
    // && userInfo.userId != 'undefined' && userInfo.username && userInfo.username != 'undefined'
    beforeEnter: (to, from, next) => {
      // let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      let userInfo = getUserInfo();
      if (userInfo && userInfo.userId) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/img",
    component: ImgDetail
  },
  {
    path: "/print2",
    component: PrintDanger,
    beforeEnter: (to, from, next) => {
      let userInfo = getUserInfo();
      if (userInfo && userInfo.userId) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  },
  {
    path: "/print",
    component: PrintTask,
    beforeEnter: (to, from, next) => {
      let userInfo = getUserInfo();
      if (userInfo && userInfo.userId) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  },
  {
    path: "/board",
    component: DataBoard,
    beforeEnter: (to, from, next) => {
      let userInfo = getUserInfo();
      if (userInfo && userInfo.userId) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  },
  {
    path: "/wrap",
    component: Wrap,
    // meta: { roles: ['admin', 'emp']},
    beforeEnter: (to, from, next) => {
      // let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      let userInfo = getUserInfo();
      if (userInfo && userInfo.userId) {
        next();
      } else {
        next({ path: "/login" });
      }
    },
    children: [
      {
        name: "职业健康体检提醒",
        path: "remind",
        component: HealthReminder,
        meta: { roles: ["admin"] }
      },
      {
        path: "zone",
        component: ZoneManagement,
        meta: { roles: ["admin"] },
        children: [
          { path: "/", redirect: "type" },
          {
            name: "工种管理",
            path: "type",
            component: WorkType
          },
          {
            name: "新增分区",
            path: "add",
            component: AddZone
          },
          {
            name: "分区列表",
            path: "list",
            component: ZoneList
          },
          {
            name: "修改分区",
            path: "list/editZone",
            component: EditZone
          },
          {
            name: "分区迁移",
            path: "transfer",
            component: ZoneTransfer
          }
        ]
      },
      {
        path: "/wrap/user",
        component: UserOverview,
        children: [
          {
            path: "/",
            redirect: "add"
          },
          {
            path: "add",
            name: "新增用户",
            component: AddUser
          },
          {
            path: "list",
            name: "用户列表",
            component: UserList
          },
          {
            path: "list/editSuper",
            name: "超级管理员编辑",
            component: EditSuperUser
          },
          {
            path: "list/editUser",
            name: "用户列表编辑",
            component: EditUser
          },
          {
            path: "record",
            name: "登录记录",
            component: LoginRecord
          }
        ]
      },
      {
        path: "/wrap/archives",
        component: ArchivesManagementOverview,
        children: [
          {
            path: "/",
            redirect: "/wrap/archives/nation"
          },
          {
            path: "/wrap/archives/nation",
            component: ArchivesOverview,
            children: [
              {
                path: "/",
                redirect: "/wrap/archives/nation/check"
              },
              {
                path: "/wrap/archives/nation/check",
                name: "档案自查",
                component: SelfCheck
              },
              {
                path: "/wrap/archives/nation/edit2",
                name: "档案修改",
                component: EditFileType
              },
              {
                path: "/wrap/archives/nation/check/data",
                name: "数据同步",
                component: DataSynchro
              },
              {
                path: "/wrap/archives/nation/check/file",
                name: "新建上传",
                component: DataFile
              },
              {
                path: "/wrap/archives/nation/check/file/edit",
                name: "编辑上传",
                component: EditFile
              },
              {
                path: "/wrap/archives/nation/edit",
                name: "档案编写",
                component: ArchivesEdit
              }
            ]
          },
          {
            path: "/wrap/archives/other",
            component: OtherOverview,
            children: [
              {
                path: "/",
                redirect: "/wrap/archives/other/type"
              },
              {
                path: "/wrap/archives/other/type",
                name: "档案类型管理",
                component: ArchivesListType
              },
              {
                path: "/wrap/archives/other/list",
                name: "档案列表",
                component: ArchivesList
              }
            ]
          }
        ]
      },
      {
        path: "/wrap/project",
        component: ProjectManagement,
        children: [
          {
            path: "/",
            redirect: "/wrap/project/addPJ"
          },
          {
            path: "/wrap/project/addPJ",
            name: "新增明细项目",
            component: AddProject
          },
          {
            path: "/wrap/project/listPJ",
            name: "明细项目列表",
            component: ProjectList
          },
          {
            path: "/wrap/project/listPJ/edit1",
            name: "修改明细项目",
            component: EditProject
          },
          {
            path: "/wrap/project/addGP",
            name: "新增团体项目",
            component: AddGroupProject
          },
          {
            path: "/wrap/project/listGP",
            name: "团体项目列表",
            component: GroupProjectList
          },
          {
            path: "/wrap/project/listGP/edit2",
            name: "修改团体项目",
            component: EditGroupProject
          },
          {
            path: "/wrap/project/addHF",
            name: "新增危害因素",
            component: AddHazardFactors
          },
          {
            path: "/wrap/project/listHF",
            name: "危害因素列表",
            component: HazardFactorsList
          },
          {
            path: "/wrap/project/listHF/edit3",
            name: "修改危害因素",
            component: EditHazardFactors
          }
        ]
      },
      {
        path: "/wrap/health",
        component: HealthOverview,
        children: [
          {
            path: "/",
            redirect: "/wrap/health/addH"
          },
          {
            path: "/wrap/health/addH",
            name: "健康监护档案新增",
            component: AddPersonalHealth
          },
          {
            path: "/wrap/health/listH",
            name: "健康监护档案列表",
            component: PersonalHealthList
          },
          {
            path: "/wrap/health/listH/listD",
            name: "列表DETAIL",
            component: HealthDetail
          }
        ]
      },
      {
        path: "/wrap/post",
        component: position,
        children: [
          { path: "/", redirect: "/wrap/post/plan" },
          {
            name: "计划调岗",
            path: "/wrap/post/plan",
            component: positionPlan
          },
          {
            name: "确认调岗",
            path: "/wrap/post/confirm",
            component: positionConfirm
          },
          {
            name: "调岗记录",
            path: "/wrap/post/history",
            component: positionHistory
          }
        ]
      },
      {
        path: "/wrap/exam",
        component: examTraining,
        children: [
          {
            path: "/",
            redirect: "/wrap/exam/theme"
          },
          {
            name: "主题管理",
            path: "/wrap/exam/theme",
            component: ThemeManage
          },
          {
            name: "题库维护",
            path: "/wrap/exam/question",
            component: QuestionBank
          },
          {
            name: "组卷管理",
            path: "/wrap/exam/test",
            component: TestAssembly
          },
          {
            name: "培训考试",
            path: "/wrap/exam/train",
            component: TrainingExam
          },
          {
            name: "考试分析",
            path: "/wrap/exam/analysis",
            component: AnalysisExam
          }
        ]
      },
      {
        path: "/wrap/poling",
        component: poling,
        children: [
          {
            path: "/",
            redirect: "/wrap/poling/template"
          },
          {
            name: "巡检模板管理",
            path: "/wrap/poling/template",
            component: polingTemplate
          },
          {
            name: "工作计划安排",
            path: "/wrap/poling/plan",
            component: polingPlan
          },
          {
            name: "巡检计划安排",
            path: "/wrap/poling/plan1",
            component: polingPlan1
          },
          {
            name: "隐患排查",
            path: "/wrap/poling/danger",
            component: polingDanger
          },
          {
            name: "巡检统计分析",
            path: "/wrap/poling/analysis",
            component: polingAnalysis
          },
          {
            name: "巡检类型管理",
            path: "/wrap/poling/type",
            component: polingType
          },
          {
            name: "打印隐患任务",
            path: "/wrap/poling/print2",
            component: PrintDanger
          },
          {
            name: "打印巡检任务",
            path: "/wrap/poling/print",
            component: PrintTask
          }
        ]
      },
      {
        path: "/wrap/infoCard",
        component: healthCard,
        children: [
          {
            path: "/",
            redirect: "/wrap/infoCard/card"
          },
          {
            path: "/wrap/infoCard/card",
            name: "健康信息卡",
            component: healthCardOverview
          }
        ]
      },
      {
        path: "/wrap/protect",
        component: protectiveClothing,
        children: [
          {
            path: "/",
            redirect: "/wrap/protect/enter"
          },
          {
            path: "/wrap/protect/enter",
            name: "护具入库",
            component: enterStore
          },
          {
            path: "/wrap/protect/depart",
            name: "部门发放",
            component: departGrant
          },
          {
            path: "/wrap/protect/person",
            name: "个人发放",
            component: personGrant
          },
          {
            path: "/wrap/protect/cycle",
            name: "发放周期",
            component: grantCycle
          },
          {
            path: "/wrap/protect/remind",
            name: "采购提醒",
            component: buyRemind
          },
          {
            path: "/wrap/protect/supplier",
            name: "供应商管理",
            component: supplierManagement
          }
        ]
      },
      {
        path: "/wrap/analysis",
        component: healthAnalysis
      },
      {
        path: "/wrap/harm",
        component: dailyHarmOverview,
        children: [
          {
            path: "/",
            redirect: "daily"
          },
          {
            path: "daily",
            name: "日常危害因素监测管理",
            component: dailyHarm
          }
        ]
      },
      {
        path:"/wrap/test",
        component:test,
        children: [
          {
            path:"/",
            redirect:"manage"
          },
          {
            path:"manage",
            name:"manage",
            component:testManage
          },
          {
            path:"manageAdd",
            name:"manageAdd",
            component:manageAdd
          },
          {
            path:"theme",
            name:"theme",
            component:testTheme
          },
          {
            path:"themeAdd",
            name:"themeAdd",
            component:themeAdd
          },
          {
            path:"question",
            name:"question",
            component:question,
          },
          {
            path:"questionAdd",
            name:"questionAdd",
            component:questionAdd,
          },
          {
            path:"exam",
            name:"exam",
            component:testExam
          },
          {
            path:'examCreator',
            name:"examCreator",
            component:examCreator
          },
          {
            path:'examCase',
            name:"examCase",
            component:examCase
          }
        ]
      },
    ]
  }
];

export default new VueRouter({
  path: "../index.html",
  // mode: 'history',
  routes: routes
});
// vueRouter.beforeEach(function (to, from, next) {
//     const nextRoute = [ '/wrap', 'order', 'course'];
//     const auth = store.state.auth;
//     //跳转至上述3个页面
//     if (nextRoute.indexOf(to.name) >= 0) {
//         //未登录
//         if (!store.state.auth.IsLogin) {
//             vueRouter.push({name: 'login'})
//         }
//     }
//     //已登录的情况再去登录页，跳转至首页
//     if (to.name === 'login') {
//         if (auth.IsLogin) {
//             vueRouter.push({name: 'homePage'});
//         }
//     }
//     next();
// });
