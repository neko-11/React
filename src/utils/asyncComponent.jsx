/**
 * Created by zhushuangfei on 2017/12/22.
 */


import asyncComponent from './AsyncComponentFn'


export const AsyncComponent = (component)=>{
    return (
        asyncComponent(() => import('../container/'+component))
)
};
