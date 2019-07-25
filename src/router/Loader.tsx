import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Loader: React.FC<{}> = (props: React.ComponentProps<typeof Loader>) => {

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default Loader