<template>
    <div class="container-fluid">
      <form class="box" @submit.prevent="handleLogin">
          <h1 class="title">Login</h1>
          <p class="detail">Hi, Welcome back!</p>
          <div class="form-group">
            <div>
              <h5>Email</h5>
              <input type="text" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}">
            <div v-if="!$v.email.required" class="invalid-feedback">Email required</div>
            <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid</div>
            </div>
            <div>
              <h5>Password</h5>
            <input type="password" v-model.trim='$v.password.$model' :class="{'is-invalid': validationStatus($v.password)}">
            <span v-if="!$v.password.required" class="invalid-feedback">Password required</span>
            </div>
          </div>
              <div class="forgot" @click.prevent="forgotpass">Forgot Password?</div>
          <button class="register-btn" type="submit">Login</button>
          <h6><span>Register with</span></h6>
          <button class="google-btn" type="file">
              <img src="../../assets/image/Google.png" alt="">
              Google
              </button>
              <div class="signup">Don't have an account? <span @click.prevent="goRegister">Sign Up</span></div>
      </form>
      <loading :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage">
      </loading>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2'
export default {
  name: 'Login2',
  data () {
    return {
      email: '',
      password: '',
      isLoading: false,
      fullPage: true
    }
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions(['login']),
    handleLogin () {
      this.$v.$touch()
      this.isLoading = true
      if (this.$v.$pendding || this.$v.$error) return
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then((res) => {
          Swal.fire({
            title: 'Hello!',
            html: '<b>Welcome To Telegram </b> <br> <div class="swal-text"> This is the demo version of Chat Application by Trisa Safira Hasanah <br> This application will update your current location when you are logged in. You can also send message to a friend using personal chat or to many friends using Live Chat. <br> If you want to check whether the application is working or not, you can sign in to another browsers or devices and start chatting to this account. <br><br> Thank You </div>'
          })
          this.$router.push('/chatroom/blank')
        })
      this.isLoading = false
    },
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    forgotpass () {
      Swal.fire({
        title: 'Sorry!',
        html: '<b>If you forget your password, please make a new account. Thank you! </b>'
      })
      this.$router.push('register')
    },
    goRegister () {
      this.$router.push('register')
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss" scoped>
.signup {
      float: center;
font-size: 14px;
font-weight: 400;
text-align: center;
color: #313131;
}
.signup span {
color: #7E98DF;
font-weight: 600;
cursor: pointer;
}
.signup span:hover {
color: #446fe4;
}
.box {
  max-height: 710px;
  width: 500px;
  border-radius: 30px;
  background-color: #FFFFFF;
  box-shadow: 0px 20px 20px 0px #7E98DF 5%;
  padding: 3%;
}
.container-fluid {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #E5E5E5;
}
.title {
    // font-family: Rubik;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    color: #7E98DF;
}
.detail {
    // font-family: Rubik;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 17px;
letter-spacing: 0px;
text-align: left;
color: #232323;
margin-top: 10%;
}

h5 {
    // font-family: Rubik;
font-size: 14px;
font-weight: 400;
letter-spacing: 0em;
color: #848484;
margin-top: 10%;
}
input {
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #232323;
    padding-bottom: 3%;
}
.form-group {
    // border: 2px solid green;
    margin-bottom: 5%;
}
.register-btn, .google-btn {
    height: 60px;
width: 100%;
border-radius: 70px;
cursor: pointer;
outline: none;
font-size: 16px;
font-weight: 500;
}
.register-btn {
    background: #7E98DF;
    border: none;
    margin-bottom: 8%;
    color: #FFFFFF;
}
.google-btn {
    background: #FFFFFF;
    border: 1px solid #7E98DF;
    color: #7E98DF;
    margin-bottom: 5%;
}
.google-btn img {
    margin-right: 3%;
}
h6 {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #848484;
    line-height: 0.1em;
    margin-bottom: 8%;
font-size: 16px;
font-weight: 400;
color: #848484;

}
h6 span {
    background: #fff;
    padding: 0 10px;
}
.forgot {
    float: right;
    margin-bottom: 5%;
font-size: 14px;
font-weight: 600;
color: #7E98DF;
cursor: pointer;
}
.forgot:hover {
  color: #446fe4;
}
// .signup {
//     float: center;
// font-family: Rubik;
// font-size: 14px;
// font-weight: 400;
// text-align: center;
// margin-top: 100%;
// color: #313131;
// }

// .signup span {
// font-weight: 400;
// color: #7E98DF;
// }
form .is-invalid {
  border-bottom: 1px solid red;
}
</style>
