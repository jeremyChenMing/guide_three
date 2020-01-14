import React from 'react';

export default function Loading(props) {
	if (props.isLoading) {
		if (props.timedOut) {
			return <div>加载超时</div>;
		} else if (props.pastDelay) {
			return (
				<div className="loading-Box">
					<div className="lds-css ng-scope">
						<div
							className="lds-spinner"
							style={{ width: '100%', height: '100%' }}
						>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	} else if (props.error) {
		return <div>加载出错</div>;
	} else {
		return null;
	}
}
