const { useEffect, useState, useRef } = require("react")

const App = () => {
  const [count, setCount] = useState(0)
  // let timerId = -1
  const countRef = useRef(-1)

  useEffect(() => {
    console.log(countRef.current);
    countRef.current = setInterval(() => {
      console.log('interval')
    }, 1000)
  }, [])

  const clear = () => {
    console.log(countRef);
    clearInterval(countRef.current)
  }

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>+1</button>
      <button onClick={clear}>清理定时器</button>
      <h1>计数器：{count}</h1>
    </div>
  )
}

export default App