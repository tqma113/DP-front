import React, { useEffect, useState } from 'react'
import { Spin, message, Table, Row, Col, Input, Select, Button, Divider, Tag } from 'antd'
import moment from 'moment'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const types =[{
  value: 0,
  title: '正常'
}, {
  value: 1,
  title: '被举报'
}, {
  value: 2,
  title: '封禁'
}]

const getUserStatus = (status) => {
  switch(status) {
    case 0: {
      return <Tag color="blue">正常</Tag>
    }
    case 1: {
      return <Tag color="gold">被举报</Tag>
    }
    case 2: {
      return <Tag color="red">封禁</Tag>
    }
    default: {
      return ''
    }
  }
}

const Article = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    loadAll,
    loading
  } = props
  const { users = {}, articles = {}, categorys = [], industrys = [], session = {}, loadStatus, industryApplications = [] } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [articleList, setUserList] = useState(null)
  const [search, setSearch] = useState()
  const [type, setType] = useState(4)

  useEffect(() => {
    let articleList = Object.values(articles)
    setUserList(articleList)
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
      handlers.go('/' + item.username)
    }
    return <button onClick={handleClick} className="link-button">{item.nickname}</button>
  }
  const titleRender = (item, record) => {
    const handleClick = () => {
      handlers.go('/article/' + record.id)
    }
    return <button onClick={handleClick} className="link-button">{item}</button>
  }
  const timeRender = (item, record) => {
    return item ? moment(item).fromNow() : ''
  }
  const statusRender = (item) => {
    return getUserStatus(item)
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
    title: '标题',
    dataIndex: 'title',
    render: titleRender
  }, {
    title: '概述',
    dataIndex: 'abstract'
  }, {
    title: '作者',
    dataIndex: 'user',
    render: userRender
  }, {
    title: '创建时间',
    dataIndex: 'release_time',
    render: timeRender
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: statusRender
  },{
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
          dataSource={articleList}
          columns={columns}
          rowKey="id"
        />
      </Spin>
    </div>
  )
}

export default Article
