<template>
  <div class="button-group">
    <div
      v-for="(btn, i) in buttons"
      :key="btn"
      :class="`button-item ${value === i && 'active'}`"
      @click="handleClickEvent(i)"
    >
      {{ btn }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    buttons: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClickEvent (index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="less">
.button-group {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 200, 255, .8);
  overflow: hidden;

  .button-item {
    padding: 10px;
    color: #4ba5b6;
    font-weight: bold;
    box-shadow: 0 0 3px rgba(0, 200, 255, .8);
    cursor: pointer;
  }

  .active {
    background-color: #4ba5b6;
    color: #fff;
  }
}
</style>
