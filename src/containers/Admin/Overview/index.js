import React, { useEffect, useState } from 'react'
import { Spin, message, Row, Col } from 'antd'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
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
    onEditClick,
    loading
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, articles = {}, admin = {} } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const cols = {
    sales: {
      tickInterval: 1
    }
  };

  const data = [{
    type: '文章',
    count: Object.keys(articles).length
  }, {
    type: '用户',
    count: Object.keys(users).length
  }, {
    type: '类别',
    count: categorys.length
  },{
    type: '行业',
    count: industrys.length
  }, {
    type: '管理员申请',
    count: admin && admin.adminApply.length
  }, {
    type: '类别添加申请',
    count: admin && admin.categoryApply.length
  }, {
    type: '行业添加申请',
    count: admin && admin.industryApply.length
  }, {
    type: '用户举报',
    count: admin && admin.userReport.length
  }, {
    type: '文章举报',
    count: admin && admin.articleReport.length
  }]

  return (
    <div className={Less['overview']}>
      <Spin spinning={loading}>
        <Row style={{ lineHeight: '50px'}}>
          <Col className={Less['title-1']}>动态数据</Col>
        </Row>
        <Chart padding={[20, 0, 50, 20]} height={400} data={data} scale={cols} forceFit>
          <Axis name="type" />
          <Axis name="count" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="type*count" />
        </Chart>
      </Spin>
    </div>
  )
}

export default Overview
