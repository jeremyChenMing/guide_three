import React from 'react';
import './Layout.less';

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				{/*<Header {...this.props}/>*/}
				<div className="contentImportant">{this.props.children}</div>
				{/*<Footer />*/}
			</div>
		);
	}
}

export default Layout;
