import React from 'react'

const Loader: React.FC<{}> = (props: React.ComponentProps<typeof Loader>) => {

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default Loader