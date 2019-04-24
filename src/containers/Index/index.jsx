import React, { useState, useEffect } from 'react'

const Index = (props) => {
  const { handlers } = props

  useEffect(() => {
    handlers.onload()
  })

  return (
    <section>
      <p>Hello World!</p>
    </section>
  )
}

export default Index
