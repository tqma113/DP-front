/**
 * 用于react router4 code splitting
 */
import React, {
  Component
} from 'react'

import map from '@map'


/**
 * @param {Function} loadComponent e.g: () => import('./component')
 * @param {boolean} store 是否为传入组件增加store
 */
export default (loadComponent) => {
  class AsyncComponent extends Component {
    unmount = false

    constructor() {
      super()

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      let {
        default: component
      } = await loadComponent()

      component = await map(component, this.props.module)

      if (this.unmount) return

      this.setState({
        component: component
      })
    }

    componentWillUnmount() {
      this.unmount = true
    }

    render() {
      const { history, store, handlers, ...rest } = this.props
      const C = this.state.component

      return (
        C ? <C {...rest}> </C> : null
      )
    }
  }


  return AsyncComponent
}
