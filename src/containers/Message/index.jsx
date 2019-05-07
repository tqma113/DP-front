import React, { useState, useEffect } from 'react'
import { Drawer, Row, Avatar, Tabs, Icon, message, notification } from 'antd'
import BraftEditor from 'braft-editor'
import { Subscription } from 'react-apollo'

import { NewMessageSubScription } from '@graphql/subscriptions'

import map from '@map'

import User from './User'
import ComcernList from './ConcernList'
import Chat from './Chat'

import Less from './index.module.less'
import 'braft-editor/dist/output.css'

const TabPane = Tabs.TabPane

const Message = (props) => {
  const { store = {}, handlers = {}, static:{ api } } = props
  const { messageStatus= false, users = {}, session = {} } = store
  const { info = {} } = session
  const { username : currentUsername, status } = info
  const currentUser = users[currentUsername] || {}
  const [tabKey, setTabKey] = useState('1')

  const [messageUsername, setMessageUsername] = useState('')

  const handleCloseMessage = () => {
    handlers.closeMessage()
  }

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  const handleUserClick = (username) => {
    setMessageUsername(username)
    setTabKey('3')
  }

  const acceptNewMessage = (newMessage) => {
    const { sendUser = {}, content } = newMessage
    let contentState = BraftEditor.createEditorState(JSON.parse(content))
    let html = contentState.toHTML()
    if (messageStatus == 0) {
      notification.open({
        message: <Row><Avatar src={api.dev.static + sendUser.avatar} />{sendUser.nickname}</Row>,
        description: <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: html }}></div>,
        icon: <Icon type="message" />,
        onClick: () => {
          handlers.openMessage()
          handleUserClick(sendUser.username)
        },
      });
    }
  }

  return (
    <Drawer
      width={450}
      title="Now - 私信"
      mask={false}
      visible={messageStatus === 1}
      onClose={handleCloseMessage}
    >
      <User {...props} onNotionClick={handleUserClick} />
      <Tabs className={Less['body']} onTabClick={handleTabClick} activeKey={tabKey}>
        <TabPane tab="用户" key="1">
          <ComcernList {...props} onUserClick={handleUserClick} />
        </TabPane>
        {/* <TabPane tab="会话" key="2"></TabPane> */}
        <TabPane tab="聊天" key="3">
          <Chat {...props} messageUsername={messageUsername} />
        </TabPane>
      </Tabs>
      {status && currentUser &&
        <Subscription
          subscription={NewMessageSubScription}
        >
          {({ data: { newMessage } = {}, loading = true, error }) => {
            if (loading) return null
            if (error) {
              message.error(error)
              return null
            }

            acceptNewMessage(newMessage)
            return null
          }}
        </Subscription>
      }
    </Drawer>
  )
}

export default map(Message, 'Message')
