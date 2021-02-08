<template>
    <Privatechat :socket = "socket"/>
</template>

<script>
import Privatechat from '../../components/modules/privatechat'
export default {
  name: 'Chat',
  components: {
    Privatechat
  },
  props: ['socket']
}
</script>

<style lang="scss" scoped>
</style>
