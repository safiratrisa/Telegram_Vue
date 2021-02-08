<template>
    <div class="left-box">
        <div class="top" >
            <div class="title">
                    <h1>Telegram</h1>
                    <div class="menu">
                        <div class="logout">
                            <i class="fas fa-sign-out-alt fa-2x" @click.prevent="logout"></i>
                        </div>
                        <div class="user">
                            <i class="fas fa-user fa-2x" type="button" @click.prevent="handleProfile"></i>
                        </div>
                        <!-- <img src="../../assets/image/Menu.png" alt="" type="button" @click.prevent="handleProfile"> -->
                    </div>
                </div>
                <input type="text" v-model="search" placeholder="Search receiver here" @keyup='searchname'>
                <!-- <div class="all">
                    <h2>All</h2>
                </div> -->
        </div>
                <!-- <div class="friendlist"> -->
                <div class="friend">
                    <div class="list" v-for="friend in getFriends" :key="friend.id" type="button" @click.prevent="handleChat(friend.id, friend.username)">
                        <div class="side-profile">
                            <div class="status">
                                <div class="image">
                                    <img :src="friend.images" alt="">
                                </div>
                                <div v-for="(online, index) in onlines" :key="index">
                                    <div v-if="online === friend.id">
                                        <div class="onlinestatus"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="message" >
                                <h5>{{friend.username}}</h5>
                                <div v-if="(senderid === $route.query.idUser || senderid === $route.query.idReceiver) && (receiverid === $route.query.idReceiver || receiverid === $route.query.idUser)">
                                    <div v-if="receiverid === friend.id || senderid === friend.id ">
                                        <h6>{{messages}}</h6>
                                    </div>
                                    <div v-else>
                                        <h6> </h6>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="time" v-if="(senderid === $route.query.idUser || senderid === $route.query.idReceiver) && (receiverid === $route.query.idReceiver || receiverid === $route.query.idUser)">
                                    <div v-if="receiverid === friend.id || senderid === friend.id ">
                                        <p>{{time}}</p>
                                    </div>
                                    <div v-else>
                                        <h6> </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="list" @click.prevent="handleRoom()">
                        <div class="side-profile">
                            <div class="status">
                                <div class="image">
                                    <img src="../../assets/image/users-group.png" alt="">
                                </div>
                                <div>
                                </div>
                            </div>
                            <div class="message" >
                                <h5>Live Chat</h5>
                            </div>
                                </div>
                            </div>
                            </div>
                             <!-- </div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Userlist',
  data () {
    return {
      messages: '',
      receiverid: '',
      time: '',
      senderid: '',
      onlines: {},
      search: ''
    }
  },
  props: ['socket'],
  methods: {
    ...mapActions({ getUserFriends: 'getFriends', updateLocation: 'updateLocation', logoutbutton: 'logout' }),
    handleChat (idReceiver, username) {
      localStorage.setItem('idReceiver', idReceiver)
      const idUser = localStorage.getItem('userID')
      this.$router.push({ path: 'chat', query: { idReceiver: idReceiver, username: username, idUser: idUser } })
        .catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err
          }
        })
    },
    searchname () {
      const payload = {
        search: this.search
      }
      this.getUserFriends(payload)
    },
    handleProfile () {
      this.$router.push({ path: 'profile' })
    },
    handleRoom () {
      const room = 'AllFriends'
      const idUser = localStorage.getItem('userID')
      const myname = localStorage.getItem('username')
      this.$router.push({ path: 'chat', query: { room: room, idUser: idUser, username: 'All Friends', idReceiver: 11, idname: myname } })
        .catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err
          }
        })
    },
    logout () {
      this.logoutbutton()
      this.$router.push('/auth/login')
    }
  },
  computed: {
    ...mapGetters(['getFriends'])
  },
  mounted () {
    const room = 'AllFriends'
    const idUser = localStorage.getItem('userID')
    const myname = localStorage.getItem('username')
    const payload = {
      search: this.search
    }
    this.getUserFriends(payload)
    this.socket.emit('login', { idUser: localStorage.getItem('userID') })
    this.socket.emit('sendtoroom', { room: room, idUser: idUser, idname: myname, message: `${myname} join the live chat` })
    this.socket.on('sendmsg', (data) => {
      this.messages = data.message
      this.receiverid = data.idReceiver
      this.time = data.time
      this.senderid = data.idUser
    })
    this.socket.on('userlist', (data) => {
      const datakey = Object.keys(data)
      this.onlines = datakey
    })
    this.$getLocation()
      .then(coordinates => {
        const payload = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        this.updateLocation(payload)
      })
  }
}
</script>

<style lang="scss" scoped>
.left-box{
    // border: 5px solid green;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // overflow: hidden;
}
.fa-user{
    color: #7E98DF;
    cursor: pointer
}
.status {
    position: relative;
}
.onlinestatus {
    width: 15px;
    height: 15px;
    background-color: rgb(74, 146, 74);
    position: absolute;
    right: 1px;
    bottom: 0;
    border-radius: 50%;
}
.side-profile {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    // border: 2px solid black;
    width: 100%;
}
.title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4%;
}
.title h1 {
    font-family: Rubik;
font-size: 29px;
font-style: normal;
font-weight: 500;
line-height: 34px;
letter-spacing: -0.16500000655651093px;
text-align: center;
color: #7E98DF;
}
input {
    width: 100%;
    background-color: #FAFAFA;
    border: none;
    outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  background-image: url('../../assets/image/Search.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  margin-bottom: 4%;
}
.all h2 {
    font-family: Rubik;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 24px;
letter-spacing: -0.16500000655651093px;
text-align: center;
color: #FFFFFF;

}
.all {
    height: 50px;
width: 100%;
border-radius: 20px;
background-color: #7E98DF;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5%;
}
.image {
    height: 64px;
width: 64px;
left: 30px;
top: 297px;
border-radius: 20px;
overflow: hidden;
}
.image img {
    height: 100%;
    overflow: hidden;
}
.list{
    margin-bottom: 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    // border: 2px solid red;
}
.friend {
    // margin-bottom: 10%;
    margin: 0;
    padding: 0;
    height: 100vw;
    // height: 100%;
    // min-height: 50vh;
    // height:80%;
    overflow: auto;
    // border: 5px solid black;
}
.friendlist {
    // border: 5px solid red;
    height: 100%;
    overflow: auto;
}
::-webkit-scrollbar {
    width: .45rem;
}
::-webkit-scrollbar-thumb {
    background-color: #7E98DF ;
    border-radius: 3px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
.message h5 {
    font-family: Rubik;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 21px;
letter-spacing: -0.16500000655651093px;
text-align: left;
color: #232323;

}
.message h6 {
    color: #7E98DF;
    font-family: Rubik;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 17px;
letter-spacing: -0.16500000655651093px;
text-align: left;
}
.menu {
    display: flex;
    flex-direction: row;
    color: #7E98DF;
    cursor: pointer;
}
.user {
    margin-left: 20%;
}
.user:hover i, .logout:hover i {
  color: #5878cf;
}
.message {
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 30px;
}
@media screen and (max-width: 991px) {
.friend {
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    padding-top: 5%;
    overflow: visible;
    overflow-x: auto;
    overflow-y: visible;
}
.message, .all, .time {
    display: none;
}
.list {
    margin-right: 5%;
}
}
</style>
