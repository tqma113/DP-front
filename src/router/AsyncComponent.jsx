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
export default (loadComponent, store = false, module) => {
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

      if (store) {
        component = await map(component, module)
      }

      if (this.unmount) return

      this.setState({
        component: component
      })
    }

    componentWillUnmount() {
      this.unmount = true
    }

    render() {
      const C = this.state.component

      return (
        C ? <C { ...this.props} > </C> : null
      )
    }
  }


  return AsyncComponent
}
