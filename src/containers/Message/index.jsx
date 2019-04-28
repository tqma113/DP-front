import React from 'react'
import { Drawer } from 'antd'

import { connect } from '@map'

const Message = (props) => {
  const { store = {}, handlers = {} } = props
  const { messageStatus= false } = store

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
      <Message />
    </Drawer>
  )
}

export default connect(Message)
