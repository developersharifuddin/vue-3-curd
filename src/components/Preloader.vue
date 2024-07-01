<template>
  <div class="preloader">
    <div class="aiz-titlebar text-left mb-3 px-2">
      <div class="d-flex justify-content-between align-items-center">
        <div class="col-md-2 bg-white">
          <button class="btn btn-block bg-white p-5"></button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header py-3">
        <div class="col-md-4">
          <div class="form-control bg-light"></div>
        </div>
      </div>
      <div class="card-body preloader-body d-flex justify-content-center align-items-center">
        <h6>
          <img src="/src/assets/preloader.gif" alt="" />
        </h6>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader-body {
  height: 100vh;
}

.bg-white,
.text-white {
  color: #fff !important;
  background-color: #fff !important;
}

.table th {
  border: none;
}
</style>
