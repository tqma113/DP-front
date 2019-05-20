import React, { useEffect, useState } from 'react'
import { Tabs, message } from 'antd'
import Less from './index.module.less'

import AdminApply from './AdminApply'
import CategoryApply from './CategoryApply'
import IndustryApply from './IndustryApply'

const TabPane = Tabs.TabPane

const tabs = {
  applyAdmin: '2',
  applyCategory: '3',
  applyIndustry: '4',
}

const Apply = (props) => {
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

  useEffect(() => {
    if (location.hash) {
      let title = location.hash.slice(1)
      if (tabs[title]) {
        setTabKey(tabs[title])
        setTabName(title)
      }
    }
    handlers.onload({ loadStatus })

  }, [])

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  return (
    <div className={Less['apply']}>
      <div className={Less['main']}>
        <Tabs onTabClick={handleTabClick} activeKey={tabKey}>
          <TabPane tab="管理员申请" key="1">
            <AdminApply {...props} />
          </TabPane>
          <TabPane tab="类别添加申请" key="2">
            <CategoryApply {...props} />
          </TabPane>
          <TabPane tab="行业添加申请" key="3">
            <IndustryApply {...props} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Apply
