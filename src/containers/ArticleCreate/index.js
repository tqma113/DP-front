import React, { useState, useEffect } from 'react'

import Less from './index.module.less'

const ArticleCreate = (props) => {
  const { store, handlers } = props
  const { loadStatus } = store

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  return (
    <section></section>
  )
}

export default ArticleCreate
