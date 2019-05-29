import React, { useEffect, useState } from 'react'
import { Spin, message, Table, Row, Col, Input, Select, Button, Divider, Tag } from 'antd'
import moment from 'moment'
import BraftEditor from 'braft-editor'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const types =[{
  value: 0,
  title: '未处理'
}, {
  value: 1,
  title: '已通过'
}, {
  value: 2,
  title: '未通过'
}, {
  value: 3,
  title: '全部'
}]

const getUserStatus = (status) => {
  switch(status) {
    case 0: {
      return <Tag color="gold">未处理</Tag>
    }
    case 1: {
      return <Tag color="blue">已通过</Tag>
    }
    case 2: {
      return <Tag color="red">未通过</Tag>
    }
    default: {
      return ''
    }
  }
}

const UserReport = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    loading = true,
    loadAll
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, admin = {} } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [search, setSearch] = useState()
  const [type, setType] = useState(3)

  const dealReport =  async (id, status) => {
    const data = await mutate(
      mutations.DealReportUserMutation,
      {
        id: Number(id),
        status
      }
    )
    const { dealReportUser: { isSuccess } = {} } = data

    if (isSuccess) {
      loadAll('no-cache')
      message.success('更新成功')
    } else {
      message.info('更新失败请重试')
    }
  }

  const userRender = (item, record) => {
    const handleClick = () => {
      handlers.go('/' + item.username)
    }
    return <button onClick={handleClick} className="link-button">{item.nickname}</button>
  }
  const reasonRender = (item, record) => {
    let editState = BraftEditor.createEditorState(JSON.parse(item))
    let html = editState.toHTML()
    return <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: html }}></div>
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
  const operatorRender = (item, record) => {
    const handleOkClick = () => {
      dealReport(record.id, 1)
    }
    const handleCancelClick = () => {
      dealReport(record.id, 2)
    }
    if (record.status != 0) return null
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
    title: '举报人',
    dataIndex: 'user',
    render: userRender
  }, {
    title: '被举报人',
    dataIndex: 'reportUser',
    render: userRender
  }, {
    title: '举报原因',
    dataIndex: 'reason',
    render: reasonRender
  }, {
    title: '举报时间',
    dataIndex: 'report_time',
    render: timeRender
  }, {
    title: '状态',
    dataIndex: 'status',
    render: statusRender
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
          dataSource={admin && admin.userReport}
          columns={columns}
          rowKey="id"
        />
      </Spin>
    </div>
  )
}

export default UserReport
