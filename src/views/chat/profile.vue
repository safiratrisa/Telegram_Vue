<template>
    <div class="container">
      <Userprofile />
    </div>
</template>

<script>
import Userprofile from '../../components/modules/userprofile'
export default {
  name: 'Profile',
  components: {
    Userprofile
  }
}
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
