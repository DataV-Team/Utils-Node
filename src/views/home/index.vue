<template>
  <div class="home">
    <div class="btn" v-for="btn in btns" :key="btn.text" @click="$router.push({ name: btn.name })">
      {{ btn.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      btns: [
        {
          text: 'AudioFft',
          name: 'audioFft'
        }
      ]
    }
  }
}
</script>

<style lang="less">
.home {
  position: absolute;
  width: 500px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: 50%;
  transform: translateX(-50%);
  top: 100px;
}
</style>
