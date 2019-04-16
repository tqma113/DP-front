import React, {Component} from 'react';

import { connect } from '@map';

import Less from './index.module.less'

class Page extends Component {

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <section className={Less.page}>
      </section>
    )
  }
}

export default connect(Page)
