/**
 * Created with JetBrains WebStorm.
 User: xuzhiyuan
 Date: 2017/8/22
 Time: 11:16
 To change this template use File | Settings | File Templates.
 */

import React from 'react';
import BaseComponent from 'Utils/BaseComponent.jsx'
import {Menu, Icon} from 'antd'
import {Map} from 'immutable';
import {change} from 'RAndA/leftnav'
import {connect} from 'react-redux';
import leftconfig from 'Config/leftnav'

const SubMenu = Menu.SubMenu;

class LeftMenu extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {
        //刷新默认选中
        this.props.dispatch(change(this.props.location.pathname));
    }

    handleClick = (e) => {
        //添加redux
        this.props.dispatch(change(e.key));
        //改变路由
        this.props.history.push(e.key);
    };

    render() {
        return (
            <Menu theme="dark"
                  mode="inline"
                  onClick={this.handleClick}
                  selectedKeys={[this.props.changeResult.getIn(['data'])]}
                  defaultOpenKeys={['员工管理', '部门管理', '考勤记录', '个人中心']}
            >
                {
                    leftconfig.map((data) => {
                        if (data.child) {
                            return (
                                <SubMenu key={data.name}
                                         title={<span><Icon type={data.Icon}/><span>{data.name}</span></span>}>
                                    {
                                        data.child.map((cdata) => {
                                            return (
                                                <Menu.Item key={cdata.path}>
                                                    <Icon type={cdata.Icon}/>
                                                    <span>{cdata.name}</span>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        } else {
                            return (
                                <Menu.Item key={data.path}>
                                    <Icon type={data.Icon}/>
                                    <span>{data.name}</span>
                                </Menu.Item>
                            )
                        }

                    })
                }
            </Menu>
        )

    }
}


export default connect((state) => {
    return {
        changeResult: state.getIn(['changeResult'])
    }
})(LeftMenu)
