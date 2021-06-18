<template functional>
  <div class="text-5xl font-bold">
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
