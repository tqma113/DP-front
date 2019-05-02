import React from 'react'
import { Input, Form, Button } from 'antd'

const TextArea = Input.TextArea

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        发表评论
      </Button>
    </Form.Item>
  </div>
);

export default Editor
