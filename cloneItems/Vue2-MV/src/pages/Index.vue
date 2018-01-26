<template>
  <transition name="router-slide" mode="out-in">
    <div class="index">
      <div class="search-index">
          <search-input></search-input>
      </div>
      <mv-list :search-keyword="searchKeyword"></mv-list>
    </div>
  </transition>
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
  activated() {
    document.title = '网易云音乐MV'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.router-slide-enter-active, .router-slide-leave-active {
    transition: all .2s ease;
}
.router-slide-enter {
    transform: translate3d(1rem, 0, 0);
    opacity: .9;
}
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
