<template>
    <div class="users"  v-if="users.length > 0">
        <ul>
            <li v-for="user in users" :key="user">{{user}}</li>
        </ul>
        <h3>{{ userId }}</h3>
        <button @click="ifCheck = !ifCheck">嘎嘎</button>
        <transition name="bounce">
            <p v-if="ifCheck">我显示出来了</p>
        </transition>
    </div>
</template>
<script>
     export default {
        name: 'Users',
        data () {
            return {
                users: [...'大麻瓜'],
                userId:'13',
                ifCheck: false
            }
        },
        watch: {
            '$route' (to, from) {
                console.log(to);
                console.log(from);
                this.userId = to.params.id
            }
        }
    }
</script>
<style type="text/css" rel="stylesheet">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    /* slide */
    .slide-enter-active {
        transition: all .3s ease;
    }
    .slide-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-enter,.slide-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }
    /* bounce */
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-out .5s;
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
    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(0);
        }
    }
</style>