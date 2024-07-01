<template>
  <div class="py-4 mx-auto">
    <h4>My Account</h4>
    <p>User Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosClient from '@/axios'

const user = ref({ name: '', email: '' })

onMounted(async () => {
  try {
    const response = await axiosClient.get('/me')
    user.value = response.data.data
    console.log(response.data)
  } catch (error) {
    toastr.error('error', error)
    console.error('Failed to fetch user data:', error)
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
