<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
    <p>
      <router-link class="weui-btn  weui-btn_mini" to="/home/phone">手机</router-link>
      <router-link class="weui-btn  weui-btn_mini" to="/home/computer">电脑</router-link>
      <router-link class="weui-btn  weui-btn_mini" to="/home/tv">电视</router-link>
    </p>
    <transition name="fade" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background: #ffffff;
}
h1, h2 {
  font-weight: normal;
  padding: 1.0rem 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.weui-btn{
  color: black;
}
.router-link-active{
  background-color: #1aad19;
  color: #ffffff;
}
</style>
