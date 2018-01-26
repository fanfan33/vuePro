<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="router">
      <router-link to="/home">
        <figure>
          <img src="./assets/home-c.png" alt="首页">
          <figcaption>首页</figcaption>
        </figure>
      </router-link>
      <router-link to="/about">
        <figure>
          <img src="./assets/message-c.png" alt="消息">
          <figcaption>消息</figcaption>
        </figure>
      </router-link>
      <router-link to="/users/:id?">
        <figure>
          <img src="./assets/my-c.png" alt="我的">
          <figcaption>我的</figcaption>
        </figure>
      </router-link>
    </div>
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
    background-color: #efefef;
  }
  body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: normal;
    font-family: "Microsoft Yahei";
    box-sizing: border-box;
  }
</style>

<style scoped>
 
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    
  }
  .router{
    position: fixed;
    bottom: 0.5rem;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  a{
    font-size: 1.6rem;
    display: inline-block;
    border: 1px solid #000;
    color: black;
    border-radius: 5px;
    padding: 2px 5px;
  }
  a.router-link-active{
    color: red;
  }
  figure img{
    height: 2.5rem;
  }
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
