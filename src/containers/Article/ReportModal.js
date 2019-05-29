import React, { useState }  from 'react'
import { Modal, message, Form } from 'antd'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css'

const controls = ['emoji', 'font-family', 'link']
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 19 },
};

const ReportModal = (props) => {
  const {
    mutate,
    mutations = {},
    visible,
    onClose,
    article
  } = props

  const [reason, setReason] = useState()

  const handleSubmit = () => {
    if (reason && reason.toRAW().length > 0) {
      reportArticle(article.id, reason.toRAW())
    }
  }

  const handleReasonChange = (editorState) => {
    setReason(editorState)
  }

  const reportArticle = async (id, reason) => {
    let data = await mutate(
      mutations.ReportArticleMutation,
      {
        articleId: Number(id),
        reason
      }
    )
    const { reportArticle: { isSuccess } = {} } = data
    if (isSuccess) {
      message.success('举报成功')
      onClose()
    } else {
      message.error('举报失败,请重试')
    }
  }

  return (
    <Modal
      title="举报"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <Form
        {...formItemLayout}
      >
        <Form.Item
          label="文章"
        >
          {article.title}
        </Form.Item>
        <Form.Item
          label="用户"
        >
          {article.user.nickname}
        </Form.Item>
        <Form.Item
          label="原因"
        >
          <BraftEditor
            onChange={handleReasonChange}
            value={reason}
            controls={controls}
            contentStyle={{ height: '100px', border: '1px solid #CCC', borderTop: '0'}}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ReportModal
