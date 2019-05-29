import React, { useEffect, useState } from 'react'
import { Tabs, message } from 'antd'
import Less from './index.module.less'

import User from './User'
import Article from './Article'
import Overview from './Overview'
import AdminApply from './AdminApply'
import CategoryApply from './CategoryApply'
import IndustryApply from './IndustryApply'
import UserReport from './UserReport'
import ArticleReport from './ArticleReport'

const TabPane = Tabs.TabPane

const tabs = {
  overview: '1',
  applyAdmin: '2',
  applyCategory: '3',
  applyIndustry: '4',
}

const Admin = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    onEditClick,
    location = {}
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const [tabKey, setTabKey] = useState('1')
  const [tabName, setTabName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth()
  }, [currentUser])

  useEffect(() => {
    if (location.hash) {
      let title = location.hash.slice(1)
      if (tabs[title]) {
        setTabKey(tabs[title])
        setTabName(title)
      }
    }
  }, [])

  const loadAll = async () => {
    const data = await query(
      querys.QueryAdmin,
      {},
      {
        fetchPolicy: 'no-cache'
      }
    )
    let {
      articles: { isSuccess, articles, extension = {} } = {},
      users: { isSuccess: isSuccessUser, users } = {},
      adminApply: { isSuccess: isSuccessA, applications: adminApply = [] } = {},
      categoryApply: { isSuccess: isSuccessC, applications: categoryApply = [] } = {},
      industryApply: { isSuccess: isSuccessI, applications: industryApply = [] } = {},
      userReport: { isSuccess: isSuccessUR, reports: userReport = [] } = {},
      articleReport: { isSuccess: isSuccessAR, reports: articleReport = [] } = {}
    } = data

    if (isSuccess && isSuccessUser && isSuccessA && isSuccessC && isSuccessI && isSuccessUR && isSuccessAR) {
      let admin = {
        adminApply,
        categoryApply,
        industryApply,
        userReport,
        articleReport
      }
      handlers.setArticles({ articles })
      handlers.setUsers({ users })
      handlers.setAdmin({ admin })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }

  const auth = () => {
    if (currentUser) {
      if (currentUser.user_type != 1) {
        message.info('你还没有该权限!')
        handlers.go('/')
      } else {
        handlers.onload({ loadStatus })
        if (loading) {
          loadAll()
        }
      }
    }
  }

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  return (
    <div className={Less['admin']}>
      <div className={Less['main']}>
        <Tabs onTabClick={handleTabClick} activeKey={tabKey}>
          <TabPane tab="概述" key="1">
            <Overview loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="用户" key="5">
            <User loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="文章" key="6">
            <Article loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="管理员申请" key="2">
            <AdminApply loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="类别添加申请" key="3">
            <CategoryApply loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="行业添加申请" key="4">
            <IndustryApply loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="用户举报" key="7">
            <UserReport loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
          <TabPane tab="文章举报" key="8">
            <ArticleReport loading={loading} loadAll={loadAll} {...props} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
