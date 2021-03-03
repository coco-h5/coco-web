<template>
  <a-spin :spinning="creating" tip="Loading...">
    <Header />
    <div class="index-wrapper">
      <a-card
          :key="item.id"
          v-for="item in templateList"
          hoverable style="width: 240px"
          @click="() => initPage(item)"
      >
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta :title="item.templateName">
          <template #description>
            <div>作者：{{item.author}}</div>
            <div>版本：{{item.version}}</div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </a-spin>
  <a-modal
    v-model:visible="createDialog"
    title="请填写页面信息"
    okText="确定"
    cancelText="取消"
    :width="560"
    @ok="createPage"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="项目名称" v-bind="validateInfos.projectName">
        <a-input placeholder="如：营销活动" v-model:value="projectName"/>
      </a-form-item>
      <a-form-item label="活动域名" v-bind="validateInfos.gitName">
        <a-input-group  compact>
          <a-select v-model:value="host">
            <a-select-option value="https://coco-h5.github.io/">
              https://coco-h5.github.io/
            </a-select-option>
          </a-select>
          <a-input
              placeholder="路径"
              style="width: 95px"
              v-model:value="gitName"
          />
          <div class="fix">/index.html</div>
        </a-input-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import Header from '@/components/header';
import {reactive, toRefs} from 'vue';
import { useForm } from '@ant-design-vue/use';
import {market, project} from '@/api';

export default {
  setup() {
    const state = reactive({
      templateList: [],
      createDialog: false,
      pageInfo: {},
      creating: false,
    });

    const pageState = reactive({
      projectName: '',
      gitName: '',
      host: ' https://coco-h5.github.io/'
    });

    const rulesRef = reactive({
      projectName: [
        {
          required: true,
          message: '请输入项目名称',
        },
      ],
      gitName: [
        {
          required: true,
          message: '请输入网站路径',
        },
      ],
    });

    market.queryAll().then(({result}) => {
      state.templateList = result;
    });

    const initPage = (config) => {
      state.pageInfo = config;
      state.createDialog = true;
    }

    const createPage = () => {
      validate().then(async () => {
        state.creating = true;
        try {
          await project.createProject({
            pageConfig: {
              config: {
                templateId: state.pageInfo.id,
                templateGit: state.pageInfo.gitUrl,
                templateName: state.pageInfo.name,
                projectName: pageState.projectName || '未命名的页面',
                gitName: pageState.gitName,
                templateVersion: state.pageInfo.version,
              },
              userSelectComponents: [],
              components: [],
            }
          });
          state.creating = false;

        } catch (e) {
          state.creating = false;
        }
      });
    }
    const { resetFields, validate, validateInfos } = useForm(pageState, rulesRef);

    return {
      ...toRefs(state),
      ...toRefs(pageState),
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      initPage,
      createPage,
      resetFields,
      validate,
      validateInfos,
    }
  },
  components: {
    Header,
  }
}
</script>

<style>
.index-wrapper {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
</style>
