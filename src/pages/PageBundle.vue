<template>
  <div>
    <h1>Bundles</h1>
    <div>{{ bundles }}</div>
  </div>
</template>

<script>
import { getBundlesAPI } from "@/endpoints/bundle"

export default {
  data() {
    return {
      bundles: []
    }
  },
  created() {
    this.loadBundles()
  },
  methods: {
    async loadBundles() {
      const response = await getBundlesAPI();
      this.bundles = response.data;
    }
  }
}
</script>