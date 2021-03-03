<template>
  <div>
    <Header type="white" class="edit-menu"></Header>
    <Suspense>
      <template #default>
        <List />
      </template>
      <template #fallback>
        <a-spin  />
      </template>
    </Suspense>
  </div>
</template>

<script>
import Header from '@/components/header';
import {reactive, toRefs} from 'vue';
import List from './list';

export default {
  setup() {
    const state = reactive({
      value: '',
    });
    const onSearch = () => {};

    return {
      ...toRefs(state),
      onSearch,
    }
  },
  components: {
    Header,
    List,
  }
}
</script>

<style lang="less">
.dash {
  display: flex;
  align-items: center;
}
.line {
  border-right: 1px solid #ddd;
  height: 20px;
  width: 1px;
}
</style>