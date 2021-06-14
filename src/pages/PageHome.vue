<template>
  <div>
    <div>Hi {{ name }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  computed: {
    ...Vuex.mapGetters({
      name: "getName"
    })
  },
};
</script>
