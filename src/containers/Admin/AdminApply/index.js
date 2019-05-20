import React, { useEffect, useState } from 'react'
import { Spin, message } from 'antd'

import Less from './index.module.less'

const Overview = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    onEditClick
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}
  const [loading, setLoading] = useState(true)

  useEffect(() => {

  }, [])

  const loadArticle = async (idList, fetchPolicy) => {
    const data = await query(
      querys.QueryArticles,
      {
        idList: idList.map(i => Number(i))
      },
      {
        fetchPolicy
      }
    )
    let { articles: { isSuccess, articles, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setArticles({ articles })
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }

  return (
    <div className={Less['admin-apply']}>
      <Spin spinning={loading}>

      </Spin>
    </div>
  )
}

export default Overview
