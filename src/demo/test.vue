<template>
  <div class="test">
    <h1>{{ title }}</h1>
    <div class="b">厉害了</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    title: {
      type: String,
      default: "",
    },
  },

  created() {},

  methods: {},
};
</script>
<style scoped lang="scss">
.test {
  margin-top: 20px;
  background-color: pink;
  .b {
    color: red;
  }
}
</style>
