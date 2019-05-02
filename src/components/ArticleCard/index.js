import React from 'react'
import { Card, Row, Col, Icon } from 'antd'

import Less from './index.module.less'

const ArticleCard = (props) => {
  const { article, store = {} } = props
  const { categorys = [] } = store

  return (
    <Card>
      <Row type="flex" className={Less['title']}>
        <Col>
          <a href={`/article/${article.id}`}>{article.title}</a>
        </Col>
        <Col offset={1}>

        </Col>
      </Row>
      <Row className={Less['row']}>{article.abstract}</Row>
      <Row type="flex" className={Less['row']}>
        <Col>发布于 {article.release_at}</Col>
        <Col offset={1}><Icon type="like" /> {article.likes || 0}</Col>
        <Col offset={1}><Icon type="star" /> {article.collections || 0}</Col>
      </Row>
    </Card>
  )
}

export default ArticleCard
