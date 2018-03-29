/**
 * Created with JetBrains WebStorm.
 User: xuzhiyuan
 Date: 2017/8/22
 Time: 16:27
 To change this template use File | Settings | File Templates.
 */


import asyncComponent from './AsyncComponentFn'


export const AsyncComponent = (component)=>{
    return (
        asyncComponent(() => import('../container/'+component))
)
};
