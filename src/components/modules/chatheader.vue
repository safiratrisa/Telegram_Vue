<template>
        <div class="listpage">
          <div v-if="!$route.query.room" class="list">
            <div class="profile-status">
                    <!-- <div class="back" type="button">
                        <img src="../../assets/image/back.png" alt="">
                    </div> -->
                    <div class="image">
                        <img :src="getReceiverId.images" alt="">
                    </div>
                    <div class="profile">
                        <h5>{{$route.query.username}}</h5>
                        <div v-for="(online, index) in onlines" :key="index">
                                    <div v-if="online === $route.query.idReceiver">
                                        <div>Online</div>
                                    </div>
                                    <div v-else>
                                        <div></div>
                                    </div>
                                </div>
                    </div>
                </div>
                <div class="menu" type="button" @click.prevent="userprofile">
                    <!-- <img src="../../assets/image/Profile menu.png" alt=""> -->
                    <i class="fas fa-ellipsis-v fa-2x"></i>
                </div>
          </div>
          <div v-if="$route.query.room" class="list">
            <div class="profile-status">
                    <!-- <div class="back" type="button">
                        <img src="../../assets/image/back.png" alt="">
                    </div> -->
                    <div class="image">
                        <img src="../../assets/image/users-group.png" alt="">
                    </div>
                    <div class="profile">
                        <h5>{{$route.query.username}}</h5>
                        <div v-for="(online, index) in onlines" :key="index">
                                    <div v-if="online === $route.query.idReceiver">
                                        <div>Online</div>
                                    </div>
                                    <div v-else>
                                        <div></div>
                                    </div>
                                </div>
                    </div>
                </div>
          </div>
            </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Chatheader',
  data () {
    return {
      onlines: {}
    }
  },
  computed: {
    ...mapGetters(['getReceiverId'])
  },
  props: ['socket'],
  methods: {
    ...mapActions({ getReceiverbyId: 'getReceiverbyId' }),
    userprofile () {
      document.getElementById('right').style.display = ''
      if (window.innerWidth < 1265) {
        document.getElementById('left').style.display = 'none'
      }
    }
  },
  mounted () {
    this.getReceiverbyId()
    this.socket.on('userlist', (data) => {
      const datakey = Object.keys(data)
      this.onlines = datakey
    })
  }
}
</script>

<style lang="scss" scoped>
.list{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
}
.listpage{
    width: 100%;
    height: 100%;
}
.profile-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}
.back {
    margin-right: 5%;
    cursor: pointer;
}
.image img {
    height: 100%;
    overflow: hidden;
}
.image {
    height: 64px;
width: 64px;
left: 30px;
top: 297px;
border-radius: 20px;
overflow:hidden;
}
.image {
    margin-right: 3%;
}
.profile h5 {
    font-family: Rubik;
font-size: 18px;
font-weight: 500;
color: #232323;
}
.profile h6 {
    font-family: Rubik;
font-size: 15px;
font-weight: 400;
color: #7E98DF;

}
.menu {
  color: #7E98DF;
    cursor: pointer;
}
.menu:hover i {
  color: #5878cf;
}
@media screen and (max-height: 724px) {
.image {
    height: 50px;
width: 50px;
}
}
@media screen and (max-height: 648px) {
.image {
    height: 40px;
width: 40px;
}
}
</style>
