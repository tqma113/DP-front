import React from 'react'
import { Modal } from 'antd'

const ReportModal = (props) => {
  const {
    store = {},
    isSelf = false,
    handlers = {},
    username = '',
    static: { api },
    mutate,
    mutations = {},
    query,
    querys = {},
    onEditClick,
    visible,
    onClose
  } = props
  const { users = {}, categorys = [], industrys = [], session = {} } = store
  const user = users[username] || {}
  const { info = {}, status } = session
  const { username: currentUsername, token } = info
  const currentUser = users[currentUsername] || {}

  const handleSubmit = () => {

  }

  return (
    <Modal
      title="举报"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
    >

    </Modal>
  )
}

export default ReportModal
