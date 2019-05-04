import React from 'react'
import { Icon } from 'antd'

const IconText = ({ type, text, onClick, theme }) => (
  <span>
    <Icon onClick={onClick} theme={theme} type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default IconText
