import React from 'react';
import BaseLess from '@lessStyle/base.less'

const FunComponent = (props) => {
  // do something


  return (
    <section className={`${BaseLess.page_container}`}>
      <section className={`${BaseLess.page}`}>
        {
          props.children
        }
      </section>
    </section>
  )
}

export default FunComponent
