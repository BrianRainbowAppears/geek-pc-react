import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker,  Table, Tag, Space, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
// 导入Action方法
import {  getArticleAction, delArticleAction } from '@/store/action/article'
// 局部国际化，较为局限，推荐使用全局国际化配置
// import 'moment/locale/zh-cn'
// import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入下拉频道选择框组件
import ChannelSelect from '@/components/channelSelect'

const { RangePicker } = DatePicker
// 优化文章状态的处理
const articleStatus = {
  0: { color: 'yellow', text: '草稿' },
  1: { color: '#ccc', text: '待审核' },
  2: { color: 'green', text: '审核通过' },
  3: { color: 'red', text: '审核失败' }
}

const Article = () => {
  const history = useHistory()
  // dispatch发送Action请求，获取频道列表数据
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleAction())
  }, [dispatch])

  const { articles, page, per_page, total_count } = useSelector(state => state.articleReducer)
  // console.log(channels);
  // 筛选功能
  // 但是由于对于React函数组件来说，只要修改状态，组件就会更新，函数组件中的代码都会重头到尾执行一遍：普通变量、普通函数
  // 使用useRef优化函数组件，帮助存储params，用于分页功能，useRef存储的值函数组件重新渲染也不会重置
  // ref对象的current属性的值不会被组件重新渲染影响
  let filters = useRef({})
  const onFilter = ({ channel_id, status, date }) => {
    console.log(channel_id, status, date)
    //  组装查询参数
    const params = { channel_id, page, per_page }
    // 排除全部(因为全部，不需要传status)
    if (status !== -1) {
      params.status = status
    }
    // 怎么判断一个值，不等于 '' undefined null
    // 答案：使用!!强制转换布尔值，以上三种会被转换为false
    if (!!date) {
      params.begin_pubdate = date[0].format('YYYY-MM-DD')
      params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    filters.current = params
    // 根据params再次发送请求
    dispatch(getArticleAction(params))
  }
  // 分页功能
  const pageChange = (page, pageSize) => {
    console.log(page, pageSize)
    console.log(filters)
    const params = {
      ...filters.current,
      page,
      per_page: pageSize
    }
    // 将目前的页数和每页数量也存到useRef数据中，以防删除操作使用，防止删除回到第一页
    filters.current = {...filters.current, page, per_page: pageSize}
    dispatch(getArticleAction(params))
  }
  // 删除文章
  const delArticle = (data) => {
    // 1. 弹窗确认
    Modal.confirm({
      title: `确认删除“${data.title}”吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      // 点击确认执行
      onOk: () => {
        // 2. 调接口删除数据，并且刷新列表
        console.log('删除');
        console.log(filters.current);
        dispatch(delArticleAction(data.id, filters.current))
        // 获取表单dispatch操作不能与删除dispatch并列，因为两者皆为async异步Action函数，所以两者不一定哪个先执行，必须要把刷新列表dispatch放到删除action里
        // dispatch(getArticleAction(filters.current))
      },
      // 点击取消执行
      onCancel: () => {
        console.log('取消');
      }
      
    })
    
  }
  // 跳转编辑页
  const toDeitPage = (data) => {
    console.log(history);
    history.push(`/home/publish/${data.id}`)
  }

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      render: cover => {
        cover = cover.images[0]
        return <img src={cover || img404} width={200} height={150} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: status => <Tag color={articleStatus[status].color}>{articleStatus[status].text}</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button onClick={() => {
              toDeitPage(data)
            }} type="primary" shape="circle" icon={<EditOutlined />} />
            <Button onClick={() => {delArticle(data)}} type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Space>
        )
      }
    }
  ]

  return (
    <>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFilter} initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            {/* 频道下拉选择框 */}
            <ChannelSelect width={288}></ChannelSelect>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* <RangePicker locale={locale}></RangePicker> */}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${total_count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articles}
          pagination={{
            position: ['bottomLeft'],
            current: page,
            pageSize: per_page,
            total: total_count,
            showSizeChanger: true,
            onChange: pageChange
          }}
        />
      </Card>
    </>
  )
}

export default Article
