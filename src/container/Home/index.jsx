import React from 'react';
import {Map} from 'immutable';
import {Layout, Breadcrumb} from 'antd';

const {Content, Sider} = Layout;
import BaseComponent from 'Utils/BaseComponent.jsx'
import style from './home.scss'
import Foot from 'PubCom/footer'
import {Menu, Dropdown, Icon} from 'antd';
import LeftMenu from 'PubCom/LeftMenu'
import {Route, Link} from 'react-router-dom'
import {AsyncComponent} from 'Utils/asyncComponent.jsx'
import {AsyncPost} from 'Utils/utils'
import SwitchCSSTransitionGroup from 'switch-css-transition-group'
import leftconfig from 'Config/leftnav'

class Home extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: Map({
                collapsed: false
            })
        }
    }

    componentDidMount(){
    }

    onCollapse = (collapsed) => {
        //this.setState({ collapsed });
        this.setState({
            data: this.state.data.update('collapsed', () => collapsed)
        });
    };

    clearUserName = () => {
        sessionStorage.clear();
        this.props.history.replace('/')
    };


    render() {
        //面包屑逻辑
        const breadcrumbNameMap = {};
        leftconfig.map((data, index) => {
            if (index !== 0) {
                breadcrumbNameMap[data.path] = data.name;
            }
            if (data.child) {
                data.child.map((cdata, cindex) => {
                    /*if (cindex !== 0) {*/
                        breadcrumbNameMap[cdata.path] = cdata.name;
                    /*}*/
                })
            }
        });
        const {location} = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="/home/RecordList" className={style.firstBreadcrumb}>
                <Link to="/home/RecordList">首页</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.clearUserName}>退出登陆</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.data.getIn(['collapsed'])}
                    onCollapse={this.onCollapse}
                >
                    <div className={style.logobox}>
                        <img src={
                            this.state.data.getIn(['collapsed']) ?
                                require('./img/w_logo2.png')
                                :
                                require('./img/w_logo.png')
                        }
                             className={style.logo}
                        />
                    </div>
                    <LeftMenu location={this.props.location} history={this.props.history} match={this.props.match}/>
                </Sider>
                <Layout>
                    <Content className={style.ContentB}>

                        {/*面包屑*/}
                        <Breadcrumb separator=">" className={style.Breadcrumb}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                你好，{sessionStorage.getItem('userName')}<Icon type="down"/>
                            </a>
                        </Dropdown>
                        {/*正文*/}
                        <div style={{
                            border: '1px solid #ddd',
                            boxShadow: '0px 0px 4px #ccc',
                            padding: 24,
                            background: '#fff',
                            minHeight: 360
                        }}>
                            <SwitchCSSTransitionGroup
                                location={this.props.location}
                                transitionName='example'
                                transitionLeaveTimeout={500}
                                transitionEnterTimeout={500}
                            >
                                {
                                    leftconfig.map((data, index) => {
                                        return (
                                            data.child ?
                                                data.child.map((cdata, cindex) => {
                                                    return (
                                                        <Route key={"router" + cindex} exact strict path={cdata.path}
                                                               component={AsyncComponent(cdata.component)}/>
                                                    )
                                                })
                                                :
                                                <Route key={"router" + index} exact strict path={data.path}
                                                       component={AsyncComponent(data.component)}/>
                                        )
                                    })
                                }

                            </SwitchCSSTransitionGroup>
                        </div>
                    </Content>
                    <Foot/>
                </Layout>
            </Layout>
        );
    }
}


export default Home;
