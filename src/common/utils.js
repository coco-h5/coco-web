export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export function debounce(fn, delay, scope) {
  let timer = null;
  // 返回函数对debounce作用域形成闭包
  return function () {
    // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
    let context = scope || this, args = arguments;
    // 如果事件被触发，清除timer并重新开始计时
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

export const postMsgToChild = (msg) => {
  window.frames[0] && window.frames[0].postMessage(msg, '*');
}

export const cacheController = {
  currentCache: {},
  maxLength: 10,
  length: 0,
  endNode: null,
  init() {
    cacheController.currentCache = {};
    cacheController.length = 0;
  },
  save(v) {
    const config = clone(v);
    cacheController.length += 1;
    // 最多存 20 个操作记录
    if (cacheController.length > 20) {
      cacheController.endNode = cacheController.endNode.next;
      cacheController.endNode.pre = null;
    }
    if (!this.currentCache.value) {
      cacheController.endNode = {
        value: config,
        next: null,
        pre: null,
      }
      this.currentCache = cacheController.endNode;
      return;
    }

    if (this.currentCache.value) {
      let item =  {
        value: config,
        next: null,
        pre: null
      };
      this.currentCache.next = item;
      item.pre = this.currentCache;
      this.currentCache = item;
    }
  },
  undo() {
    if (!this.currentCache.pre) return;
    const target = this.currentCache.pre.value;
    this.currentCache = this.currentCache.pre
    return target;
  },
  redo() {
    if (!this.currentCache.next) return;
    const target = clone(this.currentCache.next.value);
    this.currentCache = this.currentCache.next

    return target;
  }
}

cacheController.save = debounce(cacheController.save, 200);

export function deepCopy(value) {
  return JSON.parse(JSON.stringify(value))
}

export const mergeConfig = (origin, target) => {
  console.log(origin, target)
  if (!origin.components || !origin.components.length) return target;
  const mergeResult = {
    userSelectComponents: target.userSelectComponents.map((co) => {
      const originCo = origin.components.filter(oco => oco.name === co.name)[0];
      if (originCo) {
        return {
          ...co,
          props: {
            ...originCo.data || {},
            ...co.props,
          },
          schema: originCo.schema
        }
      }
      return co;
    }),
    components: target.components.map((co) => {
      const originCo = origin.components.filter(oco => oco.name === co.name)[0];
      if (originCo) {
        return {
          ...co,
          props: {
            ...originCo.data || {},
            ...co.props,
          },
          schema: originCo.schema
        }
      }
      return co;
    }),
    page: {
      ...target.page,
      props: {
        ...origin.page.props,
        ...target.page.props,
      },
      schema: origin.page.schema,
    }
  };
  return mergeResult;
}
