import React from 'react'
import { Drawer, Row, Col, Avatar } from 'antd'

import map from '@map'

const Message = (props) => {
  const { store = {}, handlers = {}, static:{ api } } = props
  const { messageStatus= false, users = {}, session = {} } = store
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
    <Row>
      <Col><Avatar src={api.dev.static + currentUser.avatar} /></Col>
    </Row>
    </Drawer>
  )
}

export default map(Message, 'Message')
