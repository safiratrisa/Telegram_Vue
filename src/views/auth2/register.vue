<template>
    <div class="container-fluid">
      <form class="box" @submit.prevent="handleregister">
          <h1 class="title">
            <i class="fas fa-chevron-left" @click.prevent="backLogin"></i>
                  <!-- <img src="../../assets/image/back.png" alt="" type="button" @click.prevent="backLogin"> -->
                  Register
                  </h1>
          <p class="detail">Let's create your account!</p>
          <div class="form-group">
            <div>
              <h5>Name</h5>
              <input type="text" v-model.trim="$v.username.$model" :class="{'is-invalid': validationStatus($v.username)}">
            <div v-if="!$v.username.required" class="invalid-feedback">Username can not be empty</div>
            </div>
            <div>
              <h5>Email</h5>
              <input type="text" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}">
            <div v-if="!$v.email.required" class="invalid-feedback">Email required</div>
            <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid</div>
            </div>
            <div>
              <h5>Password</h5>
            <input type="password" v-model.trim='$v.password.$model' :class="{'is-invalid': validationStatus($v.password)}">
            <div v-if="!$v.password.required" class="invalid-feedback">Password can not be empty</div>
            <div v-if="!$v.password.minLength" class="invalid-feedback">You must have at least 6 letters</div>
            </div>
          </div>
          <button class="register-btn" type="submit">Register</button>
          <h6><span>Register with</span></h6>
          <button class="google-btn">
              <img src="../../assets/image/Google.png" alt="">
              Google
              </button>
      </form>
      <loading :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage">
      </loading>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2'
export default {
  name: 'Login2',
  title: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      fullPage: true
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    username: { required }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions(['register']),
    handleregister () {
      this.$v.$touch()
      this.isLoading = true
      if (this.$v.$pendding || this.$v.$error) return
      if (this.username.length === 0) { return }
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.register(payload)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Please login with your new account'
          })
          this.$router.push('login')
          this.isLoading = false
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Register!',
            text: err.response.data.err.message
          })
          this.isLoading = false
        })
    },
    backLogin () {
      this.$router.push('login')
    },
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    }
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
.fa-chevron-left {
  cursor: pointer;
}
.fa-chevron-left:hover {
  color: #446fe4;
}
.box {
  min-height: 710px;
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
