import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save(state, { payload: {data: list, total, page }}) {
      return { ...state, list, total };
    }
  },
  effects: {
    *fetch({ payload: { page = 1 }}, { call, put }) {
      const {data, headers } = yield call(userService.fetch, { page });
      yield put({ type: 'save', payload: { data, total: headers['x-total-count']}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      })
    }
  },
};
