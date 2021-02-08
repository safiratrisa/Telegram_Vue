<template>
    <div class="profile">
        <div class="profile-title">
                <div class="profile-image" type="button" @click.prevent="closeprofile">
                    <!-- <img src="../../assets/image/back.png" alt=""> -->
                    <i class="fas fa-chevron-left fa-2x"></i>
                    </div>
                <p>@{{getReceiverId.username}}</p>
            </div>
            <div class="image-profile">
            <div class="image-box">
                <img :src="getReceiverId.images" alt="">
            </div>
            </div>
            <div class="profile-info">
                <p class="name">{{getReceiverId.name}}</p>
            <p class="status">{{getReceiverId.bio}}</p>
            <p class="phone-title">Phone Number</p>
            <p class="phone">{{getReceiverId.phonenumber}}</p>
            </div>
            <div class="location">
                    <h2>Location</h2>
                </div>
                <GmapMap
  :center="{lat:parseFloat(getReceiverId.lat), lng:parseFloat(getReceiverId.lng)}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 90%; height: 400px; margin-left: 5%; margin-right: 5%"
>
  <GmapMarker
    :position="{lat:parseFloat(getReceiverId.lat), lng:parseFloat(getReceiverId.lng)}"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Receiverprofile',
  computed: {
    ...mapGetters(['getReceiverId'])
  },
  methods: {
    ...mapActions({ getReceiverbyId: 'getReceiverbyId' }),
    userprofile () {
      document.getElementById('right').style.display = ''
      if (window.innerWidth < 1265) {
        document.getElementById('left').style.display = 'none'
      }
    },
    closeprofile () {
      document.getElementById('right').style.display = 'none'
      if (window.innerWidth < 1265) {
        document.getElementById('left').style.display = ''
      }
    }
  },
  mounted () {
    this.getReceiverbyId()
  }
}
</script>

<style lang="scss" scoped>
.profile {
  // border: 2px solid red;
  overflow: auto;
  height: 100%;
}
.profile-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 3%
}
.profile-title p {
    font-family: Rubik;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 28px;
letter-spacing: 0px;
text-align: left;
color: #7E98DF;

}

.profile-image {
  margin-right: 3%;
  color: #7E98DF;
    cursor: pointer;
}
.profile-image:hover i {
  color: #5878cf;
}

.image-profile {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 5%;
}
.image-box img {
    height: 100%;
    overflow: hidden;
}
.image-box {
    height: 100px;
width: 100px;
left: 30px;
top: 297px;
border-radius: 20px;
overflow: hidden;
}
.profile-info {
    padding-left: 10%;
    padding-right: 10%;
    margin-bottom: 5%;
}
.name, .phone-title {
    font-family: Rubik;
font-size: 22px;
font-style: normal;
font-weight: 500;
line-height: 26px;
letter-spacing: -0.16500000655651093px;
text-align: left;
color: #232323;
}

.status, .phone {
    font-family: Rubik;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 19px;
letter-spacing: 1.3350000381469727px;
text-align: left;
color: #232323;
}
.status{
    margin-bottom: 10%;
}
.location h2 {
    font-family: Rubik;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 24px;
letter-spacing: -0.16500000655651093px;
text-align: center;
color: #FFFFFF;

}
.location {
    height: 50px;
width: 80%;
border-radius: 20px;
background-color: #7E98DF;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5%;
margin-left: 10%;
margin-right: 10%;
}
@media screen and (max-width: 991px) {
   .profile {
  overflow: visible;
  height: 100%;
}
}
</style>
