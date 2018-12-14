const routes = [ {
      path: '/homePage',
    }, {
      path: '/login',
    },
    {
      path: '/wrap',
    
      children: [
         {
          name: '职业健康体检提醒',
          path: '/wrap/remind',
        }, {
          path: '/wrap/zone',
          children: [
             {
              name: '工种管理',
              path: '/wrap/zone/type',
            }, {
              name: '新增分区',
              path: '/wrap/zone/add',

            }, {
              name: '分区列表',
              path: '/wrap/zone/list',
            }
          ]
        }, {
        path: '/wrap/user',
        children: [
          {
            path: '/',
            redirect: '/wrap/user/add'
          }, {
            path: '/wrap/user/add',
            name: '新增用户',
          }, {
            path: '/wrap/user/list',
            name: '用户列表',
          }, {
            path: '/wrap/user/record',
            name: '登录记录',
          }]
      }, {
        path: '/wrap/archives',
        children: [
          {
            path: '/wrap/archives/nation',
            children: [
              {
                path: '/wrap/archives/nation/check',
                name: '档案自查',
              },
              {
                path: '/wrap/archives/nation/edit',
                name: '档案编写',
              }
            ]
          },
          {
            path: '/wrap/archives/other',
            children: [
              {
                path: '/wrap/archives/other/type',
                name: '档案类型管理',
              },
              {
                path: '/wrap/archives/other/list',
                name: '档案列表',
              }
            ]
          }
      ]
    }, {
        path: '/wrap/project',
        children: [
          {
            path: '/wrap/project/addPJ',
            name: '新增明细项目',
          },
          {
            path: '/wrap/project/listPJ',
            name: '明细项目列表',
          }, {
            path: '/wrap/project/addGP',
            name: '新增团体项目',
          }, {
            path: '/wrap/project/listGP',
            name: '团体项目列表',
          }, {
            path: '/wrap/project/addHF',
            name: '新增危害因素',
          }, {
            path: '/wrap/project/listHF',
            name: '危害因素列表',
          }
        ]
      }, {
        path: '/wrap/health',
        children: [{
            path: '/wrap/health/addH',
            name: '健康监护档案新增',
          }, {
            path: '/wrap/health/listH',
            name: '健康监护档案列表',
          }
        ]
      }, 
      {
        path: '/wrap/post',
        children: [{
            name: '计划调岗',
            path: '/wrap/post/plan',
          }, {
            name: '确认调岗',
            path: '/wrap/post/confirm',
          }, {
            name: '调岗记录',
            path: '/wrap/post/history',
          }
        ]
      },
        {
          path: '/wrap/exam',
          children: [
            {
              name: '主题管理',
              path: '/wrap/exam/theme',
            },
            {
              name: '题库维护',
              path: '/wrap/exam/question',
            },
            {
              name: '组卷管理',
              path: '/wrap/exam/test',
            },
            {
              name: '培训考试',
              path: '/wrap/exam/train',
            },
            {
              name: '考试分析',
              path: '/wrap/exam/analysis',
            }
          ]
        },
        {
          path: '/wrap/poling',
          children: [
            {
              name: '巡检模板管理',
              path: '/wrap/poling/template',
            },
            {
              name: '工作计划安排',
              path: '/wrap/poling/plan',
            },
            {
              name: '巡检计划安排',
              path: '/wrap/poling/plan1',
            },
            {
              name: '隐患排查',
              path: '/wrap/poling/danger',
            },
            {
              name: '巡检统计分析',
              path: '/wrap/poling/analysis',
            },
            {
              name: '巡检类型管理',
              path: '/wrap/poling/type',
            },
          ]
        },
        {
          path: '/wrap/infoCard',
          children: [
            {
              path: '/wrap/infoCard/card',
              name: '健康信息卡',
            }
          ]
        },
        {
           path: '/wrap/protect',
           children: [
            {
              path: '/wrap/protect/enter',
              name: '护具入库',
            },
            {
              path: '/wrap/protect/depart',
              name: '部门发昂',
            },
            {
              path: '/wrap/protect/person',
              name: '个人发放',
            },
            {
              path: '/wrap/protect/cycle',
              name: '发放周期',
            },
            {
              path: '/wrap/protect/remind',
              name: '采购提醒',
            },
            {
              path: '/wrap/protect/supplier',
              name: '供应商管理',
            }
          ]
        },
        {
          path: '/wrap/analysis',
          name:'统计分析'
        }, 
        {
        path: '/wrap/harm',
        children: [{
            path: '/wrap/harm/daily',
            name: '日常危害因素监测管理',
          }
        ]
        }
      ]
    }
  ]