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
      case '3':
        handlers.openMessage()
        break;
      case '4':
        handlers.logout()
        break;
      case '5':
        handlers.go('/login')
        break;
      case '6':
        handlers.go('/register')
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
          selectedKeys={['10']}
          onClick={handleClick}
          style={{ lineHeight: '64px', backgroundColor: '#24292e' }}
        >
          <Menu.Item key={0}>首页</Menu.Item>
          {status && <Menu.Item key={1}>个人中心</Menu.Item>}
          {status && <Menu.Item key={2}>写文章</Menu.Item>}
          {status && <Menu.Item key={3}>私信</Menu.Item>}
          {status ?
            <Menu.Item className={Less['right-head']} key={4}>注销</Menu.Item> :
            <Menu.Item className={Less['right-head']} key={5}>登录</Menu.Item>
          }
          <Menu.Item className={Less['right-head']} key={6}>注册</Menu.Item>
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
