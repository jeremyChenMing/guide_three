import React from 'react';
import './Home.less';
import { Icon } from 'antd';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<Icon type="up-circle" />
			</div>
		);
	}
}

export default Home;
