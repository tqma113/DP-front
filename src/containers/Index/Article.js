import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Divider, List, Button, message, Skeleton, Avatar, Tag } from 'antd'
import moment from 'moment'

import { IconText } from '@components'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const Article = (props) => {
  const { handlers = {}, store = {}, mutate, mutations = {}, query, querys = {}, static: { api = {} } } = props
  const { categorys = [], industrys = [], session = {}, articles = {}, users = {} } = store
  const { status, info = {} } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [loading, setLoading] = useState(true)

  const [articleSearch, setArticleSearch] = useState('')
  const [articleLikeType, setArticleLikeType] = useState(1)
  const [articleStarType, setArticleStarType] = useState(1)
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
  }, [articleLikeType, articleCategorys, articleStarType, sortArticles, articleSearch])

  const sortArticle = () => {
    let sortArticles = articles && typeof articles === 'object' ? Object.values(articles) : []
    sortArticles.sort((a, b) => b.likes.length + b.collections.length - a.likes.length + a.collections.length)
    setSortArticles(sortArticles)
  }

  const filterArticle = () => {
    let filterArticles = sortArticles || []
    filterArticles = (articleLikeType != 1 ? filterArticles.filter(item => {
      let isLike = status && currentUser.likes && currentUser.likes.some(i => i.article_id == item.id)
      if (isLike && articleLikeType == 2) {
        return false
      }
      if (!isLike && articleLikeType == 3) {
        return false
      }
      return true
    }) : filterArticles)
    .filter(item => JSON.stringify(item).includes(articleSearch))
    filterArticles = (articleStarType != 1 ? filterArticles.filter(item => {
      let isStar = status && currentUser.collections && currentUser.collections.some(i => i.article_id == item.id)
      if (isStar && articleStarType == 2) {
        return false
      }
      if (!isStar && articleStarType == 3) {
        return false
      }
      return true
    }) : filterArticles)
    .filter(item => JSON.stringify(item).includes(articleSearch))
    if (articleCategorys && articleCategorys.length !== 0) {
      filterArticles = filterArticles.filter(item => item.categorys.some(i => articleCategorys.some(a => a == i)))
    }
    setFilterArticles(filterArticles)
  }

  const handleArticleSearchChange = (e) => {
    setArticleSearch(e.target.value)
  }

  const handleArticleLikeTypeChange = (key) => {
    setArticleLikeType(key)
  }

  const handleArticleStarTypeChange = (key) => {
    setArticleStarType(key)
  }

  const handleArticleCategorysChange = (key) => {
    setArticleCategorys(key)
  }

  const handleStarClick = (articleId, isStared) => {
    if (status) {
      articleStar(articleId, isStared)
    }
  }

  const handleLikeClick = (articleId, isLiked) => {
    if (status) {
      articleLike(articleId, isLiked)
    }
  }

  const articleStar = async (articleId, isCollected) => {

    let data = await mutate(
      mutations.ArticleStarMutation,
      {
        username: currentUsername,
        token,
        articleId: Number(articleId),
        status: isCollected
      }
    )
    const { articleStar: { isSuccess } = {} } = data
    if (isSuccess) {
      if (currentUsername) {
        loadUser(currentUsername, 'no-cache')
        loadArticle(articleId, 'no-cache')
      }
      if (isCollected) {
        message.success('取关成功')
      } else {
        message.success('关注成功')
      }
    }
  }

  const articleLike = async (articleId, isLiked) => {

    let data = await mutate(
      mutations.ArticleLikeMutation,
      {
        username: currentUsername,
        token,
        articleId: Number(articleId),
        status: isLiked
      }
    )
    const { articleLike: { isSuccess } = {} } = data
    if (isSuccess) {
      if (currentUsername) {
        loadUser(currentUsername, 'no-cache')
        loadArticle(articleId, 'no-cache')
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
      const { errors = [{}] } = extension
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

  const loadAllArticle = async () => {
    const data = await query(
      querys.QueryArticles,
      {},
      {
        fetchPolicy: 'no-cache'
      }
    )
    let { articles: { isSuccess, articles, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setArticles({ articles })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  const articleRenderItem = item => {
    const isLiked = item.likes ? item.likes.some(item => item.user_id == currentUser.id) : false
    const isCollected = item.collections ? item.collections.some(item => item.user_id == currentUser.id) : false
    return (
      <List.Item
        key={item.id}
        actions={[
          <span>发布于{moment(item.release_time, 'x').fromNow()}</span>
,         <IconText onClick={() => handleStarClick(item.id, isCollected)} theme={isCollected ? 'filled' : 'outlined'} type="star" text={item.collections.length} />,
          <IconText onClick={() => handleLikeClick(item.id, isLiked)} theme={isLiked ? 'filled' : 'outlined'} type="like" text={item.likes.length} />,
          <IconText type="message" text={item.comments.length} />
        ]}
        extra={currentUsername === item.user.username && <a href={'/article/' + item.id}><Button>编辑</Button></a>}
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
  }

  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={7}>
          <Search value={articleSearch} className={Less['search']} onChange={handleArticleSearchChange} placeholder="搜索用户" />
        </Col>
        <Col span={5}>
          <Select allowClear style={{ width: '100%'}} mode="multiple" value={articleCategorys} onChange={handleArticleCategorysChange} placeholder="选择类别">
            {categorys.map(item => (
              <Option key={Number(item.id)} value={item.id}>{item.subject}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          {status &&
            <Select onChange={handleArticleLikeTypeChange} value={articleLikeType} style={{ width: '100%'}}>
              <Option key={1} value={1}>全部</Option>
              <Option key={2} value={2}>未点赞</Option>
              <Option key={3} value={3}>已点赞</Option>
            </Select>
          }
        </Col>
        <Col span={4}>
          {status &&
            <Select onChange={handleArticleStarTypeChange} value={articleStarType} style={{ width: '100%'}}>
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
          dataSource={filterArticles}
          renderItem={articleRenderItem}
          footer={<div>共筛选出 <b>{filterArticles.length}</b> 篇文章</div>}
        />
      }
    </div>
  )
}

export default Article
