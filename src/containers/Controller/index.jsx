import React, { useState, useEffect } from 'react';
import map from '@map'

import { Loading } from '@components'
import { Message } from '@containers'

import Less from './index.module.less'

const classList = ['is-loading', 'load-success', 'login', 'login-loading']

const Controller = (props) => {
  const { store, children } = props
  const { floatStatus = 0 } = store

  const [spinClass, setSpinClass] = useState()

  useEffect(() => {
    let timeout = setTimeout(() => {
      setSpinClass(Less[classList[floatStatus]])
      clearTimeout(timeout)
    }, 500);
  })

  return (
    <section className={Less['controller-container'] + ' ' + spinClass}>
      <section className={Less['controller']}>
        <Loading />
      </section>
      <section className={Less['loading-mask']}></section>
      <Message />
      <section className={Less['controller-content']}>{{...children}}</section>
    </section>
  )
}

export default map(Controller)
