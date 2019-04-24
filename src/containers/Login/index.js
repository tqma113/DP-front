import React from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, Row, Col, Modal, Tabs } from 'antd'

import Less from './index.module.less'

const TabPane = Tabs.TabPane;

class Login extends React.Component {

  componentDidMount() {
    this.props.handlers.turnToLogin()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll	(async (err, values) => {
      if (!err) {
        this.sendLoginQeury(values)
      }
    });
  }

  sendLoginQeury = async ({ username, password }) => {
    const { mutations } = this.props
    const { handlers } = this.props
    handlers.reload()
    try {
      const res = await this.props.client.mutate({
        mutation: mutations.LoginMutation,
        variables: {
          username,
          password
        }
      })
      this.login(res)
    } catch (err) {
      handlers.turnToLogin()
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  login = (res) => {
    const { handlers } = this.props
    const { data = {} } = res
    const { login = {} } = data
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

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const remeber = getFieldValue('remeber')
    return (
      <section className={Less['login']}>
        <Row type="flex" justify="center"  className={Less['left']}>
          <Col className={Less['main']}>
            <Card title="Now" headStyle={{fontSize: '36px', textAlign: 'center'}} bodyStyle={{padding: '20px 60px'}} >
              <Tabs type="card">
                <TabPane tab="账号密码" key="1">
                  <Form onSubmit={this.handleSubmit} className="login-form">
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

                </TabPane>
              </Tabs>

            </Card>
          </Col>
        </Row>
      </section>
    )
  }
}

export default Form.create({ name: 'login' })(Login)
