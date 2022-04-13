import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'

const Test = () => {
  // 组件说明：
  const columns = [
    {
      // 表格每一列的标题
      title: 'Name',
      // 数据源中对应数据的属性名称
      dataIndex: 'name',
      // 自定义渲染表格单元格的内容
      // 如果要渲染的单元格的内容就是文本，那么，不需要使用 render
      // 但是要渲染的单元格内容不是文本，那么，就需要使用 render 函数来自定义渲染内容
      render: (text, row) => {
        // 第一个参数（text）：表示当前列的数据，比如，当前列是 name，所以，此处拿到的就是数据源中 name 属性的值
        // 第二个参数（row）：表示当前行的完整数据
        return <a>{text}</a>
      }
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  // 表格的数据源：
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]

  // columns 用来指定表格的列
  // dataSource 用来指定表格的数据源

  return (
    <div>
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Test
