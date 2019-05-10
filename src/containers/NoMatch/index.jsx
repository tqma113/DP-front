import React, { useEffect } from 'react'

import Less from './index.module.less'

const Footer = (props) => {
  const { handlers = {}, store = {} } = props
  const { loadStatus } = store

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  return (
    <section className={Less['notmatch']}>
      <section className={Less['main']}>
        <h1 className={Less['logo']}>Now</h1>
        <p><b>404</b> 这是一个错误</p>
        <p>请求的地址并不存在于这个服务器上</p>
        <p>这是我们所知道的全部</p>
      </section>
    </section>
  )
}

export default Footer
