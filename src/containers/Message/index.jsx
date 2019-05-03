import React from 'react'
import { Drawer, Row, Col, Avatar, Tag } from 'antd'

import map from '@map'

import Less from './index.module.less'

const Message = (props) => {
  const { store = {}, handlers = {}, static:{ api } } = props
  const { messageStatus= false, users = {}, session = {}, categorys = [] } = store
  const { status, info = {} } = session
  const { username : currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const handleCloseMessage = () => {
    handlers.closeMessage()
  }

  return (
    <Drawer
      width={350}
      title="Now - 私信"
      mask={false}
      visible={messageStatus === 1}
      onClose={handleCloseMessage}
    >
    <Row type="flex">
      <Col><Avatar size={60} src={api.dev.static + currentUser.avatar} /></Col>
      <Col offset={1}><p className={Less['nickname']}>{currentUser.nickname}</p></Col>
    </Row>
    <Row><p>{currentUser.statement}</p></Row>
    <Row>
      {categorys.filter(item => currentUser.categorys.some(i => i == item.id)).map(item => (
        <Tag key={item.id} color="geekblue">{item.subject}</Tag>
      ))}
    </Row>
    </Drawer>
  )
}

export default map(Message, 'Message')
