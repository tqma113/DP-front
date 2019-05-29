import React, { useEffect, useState } from 'react'
import { Spin, message, Table, Row, Col, Input, Select, Button, Divider, Tag } from 'antd'
import moment from 'moment'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const types =[{
  value: 1,
  title: '普通用户'
}, {
  value: 2,
  title: '管理员'
}, {
  value:3,
  title: '全部'
}]

const getTag = (status) => {
  switch(status) {
    case 0: {
      return <Tag color="blue">普通用户</Tag>
    }
    case 1: {
      return <Tag color="green">管理员</Tag>
    }
    default: {
      return ''
    }
  }
}

const getUserStatus = (status) => {
  switch(status) {
    case 1: {
      return <Tag color="blue">正常</Tag>
    }
    case 2: {
      return <Tag color="gold">被举报</Tag>
    }
    case 3: {
      return <Tag color="red">封禁</Tag>
    }
    default: {
      return ''
    }
  }
}

const User = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    loading,
    loadAll
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, industryApplications = [] } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [userList, setUserList] = useState(null)
  const [search, setSearch] = useState()
  const [type, setType] = useState(3)

  useEffect(() => {
    let userList = Object.values(users)
    setUserList(userList)
  }, [])

  const dealApplyAdmin =  async (id, status) => {
    const data = await mutate(
      mutations.DealApplyIndustryMutation,
      {
        id: Number(id),
        status
      }
    )
    const { dealApplyAddIndustry: { isSuccess } = {} } = data

    if (isSuccess) {
      loadAll('no-cache')
      message.success('更新成功')
    } else {
      message.info('更新失败请重试')
    }
  }

  const userRender = (item, record) => {
    const handleClick = () => {
      handlers.go('/' + record.username)
    }
    return <button onClick={handleClick} className="link-button">{item}</button>
  }
  const imageRender = (item, record) => {
    return <img style={{ width: '100px', height: '100px' }} src={api.static + item} />
  }
  const timeRender = (item, record) => {
    return item ? moment(item).fromNow() : ''
  }
  const statusRender = (item) => {
    return getUserStatus(item)
  }
  const typeRender = (item) => {
    return getTag(item)
  }
  const operatorRender = (item, record) => {
    const handleOkClick = () => {
      dealApplyAdmin(record.id, 1)
    }
    const handleCancelClick = () => {
      dealApplyAdmin(record.id, 2)
    }
    return (
      <span>
        <button disabled={record.status != 0} className={Less['link-button']} onClick={handleOkClick}>通过</button>
        <button disabled={record.status != 0} className={Less['link-button']} onClick={handleCancelClick}>拒绝</button>
      </span>
    )
  }
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '用户名',
    dataIndex: 'username'
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    render: userRender
  }, {
    title: '邮箱',
    dataIndex: 'email'
  }, {
    title: '头像',
    dataIndex: 'avatar',
    render: imageRender
  }, {
    title: '注册时间',
    dataIndex: 'register_at',
    render: timeRender
  }, {
    title: '用户状态',
    dataIndex: 'usable',
    render: statusRender
  }, {
    title: '用户类别',
    dataIndex: 'user_type',
    render: typeRender
  }, {
    title: '操作',
    render: operatorRender
  }]

  return (
    <div className={Less['industry-apply']}>
      <Row type="flex" justify="space-between">
        <Col span={10}>
          <Search placeholder="搜索" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col span={6} offset={1}>
          <Select style={{ width: '100%'}} value={type} onChange={setType}>
            {types.map((item) => {
              return (
                <Option value={item.value} key={item.value}>{item.title}</Option>
              )
            })}
          </Select>
        </Col>
      </Row>
      <Divider />
      <Spin spinning={loading}>
        <Table
          dataSource={userList}
          columns={columns}
          rowKey="id"
        />
      </Spin>
    </div>
  )
}

export default User
