import React from 'react'
import { Divider, Form, Input, Row, Col, Select, DatePicker, Button, Tag, Checkbox, Icon, Upload, message } from 'antd'

import getBase64 from '@utils/getBase64'

import Less from './index.module.less'
import './index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailKey: '',
      usernameKey: '',
      emailCodeStatus: 0,
      imageUrl: '',
      image: null,
      imageBease64: '',
      uploading: false
    }
  }
  componentDidMount() {
    const { handlers } = this.props
    handlers.onload()
  }

  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    } else {
      this.setState({
        ...this.state,
        image: file
      })
      getBase64(file).then(base64 => this.setState({
        ...this.state,
        imageBease64: base64
      }))
    }

    return false
  }

  handleUploadChange = ({ fileList }) => {

  }

  handleUploadClick = () => {
    const { image, imageBease64, uploading } = this.state

    if (uploading) {
      return
    }

    this.setState({
      uploading: true,
    });


  }

  render() {
    const { form } = this.props
    const { emailKey, emailCodeStatus, imageUrl, uploading, image, imageBease64 } = this.state
    const { getFieldDecorator } = form

    return (
      <section className={`${Less['register']} register`}>
        <section className={`${Less['main']} main`}>
          <h1 className={Less['title']}>Now</h1>
          <Divider className={Less['divider']} />
          <Row type="flex" justify="space-between">
            <Col span={14}>
              <Form>
                <FormItem
                  label="账号"
                  colon={false}
                  required={false}
                >
                  {getFieldDecorator('username', {
                    rules: [{
                      required: true,
                      message: '请输入账号'
                    }]
                  })(
                    <Input />
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
                      <Col span={6}>
                        <Button className={Less['send-email-code-button']}>发送验证码</Button>
                      </Col>
                    </Row>
                  )}
                </FormItem>
                {emailCodeStatus === 1 && <FormItem
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
                        <Input disabled={emailCodeStatus !== 1} />
                      </Col>
                      <Col span={6}>
                        <Button disabled={emailCodeStatus !== 1} className={Less['send-email-code-button']}>验证</Button>
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
                        <Select></Select>
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
                    rules: []
                  })(
                    <TextArea autosize={{ minRows:4, maxRows: 4 }} />
                  )}
                </FormItem>
                <Form.Item>
                  {getFieldDecorator('agreement', {
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
                <Upload
                  accept="image/*"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleUploadChange}
                >
                  {imageUrl ?
                    <img className={Less['image']} src={imageUrl} alt="avatar" /> :
                    imageBease64 ?
                    <img className={Less['image']} src={imageBease64} alt="avatar" /> :
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">选择图片</div>
                    </div>
                  }
                </Upload>
              </FormItem>
              <FormItem>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={!imageBease64}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? '上传中' : '开始上传' }
              </Button>
              </FormItem>
            </Col>
          </Row>
        </section>
      </section>
    )
  }
}

export default Form.create()(Register)
