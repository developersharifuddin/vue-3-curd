<template>
  <ul class="pagination justify-content-center mt-4">
    <li class="page-item" :class="{ disabled: data.current_page === 1 }">
      <a class="page-link" href="#" @click.prevent="changePage(data.current_page - 1)">Previous</a>
    </li>
    <li v-if="startPage > 1" class="page-item">
      <a class="page-link" href="#" @click.prevent="changePage(1)">1</a>
    </li>
    <li v-if="startPage > 2" class="page-item disabled">
      <a class="page-link" href="#">...</a>
    </li>
    <li
      v-for="page in pagesToShow"
      :key="page"
      class="page-item"
      :class="{ active: page === data.current_page }"
    >
      <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
    </li>
    <li v-if="endPage < data.last_page - 1" class="page-item disabled">
      <a class="page-link" href="#">...</a>
    </li>
    <li v-if="endPage < data.last_page" class="page-item">
      <a class="page-link" href="#" @click.prevent="changePage(data.last_page)">{{
        data.last_page
      }}</a>
    </li>
    <li class="page-item" :class="{ disabled: data.current_page === data.last_page }">
      <a class="page-link" href="#" @click.prevent="changePage(data.current_page + 1)">Next</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    maxPagesShown: {
      type: Number,
      default: 8
    }
  },
  computed: {
    startPage() {
      const half = Math.floor(this.maxPagesShown / 2)
      let start = this.data.current_page - half
      if (start < 1) {
        start = 1
      }
      return start
    },
    endPage() {
      const half = Math.floor(this.maxPagesShown / 2)
      let end = this.data.current_page + half
      if (end > this.data.last_page) {
        end = this.data.last_page
      }
      return end
    },
    pagesToShow() {
      const pages = []
      for (let i = this.startPage; i <= this.endPage; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    changePage(page) {
      if (page !== this.data.current_page) {
        this.$emit('pagination-change-page', page)
      }
    }
  }
}
</script>
