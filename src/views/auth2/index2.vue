<template>
    <div class="auth">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'Auth2'
}
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
}
.auth {
    // border: 2px solid red;
    height: 100vh;
}
</style>
