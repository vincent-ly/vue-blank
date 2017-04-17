<template>
    <div>
      <input type="text" :value="message.name" placeholder="Enter your name" @input="onChange('name', $event)">
      <input type="email" :value="message.email" placeholder="Enter your email" @input="onChange('email', $event)">
    </div>

</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    onChange (field, e) {
      this.$emit('change', field, e.target.value)
    }
  }
}

</script>

<style lang="scss">

$padding: 10px;

input {

  padding: $padding;
  border:1px solid #ccc;
  width:300px;
  margin-top:15px;

}

</style>
