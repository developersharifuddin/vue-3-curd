<template>
  <div>
    <div v-if="isLoading" class="p-4">
      <Preloader></Preloader>
    </div>
    <div v-if="!isLoading">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <p style="font-size: 16px; font-weight: bold">All Users List</p>

          <div class="d-flex">
            <RouterLink class="mx-2 btn btn-sm btn-info" :to="{ name: 'userCreate' }"
              >+ Add User</RouterLink
            >
            <div class="form-group d-flex">
              <input
                type="text"
                v-model="search"
                @input="debouncedHandleSearch"
                class="form-control"
                placeholder="Search users..."
              />
              <button @click="clearSearch" class="btn btn-outline-danger ms-2">Clear</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table aiz-table" v-if="usersList.length > 0">
            <thead>
              <tr>
                <th>SL</th>
                <th class="text-center">id</th>
                <th>name</th>
                <th class="text-center">email</th>
                <th>password</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in usersList" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.email }}</td>
                <td>{{ item.password }}</td>
                <td class="text-center footable-last-visible" style="display: table-cell">
                  <button
                    @click="showModal(item.id)"
                    class="btn btn-primary btn-icon btn-circle btn-sm"
                    title="Edit"
                    :disabled="loading[item.id]?.editing"
                  >
                    <span v-if="!loading[item.id]?.editing">Edit</span>
                    <spinner-button v-else></spinner-button>
                  </button>
                  <button
                    @click="viewUser(item.id)"
                    class="btn btn-info btn-icon btn-circle btn-sm m-1"
                    title="View"
                    :disabled="loading[item.id]?.viewing"
                  >
                    <span v-if="!loading[item.id]?.viewing">View</span>
                    <spinner-button v-else></spinner-button>
                  </button>
                  <button
                    @click="confirmDelete(item.id)"
                    class="btn btn-danger btn-icon btn-circle btn-sm m-1"
                    title="Delete"
                    :disabled="loading[item.id]?.deleting"
                  >
                    <span v-if="!loading[item.id]?.deleting">Delete</span>
                    <spinner-button v-else></spinner-button>
                  </button>
                  <router-link
                    :to="{ name: 'editUser', params: { id: item.id } }"
                    class="btn btn-warning btn-icon btn-circle btn-sm m-1"
                    title="Edit Page"
                  >
                    Edit Page
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="text-center">No data available</div>

          <div class="d-flex justify-content-between align-items-center mt-4">
            <div class="pagiInfo ml-2">
              <div class="parPage pl-5">
                <select
                  @change="handlePerPageChange"
                  v-model="perPage"
                  class="form-select form-select-sm"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <!-- Showing X of Y total data -->
            <div class="ml-3">
              <p class="mb-0">
                Showing {{ (dataset.current_page - 1) * perPage + 1 }} to
                {{ Math.min(dataset.current_page * perPage, dataset.total) }} of
                {{ dataset.total }} total data
              </p>
            </div>
            <!-- Pagination -->
            <div class="d-flex justify-content-end">
              <CustomPagination :data="dataset" @pagination-change-page="changePage" />
            </div>
          </div>
        </div>
      </div>
      <!-- user details modal -->
      <Modal title="User Details" v-if="user" @close="user = false">
        <UserDetails :user="user"></UserDetails>
      </Modal>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Swal from 'sweetalert2'
import Modal from '../../../components/Modal.vue'
import Preloader from '../../../components/Preloader.vue'
import SpinnerButton from '../../../components/SpinnerButton.vue'
import UserDetails from '../users/UserDetails.vue'
import axiosClient from '@/axios'
import CustomPagination from '../../../components/CustomPagination.vue' // Import your custom pagination component

export default {
  components: {
    Preloader,
    UserDetails,
    Modal,
    CustomPagination, // Register your custom pagination component
    SpinnerButton
  },

  data() {
    return {
      isLoading: true,
      user: false,
      dataset: {
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0
      },
      perPage: 5, // Default per page
      search: '', // Search query
      loading: {} // Loading states for each user action
    }
  },

  mounted() {
    this.getResults()
  },

  computed: {
    usersList() {
      return this.dataset.data || []
    }
  },

  methods: {
    getResults(page = 1) {
      this.isLoading = true
      const url = `users?page=${page}&per_page=${this.perPage}&search=${this.search}` // Adjust URL to include pagination and search query param
      axiosClient
        .get(url)
        .then((response) => {
          this.dataset = response.data.data
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          toastr.error(error.message)
        })
    },

    showModal(id) {
      this.loading = { ...this.loading, [id]: { ...this.loading[id], editing: true } }
      const url = `users/${id}`
      this.user = false
      $('#modal').modal('show')
      axiosClient
        .get(url)
        .then((response) => {
          this.user = response.data.data
          this.loading = { ...this.loading, [id]: { ...this.loading[id], editing: false } }
        })
        .catch(() => {
          this.loading = { ...this.loading, [id]: { ...this.loading[id], editing: false } }
        })
    },

    async viewUser(id) {
      this.loading = { ...this.loading, [id]: { ...this.loading[id], viewing: true } }
      const url = `users/${id}`
      try {
        const response = await axiosClient.get(url)
        this.user = response.data.data
        $('#modal').modal('show')
      } catch (error) {
        toastr.error(error.message)
      } finally {
        this.loading = { ...this.loading, [id]: { ...this.loading[id], viewing: false } }
      }
    },

    async confirmDelete(id) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        this.deleteUser(id)
      }
    },

    async deleteUser(id) {
      this.loading = { ...this.loading, [id]: { ...this.loading[id], deleting: true } }
      const url = `users/${id}`
      try {
        await axiosClient.delete(url)
        this.getResults(this.dataset.current_page)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      } catch (error) {
        toastr.error(error.message)
      } finally {
        this.loading = { ...this.loading, [id]: { ...this.loading[id], deleting: false } }
      }
    },

    changePage(page) {
      this.getResults(page)
    },

    handlePerPageChange() {
      this.getResults(1) // Reset to first page when perPage changes
    },

    handleSearch() {
      this.getResults(1) // Reset to first page when search query changes
    },

    // Method to clear search input
    clearSearch() {
      this.search = ''
      this.getResults() // Reload data without search filter
    }
  },

  created() {
    this.debouncedHandleSearch = debounce(this.handleSearch, 400)
  }
}
</script>
