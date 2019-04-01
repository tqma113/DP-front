import React from 'react';

import { connect } from '@map';

import Router from '@router/index.jsx';


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
    let postData = {
      account,
      sessionKey
    }
    let success = (res) => {
      this.props.handlers.setAccount(account)
      this.setUserInfo(account)
      this.props.handlers.signIn(res.data.sessionKey ? res.data.sessionKey : sessionKey)
      this.setSession()
    }
    let fail = (err) => {
      this.setUserInfo(account)
      if(this.props.session) {
        this.props.history.push('/sign')
      } else {
        this.setSession()
      }
    }

    this.props.post('/session', postData, success, fail)
  }

  setUserInfo(account) {
    let posData = {
      account: account,
      type: 'userInfo'
    }
    let success = (res) => {
      this.props.handlers.setAccount(account, res.data.userInfo)
    }
    let fail = (err) => {
      this.props.handlers.logOut()
      console.warn(err)
    }

    this.props.post('/account', posData, success, fail)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.session && <Router/>}
        
      </React.Fragment>
    )
  }
}


export default connect(SessionComponent)
