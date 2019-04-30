import React, { useState, useEffect } from 'react'
import { Row, Col, Icon, Tabs, message, Input, Select, Button, Divider, Spin } from 'antd'

import Less from './index.module.less'

const TabPane = Tabs.TabPane
const Option = Select.Option
const Search = Input.Search

const loadingIcon = <Icon type="clock-circle" style={{ fontSize: 40, fontWeight: '200', color: '#888' }} spin />

const PersonalCenter = (props) => {
  const { store = {}, handlers = {}, isSelf = false, username = '', static: { api } } = props
  const { loadStatus, users = {} } = store
  const user = users[username] || {}

  const [overLoading, setOverviewLoading] = useState(true)
  const [articlesLoading, setArticleLoading] = useState(true)

  useEffect(() => {
    handlers.onload({ loadStatus })
  })

  if (!user) {
    message.error('网络错误')
  }

  const handleChangeTab = (key) => {
    switch(key) {
      case 1:
        loadOverview()
        break;
      case 2:
        loadArticles()
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

  return (
    <section className={Less['personal-center']}>
      <section className={Less['main']}>
        <Row bottom='md'>
          <Col span={6}>
            <Row>
              <img className={Less['avatar']} src={api.dev.static + user.head_portrait} />
            </Row>
            <Row>
              <p className={Less['nickname']}>{user.nickname}</p>
              {user.email &&
                <span>
                  <Icon type="mail" />
                  <a href={`mailto:${user.email}`} className={Less['email']}>{user.email}</a>
                </span>
              }
              {user.location && <React.Fragment>
                <Icon type="environment" />
                <p className={Less['address']}>{user.location}</p>
              </React.Fragment>}
              {user.statement &&
                <p className={Less['statement']}>{user.statement}</p>
              }
              {isSelf && <Button onClick={handleEditClick} style={{ width: '100%'}} size="small">编辑</Button>}
            </Row>
          </Col>
          <Col>
            <Tabs onChange={handleChangeTab}>
              <TabPane tab="概述" key="1">
                <Row>
                  <Col className={Less['title-1']}>热门文章</Col>
                </Row>
                <Spin indicator={loadingIcon} spinning={overLoading}>
                  <Row type="flex" className={Less['hot-articles']}>
                    <Col span={8}>

                    </Col>
                  </Row>
                </Spin>
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
                <Spin indicator={loadingIcon} spinning={articlesLoading}>
                  <section className={Less['articles']}>

                  </section>
                </Spin>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </section>
    </section>
  )
}

export default PersonalCenter
