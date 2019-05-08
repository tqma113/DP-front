import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Divider, List, Button, message } from 'antd'
import { IconText } from '@components'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const Industry = props => {
  const {
    store = {},
    handlers = {},
    static: { api },
    username = '',
    query,
    querys = {},
    mutate,
    mutations = {},
  } = props
  const { users = {}, industrys = [], session = {} } = store
  const user = users[username] || {}
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}


  const [industrySearch, setIndustrySearch] = useState('')
  const [industryType, setIndustryType] = useState('1')
  const [sortIndustrys, setSortIndustrys] = useState([])
  const [filterIndustrys, setFilterIndustrys] = useState([])

  useEffect(() => {
    sortIndustry()
  }, [])

  useEffect(() => {
    filterIndustry()
  }, [industryType, sortIndustrys, industrySearch])

  const sortIndustry = () => {
    let sortIndustrys = industrys || []
    sortIndustrys.sort((a, b) => b.users.length - a.users.length)
    setSortIndustrys(sortIndustrys)
  }

  const filterIndustry = () => {
    let filterIndustrys = sortIndustrys || []
    filterIndustrys = filterIndustrys.filter(item => user.industrys.some(i => Number(item.id) === Number(i)))
    filterIndustrys = (industryType !== '1' ? filterIndustrys.filter(item => {
      let isLiked = status && currentUser.industrys && currentUser.industrys.some(i => Number(i) === Number(item.id))
      if (isLiked && industryType === '2') {
        return false
      }
      if (!isLiked && industryType === '3') {
        return false
      }
      return true
    }) : filterIndustrys)
    .filter(item => JSON.stringify(item).includes(industrySearch))
    setFilterIndustrys(filterIndustrys)
  }

  const handleIndustryStarClick = (industryId, industryStatus) => {
    if (status) {
      industryStar(industryId, industryStatus)
    }
  }

  const handleIndustrySearchChange = (e) => {
    setIndustrySearch(e.target.value)
  }

  const handleIndustryTypeChange = (key) => {
    setIndustryType(key)
  }

  const industryStar = async (industryId, status) => {
    let data = await mutate(
      mutations.industryStarMutation,
      {
        username: currentUsername,
        token,
        industryId: Number(industryId),
        status
      }
    )
    const { industryStar: { isSuccess } = {} } = data
    if (isSuccess) {
      if (username) {
        loadUser(username, 'no-cache')
      }
      if (status) {
        message.success('取关成功')
      } else {
        message.success('关注成功')
      }
    } else {
      message.error('加入失败,请重试')
    }
  }

  const loadUser = async (username, fetchPolicy) => {
    const data = await query(
      querys.QueryUsers,
      {
        usernames: [currentUsername]
      },
      {
        fetchPolicy
      }
    )
    let { users: { isSuccess, users } = {} } = data

    if (isSuccess) {
      handlers.setUsers({ users })
    }
  }

  const industryRenderItem = item => {
    const isStared = status && currentUser.industrys && currentUser.industrys.some(i => Number(i) === Number(item.id))
    return (
      <List.Item
        key={item.id}
        extra={
          <div style={{ width: '200px', height: '200px' }}>
            {status &&
              (isStared ?
                <Button onClick={() => handleIndustryStarClick(item.id, isStared)} style={{ float: 'right'}}>已关注</Button> :
                <Button onClick={() => handleIndustryStarClick(item.id, isStared)} style={{ float: 'right'}}>关注</Button>
              )
            }
            {
              item.image && <img alt="industry" src={api.static + item.image} />
            }
          </div>
        }
        actions={[<IconText type="user" text={item.users.length} />]}
      >
        <List.Item.Meta
          className={Less['category-item']}
          title={<button className={Less['link-button']}>{item.name}</button>}
          description={<span title={item.description}>{item.description}</span>}
        />
      </List.Item>
    )
  }

  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={12}>
          <Search className={Less['search']} onChange={handleIndustrySearchChange} placeholder="搜索类别" />
        </Col>
        <Col span={6}>
          {status &&
            <Select onChange={handleIndustryTypeChange} defaultValue={'1'} style={{ width: '100%'}}>
              <Option key={1} value={'1'}>全部</Option>
              <Option key={2} value={'2'}>未加入</Option>
              <Option key={3} value={'3'}>已加入</Option>
            </Select>
          }
        </Col>
      </Row>
      <Divider />
      <List
        itemLayout="vertical"
        dataSource={filterIndustrys}
        renderItem={industryRenderItem}
        footer={<div>共筛选出 <b>{filterIndustrys.length}</b> 种行业</div>}
      />
    </div>
  )
}

export default Industry
