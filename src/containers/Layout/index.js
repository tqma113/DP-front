import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'

import map from '@map'

import Less from './index.module.less'

const { Header, Content, Footer } = Layout

const NativeLayout = (props) => {
  const { children, handlers = {}, store = {} } = props
  const { session = {} } = store
  const { status, info = {} } = session
  const { username } = info

  const handleClick = ({ key }) => {
    switch(key) {
      case '0':
        handlers.go('/')
        break;
      case '1':
        handlers.go('/' + username)
        break;
      case '2':
        handlers.go('/article/create')
        break;
      default:
      break;
    }
  }

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: '#24292e' }}>
        <div className={Less['logo']}>Now</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={['5']}
          onClick={handleClick}
          style={{ lineHeight: '64px', backgroundColor: '#24292e' }}
        >
          <Menu.Item key={0}>首页</Menu.Item>
          {status && <Menu.Item key={1}>个人中心</Menu.Item>}
          {status && <Menu.Item key={2}>写文章</Menu.Item>}
        </Menu>
      </Header>
      <Content style={{ background: '#fff', minHeight: 680 }}>{{...children}}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Now Blog ©2019 Create by M.TQ
      </Footer>
    </Layout>
  )
}

export default map(NativeLayout)
