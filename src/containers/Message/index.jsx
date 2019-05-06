import React, { useState, useEffect } from 'react'
import { Drawer, Row, Col, Avatar, Tag, Tabs, List, Icon, Empty, Card, Spin, Button, Skeleton, message, notification } from 'antd'
import BraftEditor from 'braft-editor'
import { Subscription } from 'react-apollo'
import moment from 'moment'

import { NewMessageSubScription } from '@graphql/subscriptions'
import map from '@map'

import Less from './index.module.less'
import 'braft-editor/dist/output.css'

const TabPane = Tabs.TabPane

const Message = (props) => {
  const { store = {}, handlers = {}, static:{ api }, mutate, mutations, query, querys } = props
  const { messageStatus= false, users = {}, session = {}, categorys = [], industrys = [], messages = {} } = store
  const { status, info = {} } = session
  const { username : currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [messageLoadStatus, setMessageLoadStatus] = useState(true)
  const [messageUser, setMessageUser] = useState()
  const [tabKey, setTabKey] = useState('1')

  const [messageState, setMessageState] = useState(BraftEditor.createEditorState(null))
  const [currentMessages, setCurrentMessages] = useState([])

  useEffect(() => {
    if (messageUser && messageUser.id) {
      loadMessages()
    }
  }, [messageUser])

  useEffect(() => {
    if (messages && messageUser && messageUser.username) {
      let currentMessages = messages[messageUser.username]
      setCurrentMessages(currentMessages)
    }
  }, [messages, messageUser])

  const handleCloseMessage = () => {
    handlers.closeMessage()
  }

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  const handleUserClick = async (username) => {
    let mUser = currentUser.concerned.filter(item => item.user.username == username)[0].user
    setMessageUser(mUser)
    setTabKey('3')
  }

  const handleMessageChange = (value) => {
    setMessageState(value)
  }

  const handleMessageSendClick = () => {
    let messageRAW = messageState.toRAW()
    if (messageUser && messageRAW.length > 0) {
      sendMessage(messageUser.id, messageRAW)
    }
  }

  const loadMessages = async () => {
    const data = await query(
      querys.QueryMessages,
      {
        userId: Number(messageUser.id)
      }
    )
    let { messages } = data
    setMessagesRes(messages)
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

  const renderItem = item => (
    <List.Item
      key={item.user_id}
    >
      <List.Item.Meta
        avatar={<Avatar onDoubleClick={() => handleUserClick(item.user.username)} size={40} src={item.user && api.dev.static + item.user.avatar} />}
        title={<a href={'/' + item.user.username}>{item.user && item.user.nickname}</a>}
        description={item.user && item.user.statement}
      />
      <Row>
        {item.user && item.user.categorys && item.user.categorys.length > 0 ?
          categorys.filter(a => item.user.categorys.some(i => i == a.id)).map(item => (
            <Tag key={item.id} color="geekblue">{item.subject}</Tag>
          ))
          .concat(
            item.user && item.user.industrys.length > 0 ? industrys.filter(a => item.user.industrys.some(i => i == a.id)).map(item => (
              <Tag key={item.id} color="purple">{item.name}</Tag>
            )) : []
          ) : []
        }
      </Row>
    </List.Item>
  )

  const messageRenderItem = item => {
    let editroState = BraftEditor.createEditorState(JSON.parse(item.content))
    let html = editroState.toHTML()
    return (
      <List.Item key={item.id}>
        <div style={{ display: 'flex', flexDirection: item.s_user_id == currentUser.id ? 'row-reverse' : 'row'}}>
          <Avatar src={api.dev.static + item.sendUser.avatar} />
          <div style={{ marginLeft: '5px'}}>
            <span style={{color: '#888', fontSize: '12px'}}>{moment(item.send_time, 'x').fromNow()}</span>
            <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </List.Item>
    )
  }

  const controls = ['emoji', 'font-family']

  return (
    <Drawer
      width={450}
      title="Now - 私信"
      mask={false}
      visible={messageStatus === 1}
      onClose={handleCloseMessage}
    >
    {status && currentUser ?
    <React.Fragment>
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
      <Row style={{ marginTop: '10px'}}>
        {industrys.filter(item => currentUser.industrys.some(i => i == item.id)).map(item => (
          <Tag key={item.id} color="purple">{item.name}</Tag>
        ))}
      </Row>

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
    </React.Fragment> :
    <Skeleton active />
    }
    <Tabs className={Less['body']} onTabClick={handleTabClick} activeKey={tabKey}>
      <TabPane tab="用户" key="1">
        <List
          itemLayout="vertical"
          footer={<div>您关注了<b> {currentUser && currentUser.concerned && currentUser.concerned.length} </b>位用户</div>}
          dataSource={currentUser.concerned}
          renderItem={renderItem}
        />
      </TabPane>
      {/* <TabPane tab="会话" key="2"></TabPane> */}
      <TabPane tab="聊天" key="3">
        {messageUser ?
          <Card
            bordered={false}
            headStyle={{padding: '0', height: '50px'}}
            bodyStyle={{boxShadow: 'inset 0px 0px 3px #ccc', borderRadius: '5px', height: '350px', overflow: 'scroll'}}
            className={Less['chat']}
            title={messageUser.nickname}
          >
            <List
              bordered={false}
              loading={messageLoadStatus}
              itemLayout="vertical"
              dataSource={currentMessages}
              renderItem={messageRenderItem}
              header={<div style={{textAlign: 'center'}}>无其他聊天记录</div>}
              footer={<div style={{textAlign: 'center'}}>已经是最新的聊天记录</div>}
            />
          </Card> :
          <Empty description="您还未选择用户,请先选择用户" style={{ height: '400px'}} />
        }
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
      </TabPane>
    </Tabs>
    </Drawer>
  )
}

export default map(Message, 'Message')
