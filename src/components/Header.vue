<template>
  <div class="container-flex mb-3 py-3 bg-info">
    <div class="container row mx-auto px-0">
      <header class="header">
        <div class="wrapper">
          <nav class="d-flex">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/users">Users</RouterLink>
            <RouterLink to="/my-account">My Account</RouterLink>
            <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink>
            <RouterLink to="/register" v-if="!isLoggedIn">Register</RouterLink>
            <button v-if="!isLoggedIn" @click="logout">Logout</button>
          </nav>
        </div>
      </header>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import axiosClient from '@/axios'
import Swal from 'sweetalert2'

const router = useRouter()

async function logout() {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!'
  })

  if (result.isConfirmed) {
    try {
      await axiosClient.post('/logout') // Make a POST request to the logout endpoint
      localStorage.removeItem('token') // Remove the token from local storage
      router.push({ name: 'loginUser' }) // Redirect to the login page
      Swal.fire('Logged out!', 'You have been logged out successfully.', 'success')
    } catch (error) {
      console.error('Failed to log out:', error)
      Swal.fire('Error!', 'Failed to log out. Please try again.', 'error')
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  font-size: 1rem;
  text-align: center;
}

nav a {
  text-decoration: none;
  color: #020202;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #0056b3;
}

button {
  background: none;
  border: none;
  color: #020202;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
}

button:hover {
  color: #0056b3;
}
</style>
