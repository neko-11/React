/**
 *  Created By zhushuangfei on 2018/3/29
 */

import React, {Component} from 'react';
import BaseComponent from 'Utils/BaseComponent.jsx'
import {Map} from 'immutable';
import style from './style.scss'


class test extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: Map({})
        }
    }


    render() {
        return (
            <div>
                <h3 key="tittle" className={style.tittle}>333</h3>
            </div>
        )
    }
}

export default test;

