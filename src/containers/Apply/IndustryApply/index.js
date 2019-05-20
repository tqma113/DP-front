import React, { useEffect, useState } from 'react'
import { Spin, message, List, Row, Col, Input, Select, Button, Divider } from 'antd'

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

const IndustryApply = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, industryApplications = [] } = store
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
      querys.QueryIndustryApply,
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

  const renderItem = (item) => {
    return item.id
  }

  return (
    <div className={Less['category-apply']}>
      <Row type="flex" justify="space-between">
        <Col span={10}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
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
          <Button type="primary" onClick={handleNewClick}>新建申请</Button>
        </Col>
      </Row>
      <Divider />
      <Spin spinning={loading}>
        <List
          dataSource={industryApplications}
          renderItem={renderItem}
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

export default IndustryApply
