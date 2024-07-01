<!-- src/views/NotFound.vue -->
<template>
  <div class="h-100 p-5 my-auto text-center">
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <RouterLink to="/">Go back to Home</RouterLink>
  </div>
</template>

<script setup></script>

<style scoped>
h1 {
  color: red;
}
</style>
