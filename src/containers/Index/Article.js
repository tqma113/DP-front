import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Divider, List, Button, message, Skeleton, Avatar, Tag } from 'antd'
import { IconText } from '@components'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const Article = (props) => {
  const { handlers = {}, store = {}, mutate, mutations = {}, query, querys = {}, static: { api = {} } } = props
  const { categorys = [], industrys = [], session = {}, users = {}, articles = {} } = store
  const { status, info = {} } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername]

  const [loading, setLoading] = useState(true)

  const [articleSearch, setArticleSearch] = useState('')
  const [articleType, setArticleType] = useState(1)
  const [articleCategorys, setArticleCategorys] = useState([])
  const [sortArticles, setSortArticles] = useState([])
  const [filterArticles, setFilterArticles] = useState([])

  useEffect(() => {
    loadAllArticle()
  }, [])

  useEffect(() => {
    sortArticle()
  }, [articles])

  useEffect(() => {
    filterArticle()
  }, [articleType, articleCategorys, sortUsers, userSearch])

  const loadAllArticle = async () => {
    const data = await query(
      querys.QueryArticles,
      {
        fetchPolicy: 'no-cache'
      }
    )
    let { articles: { isSuccess, articles, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setArticles({ articles })
      setLoading(false)
    } else {
      const { errors = [] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  const sortArticle = () => {
    let sortUsers = users && typeof users === 'object' ? Object.values(users) : []
    sortUsers.sort((a, b) => b.concern.length - a.concern.length)
    setSortUsers(sortUsers)
  }

  const filterUser = () => {
    let filterUsers = sortUsers || []
    filterUsers = (userType != 1 ? filterUsers.filter(item => {
      let isConcerned = status && currentUser.categorys && currentUser.categorys.some(i => i == item.id)
      if (isConcerned && userType == 2) {
        return false
      }
      if (!isConcerned && userType == 3) {
        return false
      }
      return true
    }) : filterUsers)
    .filter(item => JSON.stringify(item).includes(userSearch))
    if (userCategorys && userCategorys.length !== 0) {
      filterUsers = filterUsers.filter(item => item.categorys.some(i => userCategorys.some(a => a == i)))
    }
    if (userIndustrys && userIndustrys.length !== 0) {
      filterUsers = filterUsers.filter(item => item.industrys.some(i => userIndustrys.some(a => a == i)))
    }
    setFilterUsers(filterUsers)
  }

  const handleUserSearchChange = (e) => {
    setUserSearch(e.target.value)
  }

  const handleUserTypeChange = (key) => {
    setUserType(key)
  }

  const handleUserCategorysChange = (key) => {
    setUserCategorys(key)
  }

  const handleUserIndustrysChange = (key) => {
    setUserIndustrys(key)
  }

  const handleUserConcernClick = (userId, userStatus) => {
    if (status) {
      userConcern(userId, userStatus)
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
      if (isSuccess) {
        if (currentUsername) {
          loadUser(currentUsername, 'no-cache')
          loadArticle(article.id, 'no-cache')
        }
      if (isCollected) {
        message.success('取关成功')
      } else {
        message.success('关注成功')
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
      if (currentUsername) {
        loadUser(currentUsername, 'no-cache')
        loadArticle(article.id, 'no-cache')
      }
      if (isLiked) {
        message.success('取赞成功')
      } else {
        message.success('点赞成功')
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
    let { users: { isSuccess, users, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setUsers({ users })
    } else {
      const { errors = [] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  const loadArticle = async (id, fetchPolicy) => {
    const data = await query(
      querys.QueryArticles,
      {
        idList: [Number(id)]
      },
      {
        fetchPolicy
      }
    )
    let { articles: { isSuccess, articles, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setArticles({ articles })
    } else {
      const { errors = [] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  const userRenderItem = item => {
    const isConcerned = currentUser.concerned ? currentUser.concerned.some(i => i.concerned_user_id == item.id) : false
    return (
      <List.Item
        key={item.id}
        extra={
          <div style={{ width: '200px', height: '100px' }}>
            {status &&
              (isConcerned ?
                <Button onClick={() => handleUserConcernClick(item.id, isConcerned)} style={{ float: 'right'}}>已关注</Button> :
                <Button onClick={() => handleUserConcernClick(item.id, isConcerned)} style={{ float: 'right'}}>关注</Button>
              )
            }
          </div>
        }
        actions={[<IconText type="user" text={item.concerned.length} />]}
      >
        <List.Item.Meta
          className={Less['user-item']}
          avatar={<Avatar size={50} src={api.dev.static + item.avatar} />}
          title={<a>{item.nickname}</a>}
          description={<span>{item.statement}</span>}
        />
        <Row>
          {item.categorys && item.categorys.length > 0 ? categorys.filter(a => item.categorys.some(i => i == a.id)).map(item => (
              <Tag key={item.id} color="geekblue">{item.subject}</Tag>
            )) : []
          }
        </Row>
        <Row style={{marginTop: '10px'}}>
          {item.industrys.length > 0 ? industrys.filter(a => item.industrys.some(i => i == a.id)).map(item => (
              <Tag key={item.id} color="purple">{item.name}</Tag>
            )) : []
          }
        </Row>
      </List.Item>
    )
  }

  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={7}>
          <Search value={userSearch} className={Less['search']} onChange={handleUserSearchChange} placeholder="搜索用户" />
        </Col>
        <Col span={5}>
          <Select allowClear style={{ width: '100%'}} mode="multiple" value={userCategorys} onChange={handleUserCategorysChange} placeholder="选择类别">
            {categorys.map(item => (
              <Option key={Number(item.id)} value={item.id}>{item.subject}</Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <Select allowClear style={{ width: '100%'}} mode="multiple" value={userIndustrys} onChange={handleUserIndustrysChange} placeholder="选择行业">
            {industrys.map(item => (
              <Option key={Number(item.id)} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          {status &&
            <Select onChange={handleUserTypeChange} value={userType} style={{ width: '100%'}}>
              <Option key={1} value={1}>全部</Option>
              <Option key={2} value={2}>未关注</Option>
              <Option key={3} value={3}>已关注</Option>
            </Select>
          }
        </Col>
      </Row>
      <Divider />
      {loading ?
        <List
          dataSource={[1,2,3,4,5,6]}
          renderItem={() =>
            <List.Item>
              <Skeleton active />
            </List.Item>
          }
        /> :
        <List
          itemLayout="vertical"
          dataSource={filterUsers}
          renderItem={userRenderItem}
          footer={<div>共筛选出 <b>{filterUsers.length}</b> 位用户</div>}
        />
      }
    </div>
  )
}

export default Article
