import React, { useState, useEffect } from 'react'
import { Divider, Form, Input, Row, Col, Select, DatePicker, Button, Tag, Checkbox, Icon, message, Modal } from 'antd'

import { SingleUpload } from '@components'

import Less from './index.module.less'
import './index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

const genderOptions = [{
  title: '保密',
  value: 'Secrecy'
}, {
  title: '男士',
  value: 'Male'
}, {
  title: '女士',
  value: 'Female'
}]

const Register = (props) => {
  const [emailSendKey, setEmailSendKey] = useState()
  const [emailKey, setEmailKey] = useState()
  const [usernameKey, setUsernameKey] = useState()
  const [usernameKeyStatus, setUsernameKeyStatus] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [emailCodeTimer, setEmailCodeTimer] = useState()

  useEffect(() => {
    if (emailCodeTimer > 0) {
      let timeout = setTimeout(() => {
        setEmailCodeTimer(emailCodeTimer - 1)
        clearTimeout(timeout)
      }, 1000)
    }
  }, [emailCodeTimer])

  useEffect(() => {
    handlers.onload()
  })

  const { handlers = {}, form = {}, client = {}, mutations = {} } = props


  const { getFieldDecorator, getFieldValue } = form

  const code = getFieldValue('code') || ''
  const canCodeInputVision = emailSendKey && !emailKey
  const isCodeInputDisable = !emailSendKey || !!emailKey
  const isCodeButtonDisable = !emailSendKey || !!emailKey || !code || code.length !== 6

  const handleUploadLoad = (image, imageUrl, imageBase64) => {
    setImageUrl(imageUrl)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return

      if (!emailKey) {
        Modal.info({
          title: '邮箱还未验证'
        })
        return
      }

      if (!usernameKey) {
        Modal.info({
          title: '账号还未验证'
        })
        return
      }

      if (!imageUrl) {
        Modal.info({
          title: '请上传头像'
        })
        return
      }

      registerMutation({...values, emailKey, usernameKey})
    })
  }

  const handleSendEmailCodeClick = () => {
    form.validateFieldsAndScroll(['email'], async (err, values) => {
      if (err) {
        message.warn('请完善邮箱格式')
        return
      }
      setEmailSendKey('')
      setEmailKey('')

      sendEmailCodeMutation(values)
    })
  }

  const handleAckEmailCodeClick = () => {
    form.validateFieldsAndScroll(['code', 'email'], async (err, values) => {
      if (err) {
        message.warn('请完善邮箱格式')
        return
      }

      setEmailKey('')

      ackEmailCodeMutation(values)
    })
  }

  const handleEmailChange = () => {
    if (emailKey) {
      setEmailKey('')
    }

    if (emailSendKey) {
      setEmailSendKey('')
    }
  }

  const handleUsernameLeave = () => {
    if (usernameKey && usernameKeyStatus === 2) return

    form.validateFieldsAndScroll(['username'], async (err, values) => {
      if (err) {
        message.warn('请完善邮箱格式')
        return
      }

      setUsernameKeyStatus(1)

      checkUsernameMutation(values)
    })
  }

  const handlerUsernameChange = () => {
    if (usernameKey) {
      setUsernameKey('')
    }

    if (usernameKeyStatus !== 0) {
      setUsernameKeyStatus(0)
    }
  }

  const sendEmailCodeMutation = async ({ email = '' }) => {
    try {
      const res = await client.mutate({
        mutation: mutations.SendEmailCodeMutation,
        variables: {
          email
        }
      })
      const { data = {} } = res
      const { sendEmailCode = {} } = data
      setEmailCodeKey(sendEmailCode)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const ackEmailCodeMutation = async ({ code = '', email = '' }) => {
    try {
      const res = await client.mutate({
        mutation: mutations.AckEmailCodeMutation,
        variables: {
          code,
          email,
          key: emailSendKey
        }
      })
      const { data = {} } = res
      const { ackEmail = {} } = data
      setEmailKeyRes(ackEmail)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const checkUsernameMutation = async ({ username = '' }) => {
    try {
      const res = await client.mutate({
        mutation: mutations.CheckUsernameMutation,
        variables: {
          username
        }
      })
      const { data = {} } = res
      const { checkUsername = {} } = data
      setUsernameKeyRes(checkUsername)
    } catch (err) {
      setUsernameKeyStatus(0)
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const registerMutation = async ({ username = '', nickname = '', email = '', gender = '', birthday = '', address = '', statement = '' }) => {
    handlers.reload()
    try {
      const res = await client.mutate({
        mutation: mutations.RegisterMutation,
        variables: {
          username,
          nickname,
          address,
          birthday,
          gender,
          email,
          statement,
          u_key: usernameKey,
          e_key: emailKey,
          hd_portrial: imageUrl
        }
      })
      const { data = {} } = res
      const { register = {} } = data
      setRegister(register)
    } catch (err) {
      handlers.onload()
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  const setEmailCodeKey = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      setEmailSendKey(key)
      setEmailCodeTimer(60)
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      Modal.error({
        title: message
      })
    }
  }

  const setEmailKeyRes = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      setEmailKey(key)
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      Modal.error({
        title: message
      })
    }
  }

  const setUsernameKeyRes = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      setUsernameKey(key)
      setUsernameKeyStatus(2)
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      setUsernameKeyStatus(0)
      Modal.error({
        title: message
      })
    }
  }

  const setRegister = (res) => {
    const { isSuccess = false, username = '', token = '', extension = {} }  = res
    if (isSuccess) {
      handlers.login({
        token,
        username
      })
      Modal.confirm({
        title: '注册成功',
        content: '是否前往设置密码(不设置密码可使用邮箱和验证码登录)',
        onCancel: () => {
          handlers.goBack()
        },
        onOk: () => {
          handlers.go('/password_setting')
        }
      })
    } else {
      handlers.onload()
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      Modal.error({
        title: message
      })
    }
  }

  return (
    <section className={`${Less['register']} register`}>
      <section className={`${Less['main']} main`}>
        <h1 className={Less['title']}>Now</h1>
        <Divider className={Less['divider']} />
        <Row type="flex" justify="space-between">
          <Col span={14}>
            <Form onSubmit={handleSubmit}>
              <FormItem
                label={(
                  <span>
                    账号
                    {
                      usernameKeyStatus === 2 ?
                      <Tag className={Less['email-alert']} color="green"><Icon type="check-circle" /> 通过验证</Tag> :
                      usernameKeyStatus === 1 ?
                      <Tag className={Less['email-alert']} color="blue" ><Icon type="loading" /> 等待验证</Tag>:
                      <Tag className={Less['email-alert']} color="blue" ><Icon type="exclamation-circle" /> 等待验证</Tag>
                    }
                  </span>
                )}
                colon={false}
                required={false}
              >
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '请输入账号'
                  }]
                })(
                  <Input onChange={handlerUsernameChange} onBlur={handleUsernameLeave} />
                )}
              </FormItem>
              <FormItem
                label="昵称"
                colon={false}
                required={false}
              >
                {getFieldDecorator('nickname', {
                  rules: [{
                    required: true,
                    message: '请输入昵称'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
              <Divider className={Less['divider-middle']} />
              <FormItem
                label={(
                  <span>
                    邮箱
                    {
                      emailKey ?
                      <Tag className={Less['email-alert']} color="green"><Icon type="check-circle" /> 通过验证</Tag> :
                      <Tag className={Less['email-alert']} color="blue" ><Icon type="exclamation-circle" /> 等待验证</Tag>
                    }
                  </span>
                )}
                colon={false}
                required={false}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: '请输入邮箱'
                  }, {
                    type: 'email',
                    message: '邮箱格式不正确,请修改!',
                  }]
                })(
                  <Row type="flex" justify="space-between">
                    <Col span={16}>
                      <Input onClick={handleEmailChange} />
                    </Col>
                    <Col span={7}>
                      <Button disabled={emailCodeTimer > 0} onClick={handleSendEmailCodeClick} className={Less['send-email-code-button']}>{emailCodeTimer > 0 && emailCodeTimer} 发送验证码</Button>
                    </Col>
                  </Row>
                )}
              </FormItem>
              {canCodeInputVision && <FormItem
                label="验证码"
                colon={false}
                required={false}
              >
                {getFieldDecorator('code', {
                  rules: [{
                    required: true,
                    message: '请输入验证码'
                  }, {
                    len: 6,
                    message: '请输入正确的验证码(六位)!'
                  }]
                })(
                  <Row type="flex" justify="space-between">
                    <Col span={16}>
                      <Input disabled={isCodeInputDisable} />
                    </Col>
                    <Col span={7}>
                      <Button onClick={handleAckEmailCodeClick} disabled={isCodeButtonDisable} className={Less['send-email-code-button']}>验证</Button>
                    </Col>
                  </Row>
                )}
              </FormItem>}
              <Divider className={Less['divider-middle']} />
              <Row>
                <Col span={11}>
                  <FormItem
                    label="性别"
                    colon={false}
                    required={false}
                  >
                    {getFieldDecorator('gender', {
                      rules: [{
                        required: true,
                        message: '请选择性别'
                      }]
                    })(
                      <Select>
                        {genderOptions.map((o, index) => <Option key={index} value={o.value}>{o.title}</Option>)}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} offset={2}>
                  <FormItem
                    label="出生日期"
                    colon={false}
                    required={false}
                  >
                    {getFieldDecorator('birthday', {
                      rules: [{
                        required: true,
                        message: '选择出生日期'
                      }]
                    })(
                      <DatePicker placeholder="" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem
                label="地址"
                colon={false}
                required={false}
              >
                {getFieldDecorator('address', {
                  rules: [{
                    required: true,
                    message: '请输入地址'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="个人说明"
                colon={false}
                required={false}
              >
                {getFieldDecorator('statement', {
                  rules: [{
                    required: true,
                    message: '请输入个人说明'
                  }]
                })(
                  <TextArea autosize={{ minRows:4, maxRows: 4 }} />
                )}
              </FormItem>
              <Form.Item>
                {getFieldDecorator('agreement', {
                  rules: [{
                    required: true,
                    message: '请阅读用户协议并勾选'
                  }],
                  valuePropName: 'checked',
                })(
                  <Checkbox>我已阅读并同意 <a>用户协议</a></Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                <Button className={Less['register-button']} type="primary" htmlType="submit">注册</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <FormItem
              label="头像"
              colon={false}
              required={false}
            >
              <SingleUpload onLoad={handleUploadLoad} />
            </FormItem>
          </Col>
        </Row>
      </section>
    </section>
  )
}

export default Form.create()(Register)
