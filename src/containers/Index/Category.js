import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Divider, List, Button, message } from 'antd'
import { IconText } from '@components'

import Less from './index.module.less'

const Search = Input.Search
const Option = Select.Option

const Category = props => {
  const { handlers = {}, store = {}, mutate, mutations = {}, query, querys = {} } = props
  const { categorys = [], static: { api } = {}, session = {}, users = {} } = store
  const { status, info = {} } = session
  const { username, token } = info
  const user = users[username]

  const [categorySearch, setCategorySearch] = useState('')
  const [categoryType, setCategoryType] = useState(1)
  const [sortCategorys, setSortCategorys] = useState([])
  const [filterCategorys, setFilterCategorys] = useState([])

  useEffect(() => {
    sortCategory()
  }, [categorys])

  useEffect(() => {
    filterCategory()
  }, [categoryType, sortCategorys, categorySearch])

  const sortCategory = () => {
    let sortCategorys = categorys || []
    sortCategorys.sort((a, b) => b.users.length - a.users.length)
    setSortCategorys(sortCategorys)
  }

  const filterCategory = () => {
    let filterCategorys = sortCategorys || []
    filterCategorys = (categoryType != 1 ? filterCategorys.filter(item => {
      let isLiked = status && user.categorys && user.categorys.some(i => i == item.id)
      if (isLiked && categoryType == 2) {
        return false
      }
      if (!isLiked && categoryType == 3) {
        return false
      }
      return true
    }) : filterCategorys)
    .filter(item => JSON.stringify(item).includes(categorySearch))
    setFilterCategorys(filterCategorys)
  }

  const handleCategorySearchChange = (e) => {
    setCategorySearch(e.target.value)
  }

  const handleCategoryTypeChange = (key) => {
    setCategoryType(key)
  }

  const handleCategoryStarClick = (categoryId, categoryStatus) => {
    if (status) {
      categoryStar(categoryId, categoryStatus)
    }
  }

  const categoryStar = async (categoryId, status) => {
    let data = await mutate(
      mutations.categoryStarMutation,
      {
        username: username,
        token,
        categoryId: Number(categoryId),
        status
      }
    )
    const { categoryStar: { isSuccess } = {} } = data
    if (isSuccess) {
      if (username) {
        loadUser(username, 'no-cache')
      }
      if (status) {
        message.success('取关成功')
      } else {
        message.success('收藏成功')
      }
    } else {
      message.error('收藏失败,请重试')
    }
  }

  const loadUser = async (username, fetchPolicy) => {
    const data = await query(
      querys.QueryUsers,
      {
        usernames: [username]
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

  const categoryRenderItem = item => {
    const isStared = status && user.categorys && user.categorys.some(i => i == item.id)
    return (
      <List.Item
        key={item.id}
        extra={
          <div style={{ width: '200px', height: '200px' }}>
            {status &&
              (isStared ?
                <Button onClick={() => handleCategoryStarClick(item.id, isStared)} style={{ float: 'right'}}>已关注</Button> :
                <Button onClick={() => handleCategoryStarClick(item.id, isStared)} style={{ float: 'right'}}>关注</Button>
              )
            }
            {
              item.image && <img src={api.static + item.image} />
            }
          </div>
        }
        actions={[<IconText type="user" text={item.users.length} />]}
      >
        <List.Item.Meta
          className={Less['category-item']}
          title={<a>{item.subject}</a>}
          description={<span title={item.description}>{item.description}</span>}
        />
      </List.Item>
    )
  }

  return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={12}>
          <Search value={categorySearch} className={Less['search']} onChange={handleCategorySearchChange} placeholder="搜索类别" />
        </Col>
        <Col span={6}>
          {status &&
            <Select onChange={handleCategoryTypeChange} value={categoryType} style={{ width: '100%'}}>
              <Option key={1} value={1}>全部</Option>
              <Option key={2} value={2}>未关注</Option>
              <Option key={3} value={3}>已关注</Option>
            </Select>
          }
        </Col>
      </Row>
      <Divider />
      <List
        itemLayout="vertical"
        dataSource={filterCategorys}
        renderItem={categoryRenderItem}
        footer={<div>共筛选出 <b>{filterCategorys.length}</b> 种类别</div>}
      />
    </div>
  )
}

export default Category
