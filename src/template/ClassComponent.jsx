import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'

class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      documentTitle: ''
    }
  }

  render() {
    return (
      <DocumentTitle title={this.state.documentTitle}>
        <section>ClassComponent</section>
      </DocumentTitle>
    )
  }
}

export default ClassComponent