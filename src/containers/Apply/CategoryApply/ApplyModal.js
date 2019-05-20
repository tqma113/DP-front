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
      querys.QueryCategoryApply,
      {},
      {
        fetchPolicy
      }
    )
    let { adminApply: { isSuccess, applications, extension = {} } = {} } = data

    if (isSuccess) {
      handlers.setAdminApplications({ adminApplications: applications })
      setLoading(false)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`数据下载失败: ${messStr}`)
    }
  }

  const handleSubmitClick = (props) => {
    validateFields((err, { subject, description }) => {
      if (err) return
      if (!image) {
        message.info('请上传图片')
        return
      }

      if (application) {
        changeApplyAdmin(subject, description)
      } else {
        applyAdmin(subject, description)
      }
    })

  }

  const applyAdmin = async (subject, description) => {
    setLoading(true)

    const data = await mutate(
      mutations.ApplyAddCategoryMutation,
      {
        subject,
        description,
        image
      }
    )
    const { applyAddCategory: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications()
      message.success('更新成功')
      onClose()
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  const changeApplyAdmin =  async (subject, description) => {
    setLoading(true)

    const data = await mutate(
      mutations.ChangeAdminMutation,
      {
        id: Number(application.id),
        subject,
        description,
        image
      }
    )
    const { changeApplyAddCategory: { isSuccess } = {} } = data

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
            {getFieldDecorator('subject', {
              rules: [{
                required: true,
                message: '请输入主题'
              }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="主题"
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true,
                message: '请输入描述'
              }]
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
              <SingleAutoUpload onLoad={handleUpload} />
            )}
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default Form.create()(ApplyModal)
