import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Divider, Row, Col, Button, Modal, message , Tag, Icon} from 'antd'

import Less from './index.module.less'
import './index.less'

const FormItem = Form.Item

const PasswordSetting = (props) => {
  const { handlers, form, mutate, mutations, store = {} } = props
  const { getFieldDecorator } = form
  const { loadStatus } = store

  const [emailCodeSendKey, setEmailCodeSendKey] = useState()
  const [emailCodeKey, setEmailCodeKey] = useState()
  const [emailCodeTimer, setEmailCodeTimer] = useState()

  useEffect(() => {
    if (emailCodeTimer > 0) {
      let timeout = setTimeout(() => {
        setEmailCodeTimer(emailCodeTimer - 1)
        clearTimeout(timeout)
      }, 1000)
    }
    if (emailCodeTimer > 0 && !emailCodeKey) {
      setEmailCodeSendKey()
    }
  }, [emailCodeTimer])

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  const handleSendCodeClick = () => {
    form.validateFields(['email'], (err, values ) => {
      if (err) return

      sendCodeMutation(values)
    })
  }

  const handAckEmailCodeClick = () => {
    form.validateFields(['email', 'code'], (err, values ) => {
      if (err) return

      ackCodeMutation(values)
    })
  }

  const handleEmailChange = () => {
    setEmailCodeSendKey('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return

      setPasswordMutation(values)
    })
  }

  const handleCancel = () => {
    handlers.goBack()
  }

  const sendCodeMutation = async ({ email = '' }) => {
    const data = await mutate(
      mutations.SendEmailLoginCodeMutation,
      {
        email
      }
    )
    const { sendEmailLoginCode = {} } = data
    setEmailCodeSendKeyRes(sendEmailLoginCode)
  }

  const ackCodeMutation = async ({ email = '', code = ''}) => {
    const data = await mutate(
      mutations.AckEmailCodeMutation,
      {
        email,
        code,
        key: emailCodeSendKey
      }
    )
    const { ackEmail = {} } = data
    setEmailCodeKeyRes(ackEmail)
  }

  const setPasswordMutation = async ({ email = '', password = ''}) => {
    handlers.reload()

    const data = await mutate(
      mutations.SetPassowordMutation,
      {
        email,
        password,
        key: emailCodeKey
      }
    )
    const { setPassword = {} } = data
    setPasswordRes(setPassword)

    handlers.reload()
  }

  const setEmailCodeSendKeyRes = (res) => {
    const { isSuccess = false, key = '', extension = {} } = res
    if (isSuccess) {
      setEmailCodeTimer(300)
      setEmailCodeSendKey(key)
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`发送失败: ${messStr}`)
    }
  }

  const setEmailCodeKeyRes = (res) => {
    const { isSuccess = false, key = '', extension = {} } = res
    if (isSuccess) {
      setEmailCodeKey(key)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr } = errors[0]
      message.error(`验证失败: ${messStr}`)
    }
  }

  const setPasswordRes = (res) => {
    const { isSuccess = false, extension = {} } = res
    if (isSuccess) {
      message.success('密码修改成功')
      handlers.goBack()
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`设置失败: ${messStr}`)
    }
  }

  const compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  return (
    <section className={`${Less['password-setting']} password-setting`}>
      <section className={Less['main']}>
        <Card
          title="Now"
          headStyle={{fontSize: '36px', textAlign: 'center'}}
          style={{borderRadius: '0', height: '100%'}}
        >
          <Form onSubmit={handleSubmit} style={{width: '350px', margin: 'auto'}} >
            <FormItem
              label={(
                <span>
                  邮箱
                  {
                    emailCodeKey ?
                    <Tag className={Less['email-alert']} color="green"><Icon type="check-circle" /> 通过验证</Tag> :
                    <Tag className={Less['email-alert']} color="blue" ><Icon type="exclamation-circle" /> 等待验证</Tag>
                  }
                </span>
              )}
              required={false}
              colon={false}
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: '请输入电子邮箱'
                }, {
                  type: 'email',
                  message: '邮箱格式不正确,请修改!'
                }]
              })(
                <Row>
                  <Col span={24}>
                    <Input disabled={emailCodeKey} onChange={handleEmailChange} />
                  </Col>
                  {!emailCodeKey && <Col className={Less['float-button']}>
                    <Button disabled={emailCodeTimer - 240 > 0} onClick={handleSendCodeClick} style={{width: '100%', textAlign: 'center'}}>{emailCodeTimer - 240 > 0 && emailCodeTimer - 240} 发送</Button>
                  </Col>}
                </Row>
              )}
            </FormItem>
            {emailCodeSendKey && !emailCodeKey && <FormItem
              label="验证码"
              required={false}
              colon={false}
            >
            {getFieldDecorator('code', {
                rules: [{
                  required: true,
                  message: '请输入邮箱验证码'
                }]
              })(
                <Row>
                  <Col span={24}>
                    <Input />
                  </Col>
                  <Col className={Less['float-button']}>
                    <Button disabled={!emailCodeSendKey} onClick={handAckEmailCodeClick} style={{width: '100%', textAlign: 'center'}}>验证</Button>
                  </Col>
                </Row>
              )}
            </FormItem>}
            <Divider />
            <FormItem
              label="密码"
              required={false}
              colon={false}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码'
                }]
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              label="确认密码"
              required={false}
              colon={false}
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true,
                  message: '请输入确认密码'
                }],
                validator: compareToFirstPassword
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem>
              <Row type="flex" justify="space-between">
                <Col span={6}>
                  <Button onClick={handleCancel} style={{width: '100%', textAlign: 'center'}}>取消</Button>
                </Col>
                <Col span={6} offset={1}>
                  <Button style={{width: '100%', textAlign: 'center'}} type="primary" htmlType="submit">确认</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Card>
      </section>
    </section>
  )
}

export default Form.create()(PasswordSetting)
