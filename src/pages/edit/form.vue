<template>
  <div class="form-menu">
    <FromRender :currentComponent="editState.editConfig.currentComponent" />
  </div>
</template>

<script>
import FromRender from '@/components/form-render';
import {useStore} from 'vuex';

export default {
  setup() {
    const {state: {edit: editState}} = useStore();

    return {
      editState,
    }
  },
  components: {
    FromRender,
  }
}
</script>

<style lang="less">
.form-menu {
  width: 100%;
  background: #fff;
  height: calc(~ '100vh - 60px');
}
</style>