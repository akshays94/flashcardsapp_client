<template functional>
  <div
    class="animate__animated animate__bounce border-2 border-black rounded-xl flex justify-center items-center h-60 p-4 text-xl text-black bg-white shadow-md hover:border-purple-800 hover:underline hover:shadow-2xl hover:bg-gray-100 transform hover:rotate-2 transition-all"
    title="Click to view this deck"
  >
    {{ props.title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
