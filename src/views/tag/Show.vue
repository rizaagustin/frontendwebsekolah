<template>
  <div id="tag">
    <Header />
    <!-- Berita -->
    <div class="berita" id="halaman_berita">
      <div class="container">
        <div class="row pt-2 g-2 mb-2">
          <div class="col-md-12">
            <h2 class="border-bottom fw-bold">
              {{ tagInfo.message }}
            </h2>
          </div>
        </div>
        <div v-if="posts.length > 0" class="row g-4 pt-2">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <div class="card">
              <img :src="post.image" class="p-2 card-img-top" alt="..." />
              <div class="card-body">
                <router-link
                  :to="{
                    name: 'detail_post',
                    params: { slug: post.slug },
                  }"
                  class="text-dark text-decoration-none"
                >
                  <p class="card-title">{{ post.title }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-danger text-center">
            DATA BERITA BELUM TERSEDIA !
          </div>
        </div>
        <div class="text-center m-5" v-show="moreExists">
          <button
            type="button"
            class="btn btn-primary btn-md"
            v-on:click="loadMore"
          >
            <span class="fa fa-arrow-down"></span> LIHAT LEBIH BANYAK
          </button>
        </div>
      </div>
    </div>
    <!-- berita -->

    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted, watch } from "vue";

export default {
  name: "TagComponent",
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const posts = ref([]);
    const moreExists = ref(false);
    const nextPage = ref(0);
    const tagInfo = ref({});

    const fetchDataPost = () => {
      axios
        .get(`http://rizaags.my.id:89/api/tag/${route.params.slug}`)
        .then((response) => {
          posts.value = response.data.data.data;
          tagInfo.value = response.data.response;
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
        .get(
          `http://rizaags.my.id:89/api/tag/${route.params.slug}?page=${nextPage.value}`
        )
        .then((response) => {
          if (response.data.data.current_page < response.data.data.last_page) {
            moreExists.value = true;
            nextPage.value = response.data.data.current_page + 1;
          } else {
            moreExists.value = false;
          }
          // //assign response to state posts
          response.data.data.data.forEach((data) => {
            posts.value.push(data);
          });
        });
    };

    onMounted(() => {
      fetchDataPost();
    });

    //watch route
    watch(
      () => route.params.slug,
      () => {
        //fetchDataPostsByCategory
        fetchDataPost();
      }
    );

    return {
      posts,
      moreExists,
      nextPage,
      loadMore,
      tagInfo,
    };
  },
};
</script>
