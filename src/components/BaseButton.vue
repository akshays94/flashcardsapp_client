<template>
  <button
    class="text-white font-bold py-2 px-4 border-b-4 rounded"
    :class="{
      'bg-purple-500 hover:bg-purple-400 border-purple-700 hover:border-purple-500':
        buttonColor === 'purple',
      'bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500':
        buttonColor === 'green',
      'bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500':
        buttonColor === 'red',
    }"
    @click="$emit('on-clicked')"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonColor: {
      type: String,
      default: "purple",
    },
  },
};
</script>
