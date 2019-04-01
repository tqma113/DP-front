import React from 'react'

import map from '@map'

import Loading from '@components/Loading'
import Animate from '@style/animate.css'


class SessionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      session: false
    }
  }

  componentDidMount() {
    this.checkSessionState()
  }

  setSession = () => {
    this.setState({
      session: true
    })
  }

  checkSessionState = () => {
    let user = localStorage.getItem('last_user')
    let account = sessionStorage.getItem('account')
    if(account && typeof account === 'string') {
      this.verifyUserId(account)
    } else {
      if(user && typeof user === 'string') {
        this.verifyUserId(user)
      } else {
        this.props.handlers.logOut()
        if(this.props.session) {
          this.props.history.push('/sign')
        } else {
          this.setSession()
        }
      }
    }
  }

  verifyUserId = (account) => {
    let sessionKey = sessionStorage.getItem('sessionKey')
    if(sessionKey && typeof sessionKey === 'string') {
      this.verifySessionKey(account, sessionKey)
    } else {
      this.setUserInfo(account)
      if(this.props.session) {
        this.props.history.push('/sign')
      } else {
        this.setSession()
      }
    }
  }
  
  verifySessionKey = (account ,sessionKey) => {
    this.props.post('/session', {
      account,
      sessionKey
    }, (res) => {
      this.props.handlers.setAccount(account)
      this.setUserInfo(account)
      this.props.handlers.signIn(res.data.sessionKey ? res.data.sessionKey : sessionKey)
      this.setSession()
    }, (err) => {
      this.setUserInfo(account)
      if(this.props.session) {
        this.props.history.push('/sign')
      } else {
        this.setSession()
      }
    })
  }
  
  setUserInfo(account) {
    this.props.post('/account', {
      account: account,
      type: 'userInfo'
    }, (res) => {
      this.props.handlers.setUserInfo(res.data.userInfo)
      this.props.handlers.setAccount(account)
    }, (err) => {
      this.props.handlers.logOut()
    })
  }

  render() {
    return (
      <React.Fragment> 
        {
          this.state.session ? this.props.children : null
        } 
        <Loading classInner = {
          this.props.store.loading.state ? Animate.zoomOut : Animate.zoomIn
        } store={this.props.store}/> 
      </React.Fragment>
    )
  }
}


export default map(SessionComponent)