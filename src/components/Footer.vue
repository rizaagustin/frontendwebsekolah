<template>
  <footer class="">
    <div class="container mt-2">
      <div class="row text-start pt-5">
        <div class="col-md-4">
          <h3 class="fw-bold text-white">TENTANG</h3>
          <p class="text-white-50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Sed
          </p>
        </div>
        <div class="col-md-4">
          <h3 class="fw-bold text-white">TAGS</h3>
          <router-link
            :to="{ name: 'detail_tag', params: { slug: tag.slug } }"
            v-for="tag in tags"
            :key="tag.id"
            class="btn btn-outline-light m-1"
          >
            {{ tag.name.toUpperCase() }}
          </router-link>
        </div>
        <div class="col-md-4">
          <h3 class="fw-bold text-white">KONTAK</h3>
          <p class="text-white-50">
            <i aria-hidden="true" class="fa fa-map-marker"></i> Jl. Biru Laut no
            3, Daerah Khusus Ibukota Jakarta, Indonesia <br /><br /><i
              class="fas fa-phone"
            ></i>
            +62822-1285-2112
          </p>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col">
          <div class="text-center copyright">
            Copyright 2022 By Riza Agustin
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer -->
</template>

<script>
//import axios
import axios from "axios";

import { ref, onMounted } from "vue";

export default {
  name: "FooterComponent",
  setup() {
    const tags = ref([]);
    onMounted(() => {
      axios
        .get("/tag")
        .then((response) => {
          tags.value = response.data.data.data;
        })
        .catch(() => {
          tags.value = [];
        });
    });

    return {
      tags,
    };
  },
};
</script>
