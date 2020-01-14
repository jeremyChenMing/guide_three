import React, { Component } from 'react';
import FormatDateTime from "../../utils/formateDatetime";
import './DateBox.less';
class DateBox extends Component {
  state = {
    dateTime: Date.now()
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        dateTime: Date.now()
      })
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let { floor } = this.props;
    let { dateTime } = this.state;
    return (
      <div className="date-box">
        <div className="date">
          <span>{FormatDateTime(dateTime,1)}</span>
          <span>{FormatDateTime(dateTime,3)}</span>
        </div>
        <div className="time">
          {FormatDateTime(dateTime,2)}
        </div>
        <div className="floor-info">
          当前所在: {floor} 层
        </div>
      </div>
    )
  }
}
export default DateBox;
