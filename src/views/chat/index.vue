<template>
        <div class="rows">
            <div class="left">
                <Userlist :socket = "socket" />
            </div>
            <div class="right">
                <router-view :socket = "socket"/>
            </div>
        </div>
</template>

<script>
import Userlist from '../../components/modules/userlist'
import io from 'socket.io-client'
export default {
  name: 'Chatroom',
  title: 'Telegram',
  data () {
    return {
      // socket: io('http://localhost:5000')
      socket: io(`${process.env.VUE_APP_SERVICE_API}`)
    }
  },
  components: {
    Userlist
  }
}
</script>

<style lang="scss" scoped>
.left{
    padding-top: 2%;
    padding-left: 3%;
    padding-right: 3%;
    padding-bottom: 2%;
    width: 40%;
}
.right {
  height: 100%;
    background-color: #FAFAFA;
    width: 60%;
}
.rows {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
}
@media screen and (max-width: 991px) {
   .rows{
    flex-direction: column;
}
.left{
  width: 100%;
  border-bottom: 5px solid #7E98DF;
}
.right {
  width: 100%;
}
}
</style>
