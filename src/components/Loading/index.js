import React, { useState, useEffect } from 'react'
import { Icon } from 'antd'

import { Horologe } from '@components'

import map from '@map'

import Less from './index.module.less'

const classList = ['is-loading', 'load-success', 'login', 'login-loading']

const iconStyle = {
  width: '100%',
  height: '100%',
  fontSize: '20px',
  marginTop: '8px',
  marginLeft: '1px',
  color: '#555'
}

const Loading = (props) => {
  const { store, handlers } = props
  const { floatStatus = 0, session = {} } = store
  const { info = {} } = session
  const { username } = info

  const [operatorStatus, setOperatorStatus] = useState()
  const [loadingClass, setLoadingClass] = useState('is-loading');
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoadingClass(Less[classList[floatStatus]])
      setLoadingStatus(true)
      clearTimeout(timeout)
    }, 500);
  })

  const handleClick = () => {
    if (floatStatus > 0) {
      setOperatorStatus(!operatorStatus)
    }
  }

  const handlePersonClick = () => {
    if (floatStatus) {
      if (username) {
        handlers.go(`/${username}`)
      } else {
        handlers.go('/login')
      }
    }
  }

  const handleMessageClick = () => {
    if (floatStatus) {
      handlers.openMessage()
    }
  }

  const handleNewArticleClick = () => {
    if (floatStatus) {
      console.log('go to new article')
    }
  }

  const handleLogoutClick = () => {
    if (floatStatus) {
      handlers.logout()
    }
  }

  return (
    <section className={`${Less['loading']} ${loadingClass}`} onClick={handleClick}>
      <section className={Less['loading-border']}>
        <section className={Less['loading-bg']}></section>
        <Horologe />
      </section>
      {loadingStatus && <section className={`${Less['operator-ball']} ${operatorStatus ? Less['open'] : ''}`}>
        <section onClick={handlePersonClick} className={Less['ball-1']}>
          <Icon style={iconStyle} type="user" />
        </section>
        <section onClick={handleMessageClick} className={Less['ball-2']}>
          <Icon style={iconStyle} type="file-text" />
        </section>
        <section onClick={handleNewArticleClick} className={Less['ball-3']}>
          <Icon style={iconStyle} type="diff" />
        </section>
        <section onClick={handleLogoutClick} className={Less['ball-4']}>
          <Icon style={iconStyle} type="logout" />
        </section>
      </section>}
    </section>
  )
}

export default map(Loading)
