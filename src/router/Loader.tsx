import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Loader: React.FC = (props: Props) => {

  return (
    <div>
      {props.children}
    </div>
  )
}

export default Loader