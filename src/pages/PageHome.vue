<template>
  <div>
    <header class="bg-purple-900 p-4">
      <div class="flex justify-between max-w-5xl mx-auto">
        <div class="logo text-white font-bold">FLASHLEARN</div>
        <div class="flex">
          <div class="text-white">
            Logged in as {{ name }}
          </div>
          <button class="ml-4 text-white underline">Logout</button>
        </div>
      </div>
    </header>

    <section class="max-w-5xl mx-auto bg-white mt-6 mb-12 p-12 min-h-screen shadow-sm pb-64">
      <router-view></router-view>
    </section>

    <footer class="bg-gray-200 p-2 text-sm flex justify-center border-t">
      Made with ❤️
    </footer>
  </div>
</template>

<script>
import Vuex from "vuex";

export default {
  computed: {
    ...Vuex.mapGetters({
      name: "getName"
    })
  },
};
</script>
