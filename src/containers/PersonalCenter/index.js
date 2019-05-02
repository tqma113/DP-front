import React, { useState, useEffect } from 'react'
import { Row, Col, Icon, Tabs, message, Input, Select, Button, Divider, Spin, Avatar, Skeleton, List } from 'antd'
import { ArticleCard } from '@components'
import PersonalInfo from './PersonalInfo'

import Less from './index.module.less'

const TabPane = Tabs.TabPane
const Option = Select.Option
const Search = Input.Search

const grid = {
  gutter: 48, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2,
}

const PersonalCenter = (props) => {
  const {
    store = {},
    handlers = {},
    isSelf = false,
    username = '',
    static: { api },
    query,
    querys
  } = props
  const { loadStatus, users = {}, documentTitle = '' } = store
  const user = users[username] || {}

  const [overLoading, setOverviewLoading] = useState(true)
  const [articlesLoading, setArticleLoading] = useState(true)

  useEffect(() => {
    if (user.username !== username) {
      loadUser(username)
    } else {
      handlers.onload({ loadStatus })
      document.title = user.nickname + documentTitle
      setArticleLoading(false)
    }
  })

  const handleChangeTab = (key) => {
    switch(key) {
      case 1:
        loadOverview()
        break;
      case 2:
        loadArticles()
        break;
      case 3:
        break;
      default:
    }
  }

  const handleCategoryChange = (value) => {

  }

  const handleSearchClick = (value) => {

  }

  const handleEditClick = () => {

  }

  const loadOverview = () => {
    setOverviewLoading(true)

  }

  const loadArticles = () => {
    setArticleLoading(true)
  }

  const loadUser = async (username) => {
    const data = await query(
      querys.QueryUsers,
      {
        usernames: [username]
      }
    )
    const { users: { users = [], isSuccess } = {} } = data
    if (isSuccess) {
      handlers.setUsers({ users })
    }
  }

  return (
    <section className={Less['personal-center']}>
      <section className={Less['main']}>
        <Row bottom='md'>
          <Col span={6}>
            <Row>
              <Avatar className={Less['avatar']} src={user.avatar ? api.dev.static + user.avatar : ''} title="avatar" />
            </Row>
            <Row>
              <p className={Less['nickname']}>{user.nickname}</p>
              {user.email &&
                <Row>
                  <Icon type="mail" />
                  <a href={`mailto:${user.email}`} className={Less['email']}>{user.email}</a>
                </Row>
              }
              {user.location && <Row className={Less['address']}>
                  <p style={{display: 'inlne-block'}}><Icon type="environment" /> {user.location}</p>
              </Row>}
              {user.statement &&
                <p className={Less['statement']}>{user.statement}</p>
              }
              {isSelf && <Button onClick={handleEditClick} style={{ width: '100%'}} size="small">编辑</Button>}
            </Row>
          </Col>
          <Col span={17} offset={1}>
            <Tabs onChange={handleChangeTab} defaultActiveKey={'3'}>
              <TabPane tab="概述" key="1">
                <Row>
                  <Col className={Less['title-1']}>热门文章</Col>
                </Row>
                {overLoading ?
                <List
                  grid={grid}
                  dataSource={[1,2,3,4,5,6]}
                  renderItem={() =>
                    <List.Item>
                      <Skeleton active />
                    </List.Item>
                  }
                /> :
                <List
                  grid={grid}
                  renderItem={item => (
                    <List.Item>

                    </List.Item>
                  )}
                />
                }
              </TabPane>
              <TabPane tab="文章" key="2">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Search onSearch={handleSearchClick} placeholder="搜索文章..." />
                  </Col>
                  <Col span={5} offset={2}>
                    <Select onChange={handleCategoryChange} style={{ width: '100%'}} defaultValue={'all'}>
                      <Option key={-1} value={'all'}>全部</Option>
                    </Select>
                  </Col>
                  {isSelf && <Col span={4} offset={1}>
                    <Button style={{ width: '100%'}} type="primary"><Icon type="plus" />新建</Button>
                  </Col>}
                </Row>
                <Divider />
                {articlesLoading ?
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={[1,2,3]}
                  renderItem={() =>
                    <List.Item>
                      <Skeleton active />
                    </List.Item>
                  }
                /> :
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={user.articles}
                  renderItem={(item) => (
                    <List.Item>
                      <ArticleCard article={item} />
                    </List.Item>
                  )}
                />}
              </TabPane>
              <TabPane tab="个人信息" key={3}>
                <PersonalInfo user={user} {...props} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </section>
    </section>
  )
}

export default PersonalCenter
