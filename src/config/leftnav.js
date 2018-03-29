/**
 * Created by 70469 on 2017/12/22.
 * 左侧导航配置
 */
const leftconfig = [
    {
        name: '考勤记录',
        Icon: "form",
        child: [
            {
                path: '/home/RecordList',
                component: 'RecordList',
                name: '记录列表',
                Icon: "profile"
            }
        ]
    },
    {
        name: '员工管理',
        Icon: "form",
        child: [
            {
                path: '/home/UserList',
                component: 'UserList',
                name: '员工列表',
                Icon: "profile"
            },
            {
                path: '/home/UserRest',
                component: 'UserRest',
                name: '员工注册',
                Icon: "usergroup-add"
            }
        ]
    },
    {
        name: '部门管理',
        Icon: "form",
        child: [
            {
                path: '/home/DepartmentList',
                component: 'DepartmentList',
                name: '部门列表',
                Icon: "profile"
            },
            {
                path: '/home/DepartmentRest',
                component: 'DepartmentRest',
                name: '添加部门',
                Icon: "usergroup-add"
            }
        ]
    }
];

export default leftconfig;