<template>
  <div class="index">
    <div class="search-index">
      <search-input></search-input>
    </div>
    <mv-list :search-keyword="searchKeyword"></mv-list>
  </div>
</template>

<script>
import MvList from '../components/MvList'
import SearchInput from '../components/SearchInput'

export default {
  name: 'index',
  components: {
    SearchInput,
    MvList
  },
  data () {
    return {
      searchKeyword: 'taylor'
    }
  },
  //当组件在keep-alive内切换，activated和deactivated两个生命周期钩子函数将会被对应执行
  activated() {
    document.title = '网易云音乐MV'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index {
  padding-top: 1.4rem;
}
.search-index {
  width: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
}
</style>
