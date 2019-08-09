<template>
  <div id="app">
    <div class="index-btn btn" v-if="indexBtn" @click="$router.push('/')">Index</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      indexBtn: false
    }
  },
  mounted () {
    this.indexBtn = this.$route.name !== 'home'
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background-color: #f4f7f0;
  margin: 0px;
  padding: 0px;
  position: relative;
}

.index-btn {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 999;
  border-radius: 10px;
}
</style>
