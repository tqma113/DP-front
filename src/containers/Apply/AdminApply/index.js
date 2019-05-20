import React, { useEffect, useState } from 'react'
import { Spin, message, Form, Input, Steps, DatePicker, Button } from 'antd'
import moment from 'moment'

import Less from './index.module.less'

const TextArea = Input.TextArea
const Step = Steps.Step

const formItemLayout = {
  labelCol: { span:8 },
  wrapperCol: { span: 10 },
}

const tailFormItemLayout = {
  wrapperCol: {
    span: 10,
    offset: 12,
  },
}

const AdminApply = (props) => {
  const {
    store = {},
    handlers = {},
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
  } = props
  const { users = {}, categorys = [], industrys = [], session = {}, loadStatus, adminApplications = [] } = store
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}
  const application = adminApplications[0]

  const [loading, setLoading] = useState(true)
  const [reason, setReason] = useState()
  const [editStatus, setEditStatus] = useState(false)

  useEffect(() => {
    loadApplications()
  }, [])

  const handleSubmitClick = () => {
    if (reason) {
      if (application) {
        changeApplyAdmin()
      } else {
        applyAdmin()
      }
    } else {
      message.info('请填写申请原因')
    }
  }

  const handleReasonChange = (e) => {
    setReason(e.target.value)
  }

  const handleEditClick = () => {
    setEditStatus(true)
  }

  const loadApplications = async (fetchPolicy) => {
    const data = await query(
      querys.QueryAdminApply,
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

  const applyAdmin = async (user) => {
    setLoading(true)

    const data = await mutate(
      mutations.ApplyAdminMutation,
      {
        reason
      }
    )
    const { applyAdmin: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications()
      setReason('')
      message.success('更新成功')
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  const changeApplyAdmin =  async () => {
    setLoading(true)

    const data = await mutate(
      mutations.ChangeAdminMutation,
      {
        id: Number(application.id),
        reason
      }
    )
    const { changeApplyAdmin: { isSuccess } = {} } = data

    if (isSuccess) {
      loadApplications()
      setReason('')
      message.success('更新成功')
    } else {
      message.info('更新失败请重试')
      setLoading(false)
    }
  }

  return (
    <div className={Less['admin-apply']}>
      <Spin spinning={loading}>
        <Steps
          size="small"
          current={application ? application.status == 1 ? 2 : 1 : 0}
          status={application && application.status == 2 ? 'error' : ''}
        >
          <Step title="填写" />
          <Step title="审核中" />
          <Step title="审核通过" />
        </Steps>
        <Form {...formItemLayout} style={{ marginTop: '100px' }}>
          <Form.Item label="原因">
            <TextArea
              disabled={editStatus ? false : application ? true : false}
              onChange={handleReasonChange}
              value={editStatus ? reason : (application ? application.reason : reason)}
              autosize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>
          {application &&
            <Form.Item label="申请时间">
              <DatePicker style={{ width: '100%'}} disabled value={moment(application.apply_time)} />
            </Form.Item>
          }
          {
            application && application.status != 0 &&
            <React.Fragment>
              <Form.Item
                label="处理人"
              >
                <Input disabled value={application.deal_user_id} />
              </Form.Item>
              <Form.Item
                label="处理时间"
              >
              <DatePicker style={{ width: '100%'}} disabled value={moment(application.deal_time)} />
              </Form.Item>
            </React.Fragment>
          }
          {
            !application || editStatus ?
            <Form.Item {...tailFormItemLayout}>
              <Button onClick={handleSubmitClick} type="primary">提交</Button>
            </Form.Item> :
            <Form.Item {...tailFormItemLayout}>
              <Button onClick={handleEditClick} type="primary" disabled={!application}>编辑</Button>
            </Form.Item>
          }
        </Form>
      </Spin>
    </div>
  )
}

export default AdminApply
