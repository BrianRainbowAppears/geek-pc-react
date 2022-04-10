// index.js 为项目入口，会进行根组件渲染
import React from 'react'
import { createRoot } from 'react-dom/client'

// 导入 antd 组件库
import 'antd/dist/antd.css'
// 自己编写的全局样式，有需要可以覆盖组件样式
// import './index.scss'
import 'antd/dist/antd.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

createRoot(document.querySelector('#root')).render(
  // 开启 react 严格模式，会帮助检测不合理的代码，但是不是必须要开启
  <App />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
