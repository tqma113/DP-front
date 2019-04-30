import React, { useState, useEffect } from 'react'

const Index = (props) => {
  const { handlers = {}, store = {} } = props
  const { loadStatus } = store

  useEffect(() => {
    handlers.onload({ loadStatus })
  })

  return (
    <section>
      <p>Hello World!</p>
    </section>
  )
}

export default Index
