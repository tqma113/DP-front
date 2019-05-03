import React from 'react'
import { Card, Row, Col, Icon, Tag, message } from 'antd'
import moment from 'moment'

import map from '@map'

import Less from './index.module.less'

moment.locale('zh-cn')

const ArticleRow = (props) => {
  const { article, store = {}, handlers = {}, mutate, mutations = {}, query, querys = {}, username } = props
  const { categorys = [] } = store
  const { session = {}, users = {} } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername]

  const isLiked = article.likes ? article.likes.some(item => item.user_id == currentUser.id) : false
  const isCollected = article.collections ? article.collections.some(item => item.user_id == currentUser.id) : false

  const handleStarClick = () => {
    if (status) {
      articleStar()
    }
  }

  const handleLikeClick = () => {
    if (status) {
      articleLike()
    }
  }

  const articleStar = async () => {
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

  const articleLike = async () => {
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

  return (
    <Card>
      <Row type="flex" justify="space-between">
        <Col>
          <a className={Less['title']} href={`/article/${article.id}`}>{article.title}</a>
        </Col>
        <Col offset={1}>
          <span className={Less['edit']}>编辑</span>
        </Col>
      </Row>
      <Row className={Less['row']}>{article.abstract}</Row>
      <Row className={Less['categorys']}>
        {categorys.filter(item => article.categorys.some(i => i == item.id)).map(item => (
          <Tag key={item.id} color="geekblue">{item.subject}</Tag>
        ))}
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={12}>
          <Row type="flex" justify="space-between" className={Less['row']}>
            <Col>发布于 {moment(article.release_time, 'x').fromNow()}</Col>
            <Col>最后更新于 {moment(article.last_modify_time, 'x').fromNow()}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row type="flex" style={{ marginTop: '10px'}} justify="end">
            <Col><Icon onClick={handleLikeClick} type="like" theme={isLiked ? 'filled' : 'outlined'} /> {article.likes.length || 0}</Col>
            <Col offset={3}><Icon onClick={handleStarClick} type="star" theme={isCollected ? 'filled' : 'outlined'} /> {article.collections.length || 0}</Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default map(ArticleRow, 'ArticleRow')
