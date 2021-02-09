<template>
    <div class="box">
            <div class="top-title">
                <p>@{{getMyProfile.username}}</p>
            </div>
            <div class="title-photo">
                <div class="photos">
                    <img :src="getMyProfile.images" alt="">
                </div>
                <div class="input-photo">
                    <label for="choose" class="btn-yellow btn-profile-1 d-flex justify-content-center align-items-center">
                Choose photo
              </label>
                    <input type="file" id="choose" placeholder="Choose Photo" ref="file" v-on:change="handleFileUpload()">
                </div>
            </div>
            <div class="title-name">
                <div class="edit">
                    <h5>{{getMyProfile.name}}</h5>
                    <a data-target="#editname" >
                        <i class="fas fa-pen" @click.prevent='editname'></i>
                    </a>
                </div>
                <div v-if="showname === 'true'">
                        <input v-model="name"  type="text" class="form-control border-0 bg-light" placeholder="Edit Full Name" @keypress.enter="updatename" />
                    </div>
                <h6>@{{getMyProfile.username}}</h6>
            </div>
            <div class="account">
                <h4>Account</h4>
                <div class="edit-phone">
                    <h5>+62 {{getMyProfile.phonenumber}}</h5>
                <a data-target="#editphone">
                        <i class="fas fa-pen" @click.prevent='editphone'></i>
                    </a>
                </div>
                <div v-if="showphone === 'true'">
                        <input v-model="phonenumber"  type="text" class="form-control border-0 bg-light" placeholder="Edit Phone Number" @keypress.enter="updatephone"/>
                    </div>
                <hr>
            </div>
            <div class="account">
                <div class="edit-phone">
                    <h5>{{getMyProfile.bio}}</h5>
                <a data-target="#editbio" >
                        <i class="fas fa-pen" @click.prevent='editbio'></i>
                    </a>
                </div>
                <div v-if="showbio === 'true'">
                        <input v-model="bio" type="text" class="form-control border-0 bg-light" placeholder="Edit Bio" @keypress.enter="updatebio"/>
                    </div>
                <h6>
                    Bio
                </h6>
                <hr>
            </div>
            <GmapMap
  :center="{lat:location.lat, lng:location.lng}"
  :zoom="10"
  map-type-id="terrain"
  style="width: 100%; height: 200px"
>
  <GmapMarker
    :position="{lat:location.lat, lng:location.lng}"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
<loading :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage">
      </loading>
<!-- <div class="logout">
            <img src="../../assets/image/log-out.png" alt="" type="button" @click.prevent="logout">
        </div> -->
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2'
export default {
  name: 'Userprofile',
  data () {
    return {
      location: {
        lat: 0,
        lng: 0
      },
      image: '',
      name: '',
      phonenumber: '',
      bio: '',
      showname: '',
      showphone: '',
      showbio: '',
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions({ updateLocation: 'updateLocation', getUserProfile: 'getMyProfile', logoutbutton: 'logout', updateImage: 'updateImage', updateName: 'updateName', updatePhone: 'updatePhone', updateBio: 'updateBio' }),
    logout () {
      this.logoutbutton()
      this.$router.push('/auth/login')
    },
    handleFileUpload () {
      this.isLoading = true
      this.image = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('image', this.image)
      this.$store.dispatch('updateImage', formData)
        .then((res) => {
          Swal.fire({
            title: 'Success!',
            text: 'Your profile has been updated',
            icon: 'success'
          })
          this.getUserProfile()
          this.isLoading = false
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.err.message,
            icon: 'error'
          })
          this.isLoading = false
        })
    },
    updatename () {
      this.isLoading = true
      const payload = {
        name: this.name
      }
      this.updateName(payload)
        .then((res) => {
          Swal.fire({
            title: 'Success!',
            icon: 'success'
          })
          this.getUserProfile()
          this.name = ''
          this.showname = 'false'
          this.isLoading = false
        })
    },
    updatephone () {
      this.isLoading = true
      const payload = {
        phonenumber: this.phonenumber
      }
      this.updatePhone(payload)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            icon: 'success'
          })
          this.getUserProfile()
          this.phonenumber = ''
          this.showphone = 'false'
          this.isLoading = false
        })
    },
    updatebio () {
      this.isLoading = true
      const payload = {
        bio: this.bio
      }
      this.updateBio(payload)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            icon: 'success'
          })
          this.getUserProfile()
          this.bio = ''
          this.showbio = 'false'
          this.isLoading = false
        })
    },
    editname () {
      if (this.showname === 'true') {
        this.showname = 'false'
      } else {
        this.showname = 'true'
      }
    },
    editphone () {
      if (this.showphone === 'true') {
        this.showphone = 'false'
      } else {
        this.showphone = 'true'
      }
    },
    editbio () {
      if (this.showbio === 'true') {
        this.showbio = 'false'
      } else {
        this.showbio = 'true'
      }
    }
  },
  mounted () {
    this.getUserProfile()
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
        const payload = {
          lat: this.location.lat,
          lng: this.location.lng
        }
        this.updateLocation(payload)
      })
  },
  computed: {
    ...mapGetters(['getMyProfile'])
  }
}
</script>

<style lang="scss" scoped>

.edit {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.fa-pen {
    // border: 2px solid black;
    margin-left: 20%;
    color: rgb(70, 68, 68);
    cursor: pointer;
}
.fa-pen:hover {
    color: black;
}
.edit-phone {
    display: flex;
    flex-direction: row;
    // justify-content: center;
}
.input-photo input {
    outline: none;
    display: none
}
.input-photo label {
    margin-top: 1%;
    font-family: Rubik;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 19px;
letter-spacing: -0.17000000178813934px;
text-align: left;
color: #7E98DF;
text-decoration: underline;
cursor: pointer;
}
label:hover {
  color: #586997;
}
.input-photo {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.logout {
    display: flex;
    justify-content: center;
    margin-top: 5%;
}
.logout img {
    cursor: pointer;
}
.box {
  width: 100%;
  padding-top: 1%;
  padding-left: 10%;
  padding-right: 10%;
  // height: 780px;
  // width: 100%;
  // max-width: 500px;
  // border-radius: 30px;
  // background-color: #ffffff;
  // box-shadow: 5px 5px 5px gray;
  // padding: 3%;
}
.top-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
}
.image {
     margin-right: 5%;
}
.top-title p {
    font-family: Rubik;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 28px;
letter-spacing: 0px;
text-align: left;
color: #7E98DF;
margin: 0;
}
.photos {
    height: 82px;
width: 82px;
left: 166px;
top: 139px;
border-radius: 30px;
overflow: hidden;
}
.photos img {
    height: 100%;
}
.title-photo {
    display: flex;
    flex-direction: column;
    margin-top: 4%;
}
.title-photo .photos {
    align-self: center;
    cursor: pointer;
}
.title-name {
    text-align: center;
    margin-top: 2%;
}
.title-name h5 {
    font-family: Rubik;
font-size: 22px;
font-style: normal;
font-weight: 500;
line-height: 26px;
letter-spacing: -0.16500000655651093px;
color: #232323;
}
.title-name h6 {
    font-family: Rubik;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 19px;
letter-spacing: 1.3350000381469727px;
color: #848484;

}
.account {
    margin-top: 5%;
    margin-bottom: 5%;
}
.account h4 {
    font-family: Rubik;
font-size: 19px;
font-style: normal;
font-weight: 500;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: #232323;

}
.account h5 {
    font-family: Rubik;
font-size: 19px;
font-style: normal;
font-weight: 500;
line-height: 23px;
letter-spacing: 0px;
text-align: left;
color: #232323;

}
.account h6 {
    font-family: Rubik;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 19px;
letter-spacing: -0.17000000178813934px;
text-align: left;
color: #7E98DF;

}
</style>
