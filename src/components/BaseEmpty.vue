<template>
  <div class="pb-32">
    <div class="flex justify-center">
      <slot></slot>
    </div>
    <div class="mt-5 text-center text-gray-400 text-lg">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>