<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="container">
    <div class="col-12">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.invalid-feedback {
  display: block !important; /* Show error messages by default */
  color: red; /* Optionally, you can style the error messages */
  font-size: 14px;
}

/* Display error messages when errors exist */
.has-error .invalid-feedback {
  display: block !important;
}

nav {
  display: flex;
  gap: 1rem; /* Spacing between navigation links */
  font-size: 1rem;
  text-align: center;
}

nav a {
  text-decoration: none;
  color: #020202; /* Bootstrap primary color */
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #0056b3; /* Darker shade of primary color */
}

@media (min-width: 1024px) {
  .header {
    align-items: center;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 0;
  }
}
</style>
