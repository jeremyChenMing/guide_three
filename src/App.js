import React, { Component } from 'react';

import ScrollToTop from './component/scroolTop/ScrollToTop';

import { Switch, Router, Route, Redirect, withRouter } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Loadable from 'react-loadable';
import Loading from './component/loading/Loading';

import history from './utils/history';

import './static/css/reset.less';

// const AsyncHome = Loadable({
// 	loader: () => import('./pages/home/Home'),
// 	loading: Loading
// });
// const AsyncLogin = Loadable({
// 	loader: () => import('./pages/login/Login'),
// 	loading: Loading
// });
const AsyncFloorOne = Loadable({
	loader: () => import('./pages/FloorOne/FloorOne'),
	loading: Loading
});
const AsyncFloorTwo = Loadable({
	loader: () => import('./pages/FloorTwo/FloorTwo'),
	loading: Loading
});
const AsyncFloorThree = Loadable({
	loader: () => import('./pages/FloorThree/FloorThree'),
	loading: Loading
});
class App extends Component {
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo, 'react-err-eric');
	}
	render() {
		const { location } = this.props;
		return (
			<ConfigProvider locale={zh_CN}>
				<div className="main">
					<Router history={history}>
						<ScrollToTop>
							{/*<TransitionGroup>*/}
								{/*<CSSTransition*/}
									{/*key={ location.pathname }*/}
									{/*timeout={ 3000 }*/}
									{/*classNames="chang"*/}
									{/*in={ true }*/}
									{/*appear={true}*/}
								{/*>*/}
									<Switch location={ location }>
										{/*<Route path="/:id" exact component={AsyncFloorOne} />*/}
										{/*<Route path="/login" component={AsyncLogin} />*/}
										{/*<Route path="/home" component={AsyncHome} />*/}
										<Route path="/floor-one/:position" component={AsyncFloorOne} />
										<Route path="/floor-two/:position" component={AsyncFloorTwo} />
										<Route path="/floor-three/:position" component={AsyncFloorThree} />
										<Redirect to="/floor-one/1?floor-name=1F"/>
									</Switch>
								{/*</CSSTransition>*/}
							{/*</TransitionGroup>*/}
						</ScrollToTop>
					</Router>
				</div>
			</ConfigProvider>
		);
	}
}

export default withRouter(App);
