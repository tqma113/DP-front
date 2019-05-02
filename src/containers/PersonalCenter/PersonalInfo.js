import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Radio, Button, Row, Col, message, Divider, List, Icon, Card, Table } from 'antd'
import { SingleUpload } from '@components'

import Less from './personal-info.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

const degrees = [{
  title: '学士',
  value: 'bachelor'
}, {
  title: '硕士',
  value: 'master'
}, {
  title: '博士',
  value: 'doctor'
}, {
  title: '其他',
  value: 'other'
}]

const PersonalInfo = (props) => {
  const { form = {}, user = {}, mutate, mutations = {}, store } = props
  const { getFieldDecorator, getFieldsValue, resetFields, setFields, setFieldsValue, validateFields, validateFieldsAndScroll } = form
  const {
    id,
    username,
    nickname,
    statement,
    avatar,
    email,
    eduBG: psEduBG = [],
    emRecords: psEmRecords = [],
    categorys: psCategorys = [],
    industrys: psIndustrys = []
  } = user
  const { industrys = [], categorys = [] } = store

  const [emailCodeSendKey, setEmailCodeSendKey] = useState()
  const [emailCodeKey, setEmailCodeKey] = useState()
  const [emailCodeTimer, setEmailCodeTimer] = useState()

  const [eduBG, setEduBG] = useState([])
  const [emRecords, setEmRecords] = useState([])

  useEffect(() => {
    setEduBG(psEduBG)
    setEmRecords(psEmRecords)
  }, [])

  const handlerAvatarUpload = () => {

  }

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

  const handleAddEmRecord = () => {
    form.validateFields(['company', 'position'], (err, { company, position } ) => {
      if (err) return

      let newEmRecords = emRecords || []
      newEmRecords.push({
        company,
        position
      })
      setEmRecords(newEmRecords)
      setFieldsValue({company: '', position: ''})
    })
  }

  const handleAddEduBG = () => {
    form.validateFields(['school', 'major', 'degree'], (err, { school, major, degree } ) => {
      if (err) return

      let newEduBG = eduBG || []
      newEduBG.push({
        school,
        major,
        degree
      })
      setEduBG(newEduBG)
      setFieldsValue({school: '', major: '', degree: undefined})
    })
  }

  const handleDeleteEmRecord = (index) => {
    let newEmRecords = emRecords
    newEmRecords.splice(index, 1)
    setEmRecords(newEmRecords)
  }

  const handleDeleteEduBG = (index) => {
    let newEduBG = eduBG
    newEduBG.splice(index, 1)
    setEmRecords(newEduBG)
  }

  const handleUpdateClick = () => {

  }

  const sendCodeMutation = async ({ email = '' }) => {
    const data = await mutate(
      mutations.SendEmailLoginCodeMutation,
      {
        email
      }
    )
    const { sendEmailLoginCode } = data
    setEmailCodeSendKeyRes(sendEmailLoginCode)
  }

  const ackCodeMutation = async ({ email = '', code = ''}) => {
    const data = await mutate({
      mutation: mutations.AckEmailCodeMutation,
      variables: {
        email,
        code,
        key: emailCodeSendKey
      }
    })
    const { ackEmail } = data
    setEmailCodeKeyRes(ackEmail)
  }

  const setEmailCodeSendKeyRes = (res) => {
    const { isSuccess = false, key = '', extension = {} } = res
    if (isSuccess) {
      setEmailCodeTimer(60)
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
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`验证失败: ${messStr}`)
    }
  }

  const emRecordsColumns = [{
    title: '公司',
    dataIndex: 'company'
  }, {
    title: '职位',
    dataIndex: 'position'
  }, {
    title: '操作',
    render: (item, record, index) => (
      <Icon onClick={() => handleDeleteEmRecord(index)} type="close" />
    )
  }]

  const eduBGColumns = [{
    title: '学校',
    dataIndex: 'school'
  }, {
    title: '专业',
    dataIndex: 'major'
  }, {
    title: '学位',
    dataIndex: 'degree'
  }, {
    title: '操作',
    render: (item, record, index) => (
      <Icon onClick={() => handleDeleteEduBG(index)} type="close" />
    )
  }]

  return (
    <Row type="flex" justify="space-between">
      <Col>
        <Form style={{width: '400px'}}>
          <Form.Item
            label="用户名"
            colon={false}
          >
            <Input disabled={true} value={username} />
          </Form.Item>
          <Divider />
          <Form.Item
            label="邮箱"
            colon={false}
            required={false}
          >
            {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: '请输入电子邮箱'
                }, {
                  type: 'email',
                  message: '邮箱格式不正确,请修改!'
                }],
                initialValue: email
              })(
                <Input disabled={true} onChange={handleEmailChange} />
              )}
              {!emailCodeKey &&
                <Button disabled={emailCodeTimer > 0} onClick={handleSendCodeClick} style={{width: '100%', textAlign: 'center'}}>{emailCodeTimer > 0 && emailCodeTimer} 发送</Button>
              }
          </Form.Item>
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
              <Input />
            )}
            <Button disabled={!emailCodeSendKey} onClick={handAckEmailCodeClick} style={{width: '100%', textAlign: 'center'}}>验证</Button>
          </FormItem>}
          <Divider />
          <Form.Item
            label="昵称"
            colon={false}
            required={false}
          >
            {getFieldDecorator('nickname', {
              rules: [{
                required: true,
                message: '请输入电子邮箱'
              }],
              initialValue: nickname
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            label="个人说明"
            colon={false}
            required={false}
          >
            {getFieldDecorator('statement', {
              rules: [{
                required: true,
                message: '请输入个人说明'
              }],
              initialValue: statement
            })(
              <TextArea autosize={{ minRows:4, maxRows: 4 }} />
            )}
          </Form.Item>
          <Form.Item
            label="行业"
            colon={false}
            required={false}
          >
            {getFieldDecorator('industrys', {
              rules: [{
                required: true,
                message: '请选择您所从事的行业'
              }],
              initialValue: user.industrys
            })(
              <Select mode="multiple">
                {industrys.map(item => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="类别"
            colon={false}
            required={false}
          >
            {getFieldDecorator('categorys', {
              rules: [{
                required: true,
                message: '请选择您关注的话题'
              }],
              initialValue: user.categorys
            })(
              <Select mode="multiple">
                {categorys.map(item => (
                  <Option key={item.id} value={item.id}>{item.subject}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="学历"
            colon={false}
            required={false}
          >
            {eduBG && eduBG.length > 0 &&
              <Table
                className="components-table-demo-nested"
                itemLayout="horizontal"
                dataSource={eduBG}
                columns={eduBGColumns}
                pagination={false}
              />
            }
            <Row type="flex" justify="space-between">
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator('school', {
                    rules: [{
                      required: true,
                      message: '请填写学校'
                    }],
                  })(
                    <Input placeholder="学校" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator('major', {
                    rules: [{
                      required: true,
                      message: '请填写专业'
                    }],
                  })(
                    <Input placeholder="专业" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator('degree', {
                    rules: [{
                      required: true,
                      message: '请选择学位'
                    }],
                  })(
                    <Select placeholder="学位">
                      {degrees.map((item, index) => (
                        <Option key={index} value={item.value}>{item.title}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Button onClick={handleAddEduBG} style={{width: '100%'}}>添加</Button>
          </Form.Item>
          <Divider />
          <Form.Item
            label="工作经历"
            colon={false}
            required={false}
          >
            {emRecords && emRecords.length > 0 &&
              <Table
                className="components-table-demo-nested"
                itemLayout="horizontal"
                dataSource={emRecords}
                columns={emRecordsColumns}
                pagination={false}
              />
            }
            <Row type="flex" justify="space-between">
              <FormItem>
                {getFieldDecorator('company', {
                  rules: [{
                    required: true,
                    message: '请填写公司'
                  }],
                })(
                  <Input placeholder="公司"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('position', {
                  rules: [{
                    required: true,
                    message: '请填写职位'
                  }],
                })(
                  <Input placeholder="职位"/>
                )}
              </FormItem>
            </Row>
            <Button onClick={handleAddEmRecord} style={{width: '100%'}}>添加</Button>
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button style={{width: '100%'}} onClick={handleUpdateClick} type="primary">更新</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col>
        <SingleUpload onLoad={handlerAvatarUpload} img={avatar} />
      </Col>
    </Row>
  )
}

export default Form.create()(PersonalInfo)
