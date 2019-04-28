import React, { useState, useEffect } from 'react'
import { Row, Col, Icon, Tabs } from 'antd'

import Less from './index.module.less'

const TabPane = Tabs.TabPane

const PersonalCenter = (props) => {
  const { store = {}, handlers } = props
  const { session, user = {} } = store

  handlers.onload()

  return (
    <section className={Less['personal-center']}>
      <section className={Less['main']}>
        <Row bottom='md'>
          <Col span={6}>
            <Row>
              <img className={Less['avatar']} src={'a'} />
            </Row>
            <Row>
              <p className={Less['nickname']}>{user.nickname}</p>
              {user.email &&
                <span>
                  <Icon type="mail" />
                  <a href={`mailto:${user.email}`} className={Less['email']}>{user.email}</a>
                </span>
              }
              {user.location && <React.Fragment>
                <Icon type="environment" />
                <p className={Less['address']}>{user.location}</p>
              </React.Fragment>}
              {user.statement &&
                <p className={Less['statement']}>{user.statement}</p>
              }
            </Row>
          </Col>
          <Col>
            <Tabs>
              <TabPane tab="概述" key="1">

              </TabPane>
              <TabPane tab="文章" key="2">

              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </section>
    </section>
  )
}

export default PersonalCenter
