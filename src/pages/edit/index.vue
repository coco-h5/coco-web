<template>
  <Header type="white" class="edit-menu">
    <template #pageTitle>
      <div class="page-title">
        <SettingOutlined @click="getPageSchema" style="margin-right: 10px; cursor: pointer" />
        <a-input
            class="title-content"
            :value="editState.pageConfig.config.projectName"
            @input="changeProjectName"
        />
      </div>
    </template>
    <template #menu>
      <a-menu-item  @click="rollback">
        <UndoOutlined />撤销
      </a-menu-item>
      <a-menu-item  @click="next">
        <RedoOutlined />前进
      </a-menu-item>
      <a-menu-item @click="() => saveConfig()">
        <SaveOutlined />保存
      </a-menu-item>
      <a-menu-item @click="() => setPreview(true, store)">
        <EyeOutlined />预览
      </a-menu-item>
      <a-menu-item @click="() => setRelease(true)">
        <a-button type="primary">发布</a-button>
      </a-menu-item>
      <a-menu-item class="dash">
        <div class="line"></div>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/dashboard">
          工作台
        </router-link>
      </a-menu-item>
    </template>
  </Header>
  <div class="edit-container">
    <div class="component-container">
      <ComponentSelect />
    </div>
    <div class="editor-view">
      <div class="se-page-path-container">
        <div class="se-page-path">
          <div class="se-pp-url">
            <span>{{showUrl}}</span>
          </div>
          <div class="se-pp-share">
            <LinkOutlined />
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="preview-container">
          <a-spin :spinning="spinning">
            <iframe
                @load="initConfig"
                id="frame"
                frameborder="0"
                class="pre-view"
                :src="url"
                :style="{
                height: containerHeight + 'px'
              }"
            />
            <div
                @drop="drop_handler"
                @dragover="dragover_handler"
                v-show="editState.uiConfig.dragStart"
                class="drag-hover"
            />
          </a-spin>
        </div>
        <div :style="hoverStyle" class="se-view-hover-tip"></div>
        <div :style="activeStyle" class="se-view-active-tip"></div>
        <div
            v-show="toolStyle.top"
            :style="{
              top: toolStyle.top
            }"
            class="se-view-tools"
            id="se-view-tools"
        >
          <div :class="['sev-tools-move', (isTop || isBottom) && 'sev-tools-move-single']">
            <ArrowUpOutlined @click="changeIndex(-1)" v-if="!isTop" class="fd-iconfont" />
            <ArrowDownOutlined @click="changeIndex(1)" v-if="!isBottom" class="fd-iconfont" />
          </div>
          <div class="sev-tools-copy"><CopyOutlined @click="copyComponent" class="fd-iconfont" /></div>
          <div class="sev-tools-copy"><DeleteOutlined @click="() => deleteComponent()" class="fd-iconfont" /></div>
        </div>
      </div>
    </div>

    <div
        :style="{
          position: 'relative',
          width: visible ? '350px' : ''
        }"
        class="form-container-main"
    >
      <a-drawer
          :mask="false"
          placement="right"
          :closable="false"
          :visible="visible"
          :get-container="false"
          :wrap-style="{ position: 'absolute' }"
          @close="() => onClose(false)"
          :width="350"
      >
        <Form />
        <template v-slot:handle>
          <DoubleLeftOutlined v-if="!visible" @click="() => onClose(true)" class="draw-op" />
          <DoubleRightOutlined v-else @click="() => onClose(false)" class="draw-op" />
        </template>
      </a-drawer>
    </div>
  </div>
</template>

<script>

import Header from '@/components/header';
import ComponentSelect from './components-select';
import Form from './form';

import {
  UndoOutlined,
  RedoOutlined,
  EyeOutlined,
  SaveOutlined,
  SettingOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  ArrowDownOutlined,
  LinkOutlined,
} from '@ant-design/icons-vue';
import {toRefs, reactive, watch, toRaw} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import {project, component} from '@/api';
import {useEditor} from './hooks';

const postMsgToChild = (msg) => {
  window.frames[0] && window.frames[0].postMessage(msg, '*');
}

export default {
  setup() {
    const {state: {edit: editState}, dispatch, commit} = useStore();
    const state = reactive({
      data: {},
      name: '',
      url: '',
      showUrl: '',
      visible: true,
      spinning: true
    });
    const {editorState, eventInit, init, getIndex, setFixedStyle} = useEditor();
    const router = useRoute();

    Promise.all([
      project.query({id: router.query.id}),
      component.query()
    ]).then(([{result}, {result: componentRes}]) => {
      state.data = result[0];
      const targetConfig = result[0].pageConfig;
      state.name = result[0].name;
      state.url = `http://localhost:8081?isEdit=true`;
      state.showUrl = `https://coco-h5.github.io/${state.name}/index.html`;
      dispatch('returnConfig', {
        targetConfig: targetConfig,
        pageData: state.data,
        releaseStatus: result[0].releaseInfo,
        commonComponents: componentRes
      });
    });

    const initConfig = () => {
      eventInit((index) => {
        state.current = index;
        postMsgToChild({type: 'changeIndex', data: state.current});
      });
      watch(() => editState.editConfig.currentIndex, () => {
        state.visible = true;
      });
      watch([
        () => editState.pageConfig.userSelectComponents,
        () => editState.editConfig.currentIndex
      ], () => {
        init(editState.editConfig.currentIndex);
        setFixedStyle(editState.editConfig.currentIndex);
      });
      state.spinning = false;
      // 初始化页面
      postMsgToChild({type: 'getConfig'});
      if (editState.pageConfig.components.length) {
        // 编辑
        postMsgToChild({type: 'setConfig', data: toRaw(editState.pageConfig)})
      }
      postMsgToChild({type: 'changeIndex', data: editState.editConfig.currentIndex})
    }

    const changeIndex = (op) => {
      postMsgToChild({type: 'sortComponent', data: {op, index: editorState.current}});
    }

    const copyComponent = () => {
      postMsgToChild({type: 'copyComponent', data: editorState.current});
    }

    const deleteComponent = (index) => {
      postMsgToChild({type: 'deleteComponent', data: index !== undefined ? index : editorState.current});
    }

    const dragover_handler = (ev) => {
      ev.preventDefault();
    }

    const drop_handler = (ev) => {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text/plain");
      const {layerY} = ev;
      const index = getIndex(layerY);
      commit('addComponent', {data: JSON.parse(data), index});
      commit('setDragStart', {
        v: false
      });
    }

    const onDrag = ({left, top}, index, props) => {
      postMsgToChild({type: 'changeIndex', data: index})
      commit('changeProps', {
        ...props,
        x: left,
        y: top,
      });
    }


    return {
      ...toRefs(editorState),
      ...toRefs(state),
      initConfig,
      editState,
      changeIndex,
      copyComponent,
      deleteComponent,
      dragover_handler,
      drop_handler,
      onDrag
    }
  },
  components: {
    Form,
    Header,
    ComponentSelect,
    UndoOutlined,
    RedoOutlined,
    EyeOutlined,
    SaveOutlined,
    SettingOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
    ArrowUpOutlined,
    CopyOutlined,
    DeleteOutlined,
    ArrowDownOutlined,
    LinkOutlined,
  }
}
</script>
<style lang="less">
.loading {
  height: calc(~'100vh - 60px');
  width: 100%;
}
.do-icon {
  font-size: 18px;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
}
.edit-menu {
  box-shadow: 0 1px 7px rgba(0,0,0,.06);
  z-index: 9;
  .el-menu-item {
    padding: 0 10px;
  }
  .page-title {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #f9f9f9;
    margin-left: 20px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    .title-content {
      display: inline-block;
      width: 150px;
      overflow: hidden;
      border: none;
      padding: 0 10px;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
}
.preview-content {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 99;
  .close {
    position: absolute;
    right: 50px;
    top: 50px;
    font-size: 20px;
  }
  .spl-view {
    margin: 0 auto;
    width: 545px;
    padding-top: 40px;
    height: 100%;
    background: url(https://gw.alipayobjects.com/zos/rmsportal/FymmugeGFRUmRVIjPyZH.png) no-repeat 50% 46px;
    background-size: 414px auto;
    overflow: hidden;
    .spl-view-iframe {
      position: relative;
      margin: 0 auto;
      width: 407px;
      padding: 70px 10px;
      height: calc(100% - 40px);
      border-radius: 56px;
      border: 6px solid #dadada;
      box-shadow: 0 10px 32px 0 rgba(0,0,0,.1);
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        bottom: 11px;
        left: 50%;
        margin-left: -24px;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        border: 2px solid #dadada;
      }
      iframe {
        border: 0;
        width: 375px;
        height: 100%;
      }
      .fdAnt-spin-container {
        width: 100%;
        height: 100%;
        &:after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 10;
          display: none\9;
          width: 100%;
          height: 100%;
          background: #fff;
          opacity: 0;
          transition: all .3s;
          content: "";
          pointer-events: none;
        }
      }
      .spl-view-title {
        padding-top: 20px;
        height: 64px;
        line-height: 44px;
        text-align: center;
        font-size: 17px;
        border: 1px solid #979797;
        border-bottom: 0;
        color: rgba(0,0,0,.85);
      }
      .ant-spin-nested-loading {
        height: calc(100% - 64px);
      }
      .ant-spin-container {
        height: 100%;
      }
      .spl-view-main {
        width: 375px;
        border: 1px solid #979797;
        border-top: 0;
        height: 100%;
        overflow: hidden;
      }
    }
  }
  .spl-qrcode {
    position: absolute;
    z-index: 0;
    top: 96px;
    left: 50%;
    margin-left: 270px;
    width: 320px;
    h3 {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 400;
    }
    canvas {
      display: block;
      margin-bottom: 40px;
    }
    .spl-share-info {
      color: #1890ff;
      margin-bottom: 8px;
    }
    .spl-share-notice {
      margin-bottom: 16px;
      font-size: 12px;
      color: rgba(0,0,0,.65);
      li {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        &:before {
          content: "";
          display: block;
          margin-right: 4px;
          width: 3px;
          height: 3px;
          background: rgba(0,0,0,.25);
        }
      }
    }
  }
}
</style>
<style lang="less">
.vdr {
  border: 2px dashed #1890ff;
  z-index: 9;
  background: rgba(255,255,255,0.8);
}
.edit-container {
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: #f5f5f5;
  position: relative;
  z-index: 2;
  .se-page-path-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 24px;
    height: 72px;
    width: 100%;
    .se-page-path {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      bottom: 0;
      left: 50%;
      width: 375px;
      transform: translateX(-187px);
      height: 38px;
      border-radius: 2px 2px 0 0;
      box-shadow: 0 3px 16px 0 rgba(0,0,0,.04);
      background: #f9f9f9;
    }
    .se-pp-url {
      margin: 6px 12px;
      padding: 0 4px;
      justify-content: space-between;
      align-items: center;
      display: flex;
      height: 26px;
      border-radius: 2px;
      background: #fff;
      width: 319px;
      span {
        display: block;
        width: 291px;
        white-space: nowrap;
        font-size: 12px;
        color: rgba(0,0,0,.65);
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .se-pp-share {
      display: flex;
      margin: 0 12px 0 0;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
    }
  }
  .se-view-hover-tip {
    background: #ededef;
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    width: 100%;
  }
  .se-view-active-tip {
    background: #dddd;
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    width: 100%;
  }
  .se-view-tools {
    position: absolute;
    z-index: 3;
    left: 50%;
    transform: translateX(220px);
    width: 40px;
    .sev-tools-copy {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      border-radius: 40px;
      font-size: 20px;
      background: #fff;
      box-shadow: 0 3px 16px 0 rgba(0,0,0,.04);
    }
    .sev-tools-move {
      flex-direction: column;
      display: flex;
      align-items: center;
      position: relative;
      padding: 6px 0;
      justify-content: space-between;
      margin-bottom: 16px;
      border-radius: 40px;
      font-size: 20px;
      background: #fff;
      box-shadow: 0 3px 16px 0 rgba(0,0,0,.04);
      &:after {
        content: "";
        position: absolute;
        left: 10px;
        top: 52px;
        width: 20px;
        height: 1px;
        background: #f0f0f0;
      }
    }
    .fd-iconfont {
      display: flex;
      width: 40px;
      height: 40px;
      font-size: 18px;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 13px;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .sev-tools-move-single {
      padding: 0;
      &:after {
        display: none;
      }
    }
  }
  .component-container, .form-container-main {
    height: calc(~ '100vh - 60px');
  }

  .editor-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    .main-container {
      position: relative;
      max-height: calc(100vh - 146px);
      overflow: auto;
      overflow-y: overlay;
      display: flex;
      width: 100%;
      justify-content: center;
      .preview-container {
        box-shadow: 0 3px 16px 0 rgba(0,0,0,.04);
      }
      .drag-hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.7);
      }
    }
  }



  .form-container-main {
    display: flex;
    justify-content: flex-end;
  }
}

.draw-op {
  position: absolute;
  z-index: 9;
  left: -20px;
  top: 35%;
  font-size: 20px;
  background: #fff;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

.ant-drawer-body {
  padding: 0;
}

.pre-view {
  height: 667px;
  width: 375px;
}
</style>
