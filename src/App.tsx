import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import { Provider } from 'react-redux'

import Router from './router'
import store from './redux'

import './App.less';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LocaleProvider>
    </Provider>
  );
}

export default App;
