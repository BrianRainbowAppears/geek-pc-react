import { request } from '@/utils/request'

export function getUserInfo() {
  return async (dispatch, getState) => {
    // 第二参数：getState()能拿到store中的所有数据
    // console.log(getState().loginReducer)
    const res = await request.get('/user/profile')
    // console.log(res);
    dispatch({
      type: 'user/getInfo',
      userInfo: res.data
    })
  }
}


