import React, { useState } from 'react'
import { Modal, Spin, Form, Input, message, Avatar, List } from 'antd'

const Search = Input.Search

const formItemLayout = {
  wrapperCol: { span: 16, offset: 4 },
}


const ApplyModal = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    visible,
    application,
    form = {},
    onClose
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, categoryApplications = [] } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}
  const { getFieldDecorator, validateFields } = form

  const [loading, setLoading] = useState(false)
  const [searchUsers, setSearchUsers] = useState([])

  const handleSearchClick = (value) => {
    let userArr = Object.values(users)
    let searchUsers = userArr.filter((item) => {
      return item.id == value || item.username == value || item.nickname == value || item.email == value
    })
    setSearchUsers(searchUsers)
  }

  const loadApplications = async (fetchPolicy) => {
    const data = await query(
      querys.QueryAdminApply,
      {},
      {
        fetchPolicy
      }
    )
    let { adminApply: { isSuccess, applications, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setAdminApplications({ adminApplications: applications })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }

  const handleSetClick = (id) => {
    applyAdmin(id)
  }

  const applyAdmin = async (id) => {
    setLoading(true)

    const data = await mutate(
      mutations.AddAdminMutation,
      {
        id: Number(id)
      }
    )
    const { addAdmin: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications()
      message.success('更新成功')
      onClose()
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  const renderItem = (item) => {
    return (
      <List.Item key={item.id} actions={[item.user_type == 1 ? <span>已经是管理员</span> : <a onClick={() => handleSetClick(item.id)}>设置为管理员</a>]}>
        <List.Item.Meta
          avatar={
            <Avatar src={api.static + item.avatar} />
          }
          title={<a>{item.nickname}</a>}
          description={item.statement}
        />
        <span>
          {item.email}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {item.username}
        </span>
      </List.Item>
    )
  }

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      title="申请添加"
      width={800}
    >
      <Spin
        spinning={loading}
      >
        <Form {...formItemLayout}>
          <Form.Item>
            {getFieldDecorator('search', {
              rules: [{
                required: true,
                message: '请输入搜索内容'
              }]
            })(
              <Search placeholder="搜索用户" onSearch={handleSearchClick} />
            )}
          </Form.Item>
        </Form>
        <List
          dataSource={searchUsers}
          renderItem={renderItem}
        />
      </Spin>
    </Modal>
  )
}

export default Form.create()(ApplyModal)
