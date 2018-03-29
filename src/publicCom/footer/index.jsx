import React from 'react';
import BaseComponent from 'Utils/BaseComponent.jsx'
import { Layout } from 'antd'
const { Footer } = Layout;

class Foot extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                Anhui University of Technology Graduation Project ©2018 Created by Zhu Shuangfei
            </Footer>
        )

    }
}


export default Foot
