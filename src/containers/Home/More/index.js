import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import Collect from './Collect'
import Like from './Like'
import Concern from './Concern'

const TabPane = Tabs.TabPane

const tabs = {
  stars: '1',
  concern: '2',
  likes: '3',
}

const More = (props) => {
  const {
    tabName = ''
  } = props

  const [tabKey, setTabKey] = useState('1')

  useEffect(() => {
    if (tabs[tabName]) {
      setTabKey(tabs[tabName])
    }
  }, [])

  const handleTabClick = (key) => {
    setTabKey(key)
  }

  const handleChangeTab = (key) => {
    switch(key) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
    }
  }

  return (
    <Tabs activeKey={tabKey} onTabClick={handleTabClick} onChange={handleChangeTab}>
      <TabPane tab="收藏" key={'1'}>
        <Collect {...props} />
      </TabPane>
      <TabPane tab="关注" key={'2'}>
        <Concern {...props} />
      </TabPane>
      <TabPane tab="点赞" key={'3'}>
        <Like {...props} />
      </TabPane>
    </Tabs>
  )
}

export default More
