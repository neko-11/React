/**
 * Created by zhushuangfei on 2017/12/22.
 */

import React from 'react';
import BaseComponent from 'Utils/BaseComponent.jsx'
import style from './isLogin.scss'
import { Spin } from 'antd';

class isLogin extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if (sessionStorage.getItem("userName")){
            this.props.history.replace('/home/RecordList')
        }else{
            this.props.history.replace('/login')
        }

    }


    render() {
        return (
            <div className={style.spinbig_wrap}>
                <Spin tip="Loading...">
                </Spin>
            </div>

        )

    }
}


export default isLogin
