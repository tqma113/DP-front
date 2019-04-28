import React, { useState, useEffect } from 'react';
import map from '@map'

import { Message, Loading } from '@components'

import Less from './index.module.less'

const classList = ['is-loading', 'load-success', 'login']

const Controller = (props) => {
  const { store, children } = props
  const { loadStatus = 0 } = store

  const [spinClass, setSpinClass] = useState()

  useEffect(() => {
    let timeout = setTimeout(() => {
      setSpinClass(Less[classList[loadStatus]])
      clearTimeout(timeout)
    }, 500);
  })


  return (
    <section className={Less['controller-container'] + ' ' + spinClass}>
      <section className={Less['controller']}>
        <Loading />
      </section>
      <section className={Less['loading-mask']}></section>
      <section className={Less['controller-content']}>{{...children}}</section>
      <Message />
    </section>
  )
}

export default map(Controller)
