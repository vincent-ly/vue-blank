<template>

  <div id="app">
    <h1>{{ title }} </h1>
    <home-form :message="msg" @change="updated"></home-form>

    <p v-show="msg.name">Hello, {{ msg.name }}</p>
    <br>
    <p v-show="msg.email">Your email is {{ msg.email }} </p>



  </div>

</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      title: 'New VueJS App',
      msg: {
        test: ''
      }

    }
  },
  created () {
  },
  components: {
    homeForm: require('./home_form.vue')
  },
  methods: {
    updated (v, e) {
      this.$set(this.msg, v, e)
    }
  }
}

</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}





</style>
