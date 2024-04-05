<template>
  <!-- nav -->
  <nav
    ref="navBar"
    class="navbar navbar-expand-lg navbar-light fixed-top text-blue"
  >
    <div class="container">
      <a class="navbar-brand text-white" href="#">SMA LOREM IPSUM</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center fw-bold">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link"
              aria-current="page"
              >HALAMAN UTAMA</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'post' }" class="nav-link mx-1"
              >BERITA</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'event' }" class="nav-link mx-1"
              >AGENDA</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'photo' }" class="nav-link mx-1"
              >GALERI</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'video' }" class="nav-link mx-1"
              >VIDEO</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'contact' }" class="nav-link mx-1"
              >KONTAK</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- nav -->
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>
