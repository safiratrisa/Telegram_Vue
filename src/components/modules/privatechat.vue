<template>
    <div class="page">
        <div id="room" v-if="!$route.query.room">
            <div id="left">
                <div class="header">
                    <Chatheader :socket = "socket"/>
                </div>
                <div class="trashbtn">
                            <p @click="toggle(getChatReceiver.username)">DELETE CHAT</p>
                        </div>
                <div class="chat-body">
                    <div class="chat-box" ref="chatbox">
                        <div class="chat-row-left" v-for="receiver in getChatReceiver" :key="receiver.id">
                            <div v-if="receiver.senderId === $route.query.idUser">
                                <div class="conditionleft" >
                                    <div v-if="show === receiver.username" type="button" @click="deletemsg(receiver.id)" class="deletebtnleft">
                                        <i class="far fa-trash-alt"></i>
                                    </div>
                                    <div class="photo" type="button">
                                        <div class="chat-photo">
                                            <img :src="receiver.senderimages" alt="">
                                        </div>
                                    </div>
                                    <div class="box">
                                        <p>{{receiver.messagesend}}</p>
                                    </div>
                                    <p class="time">{{receiver.time}}</p>
                    </div>
                </div>
                <div v-else>
                    <div class="conditionright">
                        <p class="time">{{receiver.time}}</p>
                    <div class="box">
                        <p>{{receiver.messagesend}}</p>
                    </div>
                    <div class="photo" type="button" @click="toggle(receiver.username)">
                    <div class="chat-photo">
                        <img :src="receiver.senderimages" alt="">
                    </div>
                    </div>
                </div>
                </div>
                </div>

                <div id="socketchat">
                    <div class="chat-row-left" v-for="(message, index) in messages" :key="index">
                    <div v-if="(message.idUser === $route.query.idUser || message.idUser === $route.query.idReceiver) && (message.idReceiver === $route.query.idReceiver || message.idReceiver === $route.query.idUser)">
                    <div v-if="message.idUser === $route.query.idUser">
                    <div class="conditionleft" >
                    <div class="photo">
                    <div class="chat-photo" @click="deletemsgsocket()">
                        <img :src="getMyProfile.images" alt="">
                    </div>
                    </div>
                    <div class="box">
                        <p>{{message.message}}</p>
                    </div>
                    <p class="time">{{message.time}}</p>
                    </div>
                </div>
                <div v-else>
                    <div class="conditionright">
                        <p class="time">{{message.time}}</p>
                    <div class="box">
                        <p>{{message.message}}</p>
                    </div>
                    <div class="photo">
                    <div class="chat-photo">
                        <img :src="getReceiverId.images" alt="">
                    </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
                <div class="input-message">
                    <input type="text" placeholder="Type your message..." v-model="inputMessage" @keypress.enter="handleClick">
                    <i class="fas fa-paper-plane fa-lg" @click.prevent="handleClick"></i>
            </div>
        </div>
            </div>
            <div id="right" style="display: none; width: 100%">
            <Receiverprofile />
        </div>
        </div>

        <div id="room" v-if="$route.query.room">
            <div id="left">
                <div class="header">
                    <Chatheader :socket = "socket"/>
                </div>
                <div class="chat-body">
            <div class="chat-box" ref="chatbox">
                <div class="chat-row-left" v-for="(message, index) in messages" :key="index">
                    <div v-if="message.room === $route.query.room">
                    <div v-if="message.idUser === $route.query.idUser">
                    <div class="conditionleft" >
                    <div class="photo">
                    <div class="chat-photo">
                        <img :src="getMyProfile.images" alt="">
                    </div>
                    </div>
                    <div class="box">
                        <p>{{message.message}}</p>
                    </div>
                    <p class="time">{{message.time}}</p>
                    </div>
                </div>
                <div v-else>
                    <div class="conditionright">
                        <p class="time">{{message.time}}</p>
                    <div class="box">
                        <p class="idname">{{message.idname}} :</p>
                        <p>{{message.message}}</p>
                    </div>
                    <div class="photo">
                    </div>
                </div>
                </div>
                </div>
                </div>
            </div>
            <div class="input-message">
                    <input type="text" placeholder="Type your message..." v-model="inputMessage" @keypress.enter="handleClickgroup">
                    <i class="fas fa-paper-plane fa-lg" @click.prevent="handleClickgroup"></i>
            </div>
        </div>
            </div>
        </div>
        <notifications group="custom-template"
               position="bottom right">
               <template slot="body" >
                   <div class="chat-row-left">
                       <div class="notif-box">
                            <div class="dalamkotak">
                                <div class="box-title">
                                    <h5>{{notifmessagessender}} :</h5>
                                </div>
                                <div class="box-body">
                                    <h5>{{lastnotifmessage}}</h5>
                                </div>
                            </div>
                    </div>
                </div>
                </template>
        </notifications>
        <notifications group="custom-template2"
               position="bottom right">
               <template slot="body" >
                   <div class="chat-row-left">
                       <div class="notif-box">
                            <div class="dalamkotak">
                                <div class="box-title">
                                    <h5>Live Chat</h5>
                                </div>
                                <div class="box-body">
                                    <h5> {{notifgroupsender}} : {{notifgroup}}</h5>
                                </div>
                            </div>
                    </div>
                </div>
                </template>
        </notifications>
        <loading :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage">
      </loading>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Chatheader from '../../components/modules/chatheader'
import Receiverprofile from '../../components/modules/receiverprofile'
import Swal from 'sweetalert2'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'Privatechat',
  props: ['socket'],
  components: {
    Chatheader,
    Receiverprofile,
    Loading
  },
  methods: {
    ...mapActions({ getReceiver: 'getReceiver', getReceiverbyId: 'getReceiverbyId', getUserProfile: 'getMyProfile', deleteMessage: 'deleteMessage' }),
    getUserReceiver () {
      const payload = {
        idUser: this.$route.query.idUser,
        idReceiver: this.$route.query.idReceiver
      }
      this.getReceiver(payload)
    },
    deletemsg (idmsg) {
      this.isLoading = true
      const payload2 = {
        idmsg: idmsg
      }
      this.deleteMessage(payload2)
        .then((res) => {
          Swal.fire({
            title: 'Deleted!',
            icon: 'success'
          })
          this.getUserReceiver()
          this.show = false
          this.isLoading = false
        })
    },
    handleClick () {
      document.getElementById('socketchat').style.display = ''
      this.socket.emit('send', { idUser: this.$route.query.idUser, message: this.inputMessage, idReceiver: this.$route.query.idReceiver, username: this.$route.query.username, usersendername: this.getMyProfile.username })
      this.inputMessage = ''
    //   this.scrollToElement()
    },
    handleClickgroup () {
      this.socket.emit('sendtoroom', { idUser: this.$route.query.idUser, message: this.inputMessage, idname: this.$route.query.idname, room: this.$route.query.room })
      this.inputMessage = ''
    //   this.scrollToElement()
    },
    updatePage (param) {
      this.getUserProfile()
      this.getReceiverbyId()
      this.getUserReceiver()
      this.$getLocation()
        .then(coordinates => {
          this.location.lat = parseFloat(coordinates.lat)
          this.location.lng = parseFloat(coordinates.lng)
        })
    },
    scrollToEnd () {
      var content = this.$refs.chatbox
      content.scrollTop = content.scrollHeight
    },
    toggle (todo) {
      document.getElementById('socketchat').style.display = 'none'
      this.getUserReceiver()
      //   console.log(todo)
      if (this.show === todo) {
        this.show = false
      } else {
        this.show = todo
      }
    }
    // inputhandle () {
    //   if (this.inputMessage.length === 0) {
    //   }
    // }
  },
  updated () {
    this.scrollToEnd()
  },
  data () {
    return {
      location: {
        lat: 0,
        lng: 0
      },
      inputMessage: '',
      messages: [],
      idUser: '',
      username: '',
      idReceiver: '',
      sendData: [],
      notifmessages: [],
      notifmessagessender: [],
      notifmsg: [],
      notifmsgsender: [],
      notifgrp: [],
      notifgrpsender: [],
      notifgroup: [],
      notifgroupsender: [],
      show: '',
      isLoading: false,
      fullPage: true
    }
  },
  computed: {
    ...mapGetters(['getChatReceiver', 'getReceiverId', 'getMyProfile']),
    lastnotifmessage () {
      return this.notifmessages
    },
    lastnotifgroup () {
      return this.notifgroup
    }
  },
  mounted () {
    // this.inputhandle()
    // const messageBody = document.getElementById('chat-box')
    // messageBody.scrollTop = messageBody.scrollHeight
    this.scrollToEnd()
    // this.scrollToElement()
    this.getUserProfile()
    this.getReceiverbyId()
    this.getUserReceiver()
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = parseFloat(coordinates.lat)
        this.location.lng = parseFloat(coordinates.lng)
      })
    const idUser = this.$route.query.idUser
    const idReceiver = this.$route.query.idReceiver
    const username = this.$route.query.username
    this.idUser = idUser
    this.username = username
    this.idReceiver = idReceiver
    // this.socket.emit('initialUser', { idUser: idUser, idReceiver: idReceiver, username: username })
    this.socket.on('sendmsg', (data) => {
      this.messages.push(data)
      //   const hasil = this.messages.slice(-1)[0]
      //   this.notifmessages = hasil
      //   this.$notify({
      //     group: 'custom-template',
      //     duration: 500
      //   })
    })
    this.socket.on('sendnotif', (data) => {
      this.notifmsg.push(data.message)
      this.notifmsgsender.push(data.usersendername)
      const hasil = this.notifmsg.slice(-1)[0]
      const hasil5 = this.notifmsgsender.slice(-1)[0]
      this.notifmessagessender = hasil5
      this.notifmessages = hasil
      this.$notify({
        group: 'custom-template',
        duration: 500
      })
    })
    this.socket.on('sendgroup', (dataroom) => {
      this.messages.push(dataroom)
    })
    this.socket.on('sendnotifgroup', (dataroom) => {
      this.notifgrp.push(dataroom.message)
      const hasil2 = this.notifgrp.slice(-1)[0]
      this.notifgroup = hasil2
      this.notifgrpsender.push(dataroom.idname)
      const hasil3 = this.notifgrpsender.slice(-1)[0]
      this.notifgroupsender = hasil3
      this.$notify({
        group: 'custom-template2',
        duration: 500
      })
    })
  },
  watch: {
    $route () {
      this.updatePage(this.$route.query.username)
    }
  }
}
</script>

<style lang="scss" scoped>
.fa-paper-plane {
    color: #7E98DF;
    margin-right: 3%;
    cursor: pointer;
}
.fa-paper-plane:hover {
    color: #5c6a8f;
}
.trashbtn p {
    width: max-content;
    // border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 2%;
    margin-bottom: 2%;
    padding: 5px;
    font-weight: 700;
    background-color: #7E98DF;
    // color: white;
}
.trashbtn p:hover {
    background-color: #b2bee0;
    color: rgb(80, 80, 80);
}
.deletebtnright {
    margin-right: 5%;
    color: rgb(77, 77, 77);
}
.deletebtnright:hover i {
    color: black;
}
.deletebtnleft {
    margin-left: 5%;
    color: rgb(77, 77, 77);
}
.deletebtnleft:hover i {
    color: black;
}
.idname {
    font-weight: bold;
    font-size: 12px;
}
.notif-box {
    // height: 80px;
    width: 300px;
    // border: 2px solid black;
    padding-right: 30px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    padding-top: 3%;
    padding-bottom: 3%;
    // background-color: rgb(88, 88, 88);
    // opacity: 0.7;
    background: rgb(99, 128, 255);
}
.notif-image {
    margin-left: 5%;
}
.dalamkotak {
    // border: 2px solid red;
    height: 100%;
    width: 100%;
    // padding-left: 5%;
}
.box-title {
    // border: 2px solid green;
    height: 30%;
    // padding-left: 10%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    text-align: center;
    padding-left: 5%;
    opacity: 1;
}
.box-title h5 {
    text-align: left;
    font-size: 20px;
    z-index: 999;
    color: white;
}
.box-body h5 {
    text-align: left;
    font-size: 14px;
    color: white;
}
.box-body {
    // border: 2px solid blue;
    height: 70%;
display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    text-align: center;
    padding-left: 5%;
}
.header {
    height: 15%;
width: 100%;
left: 351px;
top: 0px;
border-radius: 0px;
background-color: #FFFFFF;
padding-left: 5%;
padding-right: 5%;

}
.chat-box {
    // border: 2px solid green;
    // max-height: 610px;
    height: 90%;
    width: 100%;
    overflow: auto;
    position: relative;
}
.chat-body {
    // border: 10px solid red;
    height: 85%;
    // height: 70%;
}
input {
    // border: 2px solid red;
    width: 100%;
    border: none;
    outline: none;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px 0px 10px 10px;
  background-color: #ececec;
//   background-color: pink;
//   margin-left: 5%;
}
.input-message{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    // background-color: pink;
    background-color: #ececec;
    border-radius: 25px;
    overflow: hidden;
}
.input-option {
    display: flex;
    flex-direction: row;
}
.option {
    margin-right: 15%;
}
.conditionleft .box {
width: 30%;
background-color: #7E98DF;
border-radius: 35px 35px 35px 10px;
padding-left: 3%;
padding-top: 10px;
padding-right: 3%;

}
.chat-photo {
    height: 54px;
width: 54px;
left: 404px;
top: 209px;
border-radius: 20px;
display: flex;
flex-direction: column;
overflow: hidden;
}
.chat-photo img {
    height: 100%;
    height: auto;
    overflow: hidden;
}
.conditionleft {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
    margin-bottom: 2%;
}
.time {
    padding: 0;
    margin: 0;
    display: inline-block;
    align-self: flex-end;
    font-size: 12px;
    // margin-top: 10%;
}
.conditionright {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    float: right;
    margin-bottom: 2%;
}
.conditionright .box {
    width: 30%;
background-color: #d6d6d6;
border-radius: 35px 35px 10px 35px;
padding-left: 3%;
padding-top: 10px;
padding-right: 3%;
float: right;
}
.conditionleft .box p {
    font-family: Rubik;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 28px;
letter-spacing: -0.16500000655651093px;
text-align: left;
color: #FFFFFF;
}
.conditionright .box p {
    color: #232323;

}
.photo {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-right: 2%;
    margin-left: 2%;
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
#room {
    display: flex;
    flex-direction: row;
    // border: 5px solid blue;
    height: 100%;
}
.page {
    height: 100%;
}
#right {
    background-color:  #FFFFFF;
}
#left {
    width: 100%;
    // border: 5px solid pink;
}
</style>
