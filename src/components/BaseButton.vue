<template>
  <button
    class="text-white font-bold py-2 px-4 border-b-4 rounded"
    :class="{
      'bg-gray-500 border-gray-700 cursor-not-allowed	':
        disabled,
      'bg-purple-500 hover:bg-purple-400 border-purple-700 hover:border-purple-500':
        !disabled && buttonColor === 'purple',
      'bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500':
        buttonColor === 'green',
      'bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500':
        buttonColor === 'red',
      'bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500':
        buttonColor === 'yellow',
    }"
    :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
