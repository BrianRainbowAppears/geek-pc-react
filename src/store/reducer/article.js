const initState = {
  channels: [],
  articles: [],
  page: 1,
  per_page: 10,
  total_count: ''
}

export function articleReducer(state = initState, action) {
  if (action.type === 'article/getChannels') {
    return {
      ...state, 
      channels: action.channels
    }
  }
  if (action.type === 'article/getArticles') {
    return {
      ...state, 
      articles: action.data.results,
      page: action.data.page,
      per_page: action.data.per_page,
      total_count: action.data.total_count
    }
  }
  return state
}