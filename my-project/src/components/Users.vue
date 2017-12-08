<template>
    <div class="users">
        <ul>
            <li v-for="user in users" :key="user">{{user}}</li>
        </ul>
        <h3>{{ userId }}</h3>
    </div>
</template>
<script>
     export default {
        name: 'Users',
        data () {
            return {
                users: [...'大麻瓜'],
                userId:'13'
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