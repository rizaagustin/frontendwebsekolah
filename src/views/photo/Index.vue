<template>
  <div id="photo">
    <Header />
    <div class="container" id="halaman_detail_agenda">
      <div class="row pt-2">
        <div class="col-md-12">
          <h2 class="blue-bottom-border fw-bold text-blue">GALERI FOTO</h2>
        </div>
      </div>
      <div v-if="photos.length > 0" class="row pt-2" id="foto">
        <div class="col-md-4" v-for="photo in photos" :key="photo.id">
          <img
            :src="photo.image"
            class="w-100 mb-3 img-fluid"
            alt="{{ photo.caption }}"
          />
          <p class="fw-semibold">
            {{ photo.caption }}
          </p>
        </div>
      </div>

      <div v-else>
        <div class="col-md-12"><ContentLoader /></div>
      </div>
      <div class="row">
        <div class="text-center mt-3 mb-3" v-show="moreExists">
          <button class="btn btn-primary" v-on:click="loadMore">
            Lihat Lebih Banyak
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "PhotoComponent",
  components: {
    Header,
    Footer,
  },
  setup() {
    const photos = ref([]);

    let moreExists = ref(false);
    let nextPage = ref(0);

    const fetchDataPhoto = () => {
      axios.get("http://rizaags.my.id:89/api/photo").then((response) => {
        photos.value = response.data.data.data;

        if (response.data.data.current_page < response.data.data.last_page) {
          moreExists.value = true;
          nextPage.value = response.data.data.current_page + 1;
        } else {
          moreExists.value = false;
        }
      });
    };

    const loadMore = () => {
      axios
        .get(`http://rizaags.my.id:89/api/photo?page=${nextPage.value}`)
        .then((response) => {
          if (response.data.data.current_page < response.data.data.last_page) {
            moreExists.value = true;

            nextPage.value = response.data.data.current_page + 1;
          } else {
            moreExists.value = false;
          }

          // //assign response to state posts
          response.data.data.data.forEach((data) => {
            photos.value.push(data);
          });
        });
    };

    onMounted(() => {
      fetchDataPhoto();
    });

    return {
      photos,
      moreExists,
      nextPage,
      loadMore,
    };
  },
};
</script>
