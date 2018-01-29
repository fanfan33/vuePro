<template>
  <div class="about">
    <h3>{{ title }}</h3>
    <div id="example-2">
        <button @click="show = !show">Toggle show</button>
        <transition name="bounce">
            <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
        </transition>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'About',
        data () {
            return {
                title: 'this is about page',
                show: true,
            }
        },
        methods: {

        }
    }
</script>
<style scoped>
    h3{
        font-size: 3.2rem;
    }
    p{
        font-size: 1.6rem;
    }
    button{
        background: none;
        padding: 5px 10px;
        border: 1px solid #000;
        border-radius: 5px;
        margin: 10px;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>

