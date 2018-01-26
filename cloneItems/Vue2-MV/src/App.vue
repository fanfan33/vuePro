<template>
  <div id="app">
    <!-- <transition name="router-slide" mode="out-in"> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
  </div>
</template>

<style lang="scss">
@import 'src/style/base';



</style>
