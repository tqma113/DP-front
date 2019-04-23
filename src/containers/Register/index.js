import React from 'react'
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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSendKey: '',
      emailKey: '',
      usernameKey: '',
      usernameKeyStatus: 0,
      imageUrl: '',
      emailCodeTimer: 0,
      interval: null
    }
  }

  componentDidMount() {
    const { handlers } = this.props
    handlers.onload()
  }

  componentWillUnmount() {
    const { interval } = this.state
    if (interval) {
      clearInterval(interval)
    }
  }

  handleUploadLoad = (image, imageUrl, imageBase64) => {
    this.setState({
      imageUrl
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { emailKey, usernameKey, imageUrl } = this.state
    const { form } = this.props
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

      this.registerMutation({...values, emailKey, usernameKey})
    })
  }

  handleSendEmailCodeClick = () => {
    const { form } = this.props
    form.validateFieldsAndScroll(['email'], async (err, values) => {
      if (err) {
        message.warn('请完善邮箱格式')
        return
      }

      this.setState({
        emailKey: '',
        emailSendKey: ''
      })

      this.sendEmailCodeMutation(values)
    })
  }

  handleAckEmailCodeClick = () => {
    const { form } = this.props
    form.validateFieldsAndScroll(['code', 'email'], async (err, values) => {
      if (err) {
        message.warn('请完善邮箱格式')
        return
      }

      this.setState({
        emailKey: '',
      })

      this.ackEmailCodeMutation(values)
    })
  }

  handleEmailChange = () => {
    if (this.state.emailKey) {
      this.setState({
        emailKey: '',
      })
    }

    if (this.state.emailSendKey) {
      this.setState({
        emailSendKey: ''
      })
    }
  }

  handleUsernameLeave = () => {
    const { form } = this.props
    const { usernameKey, usernameKeyStatus } = this.state

    if (usernameKey && usernameKeyStatus === 2) return

    form.validateFieldsAndScroll(['username'], async (err, values) => {
      if (err) {
        message.warn('请完善邮箱格式')
        return
      }

      this.setState({
        usernameKeyStatus: 1,
      })

      this.checkUsernameMutation(values)
    })
  }

  handlerUsernameChange = () => {
    const { usernameKey, usernameKeyStatus } = this.state
    if (usernameKey) {
      this.setState({
        usernameKey: ''
      })
    }

    if (usernameKeyStatus !== 0) {
      this.setState({
        usernameKeyStatus: 0
      })
    }
  }

  sendEmailCodeMutation = async ({ email = '' }) => {
    const { client, mutations = {} } = this.props
    try {
      const res = await client.mutate({
        mutation: mutations.SendEmailCodeMutation,
        variables: {
          email
        }
      })
      const { data = {} } = res
      const { sendEmailCode = {} } = data
      this.setEmailCodeKey(sendEmailCode)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  ackEmailCodeMutation = async ({ code = '', email = '' }) => {
    const { client, mutations = {} } = this.props
    const { emailSendKey } = this.state
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
      this.setEmailKey(ackEmail)
    } catch (err) {
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  checkUsernameMutation = async ({ username = '' }) => {
    const { client, mutations = {} } = this.props
    try {
      const res = await client.mutate({
        mutation: mutations.CheckUsernameMutation,
        variables: {
          username
        }
      })
      const { data = {} } = res
      const { checkUsername = {} } = data
      this.setUsernameKey(checkUsername)
    } catch (err) {
      this.setState({
        usernameKeyStatus: 0,
      })
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  registerMutation = async ({ username = '', nickname = '', email = '', gender = '', birthday = '', address = '', statement = '' }) => {
    const { client, mutations = {}, handlers } = this.props
    const { usernameKey, emailKey, imageUrl } = this.state
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
      this.setRegister(register)
    } catch (err) {
      handlers.onload()
      Modal.error({
        title: '请求发送失败,请重试'
      })
    }
  }

  setEmailCodeKey = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      this.setState({
        emailSendKey: key
      })
      this.startCodeTimer()
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      Modal.error({
        title: message
      })
    }
  }

  setEmailKey = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      this.setState({
        emailKey: key
      })
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      Modal.error({
        title: message
      })
    }
  }

  setUsernameKey = (res) => {
    const { isSuccess = false, key = '', extension = {} }  = res
    if (isSuccess) {
      this.setState({
        usernameKey: key,
        usernameKeyStatus: 2
      })
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      this.setState({
        usernameKeyStatus: 0,
      })
      Modal.error({
        title: message
      })
    }
  }

  setRegister = (res) => {
    const { handlers } = this.props
    const { isSuccess = false, username = '', token = '', extension = {} }  = res
    if (isSuccess) {
      handlers.login({
        token,
        username
      })
      Modal.success({
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

  startCodeTimer = () => {
    let interval = setInterval(()=> {
      this.setState({
        emailCodeTimer: this.state.emailCodeTimer - 1
      })
      if (this.state.emailCodeTimer === 0) {
        clearInterval(this.state.usernameKey)
        this.setState({
          interval: null
        })
      }
    }, 1000)
    this.setState({
      emailCodeTimer: 60,
      interval
    })
  }

  render() {
    const { form } = this.props
    const { emailKey, emailSendKey, usernameKeyStatus, emailCodeTimer } = this.state
    const { getFieldDecorator, getFieldValue } = form

    const code = getFieldValue('code') || ''
    const canCodeInputVision = emailSendKey && !emailKey
    const isCodeInputDisable = !emailSendKey || !!emailKey
    const isCodeButtonDisable = !emailSendKey || !!emailKey || !code || code.length !== 6

    return (
      <section className={`${Less['register']} register`}>
        <section className={`${Less['main']} main`}>
          <h1 className={Less['title']}>Now</h1>
          <Divider className={Less['divider']} />
          <Row type="flex" justify="space-between">
            <Col span={14}>
              <Form onSubmit={this.handleSubmit}>
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
                    <Input onChange={this.handlerUsernameChange} onBlur={this.handleUsernameLeave} />
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
                        <Input />
                      </Col>
                      <Col span={7}>
                        <Button disabled={emailCodeTimer > 0} onClick={this.handleSendEmailCodeClick} className={Less['send-email-code-button']}>{emailCodeTimer > 0 && emailCodeTimer} 发送验证码</Button>
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
                    }]
                  })(
                    <Row type="flex" justify="space-between">
                      <Col span={16}>
                        <Input disabled={isCodeInputDisable} />
                      </Col>
                      <Col span={7}>
                        <Button onClick={this.handleAckEmailCodeClick} disabled={isCodeButtonDisable} className={Less['send-email-code-button']}>验证</Button>
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
                          {genderOptions.map(o => <Option key={o.key} value={o.value}>{o.title}</Option>)}
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
                <SingleUpload onLoad={this.handleUploadLoad} />
              </FormItem>
            </Col>
          </Row>
        </section>
      </section>
    )
  }
}

export default Form.create()(Register)
