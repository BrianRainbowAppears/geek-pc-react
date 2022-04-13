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
    console.log(ret);
    dispatch(getArticleAction(params))
  }
}
