<template>
  <div class="border border-black flex justify-center items-center h-60">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String, 
      required: true
    }
  }
}
</script>