import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ChannelSelect from '@/components/channelSelect'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editArticleAction, getArtDetailAction, publishArticleAction } from '@/store/action/article'
import { useParams } from 'react-router-dom'

// const { Option } = Select

const Publish = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { articleId } = useParams()
  // console.log(articleId)
  // isEdit 是否是编辑状态：true 编辑 / false 不是编辑(发布文章)
  const isEdit = !!articleId
  // 1. 上传图片，并存储到fileList中
  // 存储上传图片格式：[{url:''}...]
  const [fileList, setFileList] = useState([])
  // 动态切换封面数量
  const fileListRef = useRef([])
  // 上传文件改变时的回调：1. 上传成功，返回图片地址 2. 删除已上传图片
  const onUploadChange = data => {
    console.log('upload: ', data)
    // console.log(data.fileList[0].response);
    const _fileList = data.fileList.map(item => {
      // 上传成功
      if (item.response) {
        // console.log(item.response.data.url);
        // jpg图片才有url地址！！！
        // 上传成功后台返回的图片地址：item.response.data.url
        return {
          url: item.response.data.url
        }
      }
      // 2. 已上传图片
      return item
    })
    console.log('处理完的上传列表：', _fileList)
    setFileList(_fileList)
    // 数据需要存储在useRef的current属性中
    fileListRef.current = _fileList
  }
  // 2. 控制封面图片上传数量
  const [maxCount, setMaxCount] = useState(1)
  // 3. 控制切换图片的数量
  const radioChange = e => {
    console.log(e.target.value)
    const count = e.target.value
    setMaxCount(count)
    if (count === 1) {
      const firstImg = fileListRef.current[0]
      // firstImg组件外别忘了加[]
      setFileList(firstImg === undefined ? [] : [firstImg])
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }
  // 表单提交/存入草稿 复用模块
  const publishArticle = async (formData, isDraft, isEdit) => {
    console.log('表单提交：', formData)
    // 1. 封面图片校验：选择封面的数量和fileList上传图片的数量相当
    const { type, ...sxd } = formData
    if (type !== fileList.length) {
      return message.warn('选择封面数量和上传图片数量不一致')
    }
    // 2. 组装发布文章需要的接口参数
    console.log('剩余参数：', sxd)
    const data = {
      ...sxd,
      cover: {
        type,
        // 封面图列表：['url1', 'url2'...]
        images: fileList.map(item => item.url)
      }
    }
    console.log('调用接口使用的参数：', data)
    if (!isEdit) {
      try {
        await dispatch(publishArticleAction(data, isDraft))
        message.success(!!isDraft ? '存入草稿成功' : '发布文章成功')
        history.push('/home/article')
      } catch (error) {}
    } else {
      data.id = articleId
      try {
        console.log(data);
        await dispatch(editArticleAction(data, isDraft))
        message.success(!!isDraft ? '存入草稿成功' : '编辑文章成功')
        history.push('/home/article')
      } catch (error) {}
    }
  }
  // 4. 表单提交真正
  const onFinish = formData => {
    publishArticle(formData, false, isEdit)
  }
  // 5. 存为草稿
  // 拿到form实例，实例里有Form的各种方法，包括验证
  const [form] = Form.useForm()
  const saveDraft = async () => {
    // console.log(form);
    // 因为Form组件的htmlType:submit 已经被提交button用了，所以需要额外赋予兜底验证操作
    try {
      const values = await form.validateFields()
      console.log(values)
      publishArticle(values, true, isEdit)
    } catch (error) {
      console.log('校验失败：', error)
    }
  }
  // 6. 编辑文章
  // 回填数据
  useEffect(() => {
    // 如果不是编辑(直接进入发布文章的话)直接return
    if (!isEdit) return
    ;(async () => {
      try {
        const ret = await dispatch(getArtDetailAction(articleId))
        console.log('回填数据：', ret)
        // 进行回填
        const {
          title,
          content,
          channel_id,
          cover: { type, images }
        } = ret
        // 通过form实例提供的setFieldValues(表单数据formData)，回填表单
        const formData = { title, content, channel_id, type }
        form.setFieldsValue(formData)
        // 回填之前上传过的图片
        // 格式：存储上传图片：[{url: ''}...]
        const imgList = images.map(item => ({ url: item }))
        // 回显上传过的图片
        setFileList(imgList)
        // 备份
        fileListRef.current = imgList
        // 设置最大上传数量
        setMaxCount(type)
      } catch (error) {}
    })()
  }, [articleId, isEdit, dispatch, form])

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{isEdit ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
        >
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
            {/* <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              <Option value={0}>推荐</Option>
            </Select> */}
            <ChannelSelect width={400}></ChannelSelect>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
                {/* <Radio value={-1}>自动</Radio> */}
              </Radio.Group>
            </Form.Item>
            {maxCount > 0 && (
              <Upload
                // 发到后台的文件参数名
                // === 2. 必须指定，根据接口文档的说明，需要设置为 image ===
                name="image"
                // 上传组件展示方式
                listType="picture-card"
                className="avatar-uploader"
                // 最大上传数量
                maxCount={maxCount}
                // 多选=》是否支持多选文件上传
                // 图片多选
                multiple={maxCount > 1}
                // 接口地址
                // 注意：Upload 再上传图片时，默认不会执行 axios 的请求，所以，此处需要手动设置完整接口地址
                // 1. 必传后台上传的接口地址
                action="http://geek.itheima.net/v1_0/upload"
                // 展示已上传图片列表
                showUploadList
                // 已经上传的文件列表，设置该属性后组件变为 受控
                fileList={fileList}
                // 上传文件改变时的回调：1. 上传成功，返回图片地址 2. 删除已上传图片
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
            {/* 富文本编辑器 */}
            {/* 结合antd的form组件使用，不用自己加受控，因为formItem会自动向ReactQuill添加受控处理：value状态+onChange事件 */}
            <ReactQuill className="publish-quill"></ReactQuill>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {isEdit ? '修改文章' : '发布文章'}
              </Button>
              <Button onClick={saveDraft} size="large">
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
