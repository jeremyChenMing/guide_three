import axios from 'axios';
import host from './host';
import Qs from 'qs';
import history from '../utils/history';
import { notification } from 'antd';
//配置默认的axios的需求
axios.defaults.baseURL = host;
axios.defaults.transformRequest = (data) => data;
axios.interceptors.response.use((result) => {
	if (result.data.code && result.data.code !== 200) {
		notification.error({
			message: '接口报错',
			description:
				(result.data.msg && result.data.msg) +
				(result.data.data && result.data.data)
		});
	}

	if (result.data.code && result.data.code === 502) history.push('/login');
	return result.data;
});

axios.interceptors.request.use(
	function(config) {
		const token = localStorage.getItem('token');
		const userid = localStorage.getItem('userid');
		// 判断请求的类型
		// 如果是post请求就把默认参数拼到data里面
		// 如果是get请求就拼到params里面
		if (config.method === 'post') {
			//判断是否是上传文件的请求
			if (!(config.data instanceof FormData)) {
				let data = Qs.parse(config.data);
				config.data = {
					token: 'token',
					userid: userid,
					...data
				};
				config.data['token'] = token;
				config.data['userid'] = userid;
				config.data = Qs.stringify(config.data);
			}
		} else if (config.method === 'get') {
			config.params = {
				token: token,
				userid: userid,
				...config.params
			};
		}
		return config;
	},
	function(error) {
		notification.error({
			message: '接口报错',
			description: error
		});
		return Promise.reject(error);
	}
);
export default axios;
