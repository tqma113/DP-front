import React from 'react';
import { Spin } from 'antd'

import { connect } from '@map';

import Router from '@router/index.jsx';

const LoadingIcon = 1

class SessionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadStatus: false
    }
  }

  componentDidMount() {

  }

  render() {
    let {
      loadStatus
    } = this.state


    return (
      <Spin size="large" delay="100" tip="Loading" >
        <Router />
      </Spin>
    )

  }
}


export default connect(SessionComponent)
