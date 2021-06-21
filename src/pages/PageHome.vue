<template>
  <div>
    <BaseHeader />

    <section
      class="max-w-5xl mx-auto bg-white mt-6 mb-12 p-8 md:p-12 min-h-screen shadow-sm pb-64"
    >
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <router-view></router-view>
      </transition>
    </section>

    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";

export default {
  components: {
    BaseFooter,
    BaseHeader
  }
};
</script>
