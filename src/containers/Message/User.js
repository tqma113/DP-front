import React from 'react'
import { Row, Col, Avatar, Tag, Skeleton } from 'antd'

import Less from './index.module.less'

const User = (props) => {
  const { store = {}, static:{ api } } = props
  const { users = {}, session = {}, categorys = [], industrys = [] } = store
  const { status, info = {} } = session
  const { username : currentUsername } = info
  const currentUser = users[currentUsername] || {}

  return (
    status && currentUser ?
    <React.Fragment>
      <Row type="flex">
        <Col><Avatar size={60} src={api.dev.static + currentUser.avatar} /></Col>
        <Col offset={1}><p className={Less['nickname']}>{currentUser.nickname}</p></Col>
      </Row>
      <Row><p>{currentUser.statement}</p></Row>
      <Row>
        {categorys.filter(item => currentUser.categorys.some(i => Number(i) === Number(item.id))).map(item => (
          <Tag key={item.id} color="geekblue">{item.subject}</Tag>
        ))}
      </Row>
      <Row style={{ marginTop: '10px'}}>
        {industrys.filter(item => currentUser.industrys.some(i => Number(i) === Number(item.id))).map(item => (
          <Tag key={item.id} color="purple">{item.name}</Tag>
        ))}
      </Row>
    </React.Fragment> :
    <Skeleton active />
  )
}

export default User
