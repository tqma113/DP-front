import React, { useState, useEffect } from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, Row, Col, Modal, Tabs } from 'antd'

import Less from './index.module.less'

const TabPane = Tabs.TabPane;

const Login = (props) => {

  const [timer, setTimer] = useState(0)
  const [codeKey, setCodeKey] = useState('')

  useEffect((a) => {
    if (timer > 0) {
      let timeout = setTimeout(() => {
        setTimer(timer - 1)
        clearTimeout(timeout)
      }, 1000)
    }
  }, [timer])

  const { handlers, form, mutations, client } = props
  const { getFieldDecorator, getFieldValue } = form;
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
    handlers.reload()
    try {
      const res = await this.props.client.mutate({
        mutation: mutations.LoginMutation,
        variables: {
          username,
          password
        }
      })
      const { data = {} } = res
      const { login = {} } = data
      login(login)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const sendEmailCodeMutation = async ({email = ''}) => {
    try {
      const res = await client.mutate({
        mutation: mutations.SendEmailLoginCodeMutation,
        variables: {
          email
        }
      })
      const { data = {} } = res
      const { sendEmailLoginCode = {} } = data
      setEmailCodeKey(sendEmailLoginCode)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const sendLoginWithEmailMutation = async ({ email = '', code = '' }) => {
    handlers.reload()
    try {
      const res = await client.mutate({
        mutation: mutations.LoginWithEmailMutation,
        variables: {
          email,
          code,
          key: codeKey
        }
      })
      const { data = {} } = res
      const { loginWithEmail = {} } = data
      login(loginWithEmail)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const setEmailCodeKey = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      setCodeKey(key)
      setTimer(60)
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      Modal.error({
        title: message
      })
    }
  }

  const login = (login) => {
    const { isSuccess = false, username = '',  token = '' } = login
    if (isSuccess) {
      handlers.login({
        token,
        username
      })
      handlers.goBack()
    } else {
      Modal.warning({
        title: `数据获取失败`,
      })
    }
  }

  handlers.turnToLogin()

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
