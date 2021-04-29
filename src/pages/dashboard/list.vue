<template>
  <div class="user-page-list">
    <div v-if="!list.length" class="empty-list">
      <a-empty>
        <template #description>
          <span> 暂无页面，快去创建吧 </span>
        </template>
        <a-button type="primary">
          <router-link to="/home">创建页面</router-link>
        </a-button>
      </a-empty>
    </div>
    <div class="list" v-else>
      <a-button class="top">
        <router-link to="/home">创建页面</router-link>
      </a-button>
      <a-list
          class="demo-loadmore-list"
          :loading="loading"
          item-layout="horizontal"
          :data-source="list"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <router-link :to="`/edit?id=${item.id}&pageId=${item.gitConfig.id}`">编辑</router-link>
            </template>
            <a-list-item-meta>
              <template #description>
                <div class="desc">
                  <div>
                    描述：
                    <span>{{item.desc}}</span>
                    <a-popover @visibleChange="v => {!v && (visible = null)}" :visible="visible === item.id" trigger="click">
                      <template #content>
                        <a-input-group size="large">
                          <a-row :gutter="8">
                            <a-col :span="18">
                              <a-input v-model:value="desc" style="height: 32px" />
                            </a-col>
                            <a-col :span="5">
                              <a-button type="primary" @click="() => saveDesc(item)">确定</a-button>
                            </a-col>
                          </a-row>
                        </a-input-group>
                      </template>
                      <EditOutlined @click="() => editDesc(item)" style="cursor: pointer" />
                    </a-popover>
                  </div>
                  <div>
                    更新时间：<span>{{item.updatedAt}}</span>
                  </div>
                  <div>
                    创建时间：<span>{{item.createdAt}}</span>
                  </div>
                </div>
              </template>
              <template #title>
                {{ item.pageConfig.config.projectName }}
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>

  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';
import {EditOutlined} from '@ant-design/icons-vue'
import { useLoadList } from './hooks';
import {project} from '@/api';
import {message} from "ant-design-vue";

export default {
  async setup() {
    const state= reactive({
      list: [],
      loadingMore: false,
      showLoadingMore: true,
      visible: null,
      desc: ''
    });
    const cancel = () => {};
    const {loading, loadFn} = useLoadList();

    state.list = await loadFn();

    const editDesc = (item) => {
      state.desc = item.desc;
      state.visible = item.id;
    }

    const saveDesc = async (item) => {
      if (!state.desc) return message.error('请填写描述信息！')
      await project.updateOtherConfig({
        data: {
          desc: state.desc,
        },
        id: item.id,
      });
      state.list = await loadFn();
      state.visible = null;
      message.success('更新成功！');
    }

    return {
      loading,
      cancel,
      ...toRefs(state),
      editDesc,
      saveDesc,
    }
  },
  components: {
    EditOutlined
  }
}
</script>

<style lang="less">
.user-page-list {
  background: #f5f5f5;
  height: calc(~'100vh - 60px');
  overflow: auto;
  .list {
    width: 700px;
    margin: 0 auto;
    .top {
      margin: 20px 20px 20px 0;
    }
    .demo-loadmore-list {
      background: #fff;
      padding: 20px 30px;
    }
  }
  .empty-list {
    padding-top: 150px;
  }
  .ant-list-item-meta-avatar {
    width: 100px;
    height: 100px;
    .anticon {
      display: inline-block;
      width: 100px;
      height: 100px;
      .icon {
        width: 100px;
        height: 100px;
        display: inline-block;
        font-size: 20px;
      }
    }
  }
}
</style>
