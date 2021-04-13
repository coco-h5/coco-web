import {cacheController, postMsgToChild, mergeConfig} from "@/common/utils";
const CONFIG = {
  pageConfig: {
    userSelectComponents: [],
    components: [],
    config: {}, // 模板信息
    page: {}, // 页面样式&全局配置
  },

  editConfig: {
    componentConfig: {},
    currentIndex: null,
    currentComponent: null,
  },

  uiConfig: {
    commonComponents: [], // 远程组件列表
    showEdit: true,
    releaseStatus: '',
    showRelease: false,
    pageData: {}, // 页面数据
    dragStart: false,
  },

  defaultConfig: null,
  isSave: true,
}
const state = JSON.parse(JSON.stringify(CONFIG));

const actions = {
  returnConfig({commit, state}, {
    targetConfig,
    pageData,
    releaseStatus,
    commonComponents,
    save = true,
  }) {
    // 保存页面初始值
    if (!state.defaultConfig && !releaseStatus) {
      commit('initDefaultConfig', JSON.parse(JSON.stringify(targetConfig)));
    }
    // 如果有用户操作，则重置发布状态
    if (
      !releaseStatus &&
      (JSON.stringify(targetConfig.userSelectComponents) !== JSON.stringify(state.pageConfig.userSelectComponents) ||
      JSON.stringify(targetConfig.page) !== JSON.stringify(state.pageConfig.page))
    ) {
      commit('updateUiConfig', {
        releaseStatus: {
          'qatest': [0, 0, 0],
          'pre-release': [0, 0, 0],
          'master': [0, 0, 0]
        }
      });
    }
    // 页面级别的配置，比如 title 之类的
    targetConfig.page = targetConfig.page || {schema: {}, props: {}};
    // merge 页面配置信息
    commit('updatePageConfig', {
      ...mergeConfig(state.defaultConfig, targetConfig),
    });
    // 确定当前修改的是哪个组件
    const currentIndex = targetConfig.currentIndex || 0;
    // 如果 currentIndex = -1 表示是编辑页面配置，比如 title
    // 此时不需要对组件进行修改
    if (currentIndex === -1) {
      commit('updateEditConfig', {
        currentComponent: {
          currentComponentSchema: state.pageConfig.page,
          component: state.pageConfig.page,
          type: '__page',
        }
      });
    } else {
      // 组件修改
      let component = state.pageConfig.userSelectComponents[currentIndex];
      let currentComponentSchema = state.pageConfig.components.filter((c) => c.name === component.name)[0];
      // 远程组件
      if (component && component.name === 'coco-components-loader') {
        currentComponentSchema = state.pageConfig.remoteComponents.filter(c => `${c.name}.${c.version}` === component.config.name)[0];
      }
      // 当前修改项，用于 form-render
      commit('updateEditConfig', {
        currentComponent: {
          currentComponentSchema,
          component,
        }
      });
    }
    // 项目初始化时为空项目，所以不需要进行编辑记录
    if (save && state.currentIndex !== null) {
      cacheController.save({
        ...state.pageConfig
      });
    }
    commit('updateUiConfig', {
      pageData: pageData || state.uiConfig.pageData,  // 设置页面信息
      releaseStatus: releaseStatus || state.uiConfig.releaseStatus,  // 设置页面发布状态
      commonComponents: commonComponents || state.uiConfig.commonComponents,  // 设置远程组件列表
    });

    // 设置当前选择组件
    commit('updateEditConfig', {
      currentIndex
    });
  },
  reset({dispatch}, config) {
    dispatch('returnConfig', {
      targetConfig: config,
      save: false
    });
    postMsgToChild({type: 'reset', data: config});
  }
}

const mutations = {
  initConfig(state) {
    state.pageConfig = {
      userSelectComponents: [],
      components: [],
      config: {}, // 模板信息
      page: {}, // 页面样式&全局配置
    };

    state.editConfig = {
      componentConfig: {},
      currentIndex: null,
        currentComponent: null,
    };

    state.uiConfig = {
      commonComponents: [], // 远程组件列表
        showEdit: true,
        releaseStatus: '',
        showRelease: false,
        pageData: {}, // 页面数据
        dragStart: false,
    }
    cacheController.init();
  },
  setIsSave(state, payload) {
    state.isSave = payload;
  },
  initDefaultConfig(state, data) {
    state.defaultConfig = data;
  },
  commonUpdate(state, data) {
    state = {
      ...state,
      ...data,
    }
  },
  updatePageConfig(state, payload) {
    state.pageConfig = {
      ...state.pageConfig,
      ...payload
    }
  },
  updateEditConfig(state, payload) {
    state.editConfig = {
      ...state.editConfig,
      ...payload
    }
  },
  updateUiConfig(state, payload) {
    state.uiConfig = {
      ...state.uiConfig,
      ...payload
    }
  },
  setRelease(state, payload) {
    state.uiConfig.showRelease = payload;
  },
  addComponent(state, {data, index}) {
    postMsgToChild({type: 'addComponent', data: JSON.parse(JSON.stringify({data, index}))});
  },
  changeProps(state, payload) {
    postMsgToChild({type: 'changeProps', data: payload});
  },
  setEdit(state, showEdit) {
    state.uiConfig.showEdit = showEdit;
  },
  setReleaseInfo(state, info) {
    state.uiConfig.releaseStatus = info;
  },
  setDragStart(state, {ev, v, data}) {
    state.uiConfig.dragStart = v;
    if (data) {
      ev.dataTransfer.setData("text/plain", JSON.stringify(data));
    }
  },
  changeProjectName(state, v) {
    state.pageConfig.config.projectName = v.target.value;
    state.uiConfig.releaseStatus = {
      'qatest': [0, 0, 0],
      'pre-release': [0, 0, 0],
      'master': [0, 0, 0]
    }
  }
}

export default {
  namespace: true,
  state,
  actions,
  mutations,
}
