<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Current Time: {{ currentTime }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {
      currentTime: new Date(),
    };
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState('user', ['keycloak'])
  },
  mounted() {
    setInterval(async () => {
      let result = await fetch(process.env.VUE_APP_API_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.keycloak.token}`
        }
      });
      let res = await result.json();
      this.currentTime = new Date(res.time)
    }, 1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
