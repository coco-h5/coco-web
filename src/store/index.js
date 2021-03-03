import { createStore, createLogger } from 'vuex'
import index from './modules/index'
import edit from './modules/edit'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    index,
    edit
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

// 监听事件
window.addEventListener('message',(e) => {
  // 不接受消息源来自于当前窗口的消息
  if (e.source === window || e.data === 'loaded') {
    return
  }
  if (e.data.type === 'returnConfig') {
    return store.dispatch(e.data.type, {
      targetConfig: e.data.data
    });
  }
  return store.commit(e.data.type, e.data.data);
});

export default store;
