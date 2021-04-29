<template>
  <div class="header">
    <div :class="['header-menu', className]">
      <div class="left">
        <slot name="logo">
          <div class="logo">
            <router-link to="/">
              <div class="logo-container" />
            </router-link>
          </div>
        </slot>
        <slot name="pageTitle"></slot>
      </div>
      <a-menu
          :selectable="false"
          class="el-menu-demo"
          mode="horizontal"
          @select="(path) => handleSelect(path)"
      >
        <a-menu-item>
          <a href="https://github.com/coco-h5/coco-web" target="_blank">
            Github
          </a>
        </a-menu-item>
        <slot name="menu">
          <a-menu-item>
            <router-link to="/dashboard">
              工作台
            </router-link>
          </a-menu-item>
        </slot>
      </a-menu>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import { ref, onBeforeUnmount } from 'vue';

export default {
  props: {
    type: String,
  },
  setup(props) {
    const router = useRouter();
    let className = ref(props.type || 'default');
    const setClassName = () => {
      if (props.type) return;
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      className.value = top > 30 ? 'white' : 'default';
    };
    document.addEventListener('scroll', setClassName);
    onBeforeUnmount(() => {
      console.log('unmount')
      document.removeEventListener('scroll', setClassName);
    });

    const handleSelect = (path) => {
      if (!path) return;
      router.push({
        path,
      });
    }

    return {
      className,
      handleSelect,
    }
  }
}
</script>
<style lang="less">
body {
  padding-top: 60px;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.header {
  width: 100%;
  height: 60px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .left {
    display: flex;
    align-items: center;
  }
  .header-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 100ms linear;
    padding: 0 20px;
    height: 60px;
    .ant-menu {
      display: flex;
      align-items: center;
      .ant-menu-item {
        padding: 0 10px;
        &-active {
          border-bottom: 2px solid rgba(0,0,0,0);
        }
      }
    }
    &.default {
      background-color: #615fe1;
      .ant-menu {
        background: #615fe1;
        border: none;
        transition: background-color 100ms linear !important;
        .ant-menu-item {
          transition: background-color 100ms linear !important;
          border: none;
          color: #fff;
          a {
            color: #fff;
            &:hover, &:focus {
              background: #615fe1;
            }
          }

        }
      }
    }
    &.white {
      background-color: #fff;
      .ant-menu {
        border: none;
        background: #fff;
        transition: background-color 100ms linear !important;
        .ant-menu-item {
          transition: background-color 100ms linear !important;
          color: #615fe1;
          a {
            color: #615fe1;
            &:hover, &:focus {
              background: #fff;
              color: #615fe1;
            }
          }

        }
      }
      .logo-container {
        height: 50px;
        width: 100px;
        background: url('../assets/image/logo.png') no-repeat center center;
        background-size: 110%;
      }
    }
  }
  .logo {
    height: 50px;
    .logo-container {
      height: 50px;
      width: 100px;
      background: url('../assets/image/logo.png') no-repeat center center;
      background-size: 110%;
    }
  }
}
</style>
