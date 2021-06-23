<template>
  <div>
    <div
      class="card-pattern border-2 border-black rounded-xl flex justify-center items-center h-60 p-4 text-xl text-black bg-white shadow-md hover:border-purple-800 hover:underline hover:shadow-2xl hover:bg-gray-100 transform hover:rotate-2 transition-all cursor-pointer relative"
      title="Click to view the contents of this card"
      @click.stop.prevent="openCard()"
      @mouseenter="showActions = true"
      @mouseleave="showActions = false"
    >
      {{ title }}
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
      >
        <div v-show="showActions" class="absolute" style="bottom: 38px;">
          <button
            class="absolute bg-purple-300 text-sm py-1 px-2 rounded-full mb-2 shadow-xl"
            style="left: -52px;"
            @click.self="$emit('edit-card')"
          >
            Edit
          </button>

          <button
            class="absolute bg-red-300 text-sm py-1 px-2 rounded-full mb-2 shadow-xl"
            @click.prevent.stop="$emit('delete-card')"
            title="Delete this card"
          >
            Delete
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import marked from "marked";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showActions: false,
    };
  },

  computed: {
    parsedContent() {
      return marked(this.content);
    },
  },

  methods: {
    ...Vuex.mapActions(["openSelectedCard"]),
    openCard() {
      this.openSelectedCard({ title: this.title, content: this.parsedContent });
    },
  },
};
</script>

<style scoped>
.card-pattern {
  background-color: #dfdbe5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%239C92AC' fill-opacity='0.13'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
