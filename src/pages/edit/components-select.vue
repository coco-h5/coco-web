<template>
  <div class="select-menu">
    <h2 class="title">添加组件</h2>
    <div class="component-preview">
      <div class="left-menu">
        <a-menu
          style="width: 120px"
          mode="inline"
          :selectedKeys="selectedKeys"
          @select="selectMenu"
          :default-open-keys="['common']"
        >
          <a-menu-item
            v-if="editState.pageConfig.components?.length"
            key="template"
          >
            <MailOutlined />
            模板组件
          </a-menu-item>
          <a-sub-menu key="common">
            <template #title>
              <span>
                <AppstoreOutlined />
                <span>系统组件</span>
              </span>
            </template>
            <a-menu-item
                :key="item.name"
                v-for="item in editState.uiConfig.commonComponents"
            >
              {{item.description}}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="list-view">
        <div
          @dragstart="(e) => setDragStart(e, true, item)"
          @dragend="(e) => setDragStart(e, false)"
          draggable
          class="co-item"
          :key="index"
          v-for="(item, index) in canSelects.length ? canSelects : editState.pageConfig.components"
        >
          <a-image
            class="preview-item"
            :src="item.snapshot"
            fit="fit"
          />
          <div class="co-title">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toRefs, reactive} from 'vue';
import {useStore} from 'vuex';

export default {
  setup() {
    const state = reactive({
      active: 'components', // components || commonComponents
      selectedKeys: ['template'],
      canSelects: [],
    })
    const {state: {edit: editState}, commit} = useStore();

    const selectMenu= ({key, item}) => {
      state.selectedKeys[0] = key;
      if (key === 'template') {
        state.canSelects = editState.pageConfig.components;
        return;
      }

      state.canSelects = JSON.parse(editState.uiConfig.commonComponents[item.index].config);
    }
    return {
      editState,
      ...toRefs(state),
      selectMenu,
      setDragStart: (ev, v, data) => commit('setDragStart', {ev, v, data}),
    }
  }
}
</script>

<style lang="less">
.select-menu {
  padding: 20px 0;
  box-shadow: 3px 0 16px rgba(0,0,0,.06);
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  width: 400px;
  .title {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 400;
    margin-left: 20px;
  }
  .left-menu {
    width: 80px;
  }
  .menu-item {
    cursor: pointer;
    display: inline-block;
    height: 26px;
    padding: 0 8px;
    width: 80px;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    color: rgba(0,0,0,.65);
    box-sizing: border-box;
    margin-bottom: 20px;
    &.active {
      color: #fff;
      background: #1890ff;
    }
    &.disabled {
      color: #999;
    }
  }
  .list-view {
    height: calc(~ '100vh - 120px');
    overflow-y: auto;
    overflow-x: hidden;
  }
  .component-preview {
    display: flex;
    justify-content: space-between;
    .co-item {
      margin-bottom: 20px;
      transition: transform 200ms linear;
      &:hover {
        cursor: move;
      }
      .co-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-top: -30px;
        position: relative;
        z-index: 9;
        text-align: center;
        background: rgba(0,0,0,0.5);
        color: #fff;
        display: none;
      }
      &:hover {
        transform: scale(1.05);
        .co-title {
          display: block;
        }
      }
    }
    .preview-item {
      width: 258px;
      max-height: 200px;
      border: 1px solid #f0f0f0;
      margin-right: 10px;
      position: relative;
      z-index: 1;

    }
  }
  .ant-menu-inline {
    height: 100%;
  }
}
</style>
