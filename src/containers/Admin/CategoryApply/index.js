import React, { useEffect, useState } from 'react'
import { Spin, message, Table, Row, Col, Input, Select, Button, Divider, Tag } from 'antd'
import moment from 'moment'

import ApplyModal from './ApplyModal'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const types =[{
  value: 1,
  title: '审核中'
}, {
  value: 2,
  title: '审核通过'
}, {
  value: 3,
  title: '审核未通过'
}, {
  value: 4,
  title: '全部'
}]

const getTag = (status) => {
  switch(status) {
    case 0: {
      return <Tag color="blue">审核中</Tag>
    }
    case 1: {
      return <Tag color="green">审核通过</Tag>
    }
    case 2: {
      return <Tag color="red">审核未通过</Tag>
    }
    case -1: {
      return <Tag color="purple">已取消</Tag>
    }
    default: {
      return ''
    }
  }
}

const CategoryApply = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, categoryApplications = [] } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [loading, setLoading] = useState(true)
  const [modalStatus, setModalStatus] = useState(false)
  const [application, setApplication] = useState(null)
  const [search, setSearch] = useState()
  const [type, setType] = useState(4)

  useEffect(() => {
    loadApplications()
  }, [])

  const handleCloseModal = () => {
    setModalStatus(false)
  }

  const handleNewClick = () => {
    setApplication(null)
    setModalStatus(true)
  }

  const loadApplications = async (fetchPolicy) => {
    const data = await query(
      querys.QueryCategoryApply,
      {},
      {
        fetchPolicy
      }
    )
    let { categoryApply: { isSuccess, applications, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setCategoryApplications({ categoryApplications: applications })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }
  const dealApplyAdmin =  async (id, status) => {
    setLoading(true)

    const data = await mutate(
      mutations.DealApplyCategoryMutation,
      {
        id: Number(id),
        status
      }
    )
    const { dealApplyAddCategory: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications('no-cache')
      message.success('更新成功')
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  const imageRender = (item, record) => {
    return <img style={{ width: '100px', height: '100px' }} src={api.static + item} />
  }
  const timeRender = (item, record) => {
    return item ? moment(item).fromNow() : ''
  }
  const statusRender = (item) => {
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
    title: '主题',
    dataIndex: 'subject'
  }, {
    title: '描述',
    dataIndex: 'description'
  }, {
    title: '图片',
    dataIndex: 'image',
    render: imageRender
  }, {
    title: '申请时间',
    dataIndex: 'apply_time',
    render: timeRender
  }, {
    title: '处理人',
    dataIndex: 'deal_user_id'
  }, {
    title: '处理时间',
    dataIndex: 'deal_time',
    render: timeRender
  }, {
    title: '申请状态',
    dataIndex: 'status',
    render: statusRender
  }, {
    title: '操作',
    render: operatorRender
  }]

  return (
    <div className={Less['category-apply']}>
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
        <Col>
          <Button type="primary" onClick={handleNewClick}>新建</Button>
        </Col>
      </Row>
      <Divider />
      <Spin spinning={loading}>
        <Table
          dataSource={categoryApplications}
          columns={columns}
          rowKey="id"
        />
      </Spin>
      <ApplyModal
        {...props}
        visible={modalStatus}
        onClose={handleCloseModal}
        application={application}
      />
    </div>
  )
}

export default CategoryApply
