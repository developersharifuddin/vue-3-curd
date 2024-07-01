<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-4 row">
        <div class="mb-3 col-md-4">
          <label for="name">User Name</label>
          <input type="text" id="name" :value="user.name" class="form-control" disabled />
        </div>

        <div class="mb-3 col-md-4">
          <label for="email">Email</label>
          <input type="email" id="email" :value="user.email" class="form-control" disabled />
        </div>

        <div class="mb-3 col-md-4">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            :value="user.password"
            class="form-control"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>
