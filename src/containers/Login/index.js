import React, { useState, useEffect } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, Row, Col, Modal, Tabs, message } from 'antd'

import Less from './index.module.less'

const TabPane = Tabs.TabPane;

const Login = (props) => {
  const { handlers = {}, form = {}, mutations = {}, mutate, store = {} } = props
  const { getFieldDecorator, getFieldValue } = form;
  const { loadStatus } = store

  const [timer, setTimer] = useState(0)
  const [codeKey, setCodeKey] = useState('')

  useEffect(() => {
    if (timer > 0) {
      let timeout = setTimeout(() => {
        setTimer(timer - 1)
        clearTimeout(timeout)
      }, 1000)
    }
  }, [timer])

  useEffect(() => {
    if (!loadStatus) {
      handlers.onload({ loadStatus })
      handlers.turnToLogin()
    }
  })

  const remeber = getFieldValue('remeber')

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFieldsAndScroll(['username', 'password'], async (err, values) => {
      if (!err) {
        sendLoginMutation(values)
      }
    });
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    form.validateFieldsAndScroll(['email', 'code'], async (err, values) => {
      if (!err) {
        sendLoginWithEmailMutation(values)
      }
    });
  }

  const handleSendCodeClick = () => {
    form.setFieldsValue({'code': ''})
    form.validateFieldsAndScroll(['email'],  async (err, values) => {
      if (!err) {
        sendEmailCodeMutation(values)
      }
    })
  }

  const sendLoginMutation = async ({ username, password }) => {
    handlers.turnToLoginLoading()
    const data = await mutate(
      mutations.LoginMutation,
      {
        username,
        password
      }
    )
    const { login = {} } = data
    loginA(login)
  }

  const sendEmailCodeMutation = async ({email = ''}) => {
    const data = await mutate(
      mutations.SendEmailLoginCodeMutation,
      {
        email
      }
    )
    const { sendEmailLoginCode = {} } = data
    setEmailCodeKey(sendEmailLoginCode)
  }

  const sendLoginWithEmailMutation = async ({ email = '', code = '' }) => {
    handlers.reload()
    const data = await mutate(
      mutations.LoginWithEmailMutation,
      {
        email,
        code,
        key: codeKey
      }
    )
    const { loginWithEmail = {} } = data
    loginA(loginWithEmail)
  }

  const setEmailCodeKey = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      setCodeKey(key)
      setTimer(60)
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`发送失败: ${messStr}`)
    }
  }

  const loginA = (login) => {
    const { isSuccess = false, username = '', token = '', extension = {} } = login
    if (isSuccess) {
      handlers.login({
        token,
        username
      })
      handlers.goBack()
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`登录失败: ${messStr}`)
      handlers.turnToLogin()
    }
  }

  return (
    <section className={Less['login']}>
      <Row type="flex" justify="center"  className={Less['left']}>
        <Col className={Less['main']}>
          <Card title="Now" headStyle={{fontSize: '36px', textAlign: 'center'}} bodyStyle={{padding: '20px 60px'}} >
            <Tabs type="card">
              <TabPane tab="账号密码" key="1">
                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入账号!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="密码" autoComplete={remeber ? "on" : "off"} />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Row type="flex" justify="space-between">
                      <Col span={12}>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>记住密码</Checkbox>
                        )}
                      </Col>
                      <Col span={12}>
                        <a className={Less['login-form-forgot']}>忘记密码</a>
                      </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" className={Less['login-form-button']}>
                      登录
                    </Button>
                    或者 <a>创建账户</a>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="邮箱验证码" key="2">
              <Form onSubmit={handleEmailSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [{
                        required: true,
                        message: '请输入邮箱!'
                      }, {
                        type: 'email',
                        message: '邮箱格式不正确,请修改!',
                      }],
                      initialValue: ''
                    })(
                      <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('code', {
                      rules: [{
                        required: true,
                        message: '请输入验证码!'
                      }, {
                        len: 6,
                        message: '请输入正确的验证码(六位)!'
                      }],
                      initialValue: ''
                    })(
                      <Row type="flex" justify="space-between">
                        <Col span={16}>
                          <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="验证码" autoComplete={remeber ? "on" : "off"} />
                        </Col>
                        <Col>
                          <Button disabled={timer > 0} onClick={handleSendCodeClick}>{timer > 0 && timer} 发送</Button>
                        </Col>
                      </Row>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className={Less['login-form-button']}>
                      登录
                    </Button>
                    或者 <a>创建账户</a>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>

          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default Form.create({ name: 'login' })(Login)
