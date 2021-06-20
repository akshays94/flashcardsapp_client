<template>
  <section class="pt-6">
    <BaseButton
      title="Start today's revision session"
      button-color="yellow"
    />

    <section class="pt-4">
      Sessions table comes here
    </section>
  </section>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      sessions: [
        {
          id: 1,
          sessionDate: "21/02/2020",
        }
      ]
    }
  }
}
</script>