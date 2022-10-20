<template>
  <div class="c-placeholder">
    <ul class="placeholder__list">
      <li class="placeholder__item" v-for="n in 2" :key="n">
        <div class="placeholder__p1"></div>
        <div class="placeholder__p2"></div>
        <div class="placeholder__p3"></div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped src="./placeholder.scss"></style>
