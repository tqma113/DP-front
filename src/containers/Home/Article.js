import React, { useState, useEffect } from 'react'
import { Row, Col, Select, Divider, List, Button, Skeleton, Icon, Input, message, Tag } from 'antd'
import { IconText } from '@components'
import moment from 'moment'

import Less from './index.module.less'
import './index.less'

const Option = Select.Option
const Search = Input.Search

const Article = (props) => {
  const {
    store = {},
    handlers = {},
    isSelf = false,
    username = '',
    query,
    querys = {},
    mutate,
    mutations = {},
  } = props
  const { users = {}, categorys = [], session = {}, articles: allArticles = {} } = store
  const user = users[username] || {}
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [articlesLoading, setArticleLoading] = useState(true)

  const [category, setCategory] = useState(-1)
  const [search, setSearch] = useState('')
  const [filterArticles, setFilterArticles] = useState([])
  const [sortArticles, setSortArticles] = useState([])


  useEffect(() => {
    let articleIds = user.articles.map(i => i.id)
    let saleArticleIds = articleIds.filter(i => allArticles[i] === undefined)
    if (saleArticleIds.length > 0) {
      loadArticle(saleArticleIds)
    } else {
      let articles = articleIds.map(i => allArticles[i])
      articles.sort((a, b) => {
        return b.likes.length + b.collections.length - a.likes.length + a.collections.length
      })
      setSortArticles(articles)
      const filterArticles = category != -1 ?
      articles.filter(i => i.categorys.some(item => item == category))
                        .filter(i => JSON.stringify(i).includes(search)) : articles
      setFilterArticles(filterArticles)
      setArticleLoading(false)
    }
  }, [user.articles, allArticles])

  useEffect(() => {
    let filterArticles = (category != -1 ? sortArticles.filter(i => i.categorys.some(item => item == category)) : sortArticles).filter(i => JSON.stringify(i).includes(search))
    setFilterArticles(filterArticles)
  }, [sortArticles, search, category])


  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
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
      if (username) {
        loadUser(username, 'no-cache')
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

  const loadArticle = async (idList, fetchPolicy) => {
    const data = await query(
      querys.QueryArticles,
      {
        idList: idList.map(i => Number(i))
      },
      {
        fetchPolicy
      }
    )
    let { articles: { isSuccess, articles, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setArticles({ articles })
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }

  const renderItem2 = (item) => {
    const isLiked = item.likes ? item.likes.some(item => item.user_id == currentUser.id) : false
    const isCollected = item.collections ? item.collections.some(item => item.user_id == currentUser.id) : false
    console.log(item.collections)
    return (
      <List.Item
        key={item.id}
        actions={[
          <span>发布于{moment(item.release_time, 'x').fromNow()}</span>
,         <IconText onClick={() => handleStarClick(item)} theme={isCollected ? 'filled' : 'outlined'} type="star" text={item.collections.length} />,
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
  }

  return (
    <React.Fragment>
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
        renderItem={renderItem2}
      />}
    </React.Fragment>
  )
}

export default Article
