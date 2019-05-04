import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import Category from './Category'
import Industry from './Industry'
import User from './User'
import Article from './Article'

import Less from './index.module.less'

const TabPane = Tabs.TabPane

const tabs = {
  'articles': '1',
  'users': '2',
  'categorys': '3',
  'industrys': '4'
}

const Index = (props) => {
  const { handlers = {}, store = {}, location = {} } = props
  const { loadStatus } = store
  const { hash } = location

  const [tabKey, setTabKey] = useState('1')

  useEffect(() => {
    handlers.onload({ loadStatus })
    if (hash) {
      let key = tabs[hash.slice(1)]
      if (key) {
        setTabKey(key)
      }
    }
  }, [])

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  return (
    <section className={Less['index']}>
      <Tabs onTabClick={handleTabClick} activeKey={tabKey}>
        <TabPane tab="文章" key={1}>
          <Article {...props} />
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
