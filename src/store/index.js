import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: null || localStorage.getItem('token'),
    userID: null || localStorage.getItem('userID'),
    friends: [],
    receiver: {},
    receiverid: {},
    myProfile: {}
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    SET_FRIENDS (state, payload) {
      state.friends = payload
    },
    SET_RECEIVER (state, payload) {
      state.receiver = payload
    },
    SET_RECEIVER_ID (state, payload) {
      state.receiverid = payload
    },
    SET_MY_PROFILE (state, payload) {
      state.myProfile = payload
    },
    REMOVE_ALL_TOKEN (state) {
      state.token = null
      state.user = {}
      state.userID = null
      state.friends = []
      state.receiver = {}
      state.receiverid = {}
      state.myProfile = {}
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/users/login`, payload)
          .then((res) => {
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('userID', res.data.result.id)
            localStorage.setItem('username', res.data.result.username)
            context.commit('SET_USER', res.data.result)
            context.dispatch('interceptorRequest')
            // axios.defaults.headers.common.Authorization = `Bearer ${res.data.result.token}`
            resolve(res.data.result)
          })
          .catch((err) => {
            let readerror = err.response.data.err.message
            if (readerror === 'problem with database') {
              readerror = 'Wrong Email'
            }
            Swal.fire({
              icon: 'error',
              title: 'Failed to Login!',
              text: readerror
            })
            reject(err)
          })
      })
    },
    register ({ context }, { username, email, password }) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/users/register`, {
          username: username,
          email: email,
          password: password
        })
          .then((res) => {
            resolve(res.data.result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        // Do something before request is sent
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    logout (context) {
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
      localStorage.removeItem('idReceiver')
      context.commit('REMOVE_ALL_TOKEN')
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (err) {
        if (err.response.status === 401) {
          if (err.response.data.err.message === 'Invalid Token' || err.response.data.err.message === 'Token Expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('userID')
            localStorage.removeItem('idReceiver')
            localStorage.removeItem('username')
            context.commit('REMOVE_ALL_TOKEN')
            router.push('/auth/login')
          }
        }
        return Promise.reject(err)
      })
    },
    getFriends (context, payload) {
      return new Promise((resolve, reject) => {
        // console.log('cek isi payload')
        // console.log(payload.search)
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/friends/${localStorage.getItem('userID')}?username=${payload.search}`)
          .then((res) => {
            context.commit('SET_FRIENDS', res.data.result)
            // console.log(res.data.result)
            resolve(res.data.result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getReceiverbyId (context, payload) {
      return new Promise((resolve, reject) => {
        // console.log('abcd')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/receiverby/${localStorage.getItem('idReceiver')}`)
          .then((res) => {
            context.commit('SET_RECEIVER_ID', res.data.result[0])
            // console.log(res.data.result[0])
            resolve(res.data.result[0])
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getMyProfile (context, payload) {
      return new Promise((resolve, reject) => {
        // console.log('abcd')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/receiverby/${localStorage.getItem('userID')}`)
          .then((res) => {
            context.commit('SET_MY_PROFILE', res.data.result[0])
            // console.log(res.data.result[0])
            resolve(res.data.result[0])
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getReceiver (context, { idUser, idReceiver }) {
      // console.log(idUser)
      // console.log(idReceiver)
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/receiver/${idUser}/${idReceiver}`)
          .then((res) => {
            context.commit('SET_RECEIVER', res.data.result)
            // console.log('abcdefgtrisa')
            // console.log(res.data.result)
            resolve(res.data.result)
          })
          .catch((err) => {
            // console.log(err.response)
            reject(err)
          })
      })
    },
    updateLocation ({ context }, { lat, lng }) {
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_SERVICE_API}/users/updatelocation/${localStorage.getItem('userID')}`, {
          lat: lat,
          lng: lng
        })
          .then((res) => {
            // console.log(res.data.result.message)
            resolve(res.data.result.message)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateImage (context, file) {
      return new Promise((resolve, reject) => {
        // console.log('kebaca?')
        axios.put(`${process.env.VUE_APP_SERVICE_API}/users/updateimage/${localStorage.getItem('userID')}`, file, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
            Swal.fire(
              'Success!',
              'Your profile has been updated'
            )
            context.dispatch('getMyProfile')
            resolve(res.data.result)
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              err.response.data.err.message
            )
            reject(err)
          })
      })
    },
    updateName ({ context }, { name }) {
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_SERVICE_API}/users/name/${localStorage.getItem('userID')}`, {
          name: name
        })
          .then((res) => {
            // console.log(res.data.result.message)
            resolve(res.data.result.message)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updatePhone ({ context }, { phonenumber }) {
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_SERVICE_API}/users/phone/${localStorage.getItem('userID')}`, {
          phonenumber: phonenumber
        })
          .then((res) => {
            // console.log(res.data.result.message)
            resolve(res.data.result.message)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateBio ({ context }, { bio }) {
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_SERVICE_API}/users/bio/${localStorage.getItem('userID')}`, {
          bio: bio
        })
          .then((res) => {
            // console.log(res.data.result.message)
            resolve(res.data.result.message)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteMessage (context, payload) {
      // console.log(payload.idmsg)
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_SERVICE_API}/users/deletemsg/${payload.idmsg}`)
          .then((res) => {
            resolve(res.data.result[0])
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getFriends (state) {
      return state.friends
    },
    getChatReceiver (state) {
      return state.receiver
    },
    getReceiverId (state) {
      return state.receiverid
    },
    getMyProfile (state) {
      return state.myProfile
    },
    isLogin (state) {
      return state.token !== null
    }
  },
  modules: {
  }
})
