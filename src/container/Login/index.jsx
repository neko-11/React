import React,{ Component } from 'react'
//引入login的头部
//import LoginHeader from 'PubComponents/loginHeader'
import { Form, Icon, Input, Checkbox,Button ,Col ,Row ,message, Tooltip ,Modal} from 'antd';
const FormItem = Form.Item;
import { Link , withRouter } from 'react-router-dom'
import { Map } from 'immutable';
//引入组件sass
import { AsyncPost } from 'Utils/utils';
import style from './login.scss'
//引用，不要签名的发起请求方式，写入cookie的util，还有需要签名的请求
//import { NotSigAsyncPost , fExportSetCookieMes ,AsyncPost} from 'Utils/utils';
//粒子动画库
import 'particles.js'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:Map({
                //防止重复提交的flag
                loginflag:false,
            })
        };
    }


    componentDidMount(){
        //重定向防止重复登录
        if (sessionStorage.getItem("userName")){
            this.props.history.replace('/home');
        }

        //粒子运动动画
        this.particlesConfig();
    }

    //粒子运动配置
    particlesConfig = ()=>{
        /* ---- particles.js config ---- */
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#d7d9da"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 0.2,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 15,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 20,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#d7d9da",
                    "opacity": 0.8,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

    };


    //提交登录信息
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    data:this.state.data.update('loginflag',()=>true)
                },()=>{
                    AsyncPost('/api/v1/com/hand/cuxUsers/checkLogin',{
                        userName:values.userName,
                        password: values.password
                    },'post',(data)=>{
                        if (data.code === 1 ){
                            this.setState({
                                data:this.state.data.update('loginflag',()=>false)
                            },()=>{
                                message.success('登录成功！');
                                this.props.history.replace('/');
                                sessionStorage.setItem("userName", values.userName);
                                sessionStorage.setItem("userId",data.result.userId);
                            });
                        }else if (data.code === 0){
                            this.setState({
                                data:this.state.data.update('loginflag',()=>false)
                            },()=>{
                                message.error('用户名或者密码错误！')
                            })
                        }
                    });
                });
            }
        });
    };




    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.big_wrap}>
                <div className={style.login_wrap}>
                    <Row type="flex" className={style.row}>
                        <Col xs={2} sm={6} md={9} className={style.flexbox}></Col>
                        <Col xs={20} sm={12} md={6} className={style.flexbox}>
                            <div className={style.components_form_login}>
                                <div className = {style.img_wrap}>
                                    <img src={require('./img/logo.png')} className={style.img_width}/>
                                </div>
                                <Form onSubmit={this.handleSubmit} className={style.login_form}>
                                    {/*邮箱账号*/}
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{
                                            },{ required: true, message: '请输入您的账号 !',whitespace: true }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
                                        )}
                                    </FormItem>
                                    {/*密码框*/}
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入您的密码 !' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                        )}
                                    </FormItem>
                                    {/*登录按钮*/}
                                    <FormItem>
                                        <Tooltip title="请联系管理员">
                                            <a className={style.login_form_forgot}>忘记密码？</a>
                                        </Tooltip>
                                        <Button loading={this.state.data.get('loginflag')} type="primary" htmlType="submit" className={style.login_form_button}>
                                            登 录
                                        </Button>
                                        {/*<span>或者 </span><a href="javascript:void(0)" onClick={() => this.resign(true)}>现在注册</a>*/}
                                    </FormItem>
                                </Form>
                            </div>
                        </Col>
                        <Col xs={2} sm={6} md={9} className={style.flexbox}></Col>
                    </Row>
                </div>
                {/*粒子动画容器*/}
                <div id="particles-js" className={style.particles}></div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default withRouter(WrappedNormalLoginForm);