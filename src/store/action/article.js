import { request } from '@/utils/request'
import store from '@/store'

const dispatch = store.dispatch

// 获取频道列表数据
export function getChannelAction() {
  // 定义异步Action
  return async dispatch => {
    const {
      data: { channels }
    } = await request.get('/channels')
    console.log('频道列表：', channels)
    dispatch({
      type: 'article/getChannels',
      channels
    })
  }
}
// 获取文章列表数据
export function getArticleAction(params) {
  // 定义异步Action
  return async dispatch => {
    const { data } = await request.get('/mp/articles', {
      params
    })
    console.log('文章列表：', data)
    dispatch({
      type: 'article/getArticles',
      data
    })
  }
}
// 删除文章数据
export function delArticleAction(id, params) {
  return async () => {
    const ret = await request.delete(`/mp/articles/${id}`)
    console.log(ret)
    dispatch(getArticleAction(params))
  }
}
// 发布文章
export function publishArticleAction(data, isDraft) {
  return async () => {
    await request.post(`/mp/articles?draft=${isDraft}`, data)
  }
}
// 获取文章详情
export function getArtDetailAction(id) {
  return async () => {
    const {data} = await request.get(`/mp/articles/${id}`)
    // console.log(data);
    return data
  }
}
// 编辑文章
export function editArticleAction(data, isDraft) {
  return async () => {
    await request.put(`/mp/articles/${data.id}?draft=${isDraft}`, data)
  }
}