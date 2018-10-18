<template>
  <el-menu :default-active="$route.path" router class="navbar" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
    <template v-for="(item, index) in permission_routers" v-if="!item.hidden&&item.children">
      <el-menu-item :index="item.path" :key="index">
        {{ item.title }}
      </el-menu-item>
    </template>
    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"/>

      <el-tooltip content="全屏" effect="dark" placement="bottom">
        <screenfull class="right-menu-item"/>
      </el-tooltip>

      <el-button class="right-menu-item" @click="logout">退出登录</el-button>
    </div>
  </el-menu>

</template>

<script>
import { mapGetters } from 'vuex'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    ErrorLog,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'name'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      vertical-align: middle;
      display: inline-block;
      margin: 0 8px;
    }
  }
}
</style>
