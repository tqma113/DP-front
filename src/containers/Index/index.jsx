import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import Less from './index.module.less'

const TabPane = Tabs.TabPane

const Index = (props) => {
  const { handlers = {}, store = {} } = props
  const { loadStatus } = store

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  return (
    <section className={Less['index']}>
      <Tabs>
        <TabPane tab="文章" key={1}></TabPane>
        <TabPane tab="用户" key={2}></TabPane>
        <TabPane tab="类别" key={3}></TabPane>
        <TabPane tab="行业" key={4}></TabPane>
      </Tabs>
    </section>
  )
}

export default Index
