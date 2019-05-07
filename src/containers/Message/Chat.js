import React, { useState, useEffect } from 'react'
import { Row, Avatar, List,  Empty, Card, Button, message } from 'antd'
import BraftEditor from 'braft-editor'
import moment from 'moment'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



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

  const [messageState, setMessageState] = useState(BraftEditor.createEditorState(null))
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
    }
  }, [messages, messageUser])

  useEffect(() => {
    if (messageUser && messageUser.id) {
      if (messageUser.id) {
        loadMessages(messageUser.id)
      }
    }
  }, [messageUser])

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
        <div style={{ display: 'flex', flexDirection: item.s_user_id == currentUser.id ? 'row-reverse' : 'row'}}>
          <Avatar src={api.dev.static + item.sendUser.avatar} />
          <div style={{ marginLeft: '5px', width: '300px' }}>
            <p style={{color: '#888', fontSize: '10px', margin: '0'}}>{moment(item.send_time, 'x').fromNow()}</p>
            <div style={{ width: '60%' }} className="braft-output-content" dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </List.Item>
    )
  }

  const controls = ['emoji', 'font-family']

  return (
    <React.Fragment>
      <Element
        style={{
          position: 'relative',
          height: '500px',
          overflow: 'scroll',
          border: '1px solid #e8e8e8',
          padding: '0 10px'
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
      </Element>
      <Row style={{marginTop: '10px'}}>
        <BraftEditor
          onChange={handleMessageChange}
          vlaue={messageState}
          controls={controls}
          contentStyle={{ height: '50px', borderBottom: '1px solid #CCC'}}
        />
      </Row>
      <Row style={{marginTop: '10px'}} type="flex" justify="end">
        <Button onClick={handleMessageSendClick} type="primary">发送</Button>
      </Row>
    </React.Fragment>
  )
}

export default Chat
