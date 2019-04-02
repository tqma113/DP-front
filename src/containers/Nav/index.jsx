import React, {Component} from 'react';

import map from '@map';

// import Animate from '@style/animate.css'
// import LessStyle from '@lessStyle/nav.less'

const defaultLogo = require('@image/person.png')

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: '',
      state: true,
      logo: props.store.login.userInfo && props.store.login.userInfo.url ? props.store.login.userInfo.url : ''
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }


  handleLogoClick = (e) => {
    if(e) {
      e.nativeEvent.stopImmediatePropagation()
    }
    let state = {
      ...this.state,
      class: `${this.state.state ? Animate.fadeIn : Animate.fadeOut} ${Animate.animated}`,
      state: !this.state.state
    }
    this.setState(state);
  }

  handleClick = () => {
    if(!this.state.state) {
      let state = {
        ...this.state,
        class: `${this.state.state ? Animate.fadeIn : Animate.fadeOut} ${Animate.animated}`,
        state: !this.state.state
      };
      this.setState(state);
    }
  }

  handlerPersonClick = () => {
    this.props.history.push(`/${this.props.store.login.account}`)
  }

  handlerDataClick = () => {
    this.props.history.push(`/${this.props.store.login.account}/edit`)
  }

  handlerLogoutClick = () => {
    this.props.handlers.logOut()
    this.props.history.goBack()
  }

  handleImgOnload = () => {
    let state = {
      ...this.state,
      logo: defaultLogo
    }

    this.setState(state)
  }

  render() {
    return (
      <header className={`${LessStyle.nav_container} ${Animate.animated} ${Animate.slideInDown}`}>
        <section className={`${LessStyle.nav}`}>
          <section className={LessStyle.img_container} onClick={() => this.props.history.push('/')}>
            <img src={require('@image/mblog.png')} className={LessStyle.img} alt='Logo'/>
          </section>
          {
            this.props.store.login.status === 1
              ?
            <section className={LessStyle.person}>
              <img
               className={LessStyle.logo}
               src={this.state.logo}
               alt="logo"
               onClick={this.handleLogoClick}
               onLoad={this.handleImgOnload}
               onError={this.handleImgOnload}
                />
              {/* <h1 className={Style.name}>{props.store.login.userInfo ? props.store.login.userInfo.name : ''}</h1>           */}

              <section className={this.state.class} style={{display: this.state.state ? 'none' : ''}}>
                <section className={LessStyle.person_tab}></section>
                <section className={LessStyle.person_main}>
                  <h1 className={LessStyle.person_item} onClick={this.handlerPersonClick}>个人中心</h1>
                  <h1 className={LessStyle.person_item} onClick={this.handlerDataClick}>个人资料</h1>
                  <h1 className={LessStyle.person_item} onClick={this.handlerLogoutClick}>退出</h1>
                </section>
              </section>

            </section>
              :
            <section className={LessStyle.login}>
              <h1>
                <span className={LessStyle.sign} onClick={() => this.props.history.push('/sign')}>登录</span>
                <span className={LessStyle.gap}></span>
                <span className={LessStyle.register} onClick={() => this.props.history.push('/register')}>注册</span>
              </h1>
            </section>
          }
        </section>
      </header>
    )
  }
}

export default map(Nav)
