import React from 'react';

import { connect } from '@map';

import Router from '@router/index.jsx';


class SessionComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.checkSessionState()
  }

  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}


export default connect(SessionComponent)
