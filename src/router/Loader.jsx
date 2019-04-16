import React, { Component } from 'react'

import map from '@map'

class Loader extends Component {
  render() {
    let {
      children
    } = this.props;
    return (
      <React.Fragment>
        {{...children}}
      </React.Fragment>
    )
  }
}

export default map(Loader)
