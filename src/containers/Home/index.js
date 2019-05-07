import React, { useState, useEffect } from 'react'
import { Row, Col, Tabs, message } from 'antd'
import PersonalInfo from './PersonalInfo'

import UserInfo from './UserInfo'
import Overview from './Overview'
import Article from './Article'
import Category from './Category'
import Industry from './Industry'
import More from './More'

import Less from './index.module.less'
import './index.less'

const TabPane = Tabs.TabPane

const tabs = {
  overview: '1',
  articles: '2',
  setting: '3',
  categorys: '5',
  industrys: '6',
  likes: '4',
  stars: '4',
  concern: '4'
}

const Home = (props) => {
  const {
    store = {},
    handlers = {},
    isSelf = false,
    username = '',
    query,
    querys = {},
    location = {}
  } = props
  const { loadStatus, users = {}, documentTitle = '' } = store
  const user = users[username] || {}

  const [tabKey, setTabKey] = useState('1')
  const [tabName, setTabName] = useState('')

  useEffect(() => {
    if (user.username !== username) {
      loadUser(username)
    } else {
      handlers.onload({ loadStatus })
      document.title = user.nickname + documentTitle
    }
  })

  useEffect(() => {
    if (location.hash) {
      let title = location.hash.slice(1)
      if (tabs[title]) {
        setTabKey(tabs[title])
        setTabName(title)
      }
    }
  }, [])

  const handleChangeTab = (key) => {
    switch(key) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
    }
  }

  const handleEditClick = () => {
    setTabKey('3')
  }

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  const loadUser = async (username, fetchPolicy) => {
    const data = await query(
      querys.QueryUsers,
      {
        usernames: [username]
      },
      {
        fetchPolicy
      }
    )
    let { users: { isSuccess, users, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setUsers({ users })
    } else {
      const { errors = [] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  return (
    <section className={Less['personal-center'] + ' personal'}>
      <section className={Less['main']}>
        <Row bottom='md'>
          <Col span={6}>
            <UserInfo onEditClick={handleEditClick} {...props} />
          </Col>
          <Col span={17} offset={1}>
            <Tabs onTabClick={handleTabClick} onChange={handleChangeTab} activeKey={tabKey}>
              <TabPane tab="概述" key="1">
                <Overview {...props} />
              </TabPane>
              <TabPane tab="文章" key="2">
                <Article {...props} />
              </TabPane>
              <TabPane tab="类别" key="5">
                <Category {...props} />
              </TabPane>
              <TabPane tab="行业" key="6">
                <Industry {...props} />
              </TabPane>
              <TabPane tab="更多" key="4">
                <More {...props} tabName={tabName} />
              </TabPane>
              {isSelf && <TabPane tab="个人信息" key={3}>
                <PersonalInfo user={user} {...props} />
              </TabPane>}
            </Tabs>
          </Col>
        </Row>
      </section>
    </section>
  )
}

export default Home
