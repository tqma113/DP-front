import React from 'react'
import { Layout, Menu, Affix } from 'antd'

import map from '@map'

import Less from './index.module.less'

const { Header, Content, Footer } = Layout

const NativeLayout = (props) => {
  const { children, handlers = {}, store = {}, mutate, mutations = {} } = props
  const { session = {}, users= {} } = store
  const { status, info = {} } = session
  const { username } = info
  const currentUser = users[username] || {}

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
        logout()
        break;
      case '5':
        handlers.go('/login')
        break;
      case '6':
        handlers.go('/register')
        break;
      case '7':
        handlers.go('/admin')
        break;
      case '8':
        handlers.go('/apply')
        break;
      default:
      break;
    }
  }

  const logout = async () => {
    const res = await mutate(mutations.LogoutMutation)
    const { logout = {} } = res;
    const { isSuccess = false } = logout
    if (isSuccess) {
      handlers.logout()
    }
  }

  return (
    <Layout className="layout">
      <Affix>
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
            {status && <Menu.Item key={2}>写文章</Menu.Item>}
            {status && <Menu.Item key={3}>私信</Menu.Item>}
            {status && (currentUser.user_type == '1' ? <Menu.Item key={7}>管理员</Menu.Item> : <Menu.Item key={8}>申请</Menu.Item>)}
            {status && <Menu.Item className={Less['right-head']} key={1}>{currentUser.nickname}</Menu.Item>}
            {status ?
              <Menu.Item className={Less['right-head']} key={4}>注销</Menu.Item> :
              <Menu.Item className={Less['right-head']} key={5}>登录</Menu.Item>
            }
            <Menu.Item className={Less['right-head']} key={6}>注册</Menu.Item>
          </Menu>
        </Header>
      </Affix>
      <Content style={{ background: '#fff', minHeight: 680 }}>{{...children}}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Now Blog ©2019 Create by M.TQ
      </Footer>
    </Layout>
  )
}

export default map(NativeLayout, 'Layout')
