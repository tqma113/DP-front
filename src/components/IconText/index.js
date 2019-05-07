import React from 'react'
import { Icon, Tooltip } from 'antd'

const IconText = ({ type, text, onClick, theme }) => (
  <span>
    <Tooltip title={type}><Icon onClick={onClick} theme={theme} type={type} style={{ marginRight: 8 }} /></Tooltip>
    {text}
  </span>
);

export default IconText
