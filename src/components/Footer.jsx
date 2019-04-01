import React from 'react'

import Animate from '@style/animate.css'
import LessStyle from '@lessStyle/footer.less'

const Footer = (props) => {


  return (
    <footer className={`${LessStyle.container} ${Animate.animated} ${Animate.slideInUp}`}>
      <section className={LessStyle.main}>
        <h1 className={LessStyle.copyright}>Copyright © 2016-2018 Ma Tianqi</h1>
      </section>
    </footer>
  )
}

export default Footer
