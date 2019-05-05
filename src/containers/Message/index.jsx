import React, { useState, useEffect } from 'react'
import { Drawer, Row, Col, Avatar, Tag, Tabs, List, Icon, Empty, Card, Input, Button, Skeleton, message } from 'antd'
import BraftEditor from 'braft-editor'

import map from '@map'

import Less from './index.module.less'

const TabPane = Tabs.TabPane

const Message = (props) => {
  const { store = {}, handlers = {}, static:{ api }, mutate, mutations } = props
  const { messageStatus= false, users = {}, session = {}, categorys = [], industrys = [] } = store
  const { status, info = {} } = session
  const { username : currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [messageUser, setMessageUser] = useState()
  const [tabKey, setTabKey] = useState('1')

  const [messageState, setMessageState] = useState(BraftEditor.createEditorState(null))

  const handleCloseMessage = () => {
    handlers.closeMessage()
  }

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  const handleUserClick = (user) => {
    setMessageUser(user)
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

  const sendMessage = async (userId, content) => {

    let data = await mutate(
      mutations.SendMessageMutation,
      {
        username: currentUsername,
        token,
        userId: Number(userId),
        message: content
      }
    )
    const { sendMessage: { isSuccess } = {} } = data
    if (!isSuccess) {
      message.error('信息发送失败')
    }
  }

  const renderItem = item => (
    <List.Item
      key={item.user_id}
    >
      <List.Item.Meta
        avatar={<Avatar onDoubleClick={() => handleUserClick(item.user)} size={40} src={item.user && api.dev.static + item.user.avatar} />}
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

  const controls = ['emoji', 'font-family']

  console.log(status, currentUser)

  return (
    <Drawer
      width={350}
      title="Now - 私信"
      mask={false}
      visible={messageStatus === 1}
      onClose={handleCloseMessage}
    >
    {status && currentUser ? <div className={Less['head']}>
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
    </div> : <Skeleton active />}
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
            headStyle={{padding: '0'}}
            bodyStyle={{boxShadow: 'inset 0px 0px 3px #ccc', borderRadius: '5px', height: '350px', overflow: 'scroll'}}
            className={Less['chat']}
            title={messageUser.nickname}
          >
            <List />
          </Card> :
          <Empty description="您还未选择用户,请先选择用户" />
        }
        <Row style={{marginTop: '10px'}}>
          <BraftEditor
            onChange={handleMessageChange}
            vlaue={message}
            controls={controls}
            contentStyle={{ height: '60px', borderBottom: '1px solid #CCC'}}
          />
        </Row>
        <Row style={{marginTop: '10px'}} type="flex" justify="space-between">
          <Button onClick={handleMessageSendClick} type="primary">发送</Button>
        </Row>
      </TabPane>
    </Tabs>
    </Drawer>
  )
}

export default map(Message, 'Message')
