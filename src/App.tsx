import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'

import Router from './router'

import './App.less';

const App: React.FC = () => {
  return (
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </LocaleProvider>
  );
}

export default App;
