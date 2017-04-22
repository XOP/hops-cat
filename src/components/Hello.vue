<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'hello',

  data () {
    return {
      msg: 'Hops Cat'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'hello.scss';
</style>
