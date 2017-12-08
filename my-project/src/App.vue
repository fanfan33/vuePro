<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-link  to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/users/:id?">Users</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a{
  color: black;
}
a.router-link-active{
  color: red;
}
</style>
