<template>
  <div
    class="card-pattern border-2 border-black rounded-xl flex justify-center items-center h-60 p-4 text-xl text-black bg-white shadow-md hover:border-purple-800 hover:underline hover:shadow-2xl hover:bg-gray-100 transform hover:rotate-2 transition-all"
    title="Click to view this deck"
  >
    {{ title }}
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

<style scoped>
.card-pattern {
  background-color: #f0f0f1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%236f6f6f' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
