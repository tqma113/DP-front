import React, { useState, useEffect } from 'react'
import { Row, Col, Icon, Tabs, message, Input, Select, Button, Divider, Card, Avatar, Skeleton, List, Tag } from 'antd'
import { IconText } from '@components'
import PersonalInfo from './PersonalInfo'
import moment from 'moment'

import Less from './index.module.less'
import './index.less'

const TabPane = Tabs.TabPane
const Option = Select.Option
const Search = Input.Search

const grid = {
  gutter: 48, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2,
}

const tabs = {
  overview: '1',
  articles: '2',
  setting: '3'
}

const PersonalCenter = (props) => {
  const {
    store = {},
    handlers = {},
    isSelf = false,
    username = '',
    static: { api },
    query,
    querys,
    mutate,
    mutations,
    location = {}
  } = props
  const { loadStatus, users = {}, documentTitle = '', categorys = [], session = {} } = store
  const user = users[username] || {}
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername]

  const [overLoading, setOverviewLoading] = useState(true)
  const [articlesLoading, setArticleLoading] = useState(true)

  const [category, setCategory] = useState(-1)
  const [search, setSearch] = useState('')
  const [filterArticles, setFilterArticles] = useState(user.articles || [])
  const [hotArticles, setHotArticles] = useState(user.articles || [])
  const [sortArticles, setSortArticles] = useState(user.articles || [])

  const [tabKey, setTabKey] = useState('1')

  const isConcerned = currentUser.concerned ? currentUser.concerned.some(item => item.concerned_user_id == user.id) : false

  useEffect(() => {
    if (user.username !== username) {
      loadUser(username)
    } else {
      handlers.onload({ loadStatus })
      document.title = user.nickname + documentTitle
      setArticleLoading(false)
      setOverviewLoading(false)
    }
  })

  useEffect(() => {
    let articles = user.articles || []
    articles.sort((a, b) => {
      return b.likes.length + b.collections.length - a.likes.length + a.collections.length
    })
    setSortArticles(articles)
    const hotArticles = articles.slice(0, 6)
    setHotArticles(hotArticles)
    const filterArticles = category != -1 ?
    articles.filter(i => i.categorys.some(item => item == category))
                      .filter(i => JSON.stringify(i).includes(search)) : articles
    setFilterArticles(filterArticles)
  }, [user.articles])

  useEffect(() => {
    let filterArticles = (category != -1 ? sortArticles.filter(i => i.categorys.some(item => item == category)) : sortArticles).filter(i => JSON.stringify(i).includes(search))
    setFilterArticles(filterArticles)
  }, [sortArticles, search, category])

  useEffect(() => {
    if (location.hash) {
      let title = location.hash.slice(1)
      if (tabs[title]) {
        setTabKey(tabs[title])
      }
    }
  }, [])

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
    setCategory(value)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleEditClick = () => {
    setTabKey('3')
  }

  const handleConcernClick = () => {
    if (status) {
      userConcern()
    }
  }

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  const loadOverview = () => {
    setOverviewLoading(true)

  }

  const loadArticles = () => {
    setArticleLoading(true)
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
    let { users: { isSuccess, users } = {} } = data

    if (isSuccess) {
      handlers.setUsers({ users })
    }
  }

  const handleStarClick = (article) => {
    if (status) {
      articleStar(article)
    }
  }

  const handleLikeClick = (article) => {
    if (status) {
      articleLike(article)
    }
  }

  const articleStar = async (article) => {
    const isCollected = article.collections ? article.collections.some(item => item.user_id == currentUser.id) : false

    let data = await mutate(
      mutations.ArticleStarMutation,
      {
        username: currentUsername,
        token,
        articleId: Number(article.id),
        status: isCollected
      }
    )
    const { articleStar: { isSuccess } = {} } = data
    if (isSuccess) {
      if (username) {
        loadUser(username, 'no-cache')
      }
    } else {
      message.error('点赞失败,请重试')
    }
  }

  const articleLike = async (article) => {
    const isLiked = article.likes ? article.likes.some(item => item.user_id == currentUser.id) : false

    let data = await mutate(
      mutations.ArticleLikeMutation,
      {
        username: currentUsername,
        token,
        articleId: Number(article.id),
        status: isLiked
      }
    )
    const { articleLike: { isSuccess } = {} } = data
    if (isSuccess) {
      if (username) {
        loadUser(username, 'no-cache')
      }
    } else {
      message.error('点赞失败,请重试')
    }
  }

  const userConcern = async () => {
    let data = await mutate(
      mutations.UserConcernMutation,
      {
        username: currentUsername,
        token,
        userId: Number(user.id),
        status: isConcerned
      }
    )
    const { userConcern: { isSuccess } = {} } = data
    if (isSuccess) {
      if (currentUsername) {
        loadUser(currentUsername, 'no-cache')
      }
    } else {
      message.error('关注失败,请重试')
    }
  }

  return (
    <section className={Less['personal-center'] + ' personal'}>
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
              {
                isSelf ?
                <Button onClick={handleEditClick} style={{ width: '100%'}} size="small">编辑</Button> :
                isConcerned ?
                <Button onClick={handleConcernClick} style={{ width: '100%'}} size="small">已关注</Button> :
                <Button onClick={handleConcernClick} style={{ width: '100%'}} size="small">关注</Button>
              }
            </Row>
          </Col>
          <Col span={17} offset={1}>
            <Tabs onTabClick={handleTabClick} onChange={handleChangeTab} activeKey={tabKey}>
              <TabPane tab="概述" key="1">
                <Row style={{ lineHeight: '50px'}}>
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
                  dataSource={hotArticles}
                  renderItem={item => {
                    const isLiked = item.likes ? item.likes.some(item => item.user_id == currentUser.id) : false
                    const isCollected = item.collections ? item.collections.some(item => item.user_id == currentUser.id) : false

                    return (
                      <List.Item
                        key={item.id}
                        actions={[
                          <span>发布于{moment(item.release_time, 'x').fromNow()}</span>
  ,                       <IconText onClick={() => handleStarClick(item)} theme={isCollected ? 'filled' : 'outlined'} type="star" text={item.collections.length} />,
                          <IconText onClick={() => handleLikeClick(item)} theme={isLiked ? 'filled' : 'outlined'} type="like" text={item.likes.length} />,
                          <IconText type="message" text={item.comments.length} />
                        ]}
                        extra={currentUsername === username && <a href={'/article/' + item.id}><Button>编辑</Button></a>}
                        className={Less['article-card']}
                      >

                        <List.Item.Meta
                          title={<a className={Less['title']} href={'/article/' + item.id}>{item.title}</a>}
                          description={
                            <div style={{lineHeight: '30px', height: '30px'}}>
                              {
                                categorys.filter(a => item.categorys.some(i => i == a.id)).map(item => (
                                  <Tag key={item.id} color="geekblue">{item.subject}</Tag>
                                ))
                              }
                            </div>
                          }
                        />
                        <p className={Less['abstract']}>{item.abstract}</p>
                      </List.Item>
                    )
                  }}
                />
                }
              </TabPane>
              <TabPane tab="文章" key="2">
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    <Search onChange={handleSearchChange} placeholder="搜索文章..." />
                  </Col>
                  <Col span={5} offset={2}>
                    <Select onChange={handleCategoryChange} style={{ width: '100%'}} value={category}>
                      <Option key={-1} value={-1}>全部</Option>
                      {categorys.map((item, index) => (
                        <Option key={index} value={item.id}>{item.subject}</Option>
                      ))}
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
                  dataSource={filterArticles}
                  renderItem={(item) => {
                    const isLiked = item.likes ? item.likes.some(item => item.user_id == currentUser.id) : false
                    const isCollected = item.collections ? item.collections.some(item => item.user_id == currentUser.id) : false
                    return (
                      <List.Item
                        key={item.id}
                        actions={[
                          <span>发布于{moment(item.release_time, 'x').fromNow()}</span>
  ,                       <IconText onClick={() => handleStarClick(item)} theme={isCollected ? 'filled' : 'outlined'} type="star" text={item.collections.length} />,
                          <IconText onClick={() => handleLikeClick(item)} theme={isLiked ? 'filled' : 'outlined'} type="like" text={item.likes.length} />,
                          <IconText type="message" text={item.comments.length} />
                        ]}
                        extra={currentUsername === username && <a href={'/article/' + item.id}><Button>编辑</Button></a>}
                        className={Less['article-row']}
                      >

                        <List.Item.Meta
                          title={<a className={Less['title']} href={'/article/' + item.id}>{item.title}</a>}
                          description={
                            <div style={{lineHeight: '30px', height: '30px'}}>
                              {
                                categorys.filter(a => item.categorys.some(i => i == a.id)).map(item => (
                                  <Tag key={item.id} color="geekblue">{item.subject}</Tag>
                                ))
                              }
                            </div>
                          }
                        />
                        <p className={Less['abstract']}>{item.abstract}</p>
                      </List.Item>
                    )
                  }}
                />}
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

export default PersonalCenter
