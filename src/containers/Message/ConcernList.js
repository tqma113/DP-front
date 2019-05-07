import React, { useEffect, useState } from 'react'
import { Row, Avatar, Tag, message, List } from 'antd'

const ConcernList = (props) => {
  const { store = {}, handlers = {}, static:{ api }, query, querys, onUserClick } = props
  const {  users = {}, session = {}, categorys = [], industrys = [] } = store
  const { info = {} } = session
  const { username : currentUsername } = info
  const currentUser = users[currentUsername] || {}
  const userCount = Object.keys(users).length

  const [loading, setLoading] = useState(true)
  const [concernedUsers, setConcernedUsers] = useState([])

  useEffect(() => {
    if (currentUser.username) {
      let userIdList = currentUser.concerned.map(item => item.concerned_user_id).filter(item => Number(item) !== Number(currentUser.id))
      let allUser = Object.values(users)
      let saleUserIdList = userIdList.filter(item => !allUser.some(i => Number(item) === Number(i.id)))
      if (saleUserIdList.length > 0) {
        loadUser(saleUserIdList)
      } else {
        let filterUsers = allUser.filter(item => userIdList.some(i => Number(i) === Number(item.id)))
        setConcernedUsers(filterUsers)
        setLoading(false)
      }
    }
  }, [userCount, currentUsername])

  const handleUserClick = (username) => {
    if(onUserClick) {
      onUserClick(username)
    }
  }

  const loadUser = async (idList, fetchPolicy) => {
    const data = await query(
      querys.QueryUsers,
      {
        idList: idList.map(i => Number(i))
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

  const renderItem = item => (
    <List.Item
      key={item.user_id}
    >
      <List.Item.Meta
        avatar={<Avatar onDoubleClick={() => handleUserClick(item.username)} size={40} src={api.dev.static + item.avatar} />}
        title={<a href={'/' + item.username}>{item.nickname}</a>}
        description={item.statement}
      />
      <Row>
        {item.categorys && item.categorys.length > 0 ?
          categorys.filter(a => item.categorys.some(i => Number(i) === Number(a.id))).map(item => (
            <Tag key={item.id} color="geekblue">{item.subject}</Tag>
          ))
          .concat(
            item.user && item.industrys.length > 0 ? industrys.filter(a => item.industrys.some(i => Number(i) === Number(a.id))).map(item => (
              <Tag key={item.id} color="purple">{item.name}</Tag>
            )) : []
          ) : []
        }
      </Row>
    </List.Item>
  )

  return (
    <List
      loading={loading}
      itemLayout="vertical"
      footer={<div>您关注了<b> {concernedUsers.length} </b>位用户</div>}
      dataSource={concernedUsers}
      renderItem={renderItem}
    />
  )
}

export default ConcernList
