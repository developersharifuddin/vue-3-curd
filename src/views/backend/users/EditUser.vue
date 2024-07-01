<template>
  <div class="card">
    <div class="card-header">
      <p style="font-size: 16px; font-weight: bold">User Information</p>
      <div id="error"></div>
    </div>

    <div class="card-body">
      <div class="mb-4 row">
        <div class="mb-3 col-md-4">
          <label for="name">User Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
          />
          <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
        </div>

        <div class="mb-3 col-md-4">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
          />
          <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
        </div>

        <div class="mb-3 col-md-4">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
        </div>

        <div class="text-right">
          <button @click="saveUser" v-if="!saving" class="btn btn-primary">Save</button>
          <SpinnerButton v-if="saving" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '@/axios'
import SpinnerButton from '../../../components/SpinnerButton.vue'

export default {
  components: { SpinnerButton },

  data() {
    return {
      id: null,
      name: '',
      email: '',
      password: '',
      saving: false,
      errors: {}
    }
  },

  created() {
    // Assuming you receive the user ID as a route parameter
    const userId = this.$route.params.id
    if (userId) {
      this.fetchUser(userId)
    }
  },

  methods: {
    fetchUser(userId) {
      axiosClient
        .get(`/users/${userId}`)
        .then((response) => {
          const user = response.data.data
          this.id = user.id
          this.name = user.name
          this.email = user.email
          // Do not pre-fill password field for security reasons
        })
        .catch((error) => {
          console.error('Error fetching user:', error)
          toastr.error('Failed to fetch user details.')
        })
    },

    saveUser() {
      this.saving = true
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      axiosClient
        .put(`/users/${this.id}`, userData)
        .then((response) => {
          this.saving = false
          console.log(response.data.message)
          this.$router.push({ name: 'users' })
          toastr.success('Successfully updated user!', 'Success')
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            this.errors = error.response.data.errors || {}
            console.log(error.response.data.errors)
          } else {
            console.error(error)
          }
          this.saving = false
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        })
    }
  }
}
</script>
