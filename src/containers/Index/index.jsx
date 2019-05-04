import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import Category from './Category'
import Industry from './Industry'
import User from './User'

import Less from './index.module.less'

const TabPane = Tabs.TabPane

const Index = (props) => {
  const { handlers = {}, store = {} } = props
  const { loadStatus } = store

  const [tabKey, setTabKey] = useState('1')

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  return (
    <section className={Less['index']}>
      <Tabs onTabClick={handleTabClick} activeKey={tabKey}>
        <TabPane tab="文章" key={1}>

        </TabPane>
        <TabPane tab="用户" key={2}>
          <User {...props} />
        </TabPane>
        <TabPane tab="类别" key={3}>
          <Category {...props} />
        </TabPane>
        <TabPane tab="行业" key={4}>
          <Industry {...props} />
        </TabPane>
      </Tabs>
    </section>
  )
}

export default Index
