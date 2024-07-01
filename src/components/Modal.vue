<template>
  <div id="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
          <div class="mb-3 text-end">
            <button type="button" class="btn btn-link mt-2" data-bs-dismiss="modal">Close</button>
            <slot name="footer_button"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Modal title' }
  }
}
</script>

<style scoped>
.modal-body {
  scrollbar-width: thin;
  scrollbar-color: rgb(250, 167, 58) rgba(0, 0, 0, 0.3);
}

.modal-body::-webkit-scrollbar {
  width: 5px;
}

.modal-body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.modal-body::-webkit-scrollbar-thumb {
  background-color: rgb(250, 167, 58);
  outline: 1px solid rgb(35, 173, 77);
}
</style>
