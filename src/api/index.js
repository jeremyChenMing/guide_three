import axios from '../utils/axios';

// home页面的数据
export const getHomeData = (obj) => {
	return axios.get('/platform/index/getIndexInfo', { params: obj });
};
