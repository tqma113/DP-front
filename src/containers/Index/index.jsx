import React, { useState, useEffect } from 'react'

import Less from './index.module.less'

const Index = (props) => {
  const { handlers = {}, store = {} } = props
  const { loadStatus } = store

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  return (
    <section className={Less['index']}>
      <p>Hello World!</p>
    </section>
  )
}

export default Index
