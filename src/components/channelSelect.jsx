import { getChannelAction } from '@/store/action/article'
import { Select } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Option } = Select
// antd Form组件中的formItem会自动给其下的子标签添加value和onChange属性，所以此处只需要接收并绑定到Select标签上即可
function ChannelSelect({value, onChange, width}) {
  const dispatch = useDispatch()
  const { channels } = useSelector(state => state.articleReducer)
  useEffect(() => {
    dispatch(getChannelAction())
  }, [dispatch])
  return (
    <Select
      placeholder="请选择文章频道"
      value={value}
      onChange={onChange}
      // defaultValue="lucy"
      style={{ width }}
    >
      {channels.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
      {/* <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option> */}
    </Select>
  )
}

export default ChannelSelect
