import React, { useState, useEffect } from 'react'
import { Row, Col, List, Skeleton, Tag, message, Spin } from 'antd'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import moment from 'moment'

import Less from './index.module.less'
import './index.less'


const grid = {
  gutter: 48, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2,
}

const Overview = (props) => {
  const {
    store = {},
    username = '',
    query,
    querys = {},
    handlers = {}
  } = props
  const { users = {}, categorys = [], articles: allArticles = {} } = store
  const user = users[username] || {}

  const [hotArticles, setHotArticles] = useState(user.articles || [])

  const [overLoading, setOverviewLoading] = useState(true)
  const [likeCount, setLikeCount] = useState(0)
  const [starCount, setStarCount] = useState(0)


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
      const hotArticles = articles.slice(0, 6)
      setHotArticles(hotArticles)
      setLikeCount(articles.reduce((accumulator, currentValue) => accumulator + currentValue.likes.length, 0))
      setStarCount(articles.reduce((accumulator, currentValue) => accumulator + currentValue.collections.length, 0))
      setOverviewLoading(false)
    }
  }, [user.articles, allArticles])

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

  const renderItem1 = item => {
    // const isLiked = item.likes ? item.likes.some(item => item.user_id == currentUser.id) : false
    // const isCollected = item.collections ? item.collections.some(item => item.user_id == currentUser.id) : false

    return (
      <List.Item
        key={item.id}
        actions={[
          <span>发布于{moment(item.release_time, 'x').fromNow()}</span>
// ,         <IconText onClick={() => handleStarClick(item)} theme={isCollected ? 'filled' : 'outlined'} type="star" text={item.collections.length} />,
          // <IconText onClick={() => handleLikeClick(item)} theme={isLiked ? 'filled' : 'outlined'} type="like" text={item.likes.length} />,
          // <IconText type="message" text={item.comments.length} />
        ]}
        // extra={currentUsername === username && <a className={Less['edit-button']} href={'/article/' + item.id}><Button>编辑</Button></a>}
        className={Less['article-card']}
      >

        <List.Item.Meta
          title={<a className={Less['title']} href={'/article/' + item.id}>{item.title}</a>}
          description={
            <div style={{lineHeight: '20px', height: '20px'}}>
              {
                categorys.filter(a => item.categorys.some(i => Number(i) === Number(a.id))).map(item => (
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


  const cols = {
    sales: {
      tickInterval: 1
    }
  };

  const data = [{
    type: '文章',
    count: user && user.articles ? user.articles.length : 0
  }, {
    type: '类别',
    count: user && user.categorys ? user.categorys.length : 0
  },{
    type: '行业',
    count: user && user.industrys ? user.industrys.length : 0
  }, {
    type: '收藏',
    count: user && user.collections ? user.collections.length : 0
  }, {
    type: '关注',
    count: user && user.concerned ? user.concerned.length : 0
  }, {
    type: '点赞',
    count: user && user.likes ? user.likes.length : 0
  }, {
    type: '文章获赞',
    count: likeCount
  }, {
    type: '文章获收藏',
    count: starCount
  }, {
    type: '被关注',
    count: user && user.concern ? user.concern.length : 0
  }]

  return (
    <React.Fragment>
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
        renderItem={renderItem1}
      />
      }
      <Row style={{ lineHeight: '50px'}}>
        <Col className={Less['title-1']}>动态数据</Col>
      </Row>
      <Spin spinning={overLoading}>
        <Chart padding={[20, 0, 50, 20]} height={400} data={data} scale={cols} forceFit>
          <Axis name="type" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="type*count" />
        </Chart>
      </Spin>
    </React.Fragment>
  )
}

export default Overview
