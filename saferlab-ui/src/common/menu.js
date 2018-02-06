import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: {
      zh: '研究员身份与组织',
      en: 'Researcher Basic Info',
    },
    icon: 'contacts',
    path: 'account',
    children: [
      {
        name: {
          zh: '我的档案',
          en: 'My Profile',
        },
        icon: 'profile',
        path: 'saferuser',
      },
      {
        name: {
          zh: '课题组管理',
          en: 'Research Group',
        },
        icon: 'team',
        path: 'research-group',
      },
    ],
  },
  {
    name: {
      zh: '机构与场所信息',
      en: 'Department / Lab Sites',
    },
    icon: 'environment-o',
    path: 'labsite',
  },
  {
    name: {
      zh: '安全风险识别',
      en: 'Safety Risk Assesment',
    },
    icon: 'dashboard',
    path: 'sra',
    children: [
      {
        name: {
          zh: '项目申报与管理',
          en: 'Project Record',
        },
        icon: 'book',
        path: 'project',
        children: [
          {
            name: {
              zh: '新建项目申报',
              en: 'Add new',
            },
            icon: 'file-add',
            path: 'wizard',
          },
          {
            name: {
              zh: '项目一览',
              en: 'List all',
            },
            icon: 'bars',
            path: 'list',
          },
        ],
      },
      {
        name: {
          zh: '风险操作管理',
          en: 'Risky Activity',
        },
        icon: 'solution',
        path: 'activity',
        children: [
          {
            name: {
              zh: '新操作录入',
              en: 'Add new',
            },
            icon: 'file-add',
            path: 'wizard',
          },
          {
            name: {
              zh: '操作一览',
              en: 'List all',
            },
            icon: 'bars',
            path: 'list',
          },
        ],
      },
      {
        name: {
          zh: '风险点管理',
          en: 'Risk Points',
        },
        icon: 'exception',
        path: 'risk-pt',
      },
      {
        name: {
          zh: '风险评级工具',
          en: 'Risk Evaluation Tool',
        },
        icon: 'dot-chart',
        path: 'risk-eval',
      },
      {
        name: {
          zh: '存档报表导出',
          en: 'Report Generation',
        },
        icon: 'export',
        path: 'export',
      },
    ],
  },
  {
    name: {
      zh: '基础信息库',
      en: 'Data Libraries',
    },
    icon: 'database',
    path: 'datalib',
    children: [
      {
        name: {
          zh: '危害数据库',
          en: 'Hazards',
        },
        icon: 'database',
        path: 'hazard',
      },
      {
        name: {
          zh: '防护控制数据库',
          en: 'Control Measures',
        },
        icon: 'database',
        path: 'precaution',
      },
      {
        name: {
          zh: '仪器设备数据库',
          en: 'Devices & Facilities',
        },
        icon: 'database',
        path: 'facility',
      },
      {
        name: {
          zh: '化学药剂数据库',
          en: 'Chemical Agents',
        },
        icon: 'database',
        path: 'chemagent',
      },
      {
        name: {
          zh: '生物制剂数据库',
          en: 'Bioagents',
        },
        icon: 'database',
        path: 'bioagent',
      },
    ],
  },
];

// const menuData = [{
//   name: 'dashboard',
//   icon: 'dashboard',
//   path: 'dashboard',
//   children: [{
//     name: '分析页',
//     path: 'analysis',
//   }, {
//     name: '监控页',
//     path: 'monitor',
//   }, {
//     name: '工作台',
//     path: 'workplace',
//     // hideInMenu: true,
//   }],
// }, {
//   name: '表单页',
//   icon: 'form',
//   path: 'form',
//   children: [{
//     name: '基础表单',
//     path: 'basic-form',
//   }, {
//     name: '分步表单',
//     path: 'step-form',
//   }, {
//     name: '高级表单',
//     authority: 'admin',
//     path: 'advanced-form',
//   }],
// }, {
//   name: '列表页',
//   icon: 'table',
//   path: 'list',
//   children: [{
//     name: '查询表格',
//     path: 'table-list',
//   }, {
//     name: '标准列表',
//     path: 'basic-list',
//   }, {
//     name: '卡片列表',
//     path: 'card-list',
//   }, {
//     name: '搜索列表',
//     path: 'search',
//     children: [{
//       name: '搜索列表（文章）',
//       path: 'articles',
//     }, {
//       name: '搜索列表（项目）',
//       path: 'projects',
//     }, {
//       name: '搜索列表（应用）',
//       path: 'applications',
//     }],
//   }],
// }, {
//   name: '详情页',
//   icon: 'profile',
//   path: 'profile',
//   children: [{
//     name: '基础详情页',
//     path: 'basic',
//   }, {
//     name: '高级详情页',
//     path: 'advanced',
//     authority: 'admin',
//   }],
// }, {
//   name: '结果页',
//   icon: 'check-circle-o',
//   path: 'result',
//   children: [{
//     name: '成功',
//     path: 'success',
//   }, {
//     name: '失败',
//     path: 'fail',
//   }],
// }, {
//   name: '异常页',
//   icon: 'warning',
//   path: 'exception',
//   children: [{
//     name: '403',
//     path: '403',
//   }, {
//     name: '404',
//     path: '404',
//   }, {
//     name: '500',
//     path: '500',
//   }, {
//     name: '触发异常',
//     path: 'trigger',
//     // hideInMenu: true,
//   }],
// }, {
//   name: '账户',
//   icon: 'user',
//   path: 'user',
//   // authority: 'guest',
//   children: [{
//     name: '登录',
//     path: 'login',
//   }, {
//     name: '注册',
//     path: 'register',
//   }, {
//     name: '注册结果',
//     path: 'register-result',
//   }],
// }];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
