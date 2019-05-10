import React from 'react'
import { Form, Button } from 'antd'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css'

const controls = ['emoji', 'font-family', 'link']

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <BraftEditor
        onChange={onChange}
        value={value}
        controls={controls}
        contentStyle={{ height: '100px', border: '1px solid #CCC', borderTop: '0'}}
      />
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
