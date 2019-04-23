import React, {Component} from 'react';
import { Drawer } from 'antd'
import { connect } from '@map'

import { Horologe } from '@components'
import { Message } from '@containers'

import Less from './index.module.less'

const classList = ['is-loading', 'load-success', 'login']

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinClass: Less['is-loading'],
      timeout: null
    }
  }
  componentWillMount() {

  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  handleCloseMessage = () => {
    this.props.handlers.closeMessage()
  }

  render() {
    const {
      children,
      store
    } = this.props;
    const { loadStatus = false, messageStatus= false } = store
    const {
      spinClass
    } = this.state;

    let timeout = setTimeout(() => {
      this.setState({
        ...this.state,
        spinClass: Less[classList[loadStatus]],
        timeout
      })
    }, 500);

    return (
      <section className={Less['loading-container'] + ' ' + spinClass}>
        <section className={Less['loading-spin']}>
          <section className={Less['loading']}>
            <section className={Less['loading-border']}>
              <section className={Less['loading-bg']}></section>
              <Horologe />
              <Drawer
                width={350}
                title="Now - 私信"
                mask={false}
                visible={messageStatus === 1}
                onClose={this.handleCloseMessage}
              >
                <Message />
              </Drawer>
            </section>
          </section>
          <p className={Less['loading-text']} style={{animation: 'none'}}>{loadStatus === 0 ? 'Loading...' : 'Load success!'}</p>
        </section>
        <section className={Less['loading-mask']}></section>
        <section className={Less['loading-content']}>{{...children}}</section>
      </section>
    )
  }
}

export default connect(Controller)
