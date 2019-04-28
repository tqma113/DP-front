import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd'
import { connect } from '@map'

import { Horologe } from '@components'
import { Message } from '@containers'

import Less from './index.module.less'

const classList = ['is-loading', 'load-success', 'login']

const Controller = (props) => {
  const { handlers, store, children } = props
  const { loadStatus = 0, messageStatus= false } = store

  const [spinClass, setSpinClass] = useState()

  useEffect(() => {
    let timeout = setTimeout(() => {
      setSpinClass(Less[classList[loadStatus]])
      clearTimeout(timeout)
    }, 500);
  })

  const handleCloseMessage = () => {
    handlers.closeMessage()
  }

  return (
    <section className={Less['loading-container'] + ' ' + spinClass}>
      <section className={Less['loading-spin']}>
        <section className={Less['loading']}>
          <section className={Less['loading-border']}>
            <section className={Less['loading-bg']}></section>
            <Horologe />
          </section>
        </section>
      </section>
      <section className={Less['loading-mask']}></section>
      <section className={Less['loading-content']}>{{...children}}</section>
      <Drawer
        width={350}
        title="Now - 私信"
        mask={false}
        visible={messageStatus === 1}
        onClose={handleCloseMessage}
      >
        <Message />
      </Drawer>
    </section>
  )
}

export default connect(Controller)
