import React, { useState } from 'react'
import { Modal, Spin, Form, Input, message, Button } from 'antd'
import { SingleAutoUpload } from '@components'

const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: { span:4 },
  wrapperCol: { span: 16 },
}

const tailFormItemLayout = {
  wrapperCol: {
    span: 16,
    offset: 4,
  },
}

const ApplyModal = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    visible,
    application,
    form = {},
    onClose
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, categoryApplications = [] } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}
  const { getFieldDecorator, validateFields } = form

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()

  const handleUpload = (image, url, imageBase64) => {
    setImage(url)
  }

  const loadApplications = async (fetchPolicy) => {
    const data = await query(
      querys.QueryIndustryApply,
      {},
      {
        fetchPolicy
      }
    )
    let { industryApply: { isSuccess, applications, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setIndustryApplications({ industryApplications: applications })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }

  const handleSubmitClick = (props) => {
    validateFields((err, { name, description }) => {
      if (err) return
      if (!image) {
        message.info('请上传图片')
        return
      }

      if (application) {
        changeApplyAdmin(name, description)
      } else {
        applyAdmin(name, description)
      }
    })

  }

  const applyAdmin = async (name, description) => {
    setLoading(true)

    const data = await mutate(
      mutations.ApplyAddIndustryMutation,
      {
        name,
        description,
        image
      }
    )
    const { applyAddIndustry: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications()
      message.success('更新成功')
      onClose()
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  const changeApplyAdmin =  async (name, description) => {
    setLoading(true)

    const data = await mutate(
      mutations.ChangeAddIndustryMutation,
      {
        id: Number(application.id),
        name,
        description,
        image
      }
    )
    const { changeApplyAddIndustry: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications()
      message.success('更新成功')
      onClose()
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmitClick}
      title="申请添加"
      width={800}
    >
      <Spin
        spinning={loading}
      >
        <Form {...formItemLayout}>
          <Form.Item
            label="主题"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入主题'
              }],
              initialValue: application ? application.name : ''
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="描述"
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true,
                message: '请输入描述'
              }],
              initialValue: application ? application.description : ''
            })(
              <TextArea autosize={{ maxRows: 4, minRows: 4 }} />
            )}
          </Form.Item>
          <Form.Item
            label="图片"
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true,
                message: '请上传图片'
              }]
            })(
              <SingleAutoUpload onLoad={handleUpload} img={application ? application.image : undefined} />
            )}
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default Form.create()(ApplyModal)
