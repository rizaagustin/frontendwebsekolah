<template>
  <div id="video">
    <Header />
    <div class="container" id="halaman_detail_agenda">
      <div class="row">
        <div class="col-md-12">
          <h2 class="blue-bottom-border border-primary fw-bold text-blue">
            VIDEO KEGIATAN
          </h2>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-md-4" v-for="video in videos" :key="video.id">
          <div class="ratio ratio-16x9">
            <iframe
              :src="video.embed"
              title="YouTube video"
              allowfullscreen
            ></iframe>
          </div>
          <h6>{{ video.title }}</h6>
        </div>
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

export default {
  name: "VideoComponent",
  components: {
    Header,
    Footer,
  },
  setup() {
    const videos = ref([]);
    const moreExists = ref(false);
    const nextPage = ref(0);

    const fetchDataVideo = () => {
      axios.get("http://rizaags.my.id:89/api/video").then((response) => {
        videos.value = response.data.data.data;
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
        .get(`http://rizaags.my.id:89/api/video?page=${nextPage.value}`)
        .then((response) => {
          if (response.data.data.current_page < response.data.data.last_page) {
            moreExists.value = true;
            nextPage.value = response.data.data.current_page + 1;
          } else {
            moreExists.value = false;
          }
          // //assign response to state posts
          response.data.data.data.forEach((data) => {
            videos.value.push(data);
          });
        });
    };

    onMounted(() => {
      fetchDataVideo();
    });
    return {
      videos,
      moreExists,
      nextPage,
      loadMore,
    };
  },
};
</script>
