import React, { useState, useEffect } from 'react'
import { Row, Avatar, List,  Empty, Card, Button, message } from 'antd'
import BraftEditor from 'braft-editor'
import moment from 'moment'
import { Element,  scroller } from 'react-scroll'

import Less from './index.module.less'
import 'braft-editor/dist/output.css'

const Chat = (props) => {
  const { store = {}, handlers = {}, static:{ api }, mutate, mutations, query, querys, messageUsername = '' } = props
  const { users = {}, session = {}, messages = {} } = store
  const { info = {} } = session
  const { username : currentUsername } = info
  const currentUser = users[currentUsername] || {}

  const [messageLoadStatus, setMessageLoadStatus] = useState(true)
  const [messageUser, setMessageUser] = useState()

  const [messageState, setMessageState] = useState(BraftEditor.createEditorState(''))
  const [currentMessages, setCurrentMessages] = useState([])

  useEffect(() => {
    if (messageUsername) {
      if (users[messageUsername]) {
        setMessageUser(users[messageUsername])
      } else {
        loadUser([messageUsername])
      }
    }
  }, [messageUsername, users])

  useEffect(() => {
    if (messages && messageUser && messageUser.username) {
      let currentMessages = messages[messageUser.username]
      setCurrentMessages(currentMessages)
      scrollToBottom()
    }
  }, [messages, messageUser])

  useEffect(() => {
    if (messageUser && messageUser.id) {
      if (messageUser.id) {
        loadMessages(messageUser.id)
      }
    }
  }, [messageUser])

  useEffect(() => {
    scrollToBottom()
  }, [messageLoadStatus, currentMessages])

  const handleMessageChange = (value) => {
    setMessageState(value)
  }

  const handleMessageSendClick = () => {
    let messageRAW = messageState.toRAW()
    if (messageUser && messageRAW.length > 0) {
      sendMessage(messageUser.id, messageRAW)
    }
  }

  const loadMessages = async (userId) => {
    const data = await query(
      querys.QueryMessages,
      {
        userId: Number(userId)
      }
    )
    let { messages } = data
    setMessagesRes(messages)
  }

  const loadUser = async (usernames, fetchPolicy) => {
    const data = await query(
      querys.QueryUsers,
      {
        usernames: usernames
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

  const scrollToBottom = () => {
    scroller.scrollTo('bottomInsideContainer', {
      containerId: 'message-box',
      duration: '1000',
      smooth: 'easeInOutQuart',
    })
  }

  const sendMessage = async (userId, content) => {

    let data = await mutate(
      mutations.SendMessageMutation,
      {
        userId: Number(userId),
        message: content
      }
    )
    const { sendMessage: { isSuccess } = {} } = data
    if (!isSuccess) {
      message.error('信息发送失败')
    } else {
      let message = {
        content: messageState.toRAW(),
        send_time: (new Date()).getTime(),
        s_user_id: currentUser.id,
        a_user_id: messageUser.id,
        sendUser: currentUser,
        acceptUser: messageUser
      }
      handlers.pushMessage({ message, username: messageUser.username })
      setMessageState(BraftEditor.createEditorState(''))
    }
  }

  const setMessagesRes = (res = {}) => {
    const { messages, isSuccess, extension = {} } = res
    if (isSuccess) {
      handlers.setMessages({ messages, username: messageUser.username })
      setMessageLoadStatus(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  const messageRenderItem = item => {
    let editroState = BraftEditor.createEditorState(JSON.parse(item.content))
    let html = editroState.toHTML()
    return (
      <List.Item key={item.id}>
        <div style={{ display: 'flex', flexDirection: Number(item.s_user_id) === Number(currentUser.id) ? 'row-reverse' : 'row'}}>
          <Avatar src={api.dev.static + item.sendUser.avatar} />
          <div style={{ marginLeft: '5px', width: '300px', textAlign: Number(item.s_user_id) === Number(currentUser.id) ? 'right' : 'left' }}>
            <div style={{ width: '100%', boxShadow: '0 2px 8px #ccc', borderRadius: '5px', padding: '10px' }} className="braft-output-content" dangerouslySetInnerHTML={{ __html: html }}></div>
            <p style={{color: '#ccc', fontSize: '8px', margin: '0'}}>{moment(item.send_time, 'x').fromNow()}</p>
          </div>
        </div>
      </List.Item>
    )
  }

  const controls = ['emoji', 'font-family']

  return (
    <div>
      <Element
        id="message-box"
        style={{
          position: 'relative',
          height: '450px',
          overflow: 'scroll',
          padding: '0 10px',
          boxShadow: '0 0 1px 1px #eee inset'
        }}
      >
        {messageUser ?
            <List
              bordered={false}
              split={false}
              loading={messageLoadStatus}
              itemLayout="vertical"
              dataSource={currentMessages}
              renderItem={messageRenderItem}
              header={<div style={{textAlign: 'center'}}>无其他聊天记录</div>}
            />
          :
          <Empty description="您还未选择用户,请先选择用户" style={{ height: '400px'}} />
        }
        <Element name="bottomInsideContainer"></Element>
      </Element>
      <Row style={{marginTop: '10px'}}>
        <BraftEditor
          onChange={handleMessageChange}
          value={messageState}
          controls={controls}
          contentStyle={{ height: '50px', borderBottom: '1px solid #CCC'}}
        />
      </Row>
      <Row style={{marginTop: '10px'}} type="flex" justify="end">
        <Button onClick={handleMessageSendClick} type="primary">发送</Button>
      </Row>
    </div>
  )
}

export default Chat
