import React from 'react'
import { Row, Avatar, Button, Skeleton, message, Icon, Tag } from 'antd'

import Less from './index.module.less'
import './index.less'

const Article = (props) => {
  const {
    store = {},
    isSelf = false,
    handlers = {},
    username = '',
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    onEditClick
  } = props
  const { users = {}, categorys = [], industrys = [], session = {} } = store
  const user = users[username] || {}
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const handleConcernClick = () => {
    if (status) {
      userConcern()
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
    let { users: { isSuccess, users, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setUsers({ users })
    } else {
      const { errors = [] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
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
      if (isConcerned) {
        message.success('取关成功')
      } else {
        message.success('关注成功')
      }
    } else {
      message.error('关注失败,请重试')
    }
  }

  const isConcerned = currentUser && currentUser.concerned ? currentUser.concerned.some(item => Number(item.concerned_user_id) === Number(user.id)) : false

  return user && user.id ?
    <React.Fragment>
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
            <p style={{display: 'inlne-block', margin: '0'}}><Icon type="environment" /> {user.location}</p>
        </Row>}
        {user.statement &&
          <p className={Less['statement']}>{user.statement}</p>
        }
        <Row style={{ paddingBottom: '10px'}}>
          {categorys.filter(item => user.categorys.some(i => Number(i) === Number(item.id))).map(item => (
            <Tag key={item.id} color="geekblue">{item.subject}</Tag>
          ))}
        </Row>
        <Row style={{ paddingBottom: '20px'}}>
          {user.industrys.length > 0 ? industrys.filter(a => user.industrys.some(i => Number(i) === Number(a.id))).map(item => (
              <Tag key={item.id} color="purple">{item.name}</Tag>
            )) : []
          }
        </Row>
        {
          isSelf ?
          <Button onClick={onEditClick} style={{ width: '100%'}} size="small">编辑</Button> :
          isConcerned ?
          <Button onClick={handleConcernClick} style={{ width: '100%'}} size="small">已关注</Button> :
          <Button onClick={handleConcernClick} style={{ width: '100%'}} size="small">关注</Button>
        }
      </Row>
    </React.Fragment> :
    <Skeleton paragraph={{ rows: 8 }} active />
}

export default Article
