import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
// import App from './components/clear'

function NotFound() {
  // 此处的定时器倒计时也涉及闭包问题：一个函数内的函数引用了上一级函数作用域的变量，就会形成闭包，如果父级函数执行完毕，正常情况下，函数执行完会被销毁，但是由于函数内的变量有被引用，所以函数不会被销毁
  const history = useHistory()
  const [count, setCount] = useState(10)
  const countRef = useRef(-1)
  // 进入页面即开始倒计时
  useEffect(() => {
    // 这里使用useRef作为定时器ID是为了防止定时器每次执行导致的组件重新渲染使得每次的定时器ID随机变化，所以最后清除定时器会失败，因为ID变化了。这里使用useRef会保持ID不变即使页面重新渲染
    countRef.current = setInterval(() => {
      // 如果直接如下写法，react会要求我们在[]中填写count以来，但是一旦填写就会变为watch监听的形式，所以我们写成回调形式就可以避免
      // setCount(count - 1)
      setCount(count => count - 1)
    }, 1000)
    // 组件销毁时会执行的代码：清除定时器，以防依旧存在在内存中影响性能
    return () => {
      clearInterval(countRef.current)
    }
  }, [])
  // 监听定时器是否为0，useEffect中的[]写入想要监听的元素就可以变为监听模式，useEffect用处十分多，可以实现不同形式的钩子效果：
  // 1. 页面初始化加载钩子
  // 2. 组件销毁加载钩子
  // 3. 元素监听钩子
  useEffect(() => {
    if (count === 0) {
      history.push('/home')
    }
  }, [count, history])

  return (
    <div className={styles.root}>
      {/* <App></App> */}
      <h1>对不起，您访问的页面不存在~</h1>
      <p>
        将在 {count} 秒后，返回首页（或者：点击立即返回
        <Link to="/home">首页</Link>）
      </p>
    </div>
  )
}

export default NotFound
