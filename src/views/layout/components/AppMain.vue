<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 60px);
}
</style>

