import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Divider, List, Button, message, Skeleton, Avatar, Tag } from 'antd'
import { IconText } from '@components'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const Concern = props => {
  const {
    store = {},
    handlers = {},
    isSelf = false,
    username = '',
    query,
    querys = {},
    mutate,
    mutations = {},
    static: { api }
  } = props
  const { users = {}, categorys = [], session = {}, users: allUsers = {}, industrys = [] } = store
  const user = users[username] || {}
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [loading, setLoading] = useState(true)

  const [userSearch, setUserSearch] = useState('')
  const [userType, setUserType] = useState(1)
  const [userCategorys, setUserCategorys] = useState([])
  const [userIndustrys, setUserIndustrys] = useState([])
  const [sortUsers, setSortUsers] = useState([])
  const [filterUsers, setFilterUsers] = useState([])

  useEffect(() => {
    loadAllUser()
  }, [])

  useEffect(() => {
    sortUser()
  }, [users])

  useEffect(() => {
    filterUser()
  }, [userType, userCategorys, userIndustrys, sortUsers, userSearch])

  const sortUser = () => {
    let users = Object.values(allUsers)
    let userIds = user.concerned.map(i => i.concerned_user_id)
    let saleUserIds = userIds.filter(i => users.every(item => Number(item.id) !== i))
    if (saleUserIds.length > 0) {
      loadUser(saleUserIds)
    } else {
      let sortUsers = userIds.map(i => users.filter(item => Number(item.id) === Number(i))[0])
      sortUsers.sort((a, b) => {
        return b.concern.length  - a.concern.length
      })
      setSortUsers(sortUsers)
    }
  }

  const filterUser = () => {
    let filterUsers = sortUsers || []
    filterUsers = (userType !== '1' ? filterUsers.filter(item => {
      let isConcerned = status && currentUser.categorys && currentUser.categorys.some(i => i == item.id)
      if (isConcerned && userType === '2') {
        return false
      }
      if (!isConcerned && userType === '3') {
        return false
      }
      return true
    }) : filterUsers)
    .filter(item => JSON.stringify(item).includes(userSearch))
    .filter(item => currentUser && currentUser.id ? item.id !== currentUser.id : true)
    if (userCategorys && userCategorys.length !== 0) {
      filterUsers = filterUsers.filter(item => item.categorys.some(i => userCategorys.some(a => a == i)))
    }
    if (userIndustrys && userIndustrys.length !== 0) {
      filterUsers = filterUsers.filter(item => item.industrys.some(i => userIndustrys.some(a => a == i)))
    }
    setFilterUsers(filterUsers)
  }

  const handleUserSearchChange = (e) => {
    setUserSearch(e.target.value)
  }

  const handleUserTypeChange = (key) => {
    setUserType(key)
  }

  const handleUserCategorysChange = (key) => {
    setUserCategorys(key)
  }

  const handleUserIndustrysChange = (key) => {
    setUserIndustrys(key)
  }

  const handleUserConcernClick = (userId, userStatus) => {
    if (status) {
      userConcern(userId, userStatus)
    }
  }

  const userConcern = async (userId, isConcerned) => {

    let data = await mutate(
      mutations.UserConcernMutation,
      {
        username: currentUsername,
        token,
        userId: Number(userId),
        status: isConcerned
      }
    )
    const { userConcern: { isSuccess } = {} } = data
    if (isSuccess) {
      if (currentUsername) {
        loadUser(currentUsername, 'no-cache')
      }
      if (isConcerned) {
        message.success('取关成功')
      } else {
        message.success('关注成功')
      }
    } else {
      message.error('关注失败,请重试')
    }
  }

  const loadUser = async (idList, fetchPolicy) => {
    const data = await query(
      querys.QueryUsers,
      {
        idList: idList.map(item => Number(item))
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

  const loadAllUser = async () => {
    const data = await query(
      querys.QueryUsers,
      {},
      {
        fetchPolicy: 'no-cache'
      }
    )
    let { users: { isSuccess, users, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setUsers({ users })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }
  }

  const userRenderItem = item => {
    const isConcerned = currentUser && currentUser.concerned ? currentUser.concerned.some(i => i.concerned_user_id == item.id) : false

    const handleClick = () => {
      handlers.go('/' + item.username)
    }
    return (
      <List.Item
        key={item.id}
        extra={
          <div style={{ width: '200px', height: '100px' }}>
            {status &&
              (isConcerned ?
                <Button onClick={() => handleUserConcernClick(item.id, isConcerned)} style={{ float: 'right'}}>已关注</Button> :
                <Button onClick={() => handleUserConcernClick(item.id, isConcerned)} style={{ float: 'right'}}>关注</Button>
              )
            }
          </div>
        }
        actions={[<IconText type="user" text={item.concerned.length} />]}
      >
        <List.Item.Meta
          className={Less['user-item']}
          avatar={<Avatar onClick={handleClick} size={50} src={api.dev.static + item.avatar} />}
          title={<button onClick={handleClick} className="link-button">{item.nickname}</button>}
          description={<span>{item.statement}</span>}
        />
        <Row>
          {item.categorys && item.categorys.length > 0 ? categorys.filter(a => item.categorys.some(i => i == a.id)).map(item => (
              <Tag key={item.id} color="geekblue">{item.subject}</Tag>
            )) : []
          }
        </Row>
        <Row style={{marginTop: '10px'}}>
          {item.industrys.length > 0 ? industrys.filter(a => item.industrys.some(i => i == a.id)).map(item => (
              <Tag key={item.id} color="purple">{item.name}</Tag>
            )) : []
          }
        </Row>
      </List.Item>
    )
  }

  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={7}>
          <Search value={userSearch} className={Less['search']} onChange={handleUserSearchChange} placeholder="搜索用户" />
        </Col>
        <Col span={5}>
          <Select allowClear style={{ width: '100%'}} mode="multiple" value={userCategorys} onChange={handleUserCategorysChange} placeholder="选择类别">
            {categorys.map(item => (
              <Option key={Number(item.id)} value={item.id}>{item.subject}</Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <Select allowClear style={{ width: '100%'}} mode="multiple" value={userIndustrys} onChange={handleUserIndustrysChange} placeholder="选择行业">
            {industrys.map(item => (
              <Option key={Number(item.id)} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          {status &&
            <Select onChange={handleUserTypeChange} value={userType} style={{ width: '100%'}}>
              <Option key={1} value={1}>全部</Option>
              <Option key={2} value={2}>未关注</Option>
              <Option key={3} value={3}>已关注</Option>
            </Select>
          }
        </Col>
      </Row>
      <Divider />
      {loading ?
        <List
          dataSource={[1,2,3,4,5,6]}
          renderItem={() =>
            <List.Item>
              <Skeleton active />
            </List.Item>
          }
        /> :
        <List
          itemLayout="vertical"
          dataSource={filterUsers}
          renderItem={userRenderItem}
          footer={<div>共筛选出 <b>{filterUsers.length}</b> 位用户</div>}
        />
      }
    </div>
  )
}

export default Concern
