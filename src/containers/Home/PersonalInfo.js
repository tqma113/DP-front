import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Row, Col, message, Divider, Tag, Icon, Table, DatePicker, Spin } from 'antd'
import moment from 'moment'

import { SingleUpload } from '@components'
import Less from './personal-info.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

const degrees = [{
  title: '学士',
  value: 'BACHELOR'
}, {
  title: '硕士',
  value: 'MASTER'
}, {
  title: '博士',
  value: 'DOCTOR'
}, {
  title: '其他',
  value: 'OTHER'
}]

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

const PersonalInfo = (props) => {
  const { form = {}, user = {}, mutate, mutations = {}, store = {}, handlers = {}, query, querys = {} } = props
  const { getFieldDecorator, resetFields, setFieldsValue, validateFields } = form
  const {
    username,
    nickname,
    statement,
    avatar,
    email,
    gender,
    birthday,
    eduBG: psEduBG = [],
    emRecords: psEmRecords = [],
    secQuestions: psSecQuestions = []
  } = user
  const { industrys = [], categorys = [] } = store

  const [emailCodeSendKey, setEmailCodeSendKey] = useState()
  const [emailCodeKey, setEmailCodeKey] = useState()
  const [emailCodeTimer, setEmailCodeTimer] = useState()
  const [emailCodeKeyTimer, setEmailCodeKeyTimer] = useState()

  const [eduBG, setEduBG] = useState([])
  const [emRecords, setEmRecords] = useState([])
  const [secQuestions, setSecQuestions] = useState([])
  const [image, setImage] = useState()

  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    setEduBG(psEduBG)
    setEmRecords(psEmRecords)
    setSecQuestions(psSecQuestions)
  }, [])

  useEffect(() => {
    if (emailCodeTimer > 0) {
      let timeout = setTimeout(() => {
        setEmailCodeTimer(emailCodeTimer - 1)
        clearTimeout(timeout)
      }, 1000)
    }
    if (emailCodeTimer === 0 && !emailCodeKey) {
      setEmailCodeSendKey()
    }
  }, [emailCodeTimer])

  useEffect(() => {
    if (emailCodeKeyTimer > 0) {
      let timeout = setTimeout(() => {
        setEmailCodeTimer(emailCodeKeyTimer - 1)
        clearTimeout(timeout)
      }, 1000)
    }
    if (emailCodeTimer === 0 && !emailCodeKey) {
      setEmailCodeSendKey()
      setEmailCodeKey()
    }
  }, [emailCodeKeyTimer])

  const handlerAvatarUpload = (image) => {
    setImage(image)
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
        position,
        id: company + position
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
        degree,
        id: school + major + degree
      })
      setEduBG(newEduBG)
      setFieldsValue({school: '', major: '', degree: undefined})
    })
  }

  const handleAddSecQuestion= () => {
    form.validateFields(['question', 'answer'], (err, { question, answer } ) => {
      if (err) return

      let newSecQuestions = secQuestions || []
      newSecQuestions.push({
        question,
        answer,
        id: question + answer
      })
      setSecQuestions(newSecQuestions)
      setFieldsValue({question: '', answer: ''})
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

  const handleDeleteSecQuestion = (index) => {
    let newSecQuestions = secQuestions
    newSecQuestions.splice(index, 1)
    setSecQuestions(newSecQuestions)
    setEduBG([])
  }

  const handleUpdateClick = () => {
    validateFields(
      ['nickname', 'statement', 'gender', 'birthday', 'industrys', 'categorys'],
      (err, { nickname, statement, gender, birthday, industrys, categorys}
    ) => {
      if (err) return

      if (!emailCodeKey) {
        message.info('请先验证邮箱')
        return
      }
      const user = {
        nickname,
        statement,
        gender,
        birthday,
        industryIds: industrys.map(i => Number(i)),
        categoryIds: categorys.map(i => Number(i)),
        eduBG,
        emRecords,
        secQuestions,
        avatar: image
      }
      updateUser(user)
    })
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
    const data = await mutate(mutations.AckEmailCodeMutation,
      {
        email,
        code,
        key: emailCodeSendKey
      }
    )
    const { ackEmail } = data
    setEmailCodeKeyRes(ackEmail)
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
      setEmailCodeKeyTimer(300)
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`验证失败: ${messStr}`)
    }
  }

  const updateUser = async (user) => {
    setSpinning(true)

    const data = await mutate(
      mutations.ChangeUserInfoMutation,
      {
        email,
        key: emailCodeKey,
        ...user
      }
    )
    const { changeUserInfo: { isSuccess } = {} } = data

    if (isSuccess) {
      loadUser(username)
      setEmailCodeKey()
      setEmailCodeKeyTimer()
      setEmailCodeSendKey()
      setEmailCodeTimer()
      message.success('更新成功')
    } else {
      message.info('更新失败请重试')
      setSpinning(false)
    }
  }

  const loadUser = async (username) => {
    const data = await query(
      querys.QueryUsers,
      {
        usernames: [username]
      }
    )
    const { users: { users = [], isSuccess, extension = {} } = {} } = data
    if (isSuccess) {
      handlers.setUsers({ users })
      resetFields()
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据更新失败: ${messStr}`)
    }

    setSpinning(false)
  }

  const emRecordsColumns = [{
    title: '公司',
    dataIndex: 'company',
    key: 'company'
  }, {
    title: '职位',
    dataIndex: 'position',
    key: 'position'
  }, {
    title: '操作',
    render: (item, record, index) => (
      <Icon onClick={() => handleDeleteEmRecord(index)} type="close" />
    )
  }]
  const secQuestionsColumns = [{
    title: '问题',
    dataIndex: 'question',
    key: 'question'
  }, {
    title: '答案',
    dataIndex: 'answer',
    key: 'answer'
  }, {
    title: '',
    render: (item, record, index) => (
      <Icon onClick={() => handleDeleteSecQuestion(index)} type="close" />
    )
  }]

  const eduBGColumns = [{
    title: '学校',
    dataIndex: 'school',
    key: 'school'
  }, {
    title: '专业',
    dataIndex: 'major',
    key: 'major'
  }, {
    title: '学位',
    dataIndex: 'degree',
    key: 'degree'
  }, {
    title: '',
    render: (item, record, index) => (
      <Icon onClick={() => handleDeleteEduBG(index)} type="close" />
    )
  }]

  return (
    <Row type="flex" justify="space-between">
      <Col>
        <Spin delay={500} spinning={spinning}>
          <Form style={{width: '400px'}}>
            <Form.Item
              label="用户名"
              colon={false}
            >
              <Input disabled={true} value={username} />
            </Form.Item>
            <Divider />
            <Form.Item
              label={(
                <span>
                  邮箱&nbsp;&nbsp;
                  {
                    emailCodeKey ?
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
                  <Button disabled={emailCodeTimer - 240 > 0} onClick={handleSendCodeClick} style={{width: '100%', textAlign: 'center'}}>{emailCodeTimer - 240 > 0 && emailCodeTimer - 240} 发送</Button>
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
            <FormItem
              label="性别"
              colon={false}
              required={false}
            >
              {getFieldDecorator('gender', {
                rules: [{
                  required: true,
                  message: '请选择性别'
                }],
                initialValue: gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : undefined
              })(
                <Select>
                  {genderOptions.map((o, index) => <Option key={index} value={o.value}>{o.title}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="出生日期"
              colon={false}
              required={false}
            >
              {getFieldDecorator('birthday', {
                rules: [{
                  required: true,
                  message: '选择出生日期'
                }],
                initialValue: moment(birthday, 'x')
              })(
                <DatePicker style={{ width: '100%'}} placeholder="" />
              )}
            </FormItem>
            <Form.Item
              label="个人说明"
              colon={false}
              required={false}
            >
              {getFieldDecorator('statement', {
                rules: [],
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
                rules: [],
                initialValue: user.industrys.map(i => i + '')
              })(
                <Select mode="multiple">
                  {industrys.map(item => (
                    <Option key={Number(item.id)} value={item.id}>{item.name}</Option>
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
                rules: [],
                initialValue: user.categorys.map(i => i + '')
              })(
                <Select mode="multiple">
                  {categorys.map(item => (
                    <Option key={Number(item.id)} value={item.id}>{item.subject}</Option>
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
                  rowKey="id"
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
                  rowKey="id"
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
            <Form.Item
              label="安全问题"
              colon={false}
              required={false}
            >
              {secQuestions && secQuestions.length > 0 &&
                <Table
                  className="components-table-demo-nested"
                  itemLayout="horizontal"
                  dataSource={secQuestions}
                  columns={secQuestionsColumns}
                  pagination={false}
                  rowKey="id"
                />
              }
              <Row type="flex" justify="space-between">
                <FormItem>
                  {getFieldDecorator('question', {
                    rules: [{
                      required: true,
                      message: '请填写问题'
                    }],
                  })(
                    <Input placeholder="问题"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('answer', {
                    rules: [{
                      required: true,
                      message: '请填写答案'
                    }],
                  })(
                    <Input placeholder="答案"/>
                  )}
                </FormItem>
              </Row>
              <Button onClick={handleAddSecQuestion} style={{width: '100%'}}>添加</Button>
            </Form.Item>
            <Divider />
            <Form.Item>
              <Button style={{width: '100%'}} onClick={handleUpdateClick} type="primary">更新</Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
      <Col>
        <SingleUpload onLoad={handlerAvatarUpload} img={avatar} />
      </Col>
    </Row>
  )
}

export default Form.create()(PersonalInfo)
