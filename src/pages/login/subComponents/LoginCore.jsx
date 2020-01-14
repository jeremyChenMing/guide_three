// 登录组件
import React from 'react';
import drawPic from '../../../utils/code';
import crypto from 'crypto-js/crypto-js';
import { Button, Input, Form, message } from 'antd';

import './LoginCore.less';

const FormCreate = Form.create;

class LoginCore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 1, // 1 - 密码登录   2 - 短信登录
			msgCode: '', // 短信验证码
			time: 10,
			timeCount: false,
			imageValue: ''
		};
	}

	//加密
	encryptFun = (data, secretKey = 'A1B1C2D5') => {
		let encryptText = crypto.AES.encrypt(JSON.stringify(data), secretKey);
		return encryptText.toString();
	};

	//解密
	decryptFun = (encryptData, secretKey = 'A1B1C2D5') => {
		let bytes = crypto.AES.decrypt(encryptData, secretKey);
		return JSON.parse(bytes.toString(crypto.enc.Utf8));
	};
	// 改变登录方式
	changeLoginWay(type) {
		this.setState(
			{
				current: type
			},
			() => {
				if (type === 2) {
					this.imageValue();
				}
			}
		);
	}

	// 倒计时，发送短信验证码
	sendMsgCode() {
		let { timeCount, time, imageValue } = this.state;
		let { getFieldValue } = this.props.form;
		if (getFieldValue('imageCode') !== imageValue) {
			message.error('图片校验码错误');
			return;
		}
		if (!timeCount) {
			this.setState({
				timeCount: true
			});
			this.timer = setInterval(() => {
				if (time <= 1) {
					this.setState({
						timeCount: false,
						time: 10
					});
					clearInterval(this.timer);
				} else {
					this.setState({
						time: --time
					});
				}
			}, 1000);
		}
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	//登陆
	toLogin = () => {
		let { current } = this.state;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let value;
				if (current === 1) {
					value = {
						type: current,
						username: values.username,
						password: this.encryptFun(values.password)
					};
				} else {
					value = {
						type: current,
						username: values.username,
						code: values.code
					};
				}
				console.log(value);
			}
		});
	};

	updateCanvas = () => {
		this.imageValue();
	};
	imageValue = () => {
		let { current } = this.state;
		if (current === 2) {
			let imageValue = drawPic('image-canvas');
			this.setState({
				imageValue
			});
		}
	};
	render() {
		const { current, timeCount, time } = this.state;
		let { getFieldDecorator } = this.props.form;

		return (
			<div className="loginPad">
				<div className="loginTitle">
					登录<span className="loginTitleEnglish">Login</span>
				</div>
				<div className="pickLoginWay">
					<span
						className={'active'}
						onClick={() => {
							this.changeLoginWay(1);
						}}
					>
						个人登录
					</span>
					&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
					<span>
						<a
							href={
								/(develop|localhost)/i.test(window.location.href)
									? 'http://admin.policy.rcsb.develop.nanchanghr.com'
									: 'http://admin.policy.nanchanghr.com'
							}
							target="_blank"
							rel='noreferrer noopener'
						>
							企业登录
						</a>
					</span>
				</div>

				<Form.Item className="inputBlock">
					{getFieldDecorator('username', {
						rules: [
							{ required: true, message: '必填项' },
							{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
						]
					})(<Input className="realInput" placeholder="请输入常用手机号" />)}
				</Form.Item>
				{current === 1 ? (
					<Form.Item className="inputBlock">
						{getFieldDecorator('password', {
							rules: [
								{ required: true, message: '必填项' },
								{
									pattern: /^[\w]{6,12}$/,
									message: '密码为6-12位且只能包含数字、字母、下划线'
								}
							]
						})(
							<Input
								className="realInput"
								type="password"
								placeholder="请输入密码"
							/>
						)}
					</Form.Item>
				) : null}
				{current === 2 ? (
					<Form.Item className="inputBlock">
						{getFieldDecorator('imageCode', {
							rules: [ { required: true, message: '请输入验证码' } ]
						})(
							<div>
								<Input className="image-code" placeholder="请输入图片校验码" />
								<canvas
									id={'image-canvas'}
									width={100}
									height={40}
									onClick={this.updateCanvas}
								/>
							</div>
						)}
					</Form.Item>
				) : null}
				{current === 2 ? (
					<Form.Item className="inputBlock">
						{getFieldDecorator('code', {
							rules: [
								{ required: true, message: '必填项' },
								{ pattern: /^[\d]{4}$/, message: '验证码为4位数字' }
							]
						})(
							<div>
								<Input className="realInput" placeholder="请输入短信验证码" />
								<span
									onClick={() => {
										this.sendMsgCode();
									}}
									className={timeCount ? 'sendMsgNo' : 'sendMsg'}
								>
									{timeCount ? `${time}秒重新获取` : '获取验证码'}
								</span>
							</div>
						)}
					</Form.Item>
				) : null}
				<Button
					onClick={this.toLogin.bind(this)}
					type="primary"
					size="large"
					className="LoginBtn"
				>
					登录
				</Button>
				{current === 1 ? (
					<span
						className="codeLogin"
						onClick={() => {
							this.changeLoginWay(2);
						}}
					>
						使用验证码登录
					</span>
				) : (
					<span
						className="codeLogin"
						onClick={() => {
							this.changeLoginWay(1);
						}}
					>
						使用密码登录
					</span>
				)}
				<div className="noAcountToRegist">
					没有账号？
					<span
						onClick={() => {
							console.log('跳转注册');
						}}
						className="toRegister"
					>
						立即注册
					</span>
				</div>
			</div>
		);
	}
}
const LoginCoreForm = FormCreate()(LoginCore)
export default LoginCoreForm;
