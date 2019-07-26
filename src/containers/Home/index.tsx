import React from 'react'

interface Props {
  [propName: string]: any
}

interface State {

}

class Home extends React.Component<Props, State> {
  readonly state: State = {

  }
  
  render() {

    return (
      <div>Home</div>
    )
  }
}

export default Home